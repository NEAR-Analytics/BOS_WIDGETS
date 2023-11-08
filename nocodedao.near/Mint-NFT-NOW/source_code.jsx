const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"nft.genadrop.near","cssStyle":".card {  background-image: url(https://cdn5.vectorstock.com/i/1000x1000/90/94/snowman-with-snow-theme-background-vector-3489094.jpg);  background-repeat: no-repeat;  background-size: cover;}.card-header {  background-color: white;  text-align: center;  font-weight: bold;  font-size: 40px;}.card-header button {  font-size: 30px;}.card input {  font-size: 30px;}.card label {  font-size: 30px;  color: white;}.card {  border: 10px dashed red;  border-style: dashed;  border-image: repeating-linear-gradient(    45deg,    red,    green 20px,    red 40px  ) 10;}","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"nft_mint","kind":"call","label":"Genadrop NFT Minter","button":"Mint Now","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"token_ids","type_schema":{"type":"string"},"value":"","label":"Tokenid","className":""},{"name":"metadata","type_schema":{"type":"json"},"value":"","label":"Metadata"},{"name":"receiver_id","type_schema":{"type":"string"},"value":"","label":"Owner"}]},"deposit":"9000000000000000000000","gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
