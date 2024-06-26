const ownerId = "contribut3.near";
const accountId = props.accountId ?? context.accountId;
const isAdmin = props.isAdmin;

State.init({
  profile: null,
  profileIsFetched: false,
});

if (!state.profileIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/**`] },
    "final",
    false,
  ).then((profile) =>
    State.update({
      profile: profile[accountId].profile,
      profileIsFetched: true,
    }),
  );
  return <>Loading...</>;
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

const onSave = (data) => {
  Social.set(data, {
    onCommit: () =>
      State.update({ profile: { ...state.profile, ...data.profile } }),
  });
};

return (
  <Container>
    <div>
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.Logo`}
        props={{
          accountId,
          value: state.profile.image,
          isProject: false,
          id: "image",
          onSave: (image) =>
            Social.set({ profile: { image: { ipfs_cid: image.cid } } }),
          canEdit: props.isAdmin,
        }}
      />
    </div>
    <Details>
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.NameAndAccount`}
        props={{
          value: state.profile.name,
          id: "name",
          accountId,
          onSave: (name) => onSave({ profile: { name } }),
          canEdit: props.isAdmin,
        }}
      />
      <Widget
        src={`${ownerId}/widget/Inputs.Viewable.OneLiner`}
        props={{
          value: state.profile.tagline,
          id: "tagline",
          onSave: (tagline) => onSave({ profile: { tagline } }),
          canEdit: props.isAdmin,
        }}
      />
      {/*<Widget
        src={`${ownerId}/widget/BadgeList`}
        props={{
          badges: [{ value: "Verified" }],
        }}
      />*/}
    </Details>
  </Container>
);
