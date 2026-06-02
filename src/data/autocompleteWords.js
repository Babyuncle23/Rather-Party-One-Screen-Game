// Adjectives and descriptive words for "Would You Rather" prompts
const ADJECTIVES_AND_DESCRIPTORS = [
  "best", "worst", "most", "least", "favorite", "favourite", "annoying", "annoyed",
  "weird", "weirdest", "gross", "delicious", "embarrassing", "romantic", "scary", "spooky",
  "expensive", "cheap", "famous", "popular", "rare", "boring", "exciting", "fun", "dangerous",
  "silly", "loud", "quiet", "talented", "clumsy", "smart", "lazy", "generous", "rude", "awkward",
  "guilty", "secret", "creepy", "stylish", "fashionable", "athletic", "artistic", "adventurous",
  "honest", "dishonest", "married", "single", "your", "you", "dislike", "like", "love", "two"
];

// Nouns with both singular and plural forms
const NOUNS_WITH_PLURALS = [
  { singular: "name", plural: "names" },
  { singular: "pet", plural: "pets" },
  { singular: "food", plural: "foods" },
  { singular: "drink", plural: "drinks" },
  { singular: "celebrity", plural: "celebrities" },
  { singular: "movie", plural: "movies" },
  { singular: "song", plural: "songs" },
  { singular: "career", plural: "careers" },
  { singular: "hobby", plural: "hobbies" },
  { singular: "skill", plural: "skills" },
  { singular: "superpower", plural: "superpowers" },
  { singular: "age", plural: "ages" },
  { singular: "job", plural: "jobs" },
  { singular: "emoji", plural: "emojis" },
  { singular: "holiday", plural: "holidays" },
  { singular: "rapper", plural: "rappers" },
  { singular: "snack", plural: "snacks" }
];

// Flattened autocomplete word list combining both lists
const AUTOCOMPLETE_WORDS = [
  ...ADJECTIVES_AND_DESCRIPTORS,
  ...NOUNS_WITH_PLURALS.flatMap(n => [n.singular, n.plural])
];

export { AUTOCOMPLETE_WORDS, ADJECTIVES_AND_DESCRIPTORS, NOUNS_WITH_PLURALS };
