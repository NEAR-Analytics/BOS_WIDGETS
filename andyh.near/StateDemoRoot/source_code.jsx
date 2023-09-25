State.init({ circle: null, triangle: null, square: null });

const icons = [
  "bell",
  "basket",
  "battery-full",
  "music-player",
  "mic-mute",
  "piggy-bank",
  "puzzle",
  "printer",
];

const getRandomIcon = () => {
  const icon = icons[Math.ceil(Math.random() * icons.length)];
  console.log({ icon });
  return icon;
};
const updateCircle = () => State.update({ circle: getRandomIcon() });
const updateSquare = () => State.update({ square: getRandomIcon() });
const updateTriangle = () => State.update({ triangle: getRandomIcon() });

const { circle, square, triangle } = state;
console.log({ circle, square, triangle });
return (
  <div className="col">
    <Widget
      src="andyh.near/widget/ShapeSet"
      isTrusted={true}
      props={{
        circle,
        square,
        triangle,
        updateCircle,
        updateSquare,
        updateTriangle,
      }}
    />
    <Widget
      src="andyh.near/widget/StateDemoParent"
      isTrusted={true}
      props={{
        circle,
        square,
        triangle,
        updateCircle,
        updateSquare,
        updateTriangle,
      }}
    />
  </div>
);
