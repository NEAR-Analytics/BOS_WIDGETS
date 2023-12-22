let knowledge = [
  {
    darija: "Ana smiti Ahmed",
    spanish: "Mi nombre es Ahmed",
    emoji: "💬",
  },
  {
    darija: "Nta smitk Ahmed",
    spanish: "Tu nombre es Ahmed",
    emoji: "💬",
  },
  {
    darija: "Nti smitk Samira",
    spanish: "Tu nombre es Samira",
    emoji: "💬",
  },
  {
    darija: "Huwa smitu Ahmed",
    spanish: "El nombre de él es Ahmed",
    emoji: "💬",
  },
  {
    darija: "Hiya smitha Samira",
    spanish: "El nombre de ella es Samira",
    emoji: "💬",
  },
  {
    darija: "Hna smitna Ahmed w Samira",
    spanish: "Nuestros nombres son Ahmed y Samira",
    emoji: "💬",
  },
  {
    darija: "Huma smitkum Ahmed w Samira",
    spanish: "Sus nombres son Ahmed y Samira",
    emoji: "💬",
  },
  {
    darija: "Ntuma smithum Ahmed w Samira",
    spanish: "Vuestros nombres son Ahmed y Samira",
    emoji: "💬",
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

return <Widget src="gagdiez.near/widget/Darija.Lessons.Translate" props={{knowledge: shuffle(knowledge)}} />