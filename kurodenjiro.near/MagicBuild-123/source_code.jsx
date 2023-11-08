const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"123","cssStyle":"","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"123123","kind":"view","label":"123123123","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"123","label":"","button":"","className":"","classButton":"","type_schema":{"type":"string"},"value":"123"}]},"deposit":0,"depositUnit":"near","selfInputDeposit":false,"gas":30000000000000,"gasUnit":"yoctoNEAR"}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
