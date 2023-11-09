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
const Input = styled.input`
  height: 2.5rem; 
  width: 100%;
  border: 1px solid #ccc; 
  border-radius: 0.375rem;
  background-color: #fff; 
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #666; 
  font-weight: 500;
  outline: none; 
  transition: background-color 0.7s ease-in-out;
  &:hover{
    color:red;
    background: black;
  }`;
 return(
        <Grid>
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" />
        </Grid>  
    )