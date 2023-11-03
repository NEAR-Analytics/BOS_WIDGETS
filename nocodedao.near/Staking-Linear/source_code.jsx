const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"linear-protocol.near","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"deposit_and_stake","kind":"call","label":"Linear Staking","button":"Stake Now","className":"","classButton":"","labelDeposit":"Stake your NEAR!","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":true,"gasUnit":"yoctoNEAR"}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
