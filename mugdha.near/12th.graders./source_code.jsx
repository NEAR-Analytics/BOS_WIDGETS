const styled = require("styled-components");
const { State, Storage, Widget } = require("..."); // Replace '...' with the actual path

State.init({
  selectedTab: Storage.privateGet("selectedTab") || "all",
});

const daoId = props.daoId || "12th graders";
const domains = ["stress", "chem", "phy", "bio", "math", "fun", "memes"];
const hashtags = ["fun", "study"];

let accounts = null; // Fetch posts from all users

function selectTab(selectedTab) {
  Storage.privateSet("selectedTab", selectedTab);
  State.update({ selectedTab });
}

// Styled components
const H2 = styled.h2`
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
`;

const Content = styled.div`
  margin: 20px;
`;

const ComposeWrapper = styled.div`
  border-top: 1px solid #ccc;
  padding: 20px;
`;

const FilterWrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PillSelect = styled.div`
  display: flex;
  align-items: center;
`;

const PillSelectButton = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  border: 1px solid #ccc;
  background-color: ${(props) => (props.selected ? "#006ADC" : "#FFF")};
  color: ${(props) => (props.selected ? "#FFF" : "#000")};
  cursor: pointer;

  &:hover {
    background-color: #eceef0;
  }

  &:focus {
    outline: none;
  }
`;

const FeedWrapper = styled.div`
  padding: 20px;
`;

const Text = styled.p`
  color: #666;
  font-size: 16px;
`;

const TextLarge = styled.p`
  color: #666;
  font-size: 18px;
  text-align: center;
`;

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Component return
return (
  <>
    {context.accountId ? (
      <>
        <Content>
          <H2>Post</H2>
          <ComposeWrapper>
            <Widget src="hack.near/widget/create.posts" props={{ domains }} />
          </ComposeWrapper>
        </Content>

        <Content>
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
      </>
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
