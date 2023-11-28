State.init({
  selectedTab: Storage.privateGet("selectedTab") || "all",
  get_tagsList: [],
  get_tags,
  tag,
});

const contract = "jkjkjkjk.testnet";

const fetchData = () => {
  const result = Near.view(contract, "get_tags", {});
  State.update({ get_feedbacksList: result });
};

fetchData();

const addTag = () => {
  const tag = state.tag;

  const message = {
    tag: tag,
  };

  Near.call("jkjkjkjk.testnet", "add_tag", message);
};

const onInputStar = ({ target }) => {
  State.update({ tag: target.value });
};

const [newHashtag, setNewHashtag] = useState("");

const addNewHashtag = () => {
  console.log("Add button clicked"); // Check this log
  if (newHashtag.trim() !== "") {
    const updatedHashtags = [...hashtags, newHashtag.trim()];
    State.update({ hashtags: updatedHashtags });
    setNewHashtag("");
  }
};

const hashtags = ["nearsocial", "dev", "near", "nearafrica", "ProofOfVibes"];

const previousSelectedTab = Storage.privateGet("selectedTab");

if (previousSelectedTab && previousSelectedTab !== state.selectedTab) {
  State.update({
    selectedTab: previousSelectedTab,
  });
}

let accounts = undefined;

if (state.selectedTab === "following" && context.accountId) {
  const graph = Social.keys(`${context.accountId}/graph/follow/*`, "final");
  if (graph !== null) {
    accounts = Object.keys(graph[context.accountId].graph.follow || {});
    accounts.push(context.accountId);
  } else {
    accounts = [];
  }
} else {
  accounts = undefined;
}

function selectTab(selectedTab) {
  Storage.privateSet("selectedTab", selectedTab);
  State.update({ selectedTab });
}

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
  .post {
    padding-left: 24px;
    padding-right: 24px;

    @media (max-width: 1200px) {
      padding-left: 12px;
      padding-right: 12px;
    }
  }
`;

return (
  <>
    <div class="alert alert-primary" role="alert">
      Select searching post...
    </div>

    <Content>
      {context.accountId && (
        <>
          <ComposeWrapper>
            <Widget src="near/widget/Posts.Compose" />
          </ComposeWrapper>

          <FilterWrapper>
            <PillSelect>
              <PillSelectButton
                type="button"
                onClick={() => selectTab("all")}
                selected={state.selectedTab === "all"}
              >
                All
              </PillSelectButton>

              <PillSelectButton
                type="button"
                onClick={() => selectTab("following")}
                selected={state.selectedTab === "following"}
              >
                Following
              </PillSelectButton>
            </PillSelect>
            <div className="d-inline-flex gap-2">
              <Typeahead
                options={[...hashtags, newHashtag]} // Include the new hashtag in the options
                multiple
                onChange={(value) => {
                  State.update({ hashtags: value });
                }}
                placeholder="Hashtag filter"
              />
              <input
                type="text"
                value={newHashtag}
                onChange={(e) => setNewHashtag(e.target.value)}
                placeholder="Add new hashtag"
              />
              <button onClick={addNewHashtag}>Add</button>
            </div>
          </FilterWrapper>
        </>
      )}

      <FeedWrapper>
        <Widget
          src="marketplacebos.near/widget/TrendingPost.GetpostP"
          props={{ accounts, hashtags: state.hashtags }}
        />
      </FeedWrapper>
    </Content>
  </>
);
