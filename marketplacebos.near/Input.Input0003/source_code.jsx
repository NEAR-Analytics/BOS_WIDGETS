State.init({
  img: null,
  color: "black",
});

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;
  max-width: 200px; 
  align-items: center;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #ccc; 
  font-weight: 500; 
  cursor: not-allowed; 
  opacity: 0.7; 

`;

const props = {
  copyBtn:
  `
  State.init({
  img: null,
  color: "black",
});
\n
  `+
    "const Grid = styled.div`\n" +
    `  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;
  max-width: 200px; 
  align-items: center;` +
    "`;" +
    "\nconst Label = styled.div`\n" +
    `  font-size: 0.875rem;
  color: #ccc; 
  font-weight: 500; 
  cursor: not-allowed; 
  opacity: 0.7; ` +
    "`;" +
    `\n return(
        <Grid>
        <Label htmlFor="picture">Picture</Label>
        <IpfsImageUpload
                image={state.img}
                style={{ color: state.color, borderColor: state.color }}
              />
         </Grid>  
    )`,
  component: (
    <Grid>
      <Label htmlFor="picture">Picture</Label>
      <IpfsImageUpload
        image={state.img}
        style={{ color: state.color, borderColor: state.color }}
      />
      </Grid>
  ),
  detailLink: "https://near.org/marketplacebos.near/widget/Detail.I0003",
};

return (
  <>
    <Widget src="marketplacebos.near/widget/CardMain.CardMini" props={props} />
  </>
);

