let knowledge = [
  {
    darija: "Baba",
    spanish: "Papa",
    emoji: "👨🏽",
  },
  {
    darija: "Mama",
    spanish: "Mama",
    emoji: "👩🏽",
  },
  {
    darija: "Ukht",
    spanish: "Hermana",
    emoji: "👭🏽",
  },
  {
    darija: "Khu",
    spanish: "Hermano",
    emoji: "👬🏽",
  },
  {
    darija: "Bnt",
    spanish: "Hija",
    emoji: "👧🏽",
  },
  {
    darija: "Wld",
    spanish: "Hijo",
    emoji: "👦🏽",
  },
  {
    darija: "Mra",
    spanish: "Esposa",
    emoji: "👰🏽",
  },
  {
    darija: "Rajl",
    spanish: "Esposo",
    emoji: "🤵🏽",
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