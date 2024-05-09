const columns = [
  {
    title: "Members",
    cards: [
      { title: "Card 111", content: "Lorem Ipsum col 1" },
      { title: "Card 199", content: "Lorem Ipsum non nobis" },
    ],
  },
  {
    title: "Rooster",
    cards: [
      {
        title: "Card 211",
        content: "Lorem Ipsum col 2",
        action: {
          text: "Click Me",
          callBack: () => {
            callMeBack();
          },
        },
      },
      { title: "Card 222", content: "Lorem Ipsum" },
    ],
  },
  {
    title: "Waitlist",
    allowCardCreation: true,
    cards: [
      {
        title: "Card 311",
        content: "Lorem Ipsum col 3",
        action: {
          text: "Click Me!",
          callBack: () => {
            console.log(123);
          },
        },
      },
      { title: "Card 333", content: "Lorem Ipsum" },
    ],
  },
];

function callMeBack() {
  console.log("Hello world");
}

return <Widget src="silkking.near/widget/kanban.home" props={{ columns }} />;
