const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"chatme.near","cssStyle":"","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"edit_group","kind":"call","label":"","button":"","className":"","classButton":"","labelDeposit":"Đã đổi ","export":true,"params":{"serialization_type":"json","args":[{"name":"id","type_schema":{"type":"integer"},"value":0},{"name":"title","type_schema":{"type":"string"},"value":""},{"name":"image","type_schema":{"type":"string"},"value":""},{"name":"text","type_schema":{"type":"string"},"value":""},{"name":"url","type_schema":{"type":"string"},"value":""}]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":true,"gasUnit":"yoctoNEAR"}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
