State.init({ circle: "circle", triangle: "triangle", square: "square" });

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
  const icon = icons[Math.floor(Math.random() * icons.length)];
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
      id="root-shapes"
      src="andyh.near/widget/ShapeSet"
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
      id="parent-shapes"
      src="andyh.near/widget/StateDemoParent"
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
