let knowledge = [
  {
    darija: "Nsib",
    spanish: "Cuñado",
    emoji: "👨🏽",
  },
  {
    darija: "Nsiba",
    spanish: "Cuñada",
    emoji: "👩🏽",
  },
  {
    darija: "Shix",
    spanish: "Suegro",
    emoji: "👴🏼",
  },
  {
    darija: "3guza",
    spanish: "Suegra",
    emoji: "👵🏽",
  },
  {
    darija: "3rusa",
    spanish: "Nuera",
    emoji: "👩🏽",
  },
  {
    darija: "Jdd",
    spanish: "Abuelo",
    emoji: "👴🏼",
  },
  {
    darija: "Jdda",
    spanish: "Abuela",
    emoji: "👵🏽",
  },
  {
    darija: "Hafid",
    spanish: "Nieto",
    emoji: "👶🏽",
  },
  {
    darija: "Hafidt",
    spanish: "Nieta",
    emoji: "👶🏽",
  },
  {
    darija: "3mm",
    spanish: "Tio (P)",
    emoji: "👨🏽",
  },
  {
    darija: "3mma",
    spanish: "Tia (P)",
    emoji: "👩🏽",
  },
  {
    darija: "Khal",
    spanish: "Tio (M)",
    emoji: "👨🏽",
  },
  {
    darija: "Khala",
    spanish: "Tia (M)",
    emoji: "👩🏽",
  },
  {
    darija: "Bnt ukht",
    spanish: "Sobrina (hermana)",
    emoji: "👧🏽",
  },
  {
    darija: "Wld ukht",
    spanish: "Sobrino (hermana)",
    emoji: "👦🏽",
  },
  {
    darija: "Bnt khu",
    spanish: "Sobrina (hermano)",
    emoji: "👧🏽",
  },
  {
    darija: "Wld khu",
    spanish: "Sobrino (hermano)",
    emoji: "👦🏽",
  },
  {
    darija: "Bnt 3mmi",
    spanish: "Prima (tio paterno)",
    emoji: "👧🏽",
  },
  {
    darija: "Bnt 3mmi",
    spanish: "Prima (tio paterno)",
    emoji: "👧🏽",
  },
  {
    darija: "Bnt 3mmi",
    spanish: "Prima (tio paterno)",
    emoji: "👧🏽",
  },
  {
    darija: "Bnt 3mmi",
    spanish: "Prima (tio paterno)",
    emoji: "👧🏽",
  },
  {
    darija: "Wld 3mmi",
    spanish: "Primo (tio paterno)",
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