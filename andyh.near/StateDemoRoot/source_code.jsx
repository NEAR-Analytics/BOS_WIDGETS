State.init({ circle: "circle", triangle: "triangle", square: "square", i: 0 });

const icons = [
  "badge-cc-fill",
  "badge-hd",
  "badge-hd-fill",
  "badge-tm",
  "badge-tm-fill",
  "badge-vo",
  "badge-vo-fill",
  "badge-vr",
  "badge-vr-fill",
  "badge-wc",
  "badge-wc-fill",
  "bag",
  "bag-check",
  "bag-check-fill",
  "bag-dash",
  "bag-dash-fill",
  "bag-fill",
  "bag-plus",
  "bag-plus-fill",
  "bag-x",
  "bag-x-fill",
  "bank",
  "bank2",
  "bar-chart",
  "bar-chart-fill",
  "bar-chart-line",
  "bar-chart-line-fill",
  "bar-chart-steps",
  "basket",
  "basket-fill",
  "basket2",
  "basket2-fill",
  "basket3",
  "basket3-fill",
  "battery",
  "battery-charging",
  "battery-full",
  "battery-half",
  "bell",
  "bell-fill",
  "bell-slash",
  "bell-slash-fill",
  "bezier",
  "bezier2",
  "bicycle",
  "binoculars",
  "binoculars-fill",
  "blockquote-left",
  "blockquote-right",
  "book",
  "book-fill",
  "book-half",
  "bookmark",
  "bookmark-check",
  "bookmark-check-fill",
  "bookmark-dash",
  "bookmark-dash-fill",
  "bookmark-fill",
  "bookmark-heart",
  "bookmark-heart-fill",
  "bookmark-plus",
  "bookmark-plus-fill",
  "bookmark-star",
  "bookmark-star-fill",
  "bookmark-x",
  "bookmark-x-fill",
  "bookmarks",
  "bookmarks-fill",
  "bookshelf",
  "bootstrap",
  "bootstrap-fill",
  "bootstrap-reboot",
  "border",
  "border-all",
  "border-bottom",
  "border-center",
  "border-inner",
  "border-left",
  "border-middle",
  "border-outer",
  "border-right",
  "border-style",
  "border-top",
  "border-width",
  "bounding-box",
  "bounding-box-circles",
  "box",
  "box-arrow-down-left",
  "box-arrow-down-right",
  "box-arrow-down",
  "box-arrow-in-down",
  "box-arrow-in-down-left",
  "box-arrow-in-down-right",
  "box-arrow-in-left",
  "box-arrow-in-right",
  "box-arrow-in-up",
  "box-arrow-in-up-left",
  "box-arrow-in-up-right",
  "box-arrow-left",
  "box-arrow-right",
];

const getRandomIcon = () => {
  const icon = icons[Math.floor(Math.random() * icons.length)];
  State.update({ i: state.i + 1 });
  console.log({ icon });
  return icon;
};
// const updateCircle = () => State.update({ circle: getRandomIcon() });
// const updateSquare = () => State.update({ square: getRandomIcon() });
// const updateTriangle = () => State.update({ triangle: getRandomIcon() });

const { circle, square, triangle } = state;
console.log({ localState: { circle, square, triangle } });
return (
  <div className="col">
    <Widget
      id="root-shapes"
      src="andyh.near/widget/ShapeSet"
      props={{
        circle,
        square,
        triangle,
        updateCircle: () => State.update({ circle: getRandomIcon() }),
        updateSquare: () => State.update({ square: getRandomIcon() }),
        updateTriangle: () => State.update({ triangle: getRandomIcon() }),
      }}
    />
    <Widget
      id="parent-shapes"
      src="andyh.near/widget/StateDemoParent"
      props={{
        circle,
        square,
        triangle,
        updateCircle: () => State.update({ circle: getRandomIcon() }),
        updateSquare: () => State.update({ square: getRandomIcon() }),
        updateTriangle: () => State.update({ triangle: getRandomIcon() }),
      }}
    />
  </div>
);
