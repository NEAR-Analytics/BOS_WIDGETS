const Button0013 = styled.button`
  display: inline-block;
  position: relative;
  padding: 10px 25px;
  background-color: #4CC713;
  color: white;
  font-family: sans-serif;
  text-decoration: none;
  font-size: 0.9em;
  text-align: center;
  text-indent: 15px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a21a;
    color: white;

    &:before {
      border-color: #cdefbd; 
    }

    &:after {
      margin-top: 0;
      opacity: 0.4;
    }
  }

  &:before, &:after {
    content: ' ';
    display: block;
    position: absolute;
    left: 15px;
    top: 52%;
  }

  &:before {
    width: 10px;
    height: 2px;
    border-style: solid;
    border-width: 0 2px 2px;
    transition: border-color 0.3s; 
  }

  &:after {
    width: 0;
    height: 0;
    margin-left: 1px;
    margin-top: -7px;
    border-style: solid;
    border-width: 4px 4px 0 4px;
    border-color: transparent;
    border-top-color: inherit;
    transition: margin-top 0.3s, opacity 0.3s;
  }
`;

const props = {
  copyBtn:
    "const Button0013 = styled.button`\n" +
    ` /* Styling for the button in its default state */
  display: inline-block;
  position: relative;
  padding: 10px 25px;
  background-color: #4CC713;
  color: white;
  font-family: sans-serif;
  text-decoration: none;
  font-size: 0.9em;
  text-align: center;
  text-indent: 15px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a21a;
    color: white;

    &:before {
      border-color: #cdefbd; 
    }

    &:after {
      margin-top: 0; 
      opacity: 0.4;
    }
  }

  &:before, &:after {` +
    "\ncontent: ' ';" +
    `    display: block;
    position: absolute;
    left: 15px;
    top: 52%;
  }

  &:before {
    width: 10px;
    height: 2px;
    border-style: solid;
    border-width: 0 2px 2px;
    transition: border-color 0.3s; 
  }

  &:after {
    width: 0;
    height: 0;
    margin-left: 1px;
    margin-top: -7px;
    border-style: solid;
    border-width: 4px 4px 0 4px;
    border-color: transparent;
    border-top-color: inherit;
    transition: margin-top 0.3s, opacity 0.3s; 
  }` +
    "`;" +
    `\n return(
        <Button0013>Download</Button0013>
        )`,
  component: <Button0013>Download</Button0013>,
  detailLink: "https://near.org/marketplacebos.near/widget/Detail.Button0013",
};
return (
  <>
    <Widget src="marketplacebos.near/widget/CardMain.CardMini" props={props} />
  </>
);
