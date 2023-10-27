const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"a533000789133b09ef7a8e744db4a1d2c9322febf94dc01a83980bd7cad51ba5.near","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"s","kind":"view","label":"sss","button":"sss","className":".text-info","classButton":".text-info","export":true,"params":{"serialization_type":"json","args":[{"name":"sss","label":"sss","button":"","className":".text-info","classButton":"","type_schema":{"type":"string"},"value":"ád"},{"name":"","label":"","button":"","className":"","classButton":"","type_schema":{"type":"string"},"value":""}]},"deposit":0,"gas":30000000000000}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
