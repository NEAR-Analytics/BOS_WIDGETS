const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"nft.genadrop.near","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"nft_mint","kind":"call","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"token_id","type_schema":{"type":"string"},"value":"xncode"},{"name":"metadata","type_schema":{"type":"json"},"value":{"title":"Creator","description":"","media":"https://ivory-funny-guanaco-191.mypinata.cloud/ipfs/QmZBygbgyAFUKwcvDoNHYDbTRNYrRbUUndVAnwTrE9K4d2","reference":"https://ivory-funny-guanaco-191.mypinata.cloud/ipfs/QmZBygbgyAFUKwcvDoNHYDbTRNYrRbUUndVAnwTrE9K4d2"}},{"name":"receiver_id","type_schema":{"type":"$ref"},"value":"trustscore.near"}]},"deposit":"8000000000000000000000","gas":30000000000000,"depositUnit":"yoctoNEAR","selfInputDeposit":false,"gasUnit":"yoctoNEAR"},{"name":"nft_token","kind":"view","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"token_id","type_schema":{"type":"string"},"value":"30"}]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
