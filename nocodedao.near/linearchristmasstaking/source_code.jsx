const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"linear-protocol.near","cssStyle":"div {margin:50px;}.card{  background-image: url(https://cdn5.vectorstock.com/i/1000x1000/90/94/snowman-with-snow-theme-background-vector-3489094.jpg);  border: 10px;  border-style: striped;  border-image-slice: 1;}.card-header{  text-align: center;  font-weight: bold;  font-size: 40px;color:yellow;}button{  font-size: 30px;}input{  font-size: 30px;}label{  font-size: 30px;  color: yellow;}","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"deposit_and_stake","kind":"call","label":"Linear Staking Contract","button":"Stake Now!","className":"text-center","classButton":"fs-1 btn-success","labelDeposit":"Deposit NEAR","export":true,"params":{"serialization_type":"json","args":[]},"deposit":"0","gas":30000000000000,"depositUnit":"near","selfInputDeposit":true,"gasUnit":"yoctoNEAR"}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
