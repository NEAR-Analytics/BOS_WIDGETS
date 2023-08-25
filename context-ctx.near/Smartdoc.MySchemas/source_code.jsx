// Styles
const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: #345AD5; 
`;
const Container = styled.div`
  position: relative;
  margin-top: 5px;
  width: 100%;
  border-top: 1px solid silver;
  border-bottom: 1px solid silver;
  padding: 10px 0px;
  height: auto;
  min-height: 80px;
  overflow: hidden;
`;
const Card = styled.div`
  position: relative;
  width: 200px;
  min-width: 120px;
  height: 40px;
  border: 1px solid silver;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
  margin: 5px;
  padding: 5px;
  background-color: white;
  border: 1px solid gray;
  float: left;
`;
const ClearFix = styled.div`
  clear: both;
`;
const CardText = styled.div`
  word-break: break-word;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
`;
const DeleteSchema = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: black;
  color: white;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
  z-index: 999;
  text-align: center;

`;

// States

/**
 * Render
 */
const indents = [];

if (props.schemas !== undefined) {
  for (let i = 0; i < props.schemas.length; i++) {
    const schemaRaw = props.schemas[i];
    const schemaPieces = schemaRaw.split("#");
    const schema = schemaPieces[0];
    indents.push(
      <Card
        style={{
          backgroundColor: `white`,
          color: `#345AD5`,
        }}
      >
        <DeleteSchema
          onClick={() => {
            props.onDelete(schemaRaw);
          }}
        >
          x
        </DeleteSchema>
        <CardText>{schema}</CardText>
      </Card>
    );
  }
  indents.push(<ClearFix></ClearFix>);
}

return (
  <>
    <div class="container">
      <Title>My schemas</Title>
      <Container>{indents}</Container>
    </div>
  </>
);
