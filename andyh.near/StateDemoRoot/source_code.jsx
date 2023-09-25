State.init({ root: null, parent: null, child: null });

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

const getRandomIcon = () => icons[Math.ceil(Math.random() * icons.length)];
const updateCircle = () => State.update({ circle: getRandomIcon() });
const updateSquare = () => State.update({ square: getRandomIcon() });
const updateTriangle = () => State.update({ triangle: getRandomIcon() });

return (
  <div className="col">
    <Widget src="andyh.near/widget/ShapeSet" />
    <Widget
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
