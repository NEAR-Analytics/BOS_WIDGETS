if (!(props.accountId ?? context.accountId)) {
  return "No Account ID";
}

const accountId = props.accountId ?? context.accountId;

const profile = Social.getr(`${accountId}/profile`);
if (!profile) {
  return "";
}

const ProfileContainer = styled.div`
background-color: #000;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 1rem;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const SideContainer = styled.div`
backgroundColor: black;
  grid-column: span 2 / span 1;
`;

const MainContainer = styled.div`
backgroundColor: black;

  grid-column: span 4 / span 4;
`;

return (
  <ProfileContainer>
    <SideContainer>
      <Widget
        src="james.near/widget/components.profile.ProfileInfo"
        props={{ accountId }}
      />
    </SideContainer>
    <MainContainer>
      <Widget
        src="james.near/widget/components.profile.ProfileTabs"
        props={{
          accountId,
          profile,
        }}
      />
    </MainContainer>
  </ProfileContainer>
);
