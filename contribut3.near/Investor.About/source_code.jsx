const onSave = props.onSave ?? (() => {});
const ownerId = "contribut3.near";
const accountId = props.accountId;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  padding: 0.5em 0.2em;
  width: 100%;
`;

const Heading = styled.div`
  padding-bottom: 0.5em;
  font-style: normal;
  font-weight: 700;
  font-size: 1.125em;
  line-height: 1.5em;
  color: #000;
  width: 100%;
`;

State.init({
  description: "",
  descriptionIsFetched: false,
});

if (!state.descriptionIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/**`] },
    "final",
    false
  ).then((data) =>
    State.update({
      description: data[accountId].profile.description,
      descriptionIsFetched: true,
    })
  );
  return <>Loading...</>;
}

return (
  <Container>
    <Heading>About</Heading>
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "Description",
        id: "description",
        value: state.description,
        onSave: (description) =>
          Social.set(
            { profile: { description } },
            { onCommit: () => State.update({ description }) }
          ),
        canEdit: props.isAdmin,
      }}
    />
  </Container>
);
