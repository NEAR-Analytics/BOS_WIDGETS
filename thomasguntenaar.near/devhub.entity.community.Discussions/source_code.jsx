const { handle } = props;
const { getCommunity, setCommunitySocialDB } = VM.require(
  "thomasguntenaar.near/widget/core.adapter.devhub-contract"
);
const { getDepositAmountForWriteAccess } = VM.require(
  "thomasguntenaar.near/widget/core.lib.common"
);

getDepositAmountForWriteAccess || (getDepositAmountForWriteAccess = () => {});

getCommunity = getCommunity || (() => <></>);
setCommunitySocialDB = setCommunitySocialDB || (() => <></>);

const communityData = getCommunity({ handle });

const MainContent = styled.div`
  padding-left: 2rem;
  flex: 3;
  @media screen and (max-width: 960px) {
    padding-left: 0rem;
  }
  .post:hover {
    background-color: inherit !important;
  }
`;

const SidebarContainer = styled.div`
  flex: 1;
`;

const Heading = styled.div`
  font-size: 19px;
  font-weight: 600;
`;

const SubHeading = styled.div`
  font-size: 15px;
  font-weight: 600;
`;

const Container = styled.div`
  flex-wrap: no-wrap;
  max-width: 100%;

  .max-width-100 {
    max-width: 100%;
  }
  @media screen and (max-width: 960px) {
    flex-wrap: wrap;
  }

  .card {
    border-radius: 1rem !important;
  }
`;

const Tag = styled.div`
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  padding-inline: 0.8rem;
  padding-block: 0.3rem;
  display: flex;
  gap: 0.5rem;
  border-width: 1px;
  border-style: solid;
  font-size: 14px;
  color: rgba(0, 236, 151, 1);
  font-weight: 800;
`;

const [sort, setSort] = useState("timedesc");

const grantNotify = Near.view(
  "social.near",
  "is_write_permission_granted",
  {
    predecessor_id: "devgovgigs.near",
    key: context.accountId + "/index/notify",
  }
);

const grantRepost = Near.view(
  "social.near",
  "is_write_permission_granted",
  {
    predecessor_id: "devgovgigs.near",
    key: context.accountId + "/index/repost",
  }
);

const userStorageDeposit = Near.view(
  "social.near",
  "storage_balance_of",
  {
    account_id: context.accountId,
  }
);

if (
  grantNotify === null ||
  grantRepost === null ||
  userStorageDeposit === null
) {
  return;
}

return (
  <div className="w-100" style={{ maxWidth: "100%" }}>
    <Container className="d-flex gap-3 m-3 pl-2">
      <MainContent className="max-width-100">
        <div className="d-flex flex-column gap-4">
          {context.accountId && (
            <div className="card p-4">
              <Widget
                src={"thomasguntenaar.near/widget/devhub.entity.community.Compose"}
                props={{
                  onSubmit: (v) => {
                    let createDiscussionTx = [
                      {
                        contractName: "devhub.near",
                        methodName: "create_discussion",
                        args: {
                          handle,
                          data: v,
                        },
                        gas: Big(10).pow(14),
                      },
                    ];

                    if (grantNotify === false || grantRepost === false) {
                      createDiscussionTx.unshift({
                        contractName: "social.near",
                        methodName: "grant_write_permission",
                        args: {
                          predecessor_id: "devhub.near",
                          keys: [
                            context.accountId + "/index/notify",
                            context.accountId + "/index/repost",
                          ],
                        },
                        gas: Big(10).pow(14),
                        deposit:
                          getDepositAmountForWriteAccess(userStorageDeposit),
                      });
                    }
                    Near.call(createDiscussionTx);
                  },
                }}
              />
            </div>
          )}
          <div className="d-flex flex-wrap justify-content-between">
            <Heading>Announcements</Heading>
            <div className="d-flex align-items-center gap-2">
              <select
                name="sort"
                id="sort"
                class="form-select"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                }}
              >
                <option selected value="timedesc">
                  Latest
                </option>
                <option value="recentcommentdesc">Last Commented</option>
              </select>
            </div>
          </div>

          <Widget
            src="thomasguntenaar.near/widget/devhub.components.organism.Feed"
            props={{
              showFlagAccountFeature: true,
              action: "repost",
              filteredAccountIds: [
                `${handle}.community.devhub.near`,
              ],
              sort: sort,
            }}
          />
        </div>
      </MainContent>
      <SidebarContainer>
        <div className="d-flex flex-column gap-3">
          <div className="card p-4">
            <div className="mb-2">{communityData?.description}</div>
            <div className="d-flex gap-2 flex-wrap">
              <Tag>{communityData?.tag} </Tag>
            </div>
          </div>
          <div className="card p-4 d-flex flex-column gap-2">
            <SubHeading>Community Admins</SubHeading>
            {(communityData?.admins ?? []).map((accountId) => (
              <div
                key={accountId}
                className="d-flex"
                style={{ fontWeight: 500 }}
              >
                <Widget
                  src="thomasguntenaar.near/widget/devhub.components.molecule.ProfileCard"
                  props={{ accountId }}
                />
              </div>
            ))}
          </div>
        </div>
      </SidebarContainer>
    </Container>
  </div>
);
