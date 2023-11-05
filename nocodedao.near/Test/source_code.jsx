const user = context.accountId;
const props = {"schema_version":"0.3.0","address":"nft.genadrop.near","cssStyle":"div{nn  align-items: center;nn}n.card {n  background: linear-gradient(to bottom right, #00ff00, #ff0000); /* Replace with your desired gradient colors */n  border-radius: 10px;n  padding: 20px;n}nnbutton {n  background-color: #ff0000; /* Complementary color to the background gradient */n  color: #ffffff; /* Text color for the button */n  border: none;n  border-radius: 5px;n  padding: 10px 20px;n  font-size: 16px;n  cursor: pointer;n  transition: background-color 0.3s ease; /* Button hover effect */n}nnbutton:hover {n  background-color: #00ff00; /* Hover color for the button */n}nninput {n  border: 1px solid #ff0000; /* Border color for the input field */n  border-radius: 5px;n  padding: 10px;n  font-size: 16px;n}nnlabel {n  color: #ff0000; /* Text color for the label */n  font-size: 18px;n}nn/* Additional styles you may consider */nn.card {n  width: 300px; /* Adjust the size of the card as per your requirement */n}nnbutton {n  margin-top: 10px; /* Add spacing between the button and other elements */n}nnlabel {n  display: block; /* Ensure labels appear on a new line */n  margin-bottom: 5px; /* Add spacing between labels */n}","metadata":{"name":"","version":"0.1.0","authors":[""]},"body":{"functions":[{"name":"nft_mint","kind":"call","label":"","button":"","className":"","classButton":"","labelDeposit":"","export":true,"params":{"serialization_type":"json","args":[{"name":"owner_id","type_schema":{"type":"string"},"value":""},{"name":"token_ids","type_schema":{"type":"json"},"value":""},{"name":"memo","type_schema":{"type":"string"},"value":""}]},"deposit":0,"gas":30000000000000,"depositUnit":"near","selfInputDeposit":true,"gasUnit":"yoctoNEAR"}]}} 

return (
  <>
    <Widget src={'magicbuild.near/widget/widget'} props={props} />
  </>
);
