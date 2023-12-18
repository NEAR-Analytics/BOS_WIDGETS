const { className, title, icon, href, onClick } = props;

const { href: linkHref } = VM.require("devhub.near/widget/core.lib.url");

linkHref || (linkHref = () => {});
const PostContainer = styled.div`
    position: relative;
  display: flex;
  border: 1px solid #FFFFFF;
  background-color: #151515;
  padding: 16px;
  border-radius: 15px

  
`;

const Button = styled.button`
  position: absolute;
  bottom: 16px;
  right: 16px;
   display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 7px 15px;
  min-width: 6.5em;
  gap: 0.5em;
  border: 1px solid #00ec97;
  border-radius: 70px;
  background: #00ec97;
  color: #11181c;
  font-style: normal;
  font-weight: 750;
  font-size: 18px;
  text-align: center;
  white-space: nowrap;
  transition: all 0.4s ease-in-out;


  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    background: #11181c;
    border: 1px solid #11181c;
    color: #fff;

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
  eth_address: info.eth_address,
  bitkub_address: info.bitkub_address,
  jfin_address: info.jfin_address,
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
      <h2>
        <b>{state.name}</b>
      </h2>
      <PostText>
        <b>Description:</b> {des[2]}
      </PostText>
      <PostText>{des[0]}</PostText>
      <PostText>{des[1]}</PostText>
      <PostText>
        <b>Posted By:</b> {state.authorId} · {timestamp}
      </PostText>
      <PostText>eth: {state.eth_address}</PostText>
      <PostText>kub: {state.kub_address}</PostText>
      <PostText>jfin: {state.jfin_address}</PostText>

      <Link
        to={linkHref({ widgetSrc: "donationhubv2.near/widget/donate" })}
        props={{ information: info }}
      >
        <Button>Donate </Button>
      </Link>
    </PostInfo>
  </PostContainer>
);
