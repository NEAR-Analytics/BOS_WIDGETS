const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"nft.genadrop.near","cssStyle":"","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"nft_approve","kind":"call","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"token_id","type_schema":{"type":"$ref"},"value":"nft.genadrop.near"},{"name":"account_id","type_schema":{"type":"$ref"},"value":"nft.genadrop.near"}]},"deposit":1,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
