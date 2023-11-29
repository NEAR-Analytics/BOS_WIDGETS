const Container = styled.div`
  font-family: 'Poppins', Helvetica, sans-serif;
  background:rgba(250, 250, 250, 0.8);
  color :Black;

`;

const Grid = styled.div`
  margin: 0 20px;
  display: grid;
  background:white;
`;

const CenteredText = styled.p`
  margin-bottom: 5px;
  text-align: center;
`;

const BoldLink = styled.a`
  font-weight: bold;
`;

const AvatarContainer = styled.div`
  position: relative;
`;

const AvatarImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 0.375rem;
  object-fit: cover;
`;

const OnlineDot = styled.div`
  position: absolute;
  right: -3px;
  bottom: 5px;
  height: 5px;
  width: 5px;
  border-radius: 50%;
  border: 4px solid #ffffff;
  background-color: #4caf50;
  visibility: hidden;

  @media (min-width: 640px) {
    top: 2px;
    visibility: visible;
  }
`;

const MetaBody = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.5rem;
  flex: 1;
`;

const UsernameContainer = styled.div`
  display: flex;
  height: 8px;
`;

const UsernameLink = styled.a`
  text-decoration: none;
`;

const UsernameText = styled.h2`
  font-size: 1.125rem;
  font-weight: bold;
`;

const VerifiedBadge = styled.svg`
  height: 1.25rem;
  fill: #4299e1;
  margin-left: 0.5rem;
`;

const MetaBadges = styled.div`
  margin-top: 2px;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

const RightActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const FollowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4299e1;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #3182ce;
  }

  svg {
    fill: #ffffff;
    margin-right: 0.5rem;
  }
`;

const MoreActionsButton = styled.button`
  background-color: #f7fafc;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #edf2f7;
  }

  svg {
    fill: #718096;
  }
`;

return (
  <Container>
    <Grid>
      <CenteredText>
        Inspired from{" "}
        <BoldLink
          href="https://preview.keenthemes.com/metronic8/demo1/account/overview.html"
          target="_blank"
        >
          metronic
        </BoldLink>
      </CenteredText>

      <CenteredText>
        Used{" "}
        <BoldLink href="https://materialdesignicons.com/" target="_blank">
          MDI
        </BoldLink>{" "}
        icons as SVG format
      </CenteredText>

      <div className="flex"></div>

      {/* User Profile Tab Card */}
      <div className="flex flex-row rounded-lg border border-gray-200/80 bg-white p-6">
        {/* Avatar Container */}
        <AvatarContainer>
          {/* User Avatar */}
          <AvatarImage
            src="https://api.lorem.space/image/face?w=150&h=150"
            alt="User"
          />

          {/* Online Status Dot */}
          <OnlineDot title="User is online" />
        </AvatarContainer>

        {/* Meta Body */}
        <MetaBody>
          {/* Username Container */}
          <UsernameContainer>
            {/* Username */}
            <UsernameLink
              href="https://github.com/EgoistDeveloper/"
              target="_blank"
            >
              <UsernameText>EgoistDeveloper</UsernameText>
            </UsernameLink>

            {/* User Verified */}
          </UsernameContainer>

          {/* Meta Badges */}
        </MetaBody>

        {/* Right Actions Container */}
        <RightActionsContainer>
          {/* Follow Button */}
          <FollowButton>Follow</FollowButton>

          {/* More Actions Button */}
          <MoreActionsButton>
            {/* More Actions Button Icon */}
          </MoreActionsButton>
        </RightActionsContainer>
      </div>
    </Grid>
  </Container>
);
