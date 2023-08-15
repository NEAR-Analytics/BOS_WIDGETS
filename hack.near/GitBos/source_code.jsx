const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";
const policy = Near.view(daoId, "get_policy");
const deposit = policy.proposal_bond;

const src = props.src ?? "devs.near/widget/dev.community";

State.init({
  selectedTab: props.tab ?? "editor",
  src,
  update: props.update ?? "",
});

const [ownerId, type, name] = state.src.split("/");
const [creatorId, newType, newName] = state.update.split("/");

const source = Social.get(`${state.src}`);
const newVersion = Social.get(`${state.update}`);

if (props.tab && props.tab !== state.selectedTab) {
  State.update({
    selectedTab: props.tab,
  });
}

const args = JSON.stringify({
  data: {
    [daoId]: {
      [type]: {
        [`${name}`]: {
          "": `${state.update}`,
        },
      },
    },
  },
});

const proposal_args = Buffer.from(args, "utf-8").toString("base64");

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: `update ${src}`,
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: proposal_args,
                  deposit: "50000000000000000000000",
                  gas: "21900000000000",
                },
              ],
            },
          },
        },
      },
      deposit: deposit,
      gas: "219000000000000",
    },
  ]);
};

const handleCreate = () =>
  Social.set({
    [`${type}`]: {
      [`${name}`]: {
        "": `${src}`,
      },
    },
  });

const existsData = Social.keys(`${ownerId}/${type}/${name}`);
const exists = !existsData || Object.keys(existsData).length > 0;
const validData = Social.keys(`${creatorId}/${newType}/${newName}`);
const valid = !validData || Object.keys(validData).length > 0;
const thing = Social.get(`${ownerId}/${type}/${name}`);
const data = Social.get(`${ownerId}/${type}/${name}/**`);
const metadata = data.metadata;
const tags = Object.keys(metadata.tags || {});
const pageUrl = `#/hack.near/widget/GitBos?src=${src}`;
const shareUrl = `https://near.org${pageUrl}`;

const dependencyMatch =
  thing && thing.matchAll(/<Widget[\s\S]*?src=.*?"(.+)"[\s\S]*?\/>/g);
let dependencySources = [...(dependencyMatch || [])]
  .map((r) => r[1])
  .filter((r) => !!r);
dependencySources = dependencySources.filter(
  (r, i) => dependencySources.indexOf(r) === i && r !== "(.+)"
);

const sourceCode = `
\`\`\`jsx
${thing}
\`\`\`
`;

let CodeWrapper = styled.div`
margin-top: 23px;
  & > pre > div {
    margin: 0px !important;
  }

  & > pre {
    margin: 0px !important;
    border-radius: 0px 0px 5px 5px;
  }
`;

// const setButton = ({ src, onHide }) => {
//   return (
//     <button
//       className="btn btn-primary"
//       onClick={() => {
//         State.update({ src });
//         onHide();
//       }}
//     >
//       <i className="bi bi-plus-lg" /> add
//     </button>
//   );
// };

const Wrapper = styled.div`
  padding-bottom: 48px;
`;

const Tabs = styled.div`
  display: flex;
  height: 48px;
  padding 9px;
  border-bottom: 1px solid #eceef0;
  margin-bottom: 32px;
  overflow: auto;
  scroll-behavior: smooth;

  @media (max-width: 1024px) {
    background: #f8f9fa;
    border-top: 1px solid #eceef0;
    margin: 0 -12px 48px;

    > * {
      flex: 1;
    }
  }
`;

const TabsButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 12px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none !important;

  &:hover {
    color: #11181c;
  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #59e692;
  }
`;

const Content = styled.div`
  display: grid;

  @media (max-width: 995px) {
    gap: 23px;
  }
`;

const Sidebar = styled.div`
  > div {
    padding-bottom: 32px;
    border-bottom: 1px solid #eceef0;
    margin-bottom: 32px;

    &:last-child {
      padding-bottom: 0;
      border-bottom: none;
      margin-bottom: 0;
    }
  }

  @media (max-width: 995px) {
    padding-bottom: 32px;
    border-bottom: 1px solid #eceef0;
    grid-row: 1;
  }
`;

const SmallTitle = styled.h3`
  color: #687076;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  margin-bottom: 32px;
  text-transform: uppercase;

  @media (max-width: 770px) {
    margin-bottom: 16px;
  }
`;

const TextLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #0091ff;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
`;

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};

  i {
    margin-right: 4px;
  }
`;

const Dependency = styled.div`
  margin-bottom: 24px;
`;

return (
  <Wrapper>
    <div className="p-1">
      <h2 className="p-1">GitBos</h2>
      <h5 className="p-2">input source path of anything:</h5>
      <div className="input-group m-2">
        <input
          className="form-control"
          defaultValue={state.src}
          onChange={(e) => {
            State.update({
              src: e.target.value,
            });
          }}
        />
      </div>
      {exists && name && (
        <div className="row">
          <div className="col m-2">
            <Widget
              src="hack.near/widget/summary"
              props={{
                size: "large",
                showTags: false,
                src: state.src,
              }}
            />
          </div>
        </div>
      )}
    </div>

    {exists && name ? (
      <div>
        <Tabs>
          <div>
            <TabsButton
              href={`${pageUrl}&tab=view`}
              selected={state.selectedTab === "view"}
            >
              View
            </TabsButton>

            <TabsButton
              href={`${pageUrl}&tab=source`}
              selected={state.selectedTab === "source"}
            >
              Source
            </TabsButton>
            {type === "widget" && (
              <TabsButton
                href={`${pageUrl}&tab=history`}
                selected={state.selectedTab === "history"}
              >
                History
              </TabsButton>
            )}

            <TabsButton
              href={`${pageUrl}&tab=editor`}
              selected={state.selectedTab === "editor"}
            >
              Editor
            </TabsButton>
          </div>
        </Tabs>
      </div>
    ) : (
      <div className="m-3">
        <p>nothing found</p>
      </div>
    )}

    {state.selectedTab === "view" && (
      <Content>{exists && name && <Widget src={`${state.src}`} />}</Content>
    )}

    {state.selectedTab === "source" && (
      <Content>
        <Markdown text={sourceCode} />

        <Sidebar>
          <div>
            <SmallTitle>Dependencies ({dependencySources.length})</SmallTitle>

            {dependencySources.length === 0 && <Text>no dependencies</Text>}

            {dependencySources.map((thing) => (
              <Dependency key={thing}>
                <Widget
                  src="near/widget/ComponentProfile"
                  props={{ src: thing }}
                />
              </Dependency>
            ))}
          </div>
        </Sidebar>
      </Content>
    )}

    {state.selectedTab === "history" && (
      <Content>
        <Widget
          src="near/widget/ComponentHistory"
          props={{ widgetPath: state.src }}
        />
      </Content>
    )}

    {state.selectedTab === "editor" && (
      <div className="p-1">
        <h5 className="p-2">input source path of a new version:</h5>
        <div className="input-group p-2">
          <input
            className="form-control"
            defaultValue={update}
            onChange={(e) => {
              State.update({
                update: e.target.value,
              });
            }}
          />
        </div>
        {valid && newName ? (
          <div className="m-3">
            <Widget
              src="hack.near/widget/request"
              props={{
                accountId: creatorId,
                type: newType,
                name: newName,
                ownerId,
              }}
            />
            <CodeWrapper>
              <Widget
                src={`hack.near/widget/compare`}
                props={{
                  src: state.src,
                  update: state.update,
                  findUniqueResult: (
                    lineCountDeleted,
                    lineCountInserted,
                    lineCountCurrentCode,
                    lineCountPrevCode,
                    allLineCount
                  ) => {
                    if (
                      state.lineCountDeleted === undefined ||
                      state.lineCountInserted === undefined
                    )
                      State.update({ lineCountDeleted, lineCountInserted });
                  },
                }}
              />
            </CodeWrapper>
          </div>
        ) : (
          <div className="m-3">
            {state.update && <p>nothing found there</p>}
          </div>
        )}
      </div>
    )}
  </Wrapper>
);
