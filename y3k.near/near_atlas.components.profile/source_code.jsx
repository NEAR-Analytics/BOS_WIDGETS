return (
  <>
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row">
        <Widget
          src="y3k.near/widget/near_atlas.components.ProfileSection"
          props={{}}
        />
        <Widget
          src="y3k.near/widget/near_atlas.components.Profile.IntroductionSection"
          props={{}}
        />
      </div>
      <Widget
        src="y3k.near/widget/near_atlas.components.Profile.PinnedProjects"
        props={{}}
      />{" "}
    </div>
  </>
);
