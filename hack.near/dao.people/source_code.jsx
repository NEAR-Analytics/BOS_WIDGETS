const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading...";
}

const Text = styled.p`
  font-family: "Courier", sans-serif;
  font-size: ${(p) => p.size ?? "16px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
  max-width: 670px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

return (
  <>
    <div className="m-2">
      <div className="tab-content">
        <Text>
          <h3>People</h3>
        </Text>
        {accountId && (
          <div className="mt-3 mb-5">
            <Widget
              src="hack.near/widget/dao.subscribe"
              props={{ accountId, daoId }}
            />
          </div>
        )}
        <div className="tab-pane fade in show active" role="tabpanel">
          <Widget
            src="near/widget/FollowersList"
            props={{ accountId: daoId }}
          />
        </div>
      </div>
    </div>
  </>
);
