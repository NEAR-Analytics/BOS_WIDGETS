const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"linear-protocol.near","cssStyle":".card {n  background: linear-gradient(to bottom right, #ff8080, #00bfff); /* Gradient background */n  padding: 20px;n}nn.card-header {n  text-align: center;n  font-family: sans-serif; /* Sans-serif font */n  font-weight: bold;n  font-size: 50px;n}nn.card-header button {n  /* Button styles */n  background-color: #00bfff; /* Complementary color to the background */n  color: #ffffff; /* Text color */n  border: none;n  padding: 10px 20px;n  font-size: 20px;n  cursor: pointer;n  transition: background-color 0.3s ease;n}nn.card-header button:hover {n  background-color: #0080ff; /* Button hover effect */n}nn.card input {n  /* Input styles */n  background-color: #ffffff; /* Complementary color to the background */n  color: #000000; /* Text color */n  border: 1px solid #dddddd;n  padding: 10px;n  font-size: 16px;n}nn.card label {n  /* Label styles */n  font-size: 30px;n  color: #ffffff; /* Text color */n}","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"deposit_and_stake","kind":"call","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":false,"gasUnit":"yoctoNEAR"}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
