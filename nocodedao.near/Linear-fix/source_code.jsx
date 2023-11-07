const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"linear-protocol.near","cssStyle":".card {  background-color: #D3D3D3;  border: 10px solid #ADFF2F;  animation: crossfade 5s infinite;}.card-header {  text-align: center;  font-weight: bold;  font-size: 40px;}.card-header button {  font-size: 30px;}input {  font-size: 30px;}label {  font-size: 30px;}@keyframes crossfade {  0% {    border-color: red;  }  50% {    border-color: green;  }","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"deposit_and_stake","kind":"call","label":"Linear Staking Contract","button":"Stake Now!","className":"","classButton":"fs-4 btn-success","labelDeposit":"Deposit NEAR","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":true,"gasUnit":"yoctoNEAR"}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
