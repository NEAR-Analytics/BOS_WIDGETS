
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
  align-items: center;`;
const Label = styled.div`
  font-size: 0.875rem;
  color: #ccc; 
  font-weight: 500; 
  cursor: not-allowed; 
  opacity: 0.7; `;
 return(
        <Grid>
        <Label htmlFor="picture">Picture</Label>
        <IpfsImageUpload
                image={state.img}
                style={{ color: state.color, borderColor: state.color }}
              />
         </Grid>  
    )