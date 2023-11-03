const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"linear-protocol.near","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"deposit_and_stake","kind":"call","label":"","button":"","className":"","classButton":"","export":true,"params":{"serialization_type":"json","args":[]},"deposit":1,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":true,"gasUnit":"yoctoNEAR"}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
