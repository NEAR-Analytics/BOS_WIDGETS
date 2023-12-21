let knowledge = [
  {
    darija: "baba",
    spanish: "papa",
    emoji: "👨🏽",
  },
  {
    darija: "mama",
    spanish: "mama",
    emoji: "👩🏽",
  },
  {
    darija: "ukht",
    spanish: "hermana",
    emoji: "👭🏽",
  },
  {
    darija: "khu",
    spanish: "hermano",
    emoji: "👬🏽",
  },
  {
    darija: "bnt",
    spanish: "hija",
    emoji: "👧🏽",
  },
  {
    darija: "wld",
    spanish: "hijo",
    emoji: "👦🏽",
  },
  {
    darija: "mra",
    spanish: "esposa",
    emoji: "👰🏽",
  },
  {
    darija: "rajl",
    spanish: "esposo",
    emoji: "🤵🏽",
  },
  {
    darija: "nsib",
    spanish: "cuñado",
    emoji: "👨🏽",
  },
  {
    darija: "nsiba",
    spanish: "cuñada",
    emoji: "👩🏽",
  },
  {
    darija: "shix",
    spanish: "suegro",
    emoji: "👴🏼",
  },
  {
    darija: "3guza",
    spanish: "suegra",
    emoji: "👵🏽",
  },
  {
    darija: "3rusa",
    spanish: "nuera",
    emoji: "👩🏽",
  },
  {
    darija: "jdd",
    spanish: "abuelo",
    emoji: "👴🏼",
  },
  {
    darija: "jdda",
    spanish: "abuela",
    emoji: "👵🏽",
  },
  {
    darija: "hafid",
    spanish: "nieto",
    emoji: "👶🏽",
  },
  {
    darija: "hafidt",
    spanish: "nieta",
    emoji: "👶🏽",
  },
  {
    darija: "3mm",
    spanish: "tio (paterno)",
    emoji: "👨🏽",
  },
  {
    darija: "3mma",
    spanish: "tia (paterna)",
    emoji: "👩🏽",
  },
  {
    darija: "khal",
    spanish: "tio (materno)",
    emoji: "👨🏽",
  },
  {
    darija: "khala",
    spanish: "tia (materna)",
    emoji: "👩🏽",
  },
  {
    darija: "bnt ukht",
    spanish: "sobrina (hermana)",
    emoji: "👧🏽",
  },
  {
    darija: "wld ukht",
    spanish: "sobrino (hermana)",
    emoji: "👦🏽",
  },
  {
    darija: "bnt khu",
    spanish: "sobrina (hermano)",
    emoji: "👧🏽",
  },
  {
    darija: "wld khu",
    spanish: "sobrino (hermano)",
    emoji: "👦🏽",
  },
  {
    darija: "bnt 3mmi",
    spanish: "prima (tio paterno)",
    emoji: "👧🏽",
  },
  {
    darija: "bnt 3mmi",
    spanish: "prima (tio paterno)",
    emoji: "👧🏽",
  },
  {
    darija: "bnt 3mmi",
    spanish: "prima (tio paterno)",
    emoji: "👧🏽",
  },
  {
    darija: "bnt 3mmi",
    spanish: "prima (tio paterno)",
    emoji: "👧🏽",
  },
  {
    darija: "wld 3mmi",
    spanish: "primo (tio paterno)",
    emoji: "👦🏽",
  },
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array;
}

return <Widget src="gagdiez.near/widget/Darija.Lessons.Select" props={{knowledge: shuffle(knowledge)}} />