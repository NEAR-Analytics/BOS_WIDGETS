const PostContainer = styled.div`
  display: flex;
  border: 1px solid #FFFFFF;
  background-color: #151515;
  padding: 16px;
  border-radius: 15px
`;

const PostInfo = styled.div`
  flex: 1;
  padding: 10px;
`;

const PostText = styled.p`
  margin: 5px;
`;

const info = props.information;

State.init({
  showVoters: false,
  name: info.name,
  description: String(info.description),
  authorId: info.authorId,
  timestamp: info.timestamp,
});

let des = state.description.split("~");

function readableDate(timestamp) {
  var a = new Date(timestamp);
  return a.toDateString() + " " + a.toLocaleTimeString();
}

const timestamp = readableDate(
  state.timestamp ? state.timestamp / 1000000 : Date.now()
);

return (
  <PostContainer>
    <PostInfo>
      <h2>{state.name}</h2>
      <PostText>
        <b>Description:</b> {des[2]}
      </PostText>
      <PostText>{des[0]}</PostText>
      <PostText>{des[1]}</PostText>
      <PostText>
        <b>Posted By:</b> {state.authorId} {timestamp}
      </PostText>
    </PostInfo>
  </PostContainer>
);
