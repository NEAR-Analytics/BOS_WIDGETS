const $ = VM.require("sdks.near/widget/Loader");
const { ExternalDependency, Blockies } = $("@sdks/blockies");

Blockies = new Blockies(State, state);

const [blockie, setBlockie] = useState("");
const [onlyOnce, setOnlyOnce] = useState(true);

if (Blockies.isReady() && onlyOnce) {
  Blockies.create(context.accountId).then((blockie) => {
    setBlockie(blockie);
  });
  setOnlyOnce(false);
}

const Image = styled.img`
    width:24px;
    height:24px;
    border-radius:100%;
`;

const Avatar = styled.div`
    width:40px;
    height:40px;
    padding:5px;
    border-radius:100%;
    box-shadow: 0 0 0 2px rgba(255,255,255,.05);

    img {
      width:100%;
      border-radius:100%;
    }
`;

return (
  <>
    <ExternalDependency adapter={Blockies} />
    <Avatar>{blockie && <Image src={blockie} />}</Avatar>
  </>
);
