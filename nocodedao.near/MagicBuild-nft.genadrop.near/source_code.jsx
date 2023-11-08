const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"nft.genadrop.near","cssStyle":".card{  background-image: url("https://cdn5.vectorstock.com/i/1000x1000/90/94/snowman-with-snow-theme-background-vector-3489094.jpg");  border: 10px;  border-style: striped;  border-image-slice: 1;  border-image: repeating-linear-gradient(-45deg, #ff0000, #ff0000 10px, #00ff00 10px, #00ff00 20px) 1;}.card-header{  text-align: center;  font-weight: bold;  font-size: 40px;color:yellow;}button{  font-size: 30px;}input{  font-size: 30px;}label{  font-size: 30px;  color: yellow;}","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"nft_mint","kind":"call","label":"Genadrop Mint NFT","button":"Mint NOW!","className":"","classButton":"btn-success","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"token_id","type_schema":{"type":"string"},"value":"","label":"NFT ID"},{"name":"metadata","type_schema":{"type":"json"},"value":"","label":"Metadata"},{"name":"receiver_id","type_schema":{"type":"string"},"value":"","label":"Receiver NFT"}]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
