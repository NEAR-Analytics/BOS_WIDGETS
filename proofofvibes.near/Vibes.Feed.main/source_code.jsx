const location = props.location || "Paris";
const hashtag = props.hashtag || "ProofOfVibes";
const hashtags = hashtag && hashtag.split(",")?.map((it) => it.trim());
hashtags.push(location);

const mention = props.mention || "";
const mentions = mention && mention.split(",")?.map((it) => it.trim());

// Vibes Enter lookcation proofofvibes.near/widget/Vibes.Feed.main // add location

// add style devs
const thisComponent = `proofofvibes.near/widget/Vibes.Feed.main?mention=${mention}location=${location}`; // need to onchange to this
// Suggested location. use onChange like for nft selector

State.init({ location, thisComponent, mention });
// location enter field

const onChangeLocation = (location) => {
  State.update({
    location,
  });
  recalculateComponent();
};
const recalculateComponent = () => {
  const componentName = `proofofvibes.near/widget/Vibes.Feed.main?mention=${state.mention}&location=${state.location}`;
  State.update({
    thisComponent: componentName,
  });
};
const Card = styled.div`
padding: 1em;
border: 1px solid #e5e8eb;
gap: 2em;
margin: 10px auto;
border-radius: .7em;
`;
const Actions = styled.div`
  display: flex;
  gap: 6px;
`;
const Input = styled.input`
  display: block;
  padding:.5em;
  width:100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus{
    border:1px solid #0d99ff;
  }
  ::placeholder {
    color: palevioletred;
  }
`;
const FollowButtonWrapper = styled.div`
  width: 100%;
  div,
  button {
    width: 100%;
  }
  @media (max-width: 1200px) {
    width: auto;
    div,
    button {
      width: auto;
    }
  }
`;
const Wrapper = styled.div`
 .bi-search {
    position: absolute;
    top: 0;
    z-index: 100;
    font-size: 14px;
    width: 100%;
    line-height: 40px;
    color: #687076;
  }

  .input-group {
    height: 100%;
    wdith: 100%;
  }

  input {
    padding: 0 14px 0 42px;
    border: 1px solid #d0d5dd !important;
    background: #ffffff;
    border-radius: 100px;
  }

  .join-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    background: #FBFCFD;
    border: 1px solid #D7DBDF;
    color: ${props.primary ? "#006ADC" : "#11181C"} !important;
    white-space: nowrap;

    &:hover,
    &:focus {
      background: #ECEDEE;
      text-decoration: none;
      outline: none;
    }

    i {
      display: inline-block;
      transform: rotate(90deg);
      color: #7E868C;
    }
  }
`;

return (
  <div>
    <Card>
      <div className="location-ticker">
        📍 Suggested Location:
        <Widget src="proofofvibes.near/widget/Vibes.Feed.Post.Location" />
      </div>
      <div className="col">
        <Input
          type="text"
          onChange={(e) => onChangeLocation(e.target.value)}
          placeholder={"Current Selected Location: " + state.location}
        />
        <Actions>
          <Wrapper>
            <a href={state.thisComponent} target="_blank">
              <button
                disabled={context.loading}
                onClick={donate}
                className="join-button"
              >
                <i className="bi bi-pin"></i>
                Update Location
              </button>
            </a>
          </Wrapper>
        </Actions>
      </div>
    </Card>

    <Widget
      src="efiz.near/widget/every.feed.view"
      props={{
        data: {
          hashtagWhitelist: hashtags,
          typeWhitelist: ["md"],
          embedMentions: mentions,
          postTemplate: "proofofvibes.near/widget/Vibes.Feed.View.main",
          composeTemplate: "proofofvibes.near/widget/Vibes.Feed.Post.create",
        },
      }}
    />
  </div>
);
