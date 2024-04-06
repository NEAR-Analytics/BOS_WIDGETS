const options = [
  {
    id: "social",
    title: "Social",
  },
  {
    id: "menu",
    title: "Menu",
    mobileOnly: true,
  },
];

const Wrapper = styled.div`
  margin-top: calc(-1 * var(--body-top-padding, 0));
  @media(min-width: 992px) {
    .b-s {
      border-left: 1px solid #eee;
    }
    .b-e {
      border-right: 1px solid #eee;
    }
  }
`;

return (
  <Wrapper className="row">
    <div className="col-lg-8 b-e b-s">
      <div
        className={`${state.feedIndex === "menu" ? "d-none" : ""} d-lg-block`}
      >
        <Widget
          key="onboarding"
          loading=""
          src="mob.near/widget/N.ProfileOnboarding"
          props={{}}
        />
        <>
          {context.accountId && (
            <div className="m-2">
              <Widget
                key="compose"
                loading=""
                src="mob.near/widget/MainPage.N.Compose"
                props={{}}
              />
            </div>
          )}
          <Widget src="mob.near/widget/MainPage.N.Feed" />
        </>
      </div>
    </div>
    <div
      className={`${
        state.feedIndex !== "menu" ? "d-none" : "pt-3"
      } d-lg-block col-lg-4 b-e`}
    >
      <Widget src="hack.near/widget/rbit.menu" props={props} />
    </div>
  </Wrapper>
);
