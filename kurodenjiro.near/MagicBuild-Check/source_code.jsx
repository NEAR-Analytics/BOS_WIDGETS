const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"","cssStyle":"","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"check","kind":"call","label":"check","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"Check","label":"","button":"","className":"","classButton":"","type_schema":{"type":"string"},"value":""}]},"deposit":0,"depositUnit":"near","selfInputDeposit":false,"gas":30000000000000,"gasUnit":"yoctoNEAR"}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
