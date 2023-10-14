const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"hello.near-examples.near","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"set_greeting","kind":"view","export":true,"params":{"serialization_type":"json","args":[{"name":"greeting","type_schema":{"type":"string"},"value":""}]},"deposit":0,"gas":30000000000000},{"name":"get_greeting","kind":"view","export":true,"params":{"serialization_type":"json","args":[{"name":"greeting","type_schema":{"type":"string"},"value":""}]},"deposit":0,"gas":30000000000000}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
