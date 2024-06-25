const accountId = context.accountId;
const [selected_accountId, selected_indexerName] = props.selectedIndexerPath
  ? props.selectedIndexerPath.split("/")
  : [undefined, undefined];

const activeTab = props.view == "create-new-indexer" ? "create-new-indexer" : props.selectedIndexerPath ? "indexer" : "explore"
const activeIndexerView = props.activeIndexerView ?? "editor";
const limit = 7;
let totalIndexers = 0;

State.init({
  activeTab: activeTab,
  activeIndexerView: activeIndexerView,
  my_indexers: [],
  all_indexers: [],
  selected_indexer: undefined,
  selected_account: undefined,
});

Near.asyncView(`dev-queryapi.dataplatform.near`, "list_all").then((data) => {
  const indexers = [];
  const total_indexers = 0;
  Object.keys(data).forEach((accountId) => {
    Object.keys(data[accountId]).forEach((functionName) => {
      indexers.push({
        accountId: accountId,
        indexerName: functionName,
      });
      total_indexers += 1;
    });
  });

  let my_indexers = indexers.filter(
    (indexer) => indexer.accountId === accountId
  );

  State.update({
    my_indexers: my_indexers,
    all_indexers: indexers,
    totalIndexers: total_indexers,
  });
});

const Subheading = styled.h2`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C !important" : "#687076 !important")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: nowrap;
  outline: none;
`;

const Editor = styled.div`
`;
const Status = styled.div`
`;

const Wrapper = styled.div`
  margin-inline: 12px;
  margin-top: calc(var(--body-top-padding) * -1);
`;

const NavBarLogo = styled.a`
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: .01rem;
  font-size: 1.25rem;
  text-decoration: none;
  white-space: nowrap;
`;
const Main = styled.div`
  display: block;
`;

const Section = styled.div`
  padding-top: 0px;
  border-left: none;
  border-right: none;
  display: ${(p) => (p.active ? "block" : "none")};
  margin: ${(p) => (p.negativeMargin ? "0 -12px" : "0")};
`;

const Tabs = styled.div`
  display: none;
  height: 48px;
  background: #f8f9fa;
  border-top: 1px solid #eceef0;
  border-bottom: 1px solid #eceef0;
  margin-bottom: ${(p) => (p.noMargin ? "0" : p.halfMargin ? "24px" : "24px")};

  display: flex;
  margin-left: -12px;
  margin-right: -12px;

  button {
    flex: 1;
  }
`;
const Content = styled.div`
  background-color: #f7f7f7;
  padding: 2em;
  border-radius: 5px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const TabsButton = styled.button`
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;
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
    background: #0091ff;
  }
`;
const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181c;
  margin: 0 0 8px;
`;
const Card = styled.div`
  border-radius: 12px;
  background: #fff;
  border: ${(div) => (div.selected ? "1px solid black" : "1px solid #eceef0")};
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
`;

const CardBody = styled.div`
  padding: 16px;
  display: flex;
  gap: 16px;
  align-items: center;

  > * {
    min-width: 0;
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 4px;
  padding: 16px;
  border-top: 1px solid #eceef0;
`;

const TextLink = styled.a`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C !important" : "#687076 !important")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: nowrap;
  outline: none;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

const Thumbnail = styled.a`
  display: block;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border: 1px solid #eceef0;
  border-radius: 8px;
  overflow: hidden;
  outline: none;
  transition: border-color 200ms;

  &:focus,
  &:hover {
    border-color: #d0d5dd;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const CardWrapper = styled.div`
  margin: 0 0 16px;
`;

const sharedButtonStyles = `
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  margin-bottom: 12px;
  height: 32px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;

  &:hover,
  &:focus {
    text-decoration: none;
    outline: none;
  }

  i {
    color: #7E868C;
  }

  .bi-16 {
    font-size: 16px;
  }
`;

const Button = styled.button`
  ${sharedButtonStyles}
  color: ${(p) => (p.primary ? "#fff" : "#11181C")} !important;
  background: ${(p) => (p.primary ? "#0091FF" : "#FBFCFD")};
  border: ${(p) => (p.primary ? "none" : "1px solid #D7DBDF")};

  &:hover,
  &:focus {
    background: ${(p) => (p.primary ? "#0484e5" : "#ECEDEE")};
  }
`;

const ButtonLink = styled.a`
  ${sharedButtonStyles}
  color: ${(p) => {
    if (p.primary) return "#fff";
    else if (p.danger) return "#fff";
    else return "#11181C";
  }} !important;
  background: ${(p) => {
    if (p.primary) return "#0091FF";
    else if (p.danger) return "#dc3545";
    else return "#FBFCFD";
  }};
  border: ${(p) => (p.primary ? "none" : "1px solid #D7DBDF")};

  &:hover,
  &:focus {
    background: ${(p) => {
    if (p.primary) return "#0484e5";
    else if (p.danger) return "#b22b38";
    else return "#ECEDEE";
  }}
`;

const SignUpLink = styled.a`
  --blue: RGBA(13, 110, 253, 1);
  display: ${({ hidden }) => (hidden ? "none" : "inline-block")};
  font-size: 14px;
  cursor: pointer;
  color: var(--blue);
  text-decoration: none;
  margin-left: 0.1em;
  padding: 0;
  white-space: nowrap;

  &:hover {
    color: var(--blue);
    text-decoration: none;
  }

  &:visited {
    color: var(--blue);
    text-decoration: none;
  }
`;
// TODO fix activeTab
// const previousSelectedTab = Storage.privateGet("queryapi:activeTab");
// if (previousSelectedTab && previousSelectedTab !== state.activeTab) {
//   State.update({
//     activeTab: previousSelectedTab,
//   });
// }

const selectTab = (tabName) => {
  Storage.privateSet("queryapi:activeTab", tabName);
  State.update({
    activeTab: tabName,
  });
};

const selectIndexerPage = (viewName) => {
  Storage.privateSet("queryapi:activeIndexerTabView", viewName);
  State.update({
    activeIndexerView: viewName,
  });
};
const indexerView = (accountId, indexerName) => {
  const editUrl = `https://dev.near.org/dev-queryapi.dataplatform.near/widget/QueryApi.App?selectedIndexerPath=${accountId}/${indexerName}`;
  const statusUrl = `https://dev.near.org/dev-queryapi.dataplatform.near/widget/QueryApi.App?selectedIndexerPath=${accountId}/${indexerName}&view=indexer&activeIndexerView=status`;
  const playgroundLink = `https://cloud.hasura.io/public/graphiql?endpoint=https://near-queryapi.dev.api.pagoda.co/v1/graphql&header=x-hasura-role%3A${accountId.replaceAll(
    ".",
    "_"
  )}`;

  return (
    <Card>
      <CardBody>
        <Thumbnail>
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: metadata.image,
              fallbackUrl:
                "https://upload.wikimedia.org/wikipedia/commons/8/86/Database-icon.svg",
              alt: "Near QueryApi indexer",
            }}
          />
        </Thumbnail>

        <div>
          <TextLink as="a" bold ellipsis>
            {indexerName}
          </TextLink>
          <TextLink as="a" ellipsis>
            @{accountId}
          </TextLink>
        </div>
      </CardBody>

      <CardFooter className="flex justify-center items-center">
        <ButtonLink onClick={() => selectIndexerPage("status")}>
          View Status
        </ButtonLink>
        <ButtonLink primary onClick={() => selectIndexerPage("editor")}>
          {accountId === context.accountId ? "Edit Indexer" : "View Indexer"}
        </ButtonLink>
        <ButtonLink href={playgroundLink} target="_blank">
          View In Playground
        </ButtonLink>
      </CardFooter>
    </Card>
  );
};

return (
  <Wrapper negativeMargin={state.activeTab === "explore"}>
    <Tabs>
      <TabsButton
        type="button"
        onClick={() => selectTab("explore")}
        selected={state.activeTab === "explore"}
      >
        Explore Indexers
      </TabsButton>
      {state.activeTab == "create-new-indexer" && (
        <TabsButton
          type="button"
          onClick={() => selectTab("create-new-indexer")}
          selected={state.activeTab === "create-new-indexer"}
        >
          Create New Indexer
        </TabsButton>
      )}

      {props.selectedIndexerPath && (
        <>
          <TabsButton
            type="button"
            onClick={() => selectTab("indexer")}
            selected={state.activeTab === "indexer"}
          >
            Indexer ({props.selectedIndexerPath})
          </TabsButton>
        </>
      )}
    </Tabs>
    <Main>
      <Section active={state.activeTab === "explore"}>
        <NavBarLogo
          href={`https://dev.near.org/dev-queryapi.dataplatform.near/widget/QueryApi.App`}
          title="QueryApi"
          onClick={() => selectTab("explore")}
        >
          <Widget
            src="mob.near/widget/Image"
            props={{
              className: "d-inline-block align-text-top me-2",
              image: metadata.image,
              style: { height: "24px" },
              fallbackUrl:
                "https://upload.wikimedia.org/wikipedia/commons/8/86/Database-icon.svg",
              alt: "the queryapi logo",
            }}
          />
          QueryApi
        </NavBarLogo>

        <SignUpLink target="_blank" href={`https://docs.near.org/build/data-infrastructure/query-api/intro`}>
          (Documentation)
        </SignUpLink>
        <div>
          <ButtonLink
            href={`/dev-queryapi.dataplatform.near/widget/QueryApi.App/?view=create-new-indexer`}
            style={{ "margin-top": "10px" }}
            onClick={() => {
              State.update({
                activeTab: "create-new-indexer",
                selected_indexer: "",
              });
              selectTab("create-new-indexer");
            }}
          >
            Create New Indexer
          </ButtonLink>
          {state.my_indexers.length > 0 && (
            <H2>
              {accountId}'s Indexers
              <span>({state.my_indexers.length})</span>
            </H2>
          )}
          <Widget
            src={`dev-queryapi.dataplatform.near/widget/QueryApi.IndexerExplorer`}
          />
        </div>
      </Section>
      <Section
        negativeMargin
        primary
        active={state.activeTab === "create-new-indexer"}
      >
        {state.activeTab === "create-new-indexer" && (
          <div>
            <Widget
              src={`dev-queryapi.dataplatform.near/widget/QueryApi.Editor`}
              props={{
                indexerName:
                  selected_indexerName ?? state.indexers[0].indexerName,
                accountId: selected_accountId ?? state.indexers[0].accountId,
                path: "create-new-indexer",
              }}
            />
          </div>
        )}
      </Section>
      <Section negativeMargin primary active={state.activeTab === "indexer"}>
        <Editor>
          {state.indexers.length > 0 &&
            (state.selected_indexer != undefined ? (
              <H2>{state.selected_indexer}</H2>
            ) : (
              <H2>{`${state.indexers[0].accountId}/${state.indexers[0].indexerName}`}</H2>
            ))}
          <Widget
            src={`dev-queryapi.dataplatform.near/widget/QueryApi.Editor`}
            props={{
              indexerName:
                selected_indexerName ?? state.indexers[0].indexerName,
              accountId: selected_accountId ?? state.indexers[0].accountId,
              path: "query-api-editor",
              tab: props.tab,
              activeView: state.activeIndexerView
            }}
          />
        </Editor>
        {state.activeTab === "create-new-indexer" && (
          <div>
            {state.indexers.length > 0 &&
              (state.selected_indexer != undefined ? (
                <H2>{state.selected_indexer}</H2>
              ) : (
                <H2>{`${state.indexers[0].accountId}/${state.indexers[0].indexerName}`}</H2>
              ))}
            <Widget
              src={`dev-queryapi.dataplatform.near/widget/QueryApi.Editor`}
              props={{
                indexerName:
                  selected_indexerName ?? state.indexers[0].indexerName,
                accountId: selected_accountId ?? state.indexers[0].accountId,
                path: "create-new-indexer",
              }}
            />
          </div>
        )}
      </Section>
    </Main>
  </Wrapper>
);
