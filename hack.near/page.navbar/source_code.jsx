const accountId = props.accountId ?? context.accountId;
const communityId = props.communityId ?? "everyone";

const { isVerified } = props;

const widget = {
  styledComponents: "hack.near/widget/NDC.StyledComponents",
};

const o = Social.keys(`*/graph/${communityId}/${accountId}`, undefined, {
  values_only: true,
});

const Header = styled.div`
  background: black;

  .large-text {
  font-size: 19px;
  font-weight: 555;
}
`;

const Toolbar = styled.div`
  margin-left: 20px;
  @media only screen and (max-width: 1061px) {
    margin: 10px 0 0 0;
  }
`;

return (
  <Header className="d-flex p-3 px-4 align-items-center rounded justify-content-between">
    <Widget
      src="mob.near/widget/Image"
      props={{
        image: {
          url: "https://pbs.twimg.com/profile_images/1690850854457204736/KUXVTpZt_400x400.png",
        },
        alt: "Near Builders",
        style: {
          height: "42px",
          objectFit: "cover",
        },
      }}
    />
    {!context.accountId ? (
      <Widget
        src={widget.styledComponents}
        props={{
          Link: {
            text: "START",
            href: "https://shard.dog/nearweek",
            className: "primary dark bold-text large-text",
          },
        }}
      />
    ) : (
      <Toolbar>
        {o && Object.keys(o).length ? (
          <Widget
            src={widget.styledComponents}
            props={{
              Button: {
                text: "CREATE",
                onClick: () => State.update({ showModal: true }),
                className: "primary dark bold-text large-text",
              },
            }}
          />
        ) : (
          <Widget
            src={widget.styledComponents}
            props={{
              Button: {
                text: "JOIN",
                onClick: () =>
                  Social.set({ graph: { [communityId]: { [accountId]: "" } } }),
                className: "primary dark bold-text large-text",
              },
            }}
          />
        )}
      </Toolbar>
    )}
  </Header>
);
