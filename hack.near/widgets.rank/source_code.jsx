const widgetStarCount = {};

const data = Social.keys("*/graph/star/widget/*/*", "final");
if (!data) {
  return "Loading...";
}

console.log("Data:", data);

let widgets = Object.entries(data);
const limit = 888;

console.log("Widgets:", widgets);

for (let i = 0; i < widgets.length; ++i) {
  let accountId = widgets[i][0];

  Object.keys(widgets[i][1].graph.star.widget).forEach((creatorId) => {
    Object.keys(widgets[i][1].graph.star.widget[creatorId]).forEach(
      (widgetName) => {
        let stars = Social.keys(
          `*/graph/star/widget/${creatorId}/${widgetName}`,
          "final",
          {
            return_type: "BlockHeight",
            values_only: true,
          }
        );

        console.log("Builder:", creatorId);
        console.log("Widget Name:", widgetName);
        console.log("Stars:", stars);

        if (stars) {
          const widgetPath = `${creatorId}/widget/${widgetName}`;

          if (widgetPath in widgetStarCount) {
            // Increment the star count if the widget path already exists
            widgetStarCount[widgetPath]++;
          } else {
            // Initialize the star count if the widget path is new
            widgetStarCount[widgetPath] = 1;
          }
        }
      }
    );
  });
}

const limitedWidgetStarSort = Object.entries(widgetStarCount)
  .sort((a, b) => b[1] - a[1])
  .slice(0, limit);

console.log(limitedWidgetStarSort);

const starButton = ({ widgetPath }) => {
  return <Widget src="hack.near/widget/star.button" props={{ widgetPath }} />;
};

return (
  <>
    <div className="d-flex flex-wrap justify-content-between mb-3">
      <div className="m-1">
        <h3>
          {" "}
          <b>GitBos All Stars</b>
          <i class="bi bi-bookmark-star"></i>
        </h3>
        <Widget
          src="mob.near/widget/ProfileLine"
          props={{ accountId: "build.sputnik-dao.near" }}
        />
      </div>
      <div className="m-2">
        <a href={`#/hack.near/widget/GitBos`} class="text-muted">
          <Widget
            src="mob.near/widget/ProfileImage"
            props={{ accountId: "academy.near" }}
          />
        </a>
      </div>
    </div>
    <div className="mb-2">
      <Widget
        src="hack.near/widget/widget.search"
        props={{ extraButtons: starButton }}
      />
    </div>
    {limitedWidgetStarSort.map((rank, index) => {
      let widgetPath = rank[0];
      let starCount = rank[1];
      return (
        <div className="m-3">
          <Widget
            src="hack.near/widget/widget.inline"
            props={{ widgetPath: widgetPath, starCount }}
          />
        </div>
      );
    })}
  </>
);
