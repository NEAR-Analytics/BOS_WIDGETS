const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"nft.genadrop.near","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"nft_mint","kind":"call","export":true,"params":{"serialization_type":"json","args":[{"name":"token_id","type_schema":{"type":"string"},"value":"abc19238921"},{"name":"metadata","type_schema":{"type":"json"},"value":{"title":"Creator","description":"","media":"https://gateway.pinata.cloud/ipfs/QmcrFVzmbZddvsLwN8buUzTckVxRpMn2uShKQPPiPcHKHP","reference":"https://gateway.pinata.cloud/ipfs/QmcrFVzmbZddvsLwN8buUzTckVxRpMn2uShKQPPiPcHKHP"}},{"name":"receiver_id","type_schema":{"type":"$ref"},"value":"trustscore.near"}]},"deposit":0,"gas":300000000000000}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
