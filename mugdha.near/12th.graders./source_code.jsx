const styled = require("styled-components");

State.init({
  selectedTab: Storage.privateGet("selectedTab") || "all",
});

const daoId = props.daoId || "12th graders";
const domains = ["stress", "chem", "phy", "bio", "math", "fun", "memes"];
const hashtags = ["fun", "study"];

function selectTab(selectedTab) {
  Storage.privateSet("selectedTab", selectedTab);
  State.update({ selectedTab });
}

// Fetch posts from all users
let accounts = Social.keys(`*/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});
accounts = Object.keys(accounts || {});

// Styled components
const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181c;
  margin: 0 0 24px;
  padding: 0 24px;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const Content = styled.div`
  @media (max-width: 1200px) {
    > div:first-child {
      border-top: none;
    }
  }
`;

const ComposeWrapper = styled.div`
  border-top: 1px solid #eceef0;
`;

const FilterWrapper = styled.div`
  border-top: 1px solid #eceef0;
  padding: 24px 24px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 1200px) {
    padding: 12px;
  }
`;

const PillSelect = styled.div`
  display: inline-flex;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;

    button {
      flex: 1;
    }
  }
`;

const PillSelectButton = styled.button`
  display: block;
  position: relative;
  border: 1px solid #e6e8eb;
  border-right: none;
  padding: 3px 24px;
  border-radius: 0;
  font-size: 12px;
  line-height: 18px;
  color: ${(p) => (p.selected ? "#fff" : "#687076")};
  background: ${(p) => (p.selected ? "#006ADC !important" : "#FBFCFD")};
  font-weight: 600;
  transition: all 200ms;

  &:hover {
    background: #ecedee;
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: #006adc !important;
    box-shadow: 0 0 0 1px #006adc;
    z-index: 5;
  }

  &:first-child {
    border-radius: 6px 0 0 6px;
  }
  &:last-child {
    border-radius: 0 6px 6px 0;
    border-right: 1px solid #e6e8eb;
  }
`;

const FeedWrapper = styled.div`
  padding: 20px;
`;

const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
  color: #000;
  margin: 0;
  max-width: 670px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const TextLarge = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: 18px;
  line-height: 1.5;
  font-weight: 400;
  color: #000;
  margin: 0;
  max-width: 670px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Container = styled.div`
  display: flex;
  max-width: 1080px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 24px;

  @media (max-width: 768px) {
    padding: var(--section-gap) 12px;
  }
`;

const Flex = styled.div`
  gap: 8px;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;

  @media (max-width: 998px) {
    flex-direction: column;
    gap: var(--section-gap);
  }
`;

// Component return
return (
  <>
    {context.accountId ? (
      <Content>
        <H2>Post</H2>
        <ComposeWrapper>
          <Widget src="hack.near/widget/create.posts" props={{ domains }} />
        </ComposeWrapper>

        <H2>Explore</H2>
        <div>
          <Text>Check out what the other 12th graders are up to</Text>
        </div>

        <FilterWrapper>
          <PillSelect>
            <PillSelectButton
              onClick={() => selectTab("all")}
              selected={state.selectedTab === "all"}
            >
              All
            </PillSelectButton>
          </PillSelect>
        </FilterWrapper>

        <FeedWrapper>
          <Widget
            src="hack.near/widget/view.posts"
            props={{
              accounts,
              domains: state.choose,
              hashtags: state.hashtags,
            }}
          />
        </FeedWrapper>
      </Content>
    ) : (
      <Container>
        <Flex>
          <TextLarge>
            Log in with your wallet to post and explore content by 12th graders.
          </TextLarge>
        </Flex>
      </Container>
    )}
  </>
);
