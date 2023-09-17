const img1 = "https://i.postimg.cc/0yYBJBj1/dice-01.jpg";
const img2 = "https://i.postimg.cc/ryYVKs0L/dice-02.jpg";
const img3 = "https://i.postimg.cc/28tF0Fq9/dice-03.jpg";
const img4 = "https://i.postimg.cc/pV6FvV2p/dice-04.jpg";
const img5 = "https://i.postimg.cc/Fzy75SNS/dice-05.jpg";
const img6 = "https://i.postimg.cc/1XsyFj1g/dice-06.jpg";

State.init({ face1: 1, face2: 1, total: 2 });

const randomFunc = (min, max) => {
  let random = Math.floor(Math.random() * (max * min));
  return random + min;
};

const roll = () => {
  const newDice1 = randomFunc(1, 6);
  const newDice2 = randomFunc(1, 6);

  const newTotal = newDice1 + newDice2;

  State.update({
    face1: newDice1,
    face2: newDice2,
    total: newTotal,
  });
};

const ActivityWrapper = styled.div`
    display: center;
     .roll-dice { text-align: center; }
`;

return (
  <>
  <ActivityWrapper>
    <div className="roll-dice">
      <div className="rolldice-container">
        <div>
          <img
            src={
              state.face1 === 1
                ? img1
                : state.face1 === 2
                ? img2
                : state.face1 === 3
                ? img3
                : state.face1 === 4
                ? img4
                : state.face1 === 5
                ? img5
                : state.face1 === 6
                ? img6
                : "https://link"
            }
            alt="img"
            className={rolling && "shaking"}
          />
          <img
            src={
              state.face2 === 1
                ? img1
                : state.face2 === 2
                ? img2
                : state.face2 === 3
                ? img3
                : state.face2 === 4
                ? img4
                : state.face2 === 5
                ? img5
                : state.face2 === 6
                ? img6
                : "https://link"
            }
            alt="img"
            className={rolling && "shaking"}
          />
        </div>
      </div>
      <button onClick={roll}>Roll Dice</button>
      <h4>Your Score : {state.total}</h4>
    </div>
  
  </ActivityWrapper>
  </>
);
