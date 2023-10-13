const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"pichtran.near","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"Post","kind":"view","label":"HelloMagicBuild","button":"","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
