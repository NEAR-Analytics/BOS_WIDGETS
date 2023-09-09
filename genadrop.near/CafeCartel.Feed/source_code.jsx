/**To-Do  filter out location nad hard code hashtag */
const Text = styled.p`
  font-family: "Playfair Display";
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
  align-content: "center";
  justify-content: "center";
`;
const hashtag = props.hashtag || "APAC";

const hashtags = hashtag && hashtag.split(",")?.map((it) => it.trim());
hashtags.push("ProofOfCafe");
const mention = props.mention || "";
const mentions = mention && mention.split(",")?.map((it) => it.trim());

State.update({ thisComponent, mention });

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
    .location-button {
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

      color: #7E868C;
    }
  }
  
`;

return (
  <div>
    <Widget src="genadrop.near/widget/CafeCartel.Header" />
 {   <Widget
      src="genadrop.near/widget/CafeCartel.Feed.ViewPostsOnly"
      props={{
        data: {
          sources: [
            {
              domain: "proof",
              key: "cafe",
            },
          ],
          typeWhitelist: ["md"],
          hashtagWhitelist: hashtags,

          postTemplate: "proofofvibes.near/widget/Vibes.Feed.View.main",
          composeTemplate: "genadrop.near/widget/CafeCartel.Post",
        },
      }}
    /> }

    <Widget src="genadrop.near/widget/CafeCartel.Footer" />
  </div>
);
