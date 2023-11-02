const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"nft.genadrop.near","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"nft_mint","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"token_id","type_schema":{"type":"string"},"value":"","label":"Token ID"},{"name":"metadata","type_schema":{"type":"json"},"value":{},"label":"Metadata"},{"name":"receiver_id","type_schema":{"type":"$ref"},"value":"nft.genadrop.near","label":"My Account"}]},"deposit":0,"gas":30000000000000,"label":"Mint NFT","className":"bg-dark text-warning fs-1 text-center","button":"Mint Now","classButton":"btn-success "}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
