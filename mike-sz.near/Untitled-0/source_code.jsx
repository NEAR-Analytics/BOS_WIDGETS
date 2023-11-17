const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 2rem 3rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  border-radius: 0.5rem;
  border: 1px solid var(--ui-elements-light, #eceef0);
  background: var(--background-light, #fafafa);
`;

const [accVar, setAccVar] = useState("");
const [NFTarr, setNFTarr] = useState([]);
const [accountId, setaccountId] = useState("");

function fetchNFT(value) {
  setaccountId(accVar);
  asyncFetch(
    `https://api.kitwallet.app/account/${value}/likelyNFTsFromBlock`
  ).then((res) => {
    setNFTarr(res.body.list);
  });
}

const data = (
  <>
    <div className="row mb-3 w-100">
      <div className="col-xl-12 p-2">
        <Widget
          src={`mike-sz.near/widget/Inputs.Text`}
          props={{
            label: "Wallet Adress",
            placeholder: "type the address.near here!",
            value: state.address1,
            onChange: (address1) => {
              State.update({ address1 });
              setAccVar(address1);
            },
          }}
        />

        <button onClick={() => fetchNFT(accVar)}>fetchNFTs</button>
        <div className="d-flex gap-1 mt-4 flex-wrap">
          {NFTarr.map((contractId, i) => (
            <Widget
              key={i}
              src={
                thumbnails
                  ? "mike-sz.near/widget/NftCollectionThumbs"
                  : "mike-sz.near/widget/NftCollection"
              }
              props={{ accountId, contractId }}
            />
          ))}
        </div>
      </div>
    </div>
  </>
);

return <Container>{data}</Container>;
