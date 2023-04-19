const ownerId = "contribut3.near";
const accountId = props.accountId;

State.init({
  tags: null,
  tagsIsFetched: false,
  description: null,
  descriptionIsFetched: false,
});

if (!state.foundersIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/tags`] },
    "final",
    false
  ).then((tags) => State.update({ tags, tagsIsFetched: true }));
}

if (!state.descriptionIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/description`] },
    "final",
    false
  ).then((description) =>
    State.update({ description, descriptionIsFetched: true })
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 100%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5em;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const body = (
  <>
    <Container>
      <Widget
        src={`${ownerId}/widget/Vendor.Icon`}
        props={{ accountId: props.accountId, size: "4em" }}
      />
      <Details>
        <Widget
          src={`${ownerId}/widget/NameAndAccount`}
          props={{
            accountId: props.accountId,
            name: state.profile.name,
            nameSize: "1.125em",
          }}
        />
        <Widget
          src={`${ownerId}/widget/BadgeList`}
          props={{
            badges: [
              { value: "Verified" },
              { value: "Fundraiser", color: "#62ebe4" },
            ],
          }}
        />
      </Details>
    </Container>
    <Widget
      src={`${ownerId}/widget/DescriptionArea`}
      props={{ description: state.description }}
    />
  </>
);

const FooterButton = styled.a`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  gap: 0.5em;
  width: 48%;
  height: 2.5em;
  background: #fafafa;
  border: 1px solid #eceef0;
  border-radius: 50px;
  flex: none;
  order: 0;
  flex-grow: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 0.9em;
  line-height: 1em;
  text-align: center;
  color: ${({ blue }) => (blue ? "#006ADC" : "#101828")};
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const footer = (
  <Footer>
    <FooterButton
      href={`/${ownerId}/widget/Index?tab=vendor&accountId=${accountId}`}
      onClick={() =>
        props.update({
          tab: "vendor",
          content: "",
          search: "",
          accountId,
        })
      }
    >
      View details
    </FooterButton>
    <FooterButton
      blue
    // href={`/${ownerId}/widget/Index?tab=entity&accountId=${accountId}`}
    // onClick={() =>
    //   props.update({
    //     tab: "entity",
    //     content: "",
    //     search: "",
    //     accountId,
    //   })
    // }
    >
      Invite vendor
    </FooterButton>
  </Footer>
);

return <Widget src={`${ownerId}/widget/Card`} props={{ body, footer }} />;
