const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"donate.potlock.near","cssStyle":".card {  background: linear-gradient(to bottom right, #ff8080, #00bfff); /* Gradient background */  padding: 20px;}.body{    width: 40%;}","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"get_donations_for_recipient","kind":"view","label":"View Potlock Donation For Recipent","button":"","className":"fs-1 ","classButton":"fs-3","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"Recipent","type_schema":{"type":"$ref"},"value":"magicbuid.near","className":"fs-3"}]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
