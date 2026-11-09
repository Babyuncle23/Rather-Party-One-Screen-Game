// =====================================================================
// QUESTIONS DATABASE — РУССКАЯ ВЕРСИЯ (Sprint 4)
// Структура идентична questions.js: те же id, type/requires, scene,
// hints (ссылаются на локальный PROMPTS). Маркеры [ ... ], [PICKER],
// [RESPONDER], [PREV_CHOICE] сохранены как есть.
//
// НОМИНАТИВНАЯ БЕЗОПАСНОСТЬ: слоты [ ... ] стоят только в позициях,
// где именительный падеж звучит естественно — кавычки « », аппозиция
// (существо «X», персона «X», тема «X»), двоеточие или позиция подлежащего.
// =====================================================================

const MOD_SUBJECTS = ['которое тебе нравилось', 'с которым ты мучился', 'которому стоило уделять больше внимания'];

export const PROMPTS = {
  // ДЕЙСТВИЯ
  actionWork: { text: 'Неуместное действие на работе', brainstorm: ['дремота на месте', 'ранний уход домой', 'игнор босса', 'игра в игры', 'просмотр сериалов', 'пение в подсобке', 'воровство кофе', 'ссора с коллегой', 'выход на смену пьяным', 'скроллинг тиктока', 'рыдание в туалете', 'удаление главной базы', 'оскорбление главного клиента', 'пижама на совещании', 'сон на презентации', 'продажа активов компании'] },
  actionIllegal: { text: 'Мелкое нарушение закона', brainstorm: ['пиратская качка фильма', 'переход в неположенном месте', 'кража ручки', 'проход на концерт без билета', 'кража конфеты', 'граффити на стене', 'превышение у школы', 'езда зайцем', 'выдуманное имя', 'дёрганье стоп-крана', 'взятка парковщику', 'воровство чужого вайфая', 'подделка справки от врача'] },
  actionEmbarrassing: { text: 'Стыдное действие', brainstorm: ['забыть имя человека', 'фыркнуть от смеха', 'помахать незнакомцу', 'ответить не в тот чат', 'туалетная бумага на ботинке', 'расстёгнутая ширинка', 'назвать учителя мамой', 'лайкнуть старый пост', 'шпинат в зубах', 'врезаться в стеклянную дверь', 'забыть свой пароль'] },
  actionParty: { text: 'Весёлый фокус для вечеринки', brainstorm: ['проглотить меч', 'жонглировать яблоками', 'сальто назад', 'съесть стакан', 'не дышать две минуты', 'собрать кубик вслепую', 'почистить банан ногами', 'угадать тайный ингредиент в коктейле', 'спеть песню задом наперёд', 'разбить доску головой', 'говорить двумя голосами', 'крутить глазами в разные стороны', 'завязать черешню языком', 'найти иголку в стоге сена'] },
  actionChore: { text: 'Твоя обычная обязанность (напр. мыть посуду)', brainstorm: ['пылесосить', 'выносить мусор', 'складывать стирку', 'заправлять кровать', 'вытирать пыль', 'мыть унитаз', 'сортировать мусор', 'менять постельное', 'разгружать посудомойку', 'мыть все окна'] },
  actionRelax: { text: 'Расслабляющее занятие', brainstorm: ['спать 10 часов', 'принять горячую ванну', 'читать книгу', 'пялиться в стену', 'смотреть закат', 'гулять', 'медитировать', 'пить травяной чай', 'вообще ничего не делать', 'лежать на пляже', 'смотреть на облака', 'принимать пенную ванну', 'слушать океан', 'получать массаж', 'глубоко дышать', 'смотреть на дождь', 'рисовать картину'] },
  actionExtreme: { text: 'Экстремальный спорт, который ты не осмелишься попробовать', brainstorm: ['сёрфинг на гигантской волне', 'прыжок с парашютом', 'эндуро', 'скалолазание', 'полёт в вингсьюте', 'сальто назад', 'ультрамарафон', 'прыжок между крышами', 'скоростной спуск на скейте'] },
  humanActivity: { text: 'Занятие', modifiers: ['которое тебе нравится', 'которое тебе не нравится'] },
  hobby: { text: 'Хобби', modifiers: ['которым хочешь начать заниматься', 'которое тебя интересует', 'которым ты никогда не займёшься'] },
  annoyingHabit: { text: 'Привычка', modifiers: ['хорошая', 'плохая'] },

  // СЛОВА И АБСТРАКЦИИ
  personalLike: { text: 'Вещи, которые тебе искренне нравятся' },
  personalInterest: { text: 'Темы, которые тебя интересуют' },
  letterM: { text: 'Слова на букву М' },
  madeUpCompound: { text: 'Выдуманное слитное слово (две любимые вещи вместе, напр. «чипсотусовка»)' },
  madeUpHyphenated: { text: 'Выдуманное слово через дефис (с одной любимой вещью, напр. «обнимашко-машина»)' },
  abstractMood: { text: 'Абстрактное чувство или концепт', modifiers: ['которое ты недавно испытывал', 'которого давно не было'], brainstorm: ['Радость', 'Отчаяние', 'Смущение', 'Апатия', 'Паника', 'Меланхолия', 'Эйфория', 'Скука', 'Ностальгия'] },

  // МЕСТА
  country: { text: 'Страна, которая тебя интересует' },
  famousCity: { text: 'Известный город' },
  specificLocation: { text: 'Место, куда ты часто ходишь' },
  publicPlace: { text: 'Публичное место, где ты часто бываешь' },

  // ЛЮДИ И РОЛИ
  fictionalChar: { text: 'Вымышленный персонаж' },
  villain: { text: 'Злодей из фильма ужасов', brainstorm: ['Дракула', 'Пеннивайз', 'Чаки', 'Ганнибал', 'Мумия', 'Чужой', 'Фредди Крюгер', 'Майкл Майерс', 'Хищник', 'Пила'] },
  politician: { text: 'Политик', brainstorm: ['Путин', 'Макрон', 'Меркель', 'Сталин', 'Ленин', 'Никсон', 'Дональд Трамп', 'Джо Байден', 'Борис Джонсон', 'Ким Чен Ын', 'Барак Обама', 'Уинстон Черчилль', 'Нельсон Мандела', 'Махатма Ганди', 'Авраам Линкольн', 'Бенджамин Франклин', 'Королева Елизавета', 'Маргарет Тэтчер', 'Камала Харрис'] },
  historical: { text: 'Историческая фигура', brainstorm: ['Нерон', 'Платон', 'Данте', 'Галилей', 'Моцарт', 'Авраам Линкольн', 'Клеопатра', 'Наполеон', 'Юлий Цезарь', 'Исаак Ньютон', 'Альберт Эйнштейн', 'Жанна д\'Арк', 'Мартин Лютер Кинг', 'Марко Поло', 'Александр Македонский', 'Чингисхан', 'Мария Кюри'] },
  singer: { text: 'Певец/музыкант', brainstorm: ['Принс', 'Адель', 'Дрейк', 'Сиа', 'Стинг', 'Боуи', 'Тейлор Свифт', 'Майкл Джексон', 'Фредди Меркьюри', 'Бейонсе', 'Леди Гага', 'Фрэнк Синатра', 'Элвис Пресли', 'Уитни Хьюстон', 'Билли Айлиш', 'Джастин Бибер'] },
  band: { text: 'Музыкальная группа', brainstorm: ['Queen', 'KISS', 'Muse', 'Blur', 'Nirvana', 'The Beatles', 'Metallica', 'Pink Floyd', 'Led Zeppelin', 'Rolling Stones', 'RHCP', 'Guns N\' Roses', 'Arctic Monkeys', 'Linkin Park', 'Foo Fighters', 'Black Sabbath', 'Radiohead'] },
  actor: { text: 'Актёр', brainstorm: ['Брэд Питт', 'Том Круз', 'Джим Керри', 'Том Хэнкс', 'Вин Дизель', 'Уилл Смит', 'Леонардо ДиКаприо', 'Роберт Дауни мл.', 'Мэттью Макконахи', 'Скарлетт Йоханссон', 'Джонни Депп', 'Кристиан Бейл', 'Морган Фримен', 'Райан Рейнольдс', 'Дженнифер Лоуренс', 'Сэмюэл Л. Джексон', 'Хоакин Феникс'] },
  profession: { text: 'Профессия', modifiers: ['которая звучит изнуряюще', 'которая звучит весело'] },
  cartoonChar: { text: 'Мультперсонаж', brainstorm: ['Попай', 'Гамбол', 'Скуби-Ду', 'Стьюи', 'Багз Банни', 'Микки Маус', 'Гомер Симпсон', 'Губка Боб', 'Кот Том', 'Мышонок Джерри', 'Чарли Браун', 'Винни-Пух', 'Рик Санчес'] },
  mediaPersonality: { text: 'Медиаперсона', brainstorm: ['Опра Уинфри', 'Эллен Дедженерес', 'Конан О\'Брайен', 'Джимми Фэллон', 'Джимми Киммел', 'Джо Роган', 'Ларри Кинг', 'Дэвид Леттерман', 'Гордон Рамзи', 'Такер Карлсон', 'Тревор Ноа'] },

  // ЕДА И НАПИТКИ
  fastFood: { text: 'Фастфуд', brainstorm: ['бургер', 'пицца', 'картошка фри', 'хот-дог', 'жареная курица', 'тако', 'буррито', 'луковые кольца'] },
  snack: { text: 'Снэк', brainstorm: ['скитлс', 'доритос', 'читос', 'попкорн', 'крендельки', 'арахис', 'печенье', 'вяленое мясо'] },
  sweetLiquid: { text: 'Сладкая жидкость', brainstorm: ['мёд', 'сироп', 'сок', 'газировка', 'молоко', 'нектар', 'кленовый сироп', 'топлёный шоколад', 'яблочный сок', 'апельсиновый сок', 'виноградная газировка', 'сгущёнка'] },
  strongFood: { text: 'Еда с сильным запахом', brainstorm: ['лук', 'чеснок', 'рыба', 'тунец', 'кимчи', 'карри', 'голубой сыр', 'маринованная сельдь', 'тухлые яйца', 'сардины в банке', 'дуриан'] },
  sauce: { text: 'Соус', brainstorm: ['Песто', 'Сальса', 'Подлива', 'Тахини', 'Хумус', 'Томатно-базиликовый', 'Сливочно-грибной', 'Острый барбекью', 'Терияки', 'Чесночный айоли', 'Медово-горчичный', 'Голландез', 'Баффало', 'Сладкий чили', 'Блю-чиз'] },
  hotDrink: { text: 'Горячий напиток', brainstorm: ['Чай', 'Кофе', 'Какао', 'Латте', 'Масала-чай', 'Горячий шоколад', 'Травяной сбор', 'Эрл Грей', 'Зелёный чай', 'Капучино', 'Эспрессо', 'Матча-латте', 'Мятный чай', 'Флэт уайт', 'Тёплый яблочный сидр'] },
  popularDrink: { text: 'Напиток', brainstorm: ['Вода', 'Кофе', 'Чай', 'Пиво', 'Газировка', 'Апельсиновый сок', 'Кока-кола', 'Красное вино', 'Холодный чай', 'Лимонад', 'Горячий шоколад', 'Яблочный сок', 'Крафтовое пиво', 'Энергетик', 'Газированная вода'] },
  candyType: { text: 'Вид конфет', brainstorm: ['Желейные мишки', 'Шоколад', 'Леденец', 'Скитлс', 'Маршмеллоу', 'Лакрица', 'Горький шоколад', 'Сахарная вата'] },
  fruit: { text: 'Фрукт', brainstorm: ['Яблоко', 'Груша', 'Персик', 'Слива', 'Виноград', 'Арбуз', 'Клубника', 'Ананас', 'Гранат', 'Грейпфрут', 'Черника', 'Малина', 'Маракуйя', 'Киви', 'Питахайя'] },
  foodItem: { text: 'Блюдо/продукт', modifiers: ['которое ты мог бы есть каждый день', 'которое тебе нравится', 'которое ты не ешь'], brainstorm: ['Пицца', 'Сыр', 'Торт', 'Шоколад'] },

  // ЖИВОТНЫЕ
  animalFunny: { text: 'Забавное на вид животное', brainstorm: ['ленивец', 'мопс', 'лягушка', 'лама', 'коала', 'обезьяна', 'утконос', 'капибара', 'летучая лисица', 'эму'] },
  animalFarm: { text: 'Фермерское животное', brainstorm: ['корова', 'свинья', 'лошадь', 'коза', 'овца', 'утка', 'курица', 'бык', 'баран', 'цыплёнок', 'петух', 'осёл', 'мул', 'индейка'] },
  chubbyAnimal: { text: 'Пухлое животное', brainstorm: ['Тюлень', 'Панда', 'Хомяк', 'Пингвин', 'Медведь', 'Красная панда', 'Морская свинка', 'Бегемот', 'Сурок', 'Ёжик'] },
  fastAnimal: { text: 'Быстрое животное', brainstorm: ['Лев', 'Заяц', 'Ястреб', 'Акула', 'Орёл', 'Сапсан', 'Гепард', 'Парусник', 'Чёрный марлин', 'Вилорог', 'Спрингбок', 'Гну', 'Скаковая лошадь', 'Страус', 'Борзая'] },
  angryAnimal: { text: 'Злое на вид животное', brainstorm: ['Оса', 'Бык', 'Барсук', 'Кабан', 'Змея', 'Гризли', 'Горилла', 'Кафрский буйвол', 'Медоед', 'Бегемот', 'Росомаха', 'Носорог', 'Чихуахуа', 'Дикий вепрь'] },
  loudAnimal: { text: 'Громкое животное', brainstorm: ['Лев', 'Волк', 'Ворона', 'Гиена', 'Гуси', 'Синий кит', 'Павлин', 'Осёл', 'Морской лев', 'Бык-лягушка'] },
  dangerousAnimal: { text: 'Опасное животное', brainstorm: ['Лев', 'Акула', 'Кобра', 'Волк', 'Медведь', 'Тигр', 'Крокодил', 'Чёрная мамба', 'Медуза', 'Комодский варан', 'Древолаз', 'Бегемот'] },
  insect: { text: 'Насекомое', brainstorm: ['Муравей', 'Пчела', 'Муха', 'Оса', 'Блоха', 'Медоносная пчела', 'Комнатная муха', 'Стрекоза', 'Бабочка', 'Божья коровка', 'Кузнечик', 'Таракан', 'Комар', 'Шмель', 'Богомол'] },
  heavyAnimal: { text: 'Тяжёлое животное', brainstorm: ['Корова', 'Медведь', 'Бык', 'Тюлень', 'Лошадь', 'Синий кит', 'Африканский слон', 'Белый носорог', 'Бегемот', 'Морж', 'Жираф', 'Бизон', 'Гаур', 'Морской слон', 'Азиатский слон'] },
  bitingAnimal: { text: 'Кусачее животное', brainstorm: ['Собака', 'Кошка', 'Муравей', 'Оса', 'Крыса', 'Немецкая овчарка', 'Грифовая черепаха', 'Чёрная мамба', 'Комодский варан', 'Летучая лисица', 'Гризли', 'Дикий кабан', 'Огненный муравей', 'Комар', 'Белая акула'] },
  nocturnalAnimal: { text: 'Ночное животное', brainstorm: ['Сова', 'Летучая мышь', 'Лиса', 'Волк', 'Крот', 'Енот', 'Ёж', 'Летяга', 'Барсук', 'Опоссум', 'Лемур', 'Ай-ай', 'Фруктовый крылан', 'Козодой'] },
  wildAnimal: { text: 'Дикое животное', brainstorm: ['Волк', 'Медведь', 'Лев', 'Олень', 'Лиса', 'Бенгальский тигр', 'Африканский слон', 'Гризли', 'Рыжий кенгуру', 'Снежный барс', 'Белый медведь', 'Белоголовый орлан', 'Серый волк', 'Горная горилла', 'Африканский лев'] },
  dogBreed: { text: 'Порода собаки', brainstorm: ['Мопс', 'Боксёр', 'Хаски', 'Бигль', 'Колли', 'Пудель', 'Акита', 'Корги', 'Чау-чау', 'Выжла', 'Овчарка', 'Голден-ретривер', 'Французский бульдог', 'Бордер-колли', 'Лабрадор', 'Сибирский хаски', 'Датский дог', 'Австралийская овчарка', 'Бернский зенненхунд', 'Кавалер-спаниель', 'Доберман', 'Ротвейлер', 'Маламут', 'Ньюфаундленд', 'Сенбернар'] },
  exoticAnimal: { text: 'Экзотическое животное', brainstorm: ['Панда', 'Коала', 'Игуана', 'Тукан'] },

  // ПРЕДМЕТЫ
  everyday: { text: 'Материальная вещь/вещи', modifiers: ['которые ты часто используешь', 'которых хочешь больше'] },
  expensive: { text: 'Дорогая вещь' },
  gadget: { text: 'Электронный гаджет', brainstorm: ['iPad', 'iPod', 'Kindle', 'Walkman', 'Пейджер', 'Камера', 'iPhone', 'Game Boy', 'Электробритва', 'Умная колонка', 'Беспроводная мышь', 'Игровая консоль', 'Полароид', 'Компьютер'] },
  smallObj: { text: 'Мелкие предметы', isPlural: true, brainstorm: ['Монетки', 'Кнопки', 'Игральные кости', 'Ключи', 'Кольца', 'Семечки', 'Крышки от бутылок', 'Скрепки', 'Пуговицы', 'Резинки', 'Канцелярские кнопки', 'Серёжки-гвоздики', 'Кофейные зёрна', 'Булавки', 'Спички', 'Медиаторы', 'Карты памяти'] },
  stickyThing: { text: 'Липкая штука', brainstorm: ['Клей', 'Мёд', 'Скотч', 'Жвачка', 'Смола', 'Двусторонний скотч', 'Стикер-записка', 'Патока', 'Кленовый сироп', 'Суперклей', 'Жевательная резинка', 'Древесная смола', 'Карамель', 'Малярный скотч', 'Клеевой стик'] },
  kitchenItem: { text: 'Кухонные предметы', isPlural: true, brainstorm: ['Ложки', 'Тарелки', 'Блендеры', 'Ножи', 'Вилки', 'Разделочные доски', 'Мерные стаканы', 'Сковородки', 'Миски', 'Кофеварки', 'Тостеры', 'Противни', 'Деревянные ложки', 'Сушилки для посуды', 'Кухонные комбайны'] },
  householdItem: { text: 'Предмет из дома, которым часто пользуешься', brainstorm: ['Тостер', 'Лампа', 'Губка', 'Веник', 'Стул', 'Пылесос', 'Кофеварка', 'Настенные часы', 'Корзина для белья', 'Разделочная доска', 'Пульт', 'Простыня', 'Шторка для душа', 'Мусорное ведро', 'Стиральная машина'] },
  clothingItem: { text: 'Обычная одежда', brainstorm: ['Рубашка', 'Джинсы', 'Юбка', 'Платье', 'Шапка', 'Зимняя куртка', 'Кожаный ремень', 'Свитер', 'Футболка', 'Дождевик'] },
  survivalTool: { text: 'Базовый инструмент выживания', brainstorm: ['Нож', 'Топор', 'Пила', 'Зажигалка', 'Верёвка', 'Мультитул', 'Аптечка', 'Фонарик', 'Спальник', 'Компас'] },
  shape: { text: 'Форма / предмет узнаваемой формы', brainstorm: ['Куб', 'Треугольник', 'Арахис', 'Шарик', 'Лампочка', 'Груша', 'Яйцо', 'Кирпич', 'Сердце', 'Ромб', 'Цилиндр', 'Конус', 'Пончик', 'Банан', 'Пирамида', 'Звезда', 'Стрела', 'Таблетка'] },
  hygieneProduct: { text: 'Средство гигиены', brainstorm: ['Мыло', 'Зубная паста', 'Шампунь', 'Дезодорант'] },
  badSmellingThing: { text: 'Вонючая штука', brainstorm: ['Мусор', 'Скунс', 'Тухлое яйцо', 'Грязь'] },
  cheapItem: { text: 'Дешёвые мелочи', isPlural: true, brainstorm: ['Скрепки', 'Резинки', 'Карандаши', 'Спички'] },
  roomItem: { text: 'Вещи в твоей гостиной', isPlural: true, brainstorm: ['Книги', 'Кабели', 'Подушки', 'Кружки'] },
  minorInconvenience: { text: 'Мелкая неприятность', brainstorm: ['Медленный вайфай', 'Ушибленные пальцы ног', 'Светофоры', 'Порезы от бумаги'] },
  fragileObject: { text: 'Хрупкий предмет', brainstorm: ['Сырое яйцо', 'Стеклянная чашка', 'Цветок', 'Бумажный стакан'] },
  inanimateObject: { text: 'Неодушевлённый предмет', brainstorm: ['Стул', 'Лампа', 'Машина', 'Дерево'] },
  stickySubstance: { text: 'Липкая субстанция', brainstorm: ['Мёд', 'Грязь', 'Слизь', 'Клей'] },
  vegetable: { text: 'Овощ', brainstorm: ['Брокколи', 'Морковь', 'Лук', 'Капуста'] },

  // МЕДИА, БРЕНДЫ, КОНЦЕПТЫ
  company: { text: 'Компания', brainstorm: ['Sony', 'Apple', 'Nokia', 'Yahoo', 'Tesla', 'SpaceX', 'Intel', 'Meta', 'Blockbuster', 'Netflix', 'Google', 'Amazon', 'Microsoft', 'Samsung', 'Toyota', 'General Electric', 'Coca Cola'] },
  app: { text: 'Современное приложение', brainstorm: ['Zoom', 'Uber', 'Slack', 'Tinder', 'Discord', 'Reddit', 'BeReal', 'TikTok', 'Instagram', 'Google Maps', 'Spotify', 'YouTube', 'WhatsApp', 'Twitter', 'Apple Music', 'Netflix', 'Facebook', 'Snapchat'] },
  website: { text: 'Вебсайт', brainstorm: ['eBay', 'Bing', 'Twitch', 'Reddit', 'Tumblr', 'Github', 'YouTube', 'Википедия', 'Amazon', 'Google', 'Facebook', 'Instagram', 'Pinterest', 'LinkedIn', 'Netflix', 'SoundCloud'] },
  videoGame: { text: 'видеоигра', brainstorm: ['Doom', 'Halo', 'Тетрис', 'Portal', 'Skyrim', 'Fortnite', 'GTA', 'World of Warcraft', 'Ведьмак', 'RDR', 'Mario', 'Minecraft', 'Elden Ring', 'Call of Duty', 'Final Fantasy', 'League of Legends'] },
  boardGame: { text: 'настольная игра', brainstorm: ['Монополия', 'Уно', 'Шахматы', 'Твистер', 'Дженга', 'Эрудит', 'Колонизаторы'] },
  sport: { text: 'Спорт', brainstorm: ['Гольф', 'Регби', 'Теннис', 'Футбол', 'Бокс', 'Баскетбол', 'Волейбол', 'Хоккей', 'Настольный теннис', 'Американский футбол', 'Формула-1', 'Скалолазание', 'Фигурное катание', 'Скачки', 'Фрисби'] },
  mobileGame: { text: 'Мобильная игра', brainstorm: ['Alto', 'Змейка', 'Plague', 'Threes', 'Monument', 'Candy Crush', 'Clash of Clans', 'Subway Surfers', 'Angry Birds', 'Temple Run', 'Among Us', 'Genshin Impact', 'Pokémon GO', 'PUBG Mobile', 'Растения против зомби'] },
  instrument: { text: 'Музыкальный инструмент', brainstorm: ['Пианино', 'Барабан', 'Арфа', 'Флейта', 'Виолончель', 'Акустическая гитара', 'Электрогитара', 'Рояль', 'Скрипка', 'Саксофон', 'Труба', 'Кларнет', 'Тромбон', 'Бас-гитара', 'Синтезатор'] },
  tvShow: { text: 'Сериал, который тебе нравится', brainstorm: ['Остаться в живых', 'Фарго', 'Друзья', 'Прослушка', 'Наследники', 'Во все тяжкие', 'Игра престолов', 'Клан Сопрано', 'Очень странные дела', 'Офис', 'Лучше звоните Солу', 'Чёрное зеркало', 'Чернобыль', 'Корона', 'Дом дракона'] },
  schoolSubject: { text: 'Школьный предмет', modifiers: MOD_SUBJECTS, brainstorm: ['Математика', 'Рисование', 'Музыка', 'История', 'Физика', 'Информатика', 'Физкультура', 'Иностранный язык', 'Обществознание', 'Политология', 'Экология', 'Литература', 'Дизайн', 'Религия', 'Экономика'] },
  complicatedTopic: { text: 'Сложная тема', brainstorm: ['Криптовалюта', 'Налоги', 'Искусственный интеллект', 'Астрология', 'Квантовая физика', 'Матрица', 'NFT'] },
  foreignLanguage: { text: 'Иностранный язык', modifiers: ['который хочешь выучить', 'который было бы полезно знать'], brainstorm: ['Французский', 'Немецкий', 'Испанский', 'Итальянский', 'Арабский', 'Китайский', 'Японский', 'Португальский', 'Английский', 'Корейский', 'Хинди', 'Голландский', 'Турецкий', 'Шведский', 'Вьетнамский'] },
  professionalField: { text: 'Профессиональная сфера (напр. медицина, разработка)', brainstorm: ['Медицина', 'Юриспруденция', 'Инженерия', 'Финансы', 'Дизайн', 'Разработка', 'Управление проектами', 'Дата-саенс', 'Маркетинг', 'Бизнес-администрирование', 'HR', 'Экология', 'Графический дизайн', 'ИИ', 'Пиар'] },
  martialArt: { text: 'Боевое искусство', brainstorm: ['Дзюдо', 'Карате', 'Айкидо', 'Кунг-фу', 'Сумо', 'Джиу-джитсу', 'Муай-тай', 'ММА', 'Тхэквондо', 'Крав-мага', 'Капоэйра', 'Джит-кун-до', 'Кендо', 'Хапкидо', 'Вин-чун', 'Сёриндзи-кемпо'] },
  smallTalkTopic: { text: 'Тема для светской беседы', brainstorm: ['Погода', 'Путешествия', 'Хобби', 'Фильмы', 'Музыка', 'Планы на выходные', 'Любимые рестораны', 'Технологические тренды', 'Недавно прочитанное', 'Баланс работы и жизни', 'Отпускные истории', 'Спортивные цели', 'Городские события', 'Кулинарные эксперименты', 'Карьера'] },
  movie: { text: 'Фильм', brainstorm: ['Титаник', 'Звёздные войны', 'Матрица', 'Шрек', 'Гарри Поттер', 'Парк юрского периода', 'Аватар', 'Властелин колец', 'Мстители', 'Человек-паук'] },
  title: { text: 'Известное название книги или фильма', brainstorm: ['Матрица', 'Шрек', 'Титаник', 'Аватар', 'Гамлет', 'Дракула'] },
  movieGenre: { text: 'Жанр кино', brainstorm: ['Хоррор', 'Ромком', 'Фантастика', 'Мюзикл', 'Вестерн', 'Немое кино', 'Тру-крайм', 'Боевик', 'Фэнтези'] },
  musicGenre: { text: 'Музыкальный жанр', brainstorm: ['Хеви-метал', 'Классика', 'K-pop', 'Джаз', 'Кантри', 'Дабстеп', 'Опера', 'Панк-рок', 'Техно'] }
};

export const questionsDatabase = [
  {
    id: 1,
    category: 'survival',
    canTriggerCombo: true,
    text: 'Что ты выберешь:',
    fragments: [
      {
        options: [
          { text: 'застрять', type: 'stranded' },
          { text: 'остаться', type: 'left' }
        ]
      },
      {
        options: [
          { text: 'на необитаемом острове', requires: ['stranded', 'left'], type: 'isolated', scene: 'island' },
          { text: 'одному в лесу', requires: ['stranded', 'left'], type: 'isolated', scene: 'woods' },
          { text: 'в совершенно незнакомом городе', requires: ['left'], type: 'urban', scene: 'city' }
        ]
      },
      {
        options: [
          { text: 'до конца жизни' },
          { text: 'на 5 лет' },
          { text: 'на 10 лет' },
          { text: 'на один день' },
          { text: 'на одну неделю' },
          { text: 'навсегда' }
        ]
      },
      {
        options: [
          { text: 'в компании: «[ ... ]» или «[ ... ]»?' }
        ]
      }
    ],
    hints: [
      PROMPTS.singer,
      PROMPTS.fictionalChar, PROMPTS.politician, PROMPTS.profession,
      PROMPTS.cartoonChar, PROMPTS.mediaPersonality, PROMPTS.actor
    ]
  },
  {
    id: 2,
    category: 'activities',
    text: 'Что ты выберешь:',
    fragments: [
      {
        options: [
          { text: 'провести 1000 часов,', type: 'time' },
          { text: 'участвовать в чемпионате,', type: 'compete' },
          { text: 'посвятить всё своё будущее занятию', type: 'future' },
          { text: 'пожертвовать всем свободным временем ради занятия', type: 'sacrifice' },
          { text: 'проводить все выходные за занятием', type: 'weekends' }
        ]
      },
      {
        options: [
          { text: 'играя в игру', requires: ['time', 'compete', 'sacrifice', 'weekends'], scene: 'playing', hints: [PROMPTS.videoGame, PROMPTS.boardGame, PROMPTS.sport, PROMPTS.mobileGame, PROMPTS.instrument] },
          { text: 'занимаясь делом', requires: ['sacrifice', 'weekends'], scene: 'doing', hints: [PROMPTS.annoyingHabit, PROMPTS.actionChore, PROMPTS.humanActivity, PROMPTS.hobby] },
          { text: 'осваивая навык', scene: 'mastering', requires: ['future', 'sacrifice', 'time', 'weekends'], hints: [PROMPTS.hobby, PROMPTS.instrument, PROMPTS.foreignLanguage] },
          { text: 'просматривая', requires: ['time', 'weekends'], hints: [PROMPTS.tvShow, PROMPTS.sport] },
          { text: 'зацикленно анализируя тему', requires: ['future', 'time'], scene: 'report', hints: [PROMPTS.complicatedTopic, PROMPTS.historical, PROMPTS.country, PROMPTS.mediaPersonality, PROMPTS.personalInterest, PROMPTS.movieGenre, PROMPTS.musicGenre] },
          { text: 'агрессивно обучая людей теме', requires: ['future', 'weekends'], scene: 'report', hints: [PROMPTS.schoolSubject, PROMPTS.complicatedTopic, PROMPTS.historical] }
        ]
      },
      {
        options: [
          { text: '«[ ... ]» или «[ ... ]»?' },
          { text: '«[ ... ]» или «[ ... ]» за миллион долларов?', requires: ['compete'], scene: 'money' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 3,
    category: 'animals',
    canTriggerCombo: true,
    text: 'Что ты выберешь:',
    fragments: [
      {
        options: [
          { text: 'завести питомца', type: 'possession', hints: [PROMPTS.animalFarm, PROMPTS.dogBreed, PROMPTS.chubbyAnimal, PROMPTS.animalFunny] },
          { text: 'чтобы за тобой гналось существо', type: 'threat_run', scene: 'chase', hints: [PROMPTS.fastAnimal, PROMPTS.angryAnimal, PROMPTS.dangerousAnimal, PROMPTS.wildAnimal, PROMPTS.heavyAnimal] },
          { text: 'оказаться взаперти с существом', type: 'threat_close', hints: [PROMPTS.dangerousAnimal, PROMPTS.angryAnimal, PROMPTS.bitingAnimal, PROMPTS.loudAnimal] },
          { text: 'играть с существом', type: 'threat_close', hints: [PROMPTS.insect, PROMPTS.animalFunny, PROMPTS.dogBreed, PROMPTS.nocturnalAnimal, PROMPTS.wildAnimal] }
        ]
      },
      {
        options: [
          { text: '«[ ... ]» или «[ ... ]»', type: 'normal' },
          { text: '— гигантская версия: «[ ... ]» или «[ ... ]»', type: 'giant' },
          { text: '— мини-версия: «[ ... ]» или «[ ... ]»', type: 'tiny' },
          { text: '— невидимая версия: «[ ... ]» или «[ ... ]»', type: 'invisible' }
        ]
      },
      {
        options: [
          { text: 'следующие десять лет?', requires: ['possession'] },
          { text: 'в крошечной студии?', requires: ['possession', 'threat_run', 'threat_close'] },
          { text: 'в тёмном лесу?', requires: ['threat_run', 'threat_close'] },
          { text: 'в пустом торговом центре?', requires: ['threat_run', 'threat_close'] },
          { text: 'в маленьком лифте?', requires: ['threat_close'] },
          { text: '?' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 4,
    category: 'skills',
    text: 'Что ты выберешь:',
    fragments: [
      {
        options: [
          { text: 'мгновенно стать экспертом мирового уровня в области', type: 'positive', hints: [PROMPTS.foreignLanguage, PROMPTS.martialArt, PROMPTS.hobby, PROMPTS.instrument] }
        ]
      },
      {
        options: [
          { text: '«[ ... ]» или «[ ... ]»' }
        ]
      },
      {
        options: [
          { text: '— но только когда ты', type: 'condition' },
          { text: '— но только когда пытаешься впечатлить', type: 'context' }
        ]
      },
      {
        options: [
          { text: 'менеджера по найму?', requires: ['context'] },
          { text: 'своих родителей?', requires: ['context'] },
          { text: 'полусонный?', requires: ['condition'] },
          { text: 'в сауне?', requires: ['condition'] },
          { text: 'с ужасной причёской?', requires: ['condition'] }
        ]
      }
    ],
    hints: []
  },
  {
    id: 5,
    category: 'lifestyle',
    tags: ['lab_scene', 'meme_charlie'],
    text: 'Что ты выберешь:',
    fragments: [
      {
        options: [
          { text: 'чистить зубы субстанцией', type: 'hygiene', hints: [PROMPTS.sauce, PROMPTS.stickyThing, PROMPTS.sweetLiquid, PROMPTS.badSmellingThing] },
          { text: 'стирать одежду жидкостью', type: 'hygiene', hints: [PROMPTS.sauce, PROMPTS.sweetLiquid, PROMPTS.hotDrink, PROMPTS.popularDrink] },
          { text: 'выпивать полный стакан жидкости', type: 'drink', scene: 'drink', hints: [PROMPTS.sauce, PROMPTS.sweetLiquid, PROMPTS.hotDrink] }
        ]
      },
      {
        options: [
          { text: '«[ ... ]» или «[ ... ]»' }
        ]
      },
      {
        options: [
          { text: 'каждое утро до конца жизни?' },
          { text: 'каждый день в течение года?' },
          { text: 'прямо перед сном?' },
          { text: '?' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 6,
    category: 'body',
    text: 'Что ты выберешь:',
    fragments: [
      {
        options: [
          { text: 'потеть лужей, которая', type: 'sweat' },
          { text: 'выдыхать облако, которое', type: 'breath' },
          { text: 'выделять слюну, которая', type: 'saliva' }
        ]
      },
      {
        options: [
          { text: 'пахнет как', requires: ['sweat', 'breath'], hints: [PROMPTS.strongFood, PROMPTS.fastFood, PROMPTS.sweetLiquid, PROMPTS.candyType, PROMPTS.fruit, PROMPTS.badSmellingThing] },
          { text: 'на вкус как', requires: ['sweat', 'saliva'], hints: [PROMPTS.strongFood, PROMPTS.fastFood, PROMPTS.sweetLiquid, PROMPTS.candyType, PROMPTS.fruit, PROMPTS.snack] }
        ]
      },
      {
        options: [
          { text: '«[ ... ]» или «[ ... ]»' }
        ]
      },
      {
        options: [
          { text: '— но только когда ты', type: 'condition' },
          { text: '— каждый раз, когда ты', type: 'action' }
        ]
      },
      {
        options: [
          { text: 'в плохом настроении?', requires: ['condition'] },
          { text: 'в отличном настроении?', requires: ['condition'] },
          { text: 'чувствуешь вину?', requires: ['condition'] },
          { text: 'пытаешься уснуть?', requires: ['condition'] },
          { text: 'сидишь неподвижно?', requires: ['action'] },
          { text: 'начинаешь смеяться?', requires: ['action'] },
          { text: 'нервничаешь?', requires: ['action'] },
          { text: 'начинаешь есть?', requires: ['action'] },
          { text: 'чихаешь?', requires: ['action'] },
          { text: '?' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 7,
    category: 'survival',
    text: 'Что ты выберешь:',
    fragments: [
      {
        options: [
          { text: 'застрять', type: 'stranded' },
          { text: 'остаться', type: 'left' }
        ]
      },
      {
        options: [
          { text: 'на необитаемом острове', requires: ['stranded', 'left'], type: 'island' },
          { text: 'одному в лесу', requires: ['stranded', 'left'], type: 'isolated', scene: 'woods' },
          { text: 'в совершенно незнакомом городе', requires: ['left'], type: 'urban', scene: 'city' }
        ]
      },
      {
        options: [
          { text: 'до конца жизни' },
          { text: 'на 5 лет' },
          { text: 'на 10 лет' },
          { text: 'на один день' },
          { text: 'на одну неделю' }
        ]
      },
      {
        options: [
          { text: '— и взять с собой только предмет «[ ... ]» или «[ ... ]»?' },
          { text: '— где твой единственный стартовый предмет — «[ ... ]» или «[ ... ]»?' },
          { text: '— и в карманах только «[ ... ]» или «[ ... ]»?' }
        ]
      }
    ],
    hints: [
      PROMPTS.clothingItem,
      PROMPTS.survivalTool,
      PROMPTS.hygieneProduct,
      PROMPTS.everyday,
      PROMPTS.expensive,
      PROMPTS.badSmellingThing
    ]
  },
  {
    id: 8,
    category: 'lifestyle',
    canTriggerCombo: true,
    text: 'Что ты выберешь:',
    fragments: [
      {
        options: [
          { text: 'получать бесконечный запас субстанции', type: 'recurring', hints: [PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.expensive, PROMPTS.candyType] },
          { text: 'получать ежедневную посылку, содержащую', type: 'recurring', hints: [PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.expensive, PROMPTS.candyType, PROMPTS.personalLike, PROMPTS.letterM] },
          { text: 'просыпаться каждое утро рядом с кучей вещей под названием', type: 'recurring', hints: [PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.strongFood] }
        ]
      },
      {
        options: [
          { text: '«[ ... ]» или «[ ... ]»' }
        ]
      },
      {
        options: [
          { text: '— но оно исчезает по выходным?', requires: ['recurring'] },
          { text: '— но оно всегда ужасно пахнет?', requires: ['recurring'] },
          { text: '— но придётся делиться с незнакомцем?' },
          { text: '?' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 9,
    category: 'social',
    canTriggerCombo: true,
    text: 'Что ты выберешь:',
    fragments: [
      {
        options: [
          { text: 'быть усыновлённым семьёй', type: 'adopted', hints: [PROMPTS.wildAnimal, PROMPTS.animalFunny] },
          { text: 'создать культ вокруг темы', type: 'cult', scene: 'spiritual', hints: [PROMPTS.actionChore, PROMPTS.personalLike] },
          { text: 'быть воспитанным стаей', type: 'raised', hints: [PROMPTS.wildAnimal, PROMPTS.angryAnimal, PROMPTS.animalFunny] },
          { text: 'поступить в магическую школу, где можно призывать только', type: 'society', hints: [PROMPTS.fastFood, PROMPTS.candyType, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.householdItem] },
          { text: 'иметь силу превращать золото в субстанцию', type: 'society', hints: [PROMPTS.fastFood, PROMPTS.candyType, PROMPTS.snack, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.householdItem] },
          { text: 'иметь силу превращать воду в субстанцию', type: 'society', hints: [PROMPTS.sweetLiquid, PROMPTS.sauce, PROMPTS.hotDrink, PROMPTS.abstractMood] },
          { text: 'иметь силу превращать грязь в субстанцию', type: 'society', hints: [PROMPTS.expensive, PROMPTS.fastFood, PROMPTS.candyType, PROMPTS.abstractMood] }
        ]
      },
      {
        options: [
          { text: '«[ ... ]» или «[ ... ]»?' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 10,
    category: 'career',
    canTriggerCombo: true,
    text: 'Что ты выберешь:',
    fragments: [
      {
        options: [
          { text: 'открыть бизнес, который продаёт только', type: 'business', hints: [PROMPTS.cheapItem, PROMPTS.expensive, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.householdItem] },
          { text: 'создать культ вокруг темы', type: 'cult', hints: [PROMPTS.everyday, PROMPTS.annoyingHabit, PROMPTS.roomItem] },
          { text: 'начать протестное движение против', type: 'movement', hints: [PROMPTS.minorInconvenience, PROMPTS.annoyingHabit, PROMPTS.roomItem, PROMPTS.vegetable] },
          { text: 'открыть ресторан, где всё на вкус как', type: 'restaurant', hints: [PROMPTS.strongFood, PROMPTS.abstractMood] },
          { text: 'вести подкаст на тему', type: 'podcast', scene: 'report', hints: [PROMPTS.humanActivity, PROMPTS.minorInconvenience, PROMPTS.personalInterest, PROMPTS.movieGenre, PROMPTS.musicGenre] },
          { text: 'вести ютуб-канал на тему', type: 'podcast', scene: 'report', hints: [PROMPTS.humanActivity, PROMPTS.annoyingHabit, PROMPTS.tvShow, PROMPTS.personalInterest] },
          { text: 'стать СЕО компании, производящей', type: 'business', hints: [PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.expensive] },
          { text: 'собрать уличную банду, которая крадёт только', type: 'gang', hints: [PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.gadget] }
        ]
      },
      {
        options: [
          { text: '«[ ... ]» или «[ ... ]»' }
        ]
      },
      {
        options: [
          { text: 'и попытаться уговорить друзей присоединиться?' },
          { text: 'и поднимать эту тему в каждом разговоре?' },
          { text: '?' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 11,
    category: 'social',
    text: 'Выбери: игрок [PICKER]',
    fragments: [
      {
        options: [
          { text: 'сделает маленькую татуировку', type: 'tattoo', scene: 'tattoo', hints: [PROMPTS.fastFood, PROMPTS.animalFunny, PROMPTS.politician, PROMPTS.actor] },
          { text: 'даст часовую презентацию «Я и', type: 'presentation', scene: 'report', hints: [PROMPTS.actionChore, PROMPTS.everyday, PROMPTS.animalFunny, PROMPTS.snack] },
          { text: 'напишет душевную песню на тему', type: 'song', scene: 'song', hints: [PROMPTS.actionChore, PROMPTS.annoyingHabit, PROMPTS.everyday, PROMPTS.candyType] },
          { text: 'сыграет в низкобюджетном мюзикле под названием', type: 'musical', scene: 'song', hints: [PROMPTS.cartoonChar, PROMPTS.movie, PROMPTS.videoGame] }
        ]
      },
      {
        options: [
          { text: '«[ ... ]» или «[ ... ]»' }
        ]
      },
      {
        options: [
          { text: 'на спине?', requires: ['tattoo'] },
          { text: '»?', requires: ['presentation'] },
          { text: 'и исполнит это на твоём дне рождения?', requires: ['song', 'musical'] }
        ]
      }
    ],
    hints: []
  },
  {
    id: 12,
    category: 'superpowers',
    text: 'Что ты выберешь:',
    fragments: [
      {
        options: [
          { text: 'уметь превращать любой предмет в объект', type: 'clean_power', hints: [PROMPTS.foodItem, PROMPTS.animalFunny, PROMPTS.fragileObject] },
          { text: 'уметь превращать себя в существо', type: 'clean_power_self', hints: [PROMPTS.animalFunny, PROMPTS.exoticAnimal, PROMPTS.inanimateObject] },
          { text: 'уметь телепортироваться, но всегда прибывать покрытым веществом', type: 'has_condition', hints: [PROMPTS.stickySubstance, PROMPTS.sauce, PROMPTS.strongFood] },
          { text: 'становиться невидимым, но только держа предмет', type: 'has_condition', hints: [PROMPTS.everyday, PROMPTS.fragileObject, PROMPTS.foodItem] },
          { text: 'иметь суперсилу, но только когда поёшь на тему', type: 'has_condition', scene: 'songResponder', hints: [PROMPTS.schoolSubject, PROMPTS.vegetable, PROMPTS.abstractMood, PROMPTS.actionChore, PROMPTS.personalLike] },
          { text: 'иметь суперсилу, но только когда поёшь песни исполнителя', type: 'has_condition', scene: 'songResponder', hints: [PROMPTS.singer, PROMPTS.band] },
          { text: 'уметь читать мысли, но слышать только мысли на тему', type: 'has_condition', hints: [PROMPTS.fastFood, PROMPTS.vegetable, PROMPTS.schoolSubject, PROMPTS.abstractMood, PROMPTS.actionChore] }
        ]
      },
      {
        options: [
          { text: '«[ ... ]» или «[ ... ]»' }
        ]
      },
      {
        options: [
          { text: 'каждый раз, когда чихаешь?', requires: ['clean_power_self'] },
          { text: 'всего 60 секунд в день?', requires: ['clean_power', 'clean_power_self'] },
          { text: '?', requires: ['has_condition', 'clean_power', 'clean_power_self'] }
        ]
      }
    ],
    hints: []
  },
  {
    id: 13,
    category: 'lifestyle',
    canTriggerCombo: true,
    text: 'Что ты выберешь:',
    fragments: [
      {
        options: [
          { text: 'носить полный костюм персонажа', type: 'costume_full', hints: [PROMPTS.animalFunny, PROMPTS.foodItem, PROMPTS.profession, PROMPTS.fictionalChar, PROMPTS.cartoonChar] },
          { text: 'таскать с собой статую в натуральную величину:', type: 'carry_statue', hints: [PROMPTS.politician, PROMPTS.historical, PROMPTS.actor, PROMPTS.mediaPersonality] },
          { text: 'одеваться в точности как персонаж', type: 'dress_like', hints: [PROMPTS.villain, PROMPTS.profession, PROMPTS.cartoonChar] }
        ]
      },
      {
        options: [
          { text: '«[ ... ]» или «[ ... ]»' }
        ]
      },
      {
        options: [
          { text: 'на каждое собеседование?', requires: ['costume_full', 'dress_like'] },
          { text: 'в общественном транспорте?', requires: ['costume_full', 'carry_statue'] },
          { text: 'в продуктовом магазине?', requires: ['carry_statue'] },
          { text: 'при встрече с семьёй?', requires: ['costume_full', 'dress_like', 'carry_statue'] }
        ]
      }
    ],
    hints: []
  },
  {
    id: 14,
    category: 'superpowers',
    text: 'Выбери магическую способность:',
    fragments: [
      {
        options: [
          { text: 'заставлять всех в комнате внезапно начать заниматься делом', type: 'start', hints: [PROMPTS.actionChore, PROMPTS.annoyingHabit, PROMPTS.humanActivity, PROMPTS.hobby] },
          { text: 'мгновенно останавливать любого от занятия', type: 'stop', hints: [PROMPTS.actionChore, PROMPTS.annoyingHabit, PROMPTS.humanActivity] },
          { text: 'зарабатывать $10 каждый раз, когда заканчиваешь дело', type: 'earn', scene: 'money', hints: [PROMPTS.actionChore, PROMPTS.humanActivity] }
        ]
      },
      {
        options: [
          { text: '«[ ... ]» или «[ ... ]»' }
        ]
      },
      {
        options: [
          { text: '?' },
          { text: '— но можно использовать раз в день?' },
          { text: '— но работает только на друзьях?', requires: ['start', 'stop'] },
          { text: '— но работает только на людях старше 30?', requires: ['start', 'stop'] }
        ]
      }
    ],
    hints: []
  },
  {
    id: 15,
    category: 'mind',
    canTriggerCombo: true,
    text: 'Что ты выберешь:',
    fragments: [
      {
        options: [
          { text: 'мгновенно получить весь жизненный опыт персоны', type: 'exp' },
          { text: 'мгновенно впитать все воспоминания и навыки персоны', type: 'skills' }
        ]
      },
      {
        options: [
          { text: '«[ ... ]» или «[ ... ]»' }
        ]
      },
      {
        options: [
          { text: '— но навсегда заговорить их точным голосом?' },
          { text: '— но при гневе выглядеть в точности как они?' },
          { text: '?' }
        ]
      }
    ],
    hints: [PROMPTS.historical, PROMPTS.singer, PROMPTS.actor, PROMPTS.politician, PROMPTS.mediaPersonality]
  },
  {
    id: 16,
    category: 'identity',
    canTriggerCombo: true,
    text: 'Что ты выберешь:',
    fragments: [
      {
        options: [
          { text: 'поменяться телами с персоной', type: 'switch', hints: [PROMPTS.profession, PROMPTS.mediaPersonality] }
        ]
      },
      {
        options: [
          { text: '«[ ... ]» или «[ ... ]»' }
        ]
      },
      {
        options: [
          { text: 'до конца жизни?' },
          { text: 'каждый понедельник до конца жизни?' },
          { text: 'каждые выходные следующие 10 лет?' },
          { text: 'на один случайный день в месяц?' },
          { text: 'ровно на год, а потом всё вернётся?' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 17,
    category: 'entertainment',
    text: 'Что ты выберешь:',
    fragments: [
      {
        options: [
          { text: 'устроить 12-часовой марафон просмотра по теме', type: 'watch', hints: [PROMPTS.movie, PROMPTS.tvShow, PROMPTS.sport, PROMPTS.actionEmbarrassing] },
          { text: 'сыграть в низкобюджетном мюзикле на тему', type: 'musical', hints: [PROMPTS.cartoonChar, PROMPTS.movie, PROMPTS.videoGame, PROMPTS.actionChore, PROMPTS.personalInterest] },
          { text: 'написать 100-страничный фанфик на тему', type: 'fanfic', hints: [PROMPTS.movie, PROMPTS.tvShow, PROMPTS.videoGame, PROMPTS.politician, PROMPTS.abstractMood] },
          { text: 'записать 3-часовую тираду на тему', type: 'rant', scene: 'report', hints: [PROMPTS.movie, PROMPTS.videoGame, PROMPTS.tvShow, PROMPTS.annoyingHabit] }
        ]
      },
      {
        options: [
          { text: '«[ ... ]» или «[ ... ]»' }
        ]
      },
      {
        options: [
          { text: 'и останавливаться каждые 5 минут, чтобы объяснять сюжет?', requires: ['watch'] },
          { text: 'и выложить это в сеть?', requires: ['musical', 'fanfic', 'rant'] },
          { text: 'и отправить всем контактам в телефоне?', requires: ['musical', 'fanfic', 'rant'] },
          { text: '?' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 18,
    category: 'adventure',
    text: 'Что ты выберешь:',
    fragments: [
      {
        options: [
          { text: 'быть случайно телепортированным в локацию', type: 'location', scene: 'welcomeTo', hints: [PROMPTS.country, PROMPTS.famousCity] },
          { text: 'мгновенно телепортироваться в дом персоны', scene: 'welcomeTo', type: 'person', hints: [PROMPTS.actor, PROMPTS.singer, PROMPTS.politician, PROMPTS.historical] },
          { text: 'быть магически телепортированным в место', type: 'place', scene: 'welcomeTo', hints: [PROMPTS.specificLocation, PROMPTS.publicPlace] }
        ]
      },
      {
        options: [
          { text: '«[ ... ]» или «[ ... ]»' }
        ]
      },
      {
        options: [
          { text: 'ровно на 24 часа?' },
          { text: 'до конца жизни?', requires: ['location', 'place'] },
          { text: 'без обратного пути?' },
          { text: 'но прибываешь в костюме клоуна?' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 19,
    category: 'identity',
    canTriggerCombo: true,
    text: 'Что ты выберешь:',
    fragments: [
      {
        options: [
          { text: 'чтобы все настаивали, что ты выглядишь как', type: 'look', hints: [PROMPTS.actor, PROMPTS.villain, PROMPTS.animalFunny, PROMPTS.cartoonChar] },
          { text: 'чтобы общество относилось к тебе как к персоне', type: 'status', hints: [PROMPTS.villain, PROMPTS.politician, PROMPTS.profession, PROMPTS.fictionalChar] },
          { text: 'навсегда превратиться в существо', type: 'morph', hints: [PROMPTS.fictionalChar, PROMPTS.chubbyAnimal, PROMPTS.historical] }
        ]
      },
      {
        options: [
          { text: '«[ ... ]» или «[ ... ]»' }
        ]
      },
      {
        options: [
          { text: 'когда пытаешься быть серьёзным?', requires: ['look', 'status'] },
          { text: '?' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 20,
    category: 'social',
    canTriggerCombo: true,
    text: 'Что ты выберешь: у тебя будет',
    fragments: [
      {
        options: [
          { text: '«[ ... ]» или «[ ... ]»' }
        ]
      },
      {
        options: [
          { text: 'в роли босса?', scene: 'boss', hints: [PROMPTS.villain, PROMPTS.politician, PROMPTS.actor] },
          { text: 'в роли лучшего друга?', scene: 'bestFriend', hints: [PROMPTS.cartoonChar, PROMPTS.chubbyAnimal, PROMPTS.dogBreed, PROMPTS.fictionalChar] },
          { text: 'в роли заклятого врага?', scene: 'enemy', hints: [PROMPTS.villain, PROMPTS.historical, PROMPTS.mediaPersonality] },
          { text: 'в роли психотерапевта?', scene: 'psychotherapist', type: 'therapist', hints: [PROMPTS.historical, PROMPTS.actor, PROMPTS.singer, PROMPTS.mediaPersonality] },
          { text: 'в роли спарринг-партнёра?', scene: 'sparringPartner', hints: [PROMPTS.actor, PROMPTS.villain, PROMPTS.historical] },
          { text: 'в роли фитнес-тренера?', scene: 'danceFitness', hints: [PROMPTS.actor, PROMPTS.fastAnimal, PROMPTS.villain, PROMPTS.singer] },
          { text: 'в роли послушного подчинённого?', scene: 'subordinate', hints: [PROMPTS.politician, PROMPTS.villain, PROMPTS.historical, PROMPTS.actor] },
          { text: 'в роли дворецкого?', hints: [PROMPTS.actor, PROMPTS.historical, PROMPTS.villain, PROMPTS.fictionalChar] },
          { text: 'в роли няни?', hints: [PROMPTS.villain, PROMPTS.politician, PROMPTS.actor, PROMPTS.cartoonChar] },
          { text: 'в роли учителя математики?', scene: 'mathTeacher', hints: [PROMPTS.historical, PROMPTS.villain, PROMPTS.singer] },
          { text: 'в роли учителя рисования?', scene: 'artTeacher', hints: [PROMPTS.actor, PROMPTS.historical, PROMPTS.villain, PROMPTS.heavyAnimal] },
          { text: 'в роли учителя танцев?', scene: 'danceFitness', hints: [PROMPTS.politician, PROMPTS.heavyAnimal, PROMPTS.villain, PROMPTS.cartoonChar] },
          { text: 'в роли учителя йоги?', scene: 'yogaTeacher', hints: [PROMPTS.villain, PROMPTS.dangerousAnimal, PROMPTS.politician, PROMPTS.actor] },
          { text: 'в роли водителя убера?', scene: 'uberDriver', hints: [PROMPTS.historical, PROMPTS.villain, PROMPTS.chubbyAnimal, PROMPTS.singer] }
        ]
      }
    ],
    hints: []
  },
  {
    id: 21,
    category: 'naming_realm',
    canTriggerCombo: true,
    text: 'Что ты выберешь:',
    fragments: [
      {
        options: [
          { text: 'переименовать свою страну в', type: 'renameCountry', scene: 'welcomeTo', hints: [PROMPTS.company, PROMPTS.chubbyAnimal, PROMPTS.everyday, PROMPTS.abstractMood, PROMPTS.personalLike, PROMPTS.personalInterest, PROMPTS.movieGenre, PROMPTS.musicGenre] },
          { text: 'переименовать свой город в', type: 'renameCity', scene: 'welcomeTo', hints: [PROMPTS.snack, PROMPTS.everyday, PROMPTS.company, PROMPTS.abstractMood, PROMPTS.personalLike, PROMPTS.personalInterest, PROMPTS.movieGenre, PROMPTS.musicGenre] }
        ]
      },
      {
        options: [
          { text: '[ ... ]ляндия или [ ... ]ляндия?', requires: ['renameCountry', 'renameCity'] },
          { text: '[ ... ]град или [ ... ]град?', requires: ['renameCity'] },
          { text: '[ ... ]сити или [ ... ]сити?', requires: ['renameCity'] },
          { text: 'Республика «[ ... ]» или Республика «[ ... ]»?', requires: ['renameCountry'] }
        ]
      }
    ],
    hints: []
  },
  {
    id: 22,
    category: 'social',
    canTriggerCombo: true,
    text: 'Что ты выберешь:',
    fragments: [
      {
        options: [
          { text: 'чтобы твоей коронной фразой была фраза', type: 'catchphrase' },
          { text: 'чтобы приходилось громко орать фразу', type: 'yell' }
        ]
      },
      {
        options: [
          { text: '«Святая мать [ ... ]!» или «Святая мать [ ... ]!»' },
          { text: '«Во имя силы [ ... ]!» или «Во имя силы [ ... ]!»' },
          { text: '«Ей-богу, [ ... ]!» или «Ей-богу, [ ... ]!»' },
          { text: '«Что за [ ... ]?» или «Что за [ ... ]?»' }
        ]
      },
      {
        options: [
          { text: 'каждый раз, когда заходишь в комнату?' },
          { text: 'каждый раз, когда садишься?' },
          { text: 'каждый раз, когда отвечаешь на звонок?' },
          { text: 'каждый раз, когда удивляешься?' },
          { text: 'каждый раз, когда чихаешь?' },
          { text: 'каждый раз, когда попадаешь в неловкую ситуацию?' }
        ]
      }
    ],
    hints: [
      PROMPTS.madeUpCompound,
      PROMPTS.madeUpHyphenated,
      PROMPTS.animalFunny,
      PROMPTS.everyday,
      PROMPTS.kitchenItem,
      PROMPTS.snack
    ]
  },
  {
    id: 23,
    category: 'naming',
    text: 'Что ты выберешь:',
    fragments: [
      {
        options: [
          { text: 'стать духовным лидером направления', scene: 'spiritual' },
          { text: 'написать 1000-страничный манифест о направлении', type: 'manifesto', scene: 'fanfic' },
          { text: 'строго жить по направлению', scene: 'report' },
          { text: 'чтобы твоё правительство приняло направление', scene: 'ideology' },
          { text: 'уговорить родителей следовать направлению', scene: 'report' },
          { text: 'уговорить друзей следовать направлению', scene: 'report' },
          { text: 'навсегда запретить направление', scene: 'ban' },
          { text: 'изучать историю направления', type: 'explain', scene: 'fanfic' }
        ]
      },
      {
        options: [
          { text: '[ ... ]изм или [ ... ]изм?' }
        ]
      }
    ],
    hints: [
      PROMPTS.fastFood,
      PROMPTS.everyday,
      PROMPTS.actionChore,
      PROMPTS.annoyingHabit,
      PROMPTS.abstractMood,
      PROMPTS.personalInterest,
      PROMPTS.personalLike
    ]
  },
  {
    id: 24,
    category: 'naming',
    canTriggerCombo: false,
    text: 'Что ты выберешь:',
    fragments: [
      {
        options: [
          { text: 'сменить фамилию на фамилию', type: 'own_name', hints: [PROMPTS.title, PROMPTS.app, PROMPTS.animalFunny, PROMPTS.everyday, PROMPTS.letterM] },
          { text: 'учредить национальный праздник День', type: 'holiday', hints: [PROMPTS.actionChore, PROMPTS.annoyingHabit, PROMPTS.fastFood, PROMPTS.humanActivity, PROMPTS.everyday, PROMPTS.personalInterest, PROMPTS.personalLike] },
          { text: 'завести собаку и дать ей кличку', type: 'dog', scene: 'dog', hints: [PROMPTS.title, PROMPTS.politician, PROMPTS.company, PROMPTS.app, PROMPTS.personalLike, PROMPTS.letterM] },
          { text: 'завести кота и дать ему кличку', type: 'cat', scene: 'cat', hints: [PROMPTS.villain, PROMPTS.company, PROMPTS.app, PROMPTS.personalLike, PROMPTS.letterM] }
        ]
      },
      {
        options: [
          { text: '[ ... ] или [ ... ]?' }
        ]
      }
    ],
    hints: []
  },
  {
    id: 101,
    isCombo: true,
    triggerCategory: ['animals', 'survival', 'social', 'mind', 'identity'],
    category: 'combo',
    text: 'Когда за тобой гонится разъярённое существо «[PREV_CHOICE]», кто будет твоим защитником:',
    fragments: [
      {
        options: [
          { text: '«[ ... ]» или «[ ... ]»?', scene: 'protector' }
        ]
      }
    ],
    hints: [PROMPTS.actor, PROMPTS.villain, PROMPTS.historical, PROMPTS.cartoonChar, PROMPTS.fictionalChar]
  },
  {
    id: 102,
    isCombo: true,
    triggerCategory: ['animals', 'survival', 'lifestyle', 'social', 'mind', 'identity'],
    category: 'combo',
    text: 'Если ты заперт в комнате с разъярённым существом «[PREV_CHOICE]», кто будет рядом с тобой:',
    fragments: [
      {
        options: [
          { text: '«[ ... ]» или «[ ... ]»?', scene: 'protector' }
        ]
      }
    ],
    hints: [PROMPTS.kitchenItem, PROMPTS.everyday, PROMPTS.smallObj, PROMPTS.actor, PROMPTS.profession]
  },
  {
    id: 103,
    isCombo: true,
    triggerCategory: ['career', 'superpowers'],
    category: 'combo',
    text: 'Чтобы убедить босса, что «[PREV_CHOICE]» критически важна для компании, какой доклад представишь:',
    fragments: [
      {
        options: [
          { text: 'доклад на тему «[ ... ]» или «[ ... ]»?', scene: 'report' }
        ]
      }
    ],
    hints: [PROMPTS.complicatedTopic, PROMPTS.annoyingHabit, PROMPTS.humanActivity, PROMPTS.actionIllegal, PROMPTS.schoolSubject, PROMPTS.actionEmbarrassing]
  },
  {
    id: 104,
    isCombo: true,
    triggerCategory: ['naming_realm'],
    category: 'combo',
    text: 'Как верховный лидер государства «[PREV_CHOICE]», какое направление сделаешь госидеологией:',
    fragments: [
      {
        options: [
          { text: '[ ... ]изм или [ ... ]изм?', scene: 'ideology' }
        ]
      }
    ],
    hints: [PROMPTS.fastFood, PROMPTS.animalFunny, PROMPTS.everyday, PROMPTS.actionChore, PROMPTS.annoyingHabit, PROMPTS.company, PROMPTS.abstractMood]
  },
  {
    id: 105,
    isCombo: true,
    triggerCategory: ['naming_realm'],
    category: 'combo',
    text: 'Как верховный лидер государства «[PREV_CHOICE]», установил бы национальный праздник:',
    fragments: [
      {
        options: [
          { text: 'День [ ... ] или День [ ... ]?' }
        ]
      }
    ],
    hints: [PROMPTS.actionChore, PROMPTS.annoyingHabit, PROMPTS.fastFood, PROMPTS.humanActivity, PROMPTS.everyday, PROMPTS.personalInterest, PROMPTS.app]
  },
  {
    id: 106,
    isCombo: true,
    triggerCategory: ['naming_realm'],
    category: 'combo',
    text: 'Как лидер государства «[PREV_CHOICE]», что поместишь',
    fragments: [
      {
        options: [
          { text: 'гигантское изображение «[ ... ]» или «[ ... ]» на государственный флаг?' },
          { text: 'изображение «[ ... ]» или «[ ... ]» на национальную валюту?', scene: 'money' }
        ]
      }
    ],
    hints: [PROMPTS.animalFunny, PROMPTS.angryAnimal, PROMPTS.fastFood, PROMPTS.everyday, PROMPTS.survivalTool, PROMPTS.kitchenItem]
  },
  {
    id: 107,
    isCombo: true,
    triggerCategory: ['social', 'identity', 'animals'],
    category: 'combo',
    text: 'Какое самое вероятное взаимодействие между игроком [PICKER] и существом «[PREV_CHOICE]»:',
    fragments: [
      {
        options: [
          { text: '«[ ... ]» или «[ ... ]»?' }
        ]
      }
    ],
    hints: [PROMPTS.actionParty, PROMPTS.actionExtreme, PROMPTS.actionChore, PROMPTS.actionEmbarrassing, PROMPTS.actionWork]
  }
];
