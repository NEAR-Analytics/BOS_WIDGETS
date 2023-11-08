const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"linear-protocol.near","cssStyle":".card {  background: linear-gradient(to bottom right, #c62828, #2e7d32);  border: 10px solid transparent;  border-image: repeating-linear-gradient(45deg, #c62828, #c62828 10px, #2e7d32 10px, #2e7d32 20px) 30;}.card-header {  font-family: sans-serif;  font-size: 40px;  font-weight: bold;  color: white;  text-align: center;}.card-header label {  font-size: 30px;}.card-header input {  font-size: 30px;}.card-header button {  font-size: 30px;}Please note that the provided CSS styles are based on the given user prompt and may need additional adjustments depending on the specific implementation and requirements of the UI.","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"deposit_and_stake","kind":"call","label":"Linear Staking Contract","button":"Stake NOW!","className":"","classButton":"fs-3 btn-success","labelDeposit":"Deposit NEAR","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":true,"gasUnit":"yoctoNEAR"}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
