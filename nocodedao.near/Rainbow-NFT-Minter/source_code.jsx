const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"nft.genadrop.near","cssStyle":".card {  background: linear-gradient(to top right, #ffa0a0, #a0ffa0, #a0a0ff);}.card-header {  text-align: center;  font-weight: bold;  font-size: 40px;  color: #fff;}button {  background: #fff;  color: #a0a0a0;  font-size: 30px;}input {  background: #fff;  color: #a0a0a0;  font-size: 30px;}label {  color: #fff;}","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"nft_mint","kind":"call","label":"Genadrop NFT Minter","button":"Mint Now","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"token_id","type_schema":{"type":"string"},"value":""},{"name":"metadata","type_schema":{"type":"json"},"value":null},{"name":"receiver_id","type_schema":{"type":"string"},"value":""}]},"deposit":"9000000000000000000000","gas":30000000000000,"depositUnit":"yoctoNEAR","selfInputDeposit":false,"gasUnit":"yoctoNEAR"}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
