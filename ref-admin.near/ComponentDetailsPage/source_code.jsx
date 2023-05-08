State.init({
  copiedShareUrl: false,
  selectedTab: props.tab ?? "source",
});

if (props.tab && props.tab !== state.selectedTab) {
  State.update({
    selectedTab: props.tab,
  });
}

const src = props.src;
const [accountId, widget, widgetName] = src.split("/");
const existsData = Social.keys(`${accountId}/widget/${widgetName}`);
const exists = !existsData || Object.keys(existsData).length > 0;
const code = Social.get(`${accountId}/widget/${widgetName}`);
const data = Social.get(`${accountId}/widget/${widgetName}/**`);
const metadata = data.metadata;
const tags = Object.keys(metadata.tags || {});
const detailsUrl = `#/ref-admin.near/widget/ComponentDetailsPage?src=${src}`;
const shareUrl = `https://alpha.near.org${detailsUrl}`;

const dependencyMatch =
  code && code.matchAll(/<Widget[\s\S]*?src=.*?"(.+)"[\s\S]*?\/>/g);
let dependencySources = [...(dependencyMatch || [])]
  .map((r) => r[1])
  .filter((r) => !!r);
dependencySources = dependencySources.filter(
  (r, i) => dependencySources.indexOf(r) === i && r !== "(.+)"
);

const sourceCode = `
\`\`\`jsx
${code}
\`\`\`
`;

const Wrapper = styled.div`
  padding-bottom: 48px;
`;

const SummaryWrapper = styled.div`
  margin-bottom: 32px;
`;

const Tabs = styled.div`
  display: flex;
  height: 54px;
  overflow: auto;
  scroll-behavior: smooth;

  @media (max-width: 900px) {
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
  font-size: 16px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#fff" : "rgba(255,255,255,0.5)")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none !important;
  margin-right: 40px;

  &:hover {
    color: #fff;
  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: #00ffd1;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 336px;
  gap: 64px;

  background: #15272b;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
  border-radius: 16px;

  @media (max-width: 995px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .codeArea {
    > pre > div {
      background: transparent !important;
    }
  }
  .aboutArea {
    padding: 10px 20px;
    color: #fff;
  }
`;

const Sidebar = styled.div`
  padding: ${(p) => (p.area == "about" ? "10px" : "")};
  border-left: 2px solid #1e373d;
  .dependenciesArea {
    padding: 20px 28px;
  }
  > div {
    padding-bottom: 32px;
    border-bottom: 1px solid rgba(48, 67, 82, 0.5);
    margin-bottom: 32px;
    p {
      color: #fff;
    }

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
  font-weight: 500;
  font-size: 16px;
  color: #fff;
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
  p {
    color: #fff !important;
  }
`;

const HistoryContainer = styled.div`
  > div > h1,
  > div > .input-group.mb-3 {
    display: none;
  }
`;

if (!exists) {
  return (
    <>
      <Text bold>Error</Text>
      <Text>Could not find: {src}</Text>
    </>
  );
}

return (
  <Wrapper>
    <SummaryWrapper>
      <Widget
        src="ref-admin.near/widget/ComponentSummary"
        props={{
          primaryAction: "open",
          size: "large",
          showTags: false,
          src,
          istemplate: props.istemplate,
        }}
      />
    </SummaryWrapper>

    <Tabs>
      <TabsButton
        href={`${detailsUrl}&tab=preview`}
        selected={state.selectedTab === "preview"}
      >
        Preview
      </TabsButton>
      <TabsButton
        href={`${detailsUrl}&tab=about`}
        selected={state.selectedTab === "about"}
      >
        About
      </TabsButton>

      <TabsButton
        href={`${detailsUrl}&tab=source`}
        selected={state.selectedTab === "source"}
      >
        Source
      </TabsButton>

      <TabsButton
        href={`${detailsUrl}&tab=history`}
        selected={state.selectedTab === "history"}
      >
        History
      </TabsButton>
    </Tabs>

    {state.selectedTab === "preview" && (
      <Content>
        <Widget src={src} props={props}></Widget>
      </Content>
    )}

    {state.selectedTab === "about" && (
      <Content>
        <div class="aboutArea">
          {metadata.description ? (
            <Markdown text={metadata.description} />
          ) : (
            <Text>This component has no description.</Text>
          )}
        </div>

        <Sidebar area="about">
          {(tags.includes("Coming Soon") || tags.includes("coming-soon")) && (
            <div>
              <Widget src="adminalpha.near/widget/waitList" />
            </div>
          )}

          <div>
            <SmallTitle>Developer</SmallTitle>
            <Widget
              src="adminalpha.near/widget/AccountProfile"
              props={{
                accountId: accountId,
              }}
            />
          </div>

          {tags.length > 0 && (
            <div>
              <SmallTitle>Tags</SmallTitle>
              <Widget
                src="adminalpha.near/widget/Tags"
                props={{
                  tags,
                }}
              />
            </div>
          )}

          {metadata.linktree?.website && (
            <div>
              <SmallTitle>Website</SmallTitle>
              <TextLink
                href={`https://${metadata.linktree.website}`}
                target="_blank"
              >
                {metadata.linktree.website}
                <i className="bi bi-box-arrow-up-right"></i>
              </TextLink>
            </div>
          )}

          <div>
            <Text small>
              <i className="bi bi-clock"></i>
              Last updated
              <Widget
                src="mob.near/widget/TimeAgo"
                props={{ keyPath: `${accountId}/widget/${widgetName}` }}
              />{" "}
              ago.
            </Text>
          </div>
        </Sidebar>
      </Content>
    )}

    {state.selectedTab === "source" && (
      <Content>
        <div class="codeArea">
          <Markdown text={sourceCode} />
        </div>
        <Sidebar>
          <div class="dependenciesArea">
            <SmallTitle>Dependencies ({dependencySources.length})</SmallTitle>
            {dependencySources.length === 0 && (
              <Text>This component has no dependencies.</Text>
            )}
            {dependencySources.map((source) => (
              <Dependency key={source}>
                <Widget
                  src="adminalpha.near/widget/ComponentProfile"
                  props={{ src: source }}
                />
              </Dependency>
            ))}
          </div>
        </Sidebar>
      </Content>
    )}

    {state.selectedTab === "history" && (
      <HistoryContainer>
        <Widget
          src="ref-admin.near/widget/WidgetHistory"
          props={{ widgetPath: src }}
        />
      </HistoryContainer>
    )}
  </Wrapper>
);
