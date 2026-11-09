// Локальный генератор QR-кодов — без внешних запросов.
// Byte mode, уровень коррекции M, версии 1-10 (~180 байт полезной нагрузки).
// Возвращает SVG data-URI для прямой подстановки в <img src>.

// --- GF(256) арифметика для Reed-Solomon ---
const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);
(function initGf() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) GF_EXP[i] = GF_EXP[i - 255];
})();
const gfMul = (a, b) => (a === 0 || b === 0 ? 0 : GF_EXP[GF_LOG[a] + GF_LOG[b]]);

function rsGeneratorPoly(deg) {
  const poly = [1];
  for (let i = 0; i < deg; i++) {
    const next = new Array(poly.length + 1).fill(0);
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= gfMul(poly[j], 1);
      next[j + 1] ^= gfMul(poly[j], GF_EXP[i]);
    }
    poly.splice(0, poly.length, ...next);
  }
  return poly;
}

function rsRemainder(data, deg) {
  const gen = rsGeneratorPoly(deg);
  const res = new Array(deg).fill(0);
  for (const byte of data) {
    const factor = byte ^ res.shift();
    res.push(0);
    if (factor !== 0) {
      for (let i = 0; i < deg; i++) res[i] ^= gfMul(gen[i + 1], factor);
    }
  }
  return res;
}

// --- Таблицы версий 1-10, EC level M ---
// blocks: сколько байт данных в каждом блоке; ec: байт коррекции на блок
const EC_TABLE = {
  1:  { ec: 10, blocks: [16] },
  2:  { ec: 16, blocks: [28] },
  3:  { ec: 26, blocks: [44] },
  4:  { ec: 18, blocks: [32, 32] },
  5:  { ec: 24, blocks: [43, 43] },
  6:  { ec: 16, blocks: [27, 27, 27, 27] },
  7:  { ec: 18, blocks: [31, 31, 31, 31] },
  8:  { ec: 22, blocks: [38, 38, 39, 39] },
  9:  { ec: 22, blocks: [36, 36, 36, 37, 37] },
  10: { ec: 26, blocks: [43, 43, 43, 43, 44] }
};

const ALIGN_POS = {
  1: [], 2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30],
  6: [6, 34], 7: [6, 22, 38], 8: [6, 24, 42], 9: [6, 26, 46], 10: [6, 28, 50]
};

const MASKS = [
  (r, c) => (r + c) % 2 === 0,
  (r, c) => r % 2 === 0,
  (r, c) => c % 3 === 0,
  (r, c) => (r + c) % 3 === 0,
  (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
  (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
  (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
  (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0
];

// --- Матрица ---

function buildSkeleton(version) {
  const size = version * 4 + 17;
  const mod = Array.from({ length: size }, () => new Array(size).fill(null));
  const isFn = Array.from({ length: size }, () => new Array(size).fill(false));

  const setFn = (r, c, v) => { mod[r][c] = v; isFn[r][c] = true; };

  const finder = (r, c) => {
    for (let dr = -1; dr <= 7; dr++) {
      for (let dc = -1; dc <= 7; dc++) {
        const rr = r + dr, cc = c + dc;
        if (rr < 0 || cc < 0 || rr >= size || cc >= size) continue;
        const on = (dr >= 0 && dr <= 6 && dc >= 0 && dc <= 6) &&
          (dr === 0 || dr === 6 || dc === 0 || dc === 6 ||
            (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4));
        setFn(rr, cc, on);
      }
    }
  };
  finder(0, 0);
  finder(0, size - 7);
  finder(size - 7, 0);

  for (let i = 8; i < size - 8; i++) {
    setFn(6, i, i % 2 === 0);
    setFn(i, 6, i % 2 === 0);
  }

  const aligns = ALIGN_POS[version];
  for (const cy of aligns) {
    for (const cx of aligns) {
      // Пропускаем центры внутри зон finder-паттернов
      if ((cy === 6 && cx === 6) ||
          (cy === 6 && cx === size - 7) ||
          (cy === size - 7 && cx === 6)) continue;
      for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          setFn(cy + dr, cx + dc, Math.max(Math.abs(dr), Math.abs(dc)) !== 1);
        }
      }
    }
  }

  // Резерв под format info: copy1 у левого верхнего finder,
  // copy2 — 7 ячеек вверх по col 8 у правого нижнего + 8 ячеек по row 8
  for (let i = 0; i <= 5; i++) { isFn[8][i] = true; isFn[i][8] = true; }
  isFn[8][7] = true; isFn[8][8] = true; isFn[7][8] = true;
  for (let i = 0; i < 7; i++) isFn[size - 1 - i][8] = true;
  for (let i = 0; i < 8; i++) isFn[8][size - 8 + i] = true;
  setFn(size - 8, 8, true); // dark module

  // Резерв под version info (версии 7+)
  if (version >= 7) {
    for (let i = 0; i < 18; i++) {
      isFn[Math.floor(i / 3)][size - 11 + (i % 3)] = true;
      isFn[size - 11 + (i % 3)][Math.floor(i / 3)] = true;
    }
  }

  return { mod, isFn, size };
}

function placeData(mod, isFn, size, dataBits) {
  let bitIdx = 0;
  let upward = true;
  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--;
    for (let i = 0; i < size; i++) {
      const row = upward ? size - 1 - i : i;
      for (let j = 0; j < 2; j++) {
        const c = col - j;
        if (!isFn[row][c] && mod[row][c] === null) {
          mod[row][c] = bitIdx < dataBits.length ? dataBits[bitIdx] : false;
          bitIdx++;
        }
      }
    }
    upward = !upward;
  }
}

const bchRemainder = (data, poly) => {
  let d = data;
  for (let i = 31 - Math.clz32(d); i >= 31 - Math.clz32(poly); i--) {
    if ((d >>> i) & 1) d ^= poly << (i - (31 - Math.clz32(poly)));
  }
  return d;
};

const formatBits = (ecBits, mask) => {
  const data = (ecBits << 3) | mask;
  return ((data << 10) | bchRemainder(data << 10, 0x537)) ^ 0x5412;
};

const versionBits = (version) =>
  (version << 12) | bchRemainder(version << 12, 0x1f25);

function drawFormat(mod, isFn, size, bits) {
  const setFn = (r, c, v) => { mod[r][c] = v; isFn[r][c] = true; };
  // 15 бит пишутся в обе копии в одном порядке: bit14 (MSB) -> bit0
  const bit = i => ((bits >>> (14 - i)) & 1) !== 0;
  const copy1 = [[8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [8, 8],
                 [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8]];
  const copy2 = [[size - 1, 8], [size - 2, 8], [size - 3, 8], [size - 4, 8],
                 [size - 5, 8], [size - 6, 8], [size - 7, 8],
                 [8, size - 8], [8, size - 7], [8, size - 6], [8, size - 5],
                 [8, size - 4], [8, size - 3], [8, size - 2], [8, size - 1]];
  copy1.forEach(([r, c], i) => setFn(r, c, bit(i)));
  copy2.forEach(([r, c], i) => setFn(r, c, bit(i)));
}

function drawVersion(mod, isFn, size, version) {
  const bits = versionBits(version);
  const bit = i => ((bits >>> i) & 1) !== 0;
  for (let i = 0; i < 18; i++) {
    const v = bit(i);
    const a = size - 11 + (i % 3), b = Math.floor(i / 3);
    mod[a][b] = v; isFn[a][b] = true;
    mod[b][a] = v; isFn[b][a] = true;
  }
}

function applyMask(mod, isFn, size, maskIdx) {
  const fn = MASKS[maskIdx];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!isFn[r][c] && fn(r, c)) mod[r][c] = !mod[r][c];
    }
  }
}

function penaltyScore(mod, size) {
  let score = 0;
  // N1: серии одинаковых модулей в строке/столбце
  for (const isCol of [false, true]) {
    for (let i = 0; i < size; i++) {
      let run = 1;
      for (let j = 1; j <= size; j++) {
        const cur = j < size ? (isCol ? mod[j][i] : mod[i][j]) : null;
        const prev = isCol ? mod[j - 1][i] : mod[i][j - 1];
        if (cur === prev) { run++; }
        else { if (run >= 5) score += run - 2; run = 1; }
      }
    }
  }
  // N2: блоки 2x2
  for (let r = 0; r < size - 1; r++) {
    for (let c = 0; c < size - 1; c++) {
      const v = mod[r][c];
      if (v === mod[r][c + 1] && v === mod[r + 1][c] && v === mod[r + 1][c + 1]) score += 3;
    }
  }
  // N3: паттерн 1011101 + 4 светлых модуля до или после (оба порядка)
  const N3_A = [true, false, true, true, true, false, true, false, false, false, false];
  const N3_B = [false, false, false, false, true, false, true, true, true, false, true];
  for (const isCol of [false, true]) {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j <= size - 11; j++) {
        let mA = true, mB = true;
        for (let k = 0; k < 11; k++) {
          const v = isCol ? mod[j + k][i] : mod[i][j + k];
          if (v !== N3_A[k]) mA = false;
          if (v !== N3_B[k]) mB = false;
          if (!mA && !mB) break;
        }
        if (mA || mB) score += 40;
      }
    }
  }
  // N4: доля тёмных модулей
  let dark = 0;
  for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) if (mod[r][c]) dark++;
  score += Math.floor(Math.abs(dark * 20 - size * size * 10) / (size * size)) * 10;
  return score;
}

// --- Кодирование ---

export function qrToMatrix(text, ecLevel = 'M') {
  if (ecLevel !== 'M') throw new Error('only EC level M is supported');
  const bytes = new TextEncoder().encode(String(text));

  let version = 0;
  for (let v = 1; v <= 10; v++) {
    const lenBits = v < 10 ? 8 : 16;
    const dataCap = EC_TABLE[v].blocks.reduce((a, b) => a + b, 0);
    const needBits = 4 + lenBits + bytes.length * 8;
    if (dataCap * 8 >= needBits) { version = v; break; }
  }
  if (!version) throw new Error('qr: input too long for version 10');

  // Поток битов: mode(0100) + длина + данные + terminator
  const lenBits = version < 10 ? 8 : 16;
  const dataCap = EC_TABLE[version].blocks.reduce((a, b) => a + b, 0);
  const bits = [];
  const push = (val, len) => { for (let i = len - 1; i >= 0; i--) bits.push(((val >>> i) & 1) === 1); };
  push(0b0100, 4);
  push(bytes.length, lenBits);
  for (const b of bytes) push(b, 8);
  const term = Math.min(4, dataCap * 8 - bits.length);
  for (let i = 0; i < term; i++) bits.push(false);
  // Паддинг до границы кодворда: при выровненном потоке добавляется
  // полный нулевой байт (как в reference segno; декодеры игнорируют хвост)
  const padZeros = 8 - (bits.length % 8);
  for (let i = 0; i < padZeros; i++) bits.push(false);
  const dataCw = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    dataCw.push(bits.slice(i, i + 8).reduce((a, b) => (a << 1) | (b ? 1 : 0), 0));
  }
  if (dataCw.length > dataCap) dataCw.length = dataCap;
  const pads = [0xec, 0x11];
  let padIdx = 0;
  while (dataCw.length < dataCap) dataCw.push(pads[padIdx++ % 2]);

  // Блоки + RS + interleave
  const { ec, blocks } = EC_TABLE[version];
  const dataBlocks = [];
  const ecBlocks = [];
  let off = 0;
  for (const bl of blocks) {
    const chunk = dataCw.slice(off, off + bl);
    off += bl;
    dataBlocks.push(chunk);
    ecBlocks.push(rsRemainder(chunk, ec));
  }
  const interleaved = [];
  const maxData = Math.max(...blocks);
  for (let i = 0; i < maxData; i++) {
    for (const b of dataBlocks) if (i < b.length) interleaved.push(b[i]);
  }
  for (let i = 0; i < ec; i++) {
    for (const b of ecBlocks) interleaved.push(b[i]);
  }
  const finalBits = [];
  for (const b of interleaved) {
    for (let i = 7; i >= 0; i--) finalBits.push(((b >>> i) & 1) === 1);
  }

  // Выбор маски по минимальному штрафу
  let best = null, bestScore = Infinity, bestMask = 0;
  for (let m = 0; m < 8; m++) {
    const { mod, isFn, size } = buildSkeleton(version);
    placeData(mod, isFn, size, finalBits);
    applyMask(mod, isFn, size, m);
    const fb = formatBits(0b00, m); // EC M = 00
    drawFormat(mod, isFn, size, fb);
    if (version >= 7) drawVersion(mod, isFn, size, version);
    const score = penaltyScore(mod, size);
    if (score < bestScore) { bestScore = score; best = mod; bestMask = m; }
  }
  return { modules: best, size: best.length, mask: bestMask };
}

export function qrToSvg(text, { margin = 2, dark = '#000000', light = '#ffffff' } = {}) {
  const { modules, size } = qrToMatrix(text);
  const dim = size + margin * 2;
  let path = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (modules[r][c]) path += `M${c + margin} ${r + margin}h1v1h-1z`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${dim} ${dim}" shape-rendering="crispEdges"><rect width="${dim}" height="${dim}" fill="${light}"/><path d="${path}" fill="${dark}"/></svg>`;
}

export function qrSvgDataUri(text, opts = {}) {
  return 'data:image/svg+xml,' + encodeURIComponent(qrToSvg(text, opts));
}
