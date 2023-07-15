const Container = styled.div`
  .profile-image {
    width: 120px;
    height: 120px;
  }

  @media (max-width: 576px) {
    .profile-image {
      width: 160px;
      height: 160px;
    }
  }
`;

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
  return (
    <div>
      <a
        className="btn btn-outline-primary m-1"
        href={`#/near/widget/ComponentDetailsPage?src=${widgetPath}`}
      >
        View Code
      </a>{" "}
      <Widget src="hack.near/widget/star.button" props={{ widgetPath }} />
    </div>
  );
};

return (
  <Container>
    <div className="d-flex flex-wrap align-items-center">
      <div className="m-3">
        <h3>
          <b>All Stars</b> <i className="bi bi-bookmark-star"></i>
        </h3>
      </div>
      <div className="ms-auto me-0 me-md-2 d-flex align-items-center">
        <a href="#/hack.near/widget/GitBos" className="text-muted m-2">
          <Widget
            src="mob.near/widget/ProfileImage"
            props={{ accountId: "academy.near" }}
            className="profile-image"
          />
        </a>
      </div>
    </div>
    <div className="m-3">
      <Widget
        src="near/widget/AccountProfile"
        props={{ accountId: "build.sputnik-dao.near" }}
      />
    </div>
    <div className="m-4">
      <h5>Explore Projects</h5>
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
  </Container>
);
