const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"chatme.near","cssStyle":".card{  background-image: url(https://cdn5.vectorstock.com/i/1000x1000/90/94/snowman-with-snow-theme-background-vector-3489094.jpg);  border: 10px;  border-style: striped;  border-image-slice: 1;  border-image: repeating-linear-gradient(-45deg, #ff0000, #ff0000 10px, #00ff00 10px, #00ff00 20px) 1;}.card-header{  text-align: center;  font-weight: bold;  font-size: 40px;color:yellow;}button{  font-size: 30px;}input{  font-size: 30px;}label{  font-size: 30px;  color: yellow;}","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"create_new_group","kind":"call","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"title","type_schema":{"type":"string"},"value":""},{"name":"image","type_schema":{"type":"string"},"value":"30"},{"name":"text","type_schema":{"type":"string"},"value":"30"},{"name":"url","type_schema":{"type":"string"},"value":"30"},{"name":"group_type","type_schema":{"type":"enum"},"value":"Channel","enum":["Channel","Private","Public"]},{"name":"members","type_schema":{"type":"array"},"value":[]}]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
