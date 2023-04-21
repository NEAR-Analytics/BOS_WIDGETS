const accountId = props.accountId || context.accountId;
const blockHeight = props.blockHeight || "now";
const profile = props.profile || Social.get(`${accountId}/profile/**`, "final");
const profileUrl = `/#/mob.near/widget/ProfilePage?accountId=${accountId}`;

const handleValidAnswerClick = () => {
  Near.call(adminContract, "mark_useful", {
    id: { account_id: accountId, block_height: blockHeight },
    amount: "1",
  });
};

const Wrapper = styled.div`
  display: inline-grid;
  width: 100%;
  align-items: center;
  gap: 12px;
  grid-template-columns: auto 1fr;
  margin: 0;
  color: #687076 !important;
  outline: none;
  text-decoration: none !important;
  background: none !important;
  border: none;
  text-align: left;
  padding: 0;

  > * {
    min-width: 0;
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "10px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: nowrap;
`;
const ProfileLink = styled.p`

  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "10px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: nowrap;


  &:hover {
    color: initial;
  }
`;

const Avatar = styled.div`
  width: ${props.avatarSize || "40px"};
  height: ${props.avatarSize || "40px"};
  flex-shrink: 0;
  border: 1px solid #eceef0;
  overflow: hidden;
  border-radius: 40px;
  transition: border-color 200ms;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const Item = styled.div`
  padding: 0;
  .btn {
    &:hover,
    &:focus {
      background-color: #ECEDEE;
      text-decoration: none;
      outline: none;
    }

    &.valid-btn {
      i {
        color: #30A46C;
      }
    }
    span {
      font-weight: 500;
    }
  }
`;

const Name = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

return (
  <Wrapper>
    <Avatar>
      <Widget
        src="mob.near/widget/Image"
        props={{
          image: profile.image,
          alt: profile.name,
          fallbackUrl:
            "https://ipfs.near.social/ipfs/bafkreibiyqabm3kl24gcb2oegb7pmwdi6wwrpui62iwb44l7uomnn3lhbi",
        }}
      />
    </Avatar>

    <div>
      <Name>
        <ProfileLink as="a" href={profileUrl} ellipsis bold>
          {profile.name || accountId.split(".near")[0]}
        </ProfileLink>

        <div class="d-flex align-items-center flex-fill">
          <Text as="span">･</Text>
          <Text>
            {blockHeight === "now" ? (
              "now"
            ) : (
              <>
                <Widget src="mob.near/widget/TimeAgo" props={{ blockHeight }} />
                ago
              </>
            )}
          </Text>
          <div class="dropdown ms-auto">
            <button
              class="btn border-0 p-0"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-three-dots" />
            </button>
            <ul class="dropdown-menu">
              <li>
                <Item className="dropdown-item">
                  <Widget
                    src="dima_sheleg.near/widget/DevSupport.Answer.Button.Valid"
                    props={{
                      accountId,
                      blockHeight,
                      admins,
                      adminContract,
                      onClick: handleValidAnswerClick,
                      text: "Mark as Correct",
                      className: "btn valid-btn",
                    }}
                  />
                </Item>
              </li>
            </ul>
          </div>
        </div>
      </Name>

      {!props.hideAccountId && <Text ellipsis>@{accountId}</Text>}
    </div>
  </Wrapper>
);
