const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"chatme.near","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"init","kind":"call","label":"","button":"","className":"","classButton":"","export":true,"params":{"serialization_type":"json","args":[{"name":"owner_id","type_schema":{"type":"$ref"},"value":"chatme.near","className":"chatme.near8"}]},"deposit":1,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
