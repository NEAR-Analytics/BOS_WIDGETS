const ownerId = "pipar.near";

if (!context.accountId) {
  return (
    <Widget
      src={`nearhorizon.near/widget/InfoSegment`}
      props={{
        title: "Not logged in!",
        description: "You must log in to create a new store!",
      }}
    />
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 3em;
  padding-bottom: 3em;
`;

const Header = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 2em;
  line-height: 1.4em;
  text-align: center;
  color: #000000;
`;

const SubHeader = styled.h2`
  font-style: normal;
  font-weight: 400;
  font-size: 0.95em;
  line-height: 1.25em;
  text-align: center;
  color: #101828;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 60%;
  gap: 1em;
`;

const FormHeader = styled.h3`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 0px 0.5em;
  border-bottom: 1px solid #eceef0;
  font-style: normal;
  font-weight: 700;
  font-size: 1.125em;
  line-height: 1.25em;
  color: #000000;
  width: 100%;
`;

const FormFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

State.init({
  name: "",
  nameError: "",
  accountId: "",
  accountIdError: "",
  tagline: "",
  taglineError: "",
  description: "",
  descriptionError: "",
  tags: [],
  tagsError: "",
  website: "",
  websiteError: "",
  geo: "",
  geoError: "",
  accountsWithPermissions: [],
  accountsWithPermissionsIsFetched: false,
});

if (!state.accountsWithPermissionsIsFetched) {
  Near.asyncView(
    "social.near",
    "debug_get_permissions",
    { account_id: context.accountId },
    "final",
    false
  ).then((data) =>
    State.update({
      accountsWithPermissions: data
        .map(([info]) => info)
        .filter((info) => "AccountId" in info)
        .map(({ AccountId }) => AccountId),
      accountsWithPermissionsIsFetched: true,
    })
  );
}

const slideDown = styled.keyframes`
  from {
    height: 0;
  }
  to {
    height: var(--radix-collapsible-content-height);
  }
`;

const slideUp = styled.keyframes`
  from {
    height: var(--radix-collapsible-content-height);
  }
  to {
    height: 0;
  }
`;

const Hidable = styled("Collapsible.Content")`
  overflow: hidden;

  &[data-state="open"] {
    animation: ${slideDown} 0.3s ease-in-out;
  }

  &[data-state="closed"] {
    animation: ${slideUp} 0.3s ease-in-out;
  }
`;

const validateForm = () => {
  return (
    state.name &&
    state.nameError === "" &&
    state.accountId &&
    state.accountIdError === "" &&
    (!state.tagline || state.taglineError === "") &&
    (!state.description || state.descriptionError === "") &&
    (!state.tags || state.tagsError === "") &&
    (!state.website || state.websiteError === "") &&
    (!state.geo || state.geoError === "")
  );
};

return (
  <Container>
    <div>
      <Header>Deploy NFT tokenized store</Header>
    </div>
    <Form>
      <FormHeader>Details</FormHeader>
    </Form>
  </Container>
);
