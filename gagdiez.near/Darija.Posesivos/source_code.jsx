if (context.loading) {
  return <div>Loading...</div>;
}

const input = [
  {
    darija: "smiya",
    spanish: "nombre",
    emoji: "💬",
  },
  {
    darija: "ktab",
    spanish: "libro",
    emoji: "📖",
  },
  {
    darija: "medina",
    spanish: "ciudad",
    emoji: "🏙️",
  },
  {
    darija: "tilifun",
    spanish: "telefono",
    emoji: "📞"
  },
  {
    darija: "msha",
    spanish: "gata",
    emoji: "🐱",
  },
];

if (input.length < 4) return "Add more than 4 options";

function ownership(object){
  // takes the object and returns an array that denotes all ownerships and translations

  let { darija, spanish, emoji } = object;

  // if the object ends in `ya` it removes it
  if (darija.endsWith("ya")) {
    darija = darija.slice(0, -2) + 't';
  }

  let ownerships = [];

  // ana <object> + ya  if the object ends in a vowel
  // ana <object> + i  if the object ends in a consonant
  if (["a", "e", "i", "o", "u"].includes(darija.slice(-1))) {
    darija = darija.slice(0, -1) + 't';
    ownerships.push(
      { darija: `${darija}ya`, spanish: `mi ${spanish}`, emoji: emoji }
    );
  } else {
    ownerships.push(
      { darija: `${darija}i`, spanish: `mi ${spanish}`, emoji: emoji }
    );
  }

  ownerships.push(
    { darija: `${darija}k`, spanish: `tu (masculino) ${spanish}`, emoji: emoji },
    { darija: `${darija}k`, spanish: `tu (femenino) ${spanish}`, emoji: emoji },
    { darija: `${darija}u`, spanish: `el ${spanish} de él`, emoji: emoji },
    { darija: `${darija}ha`, spanish: `el ${spanish} de ella`, emoji: emoji },
    { darija: `${darija}na`, spanish: `nuestro ${spanish}`, emoji: emoji },
    { darija: `${darija}kum`, spanish: `vuestro ${spanish}`, emoji: emoji },
    { darija: `${darija}hum`, spanish: `su ${spanish} (ellos)`, emoji: emoji },
  );

  return ownerships;
}

let knowledge = [];

for (let i = 0; i < input.length; i++) {
  knowledge = knowledge.concat(ownership(input[i]));
}

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