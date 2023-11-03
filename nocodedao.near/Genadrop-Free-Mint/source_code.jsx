const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"nft.genadrop.near","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"nft_mint","kind":"call","label":"Genadrop Free Mint NFT","button":"Mint Now!","className":"fs-1 text-center bg-success text-white","classButton":"fs-3 bg-primary","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"Token_id","type_schema":{"type":"string"},"value":"","label":"Token ID","className":"fs-4 text-start"},{"name":"Metadata","type_schema":{"type":"json"},"value":"","className":"fs-4 text-start"},{"name":"Receiver_id","type_schema":{"type":"string"},"value":"","label":"NFT Receiver","className":"fs-4 text-start"}]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"},{"name":"nft_token","kind":"view","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":false,"params":{"serialization_type":"json","args":[{"name":"token_id","type_schema":{"type":"string"},"value":""}]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
