const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"linear-protocol.near","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"deposit","kind":"call","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"deposit_and_stake","kind":"call","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000},{"name":"version","kind":"view","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
