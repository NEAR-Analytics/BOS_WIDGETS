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

return (
  <>
    <h3>All Stars</h3>
    <br />
    {limitedWidgetStarSort.map((rank, index) => {
      let widgetPath = rank[0];
      let starCount = rank[1];
      return (
        <div className="d-flex justify-content-between mb-3">
          <div className="d-flex flex-column" style={{ width: "20%" }}>
            <div>
              Rank:
              <span
                style={{
                  backgroundColor: "black",
                  borderRadius: "5px",
                  padding: "5px",
                  color: "white",
                }}
              >
                {index + 1}
              </span>
            </div>
            <br />
            <div>
              Stars:{" "}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {starCount}
              </span>
            </div>
          </div>
          <hr />

          <div className="me-4" style={{ width: "80%" }}>
            <Widget
              src="hack.near/widget/widget.inline"
              props={{ widgetPath: widgetPath }}
            />
          </div>
        </div>
      );
    })}
  </>
);
