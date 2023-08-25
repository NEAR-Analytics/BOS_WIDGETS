// Styles
const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: #345AD5; 
`;
const Carousel = styled.div`
  margin-top: 5px;
  width: 100%;
  display: flex;
  flex-direction: row;
  border-top: 1px solid silver;
  // border-bottom: 1px solid silver;
  overflow-x: auto;
  background-color: white;
  padding: 10px 0px
`;
const Card = styled.div`
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
  overflow: hidden;
  padding: 5px;
  background-color: white;
  border: 1px solid gray;
  cursor: pointer;
`;

const CardText = styled.div`
  word-break: break-word;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
`;

// States

/**
 * Render
 */
const indents = [];

// Get my schemas (without version)
const mySchemas = [];
if (props.mySchemas !== undefined) {
  for (let i = 0; i < props.mySchemas.length; i++) {
    const schemaRaw = props.mySchemas[i];
    const schemaPieces = schemaRaw.split("#");
    const schema = schemaPieces[0];
    mySchemas.push(schema);
  }
}

if (props.schemas !== undefined) {
  for (let code of Object.keys(props.schemas)) {
    const schemaRaw = props.schemas[code].name;
    const schemaPieces = schemaRaw.split("#");
    const schema = schemaPieces[0];
    indents.push(
      <Card
        onClick={() => {
          if (mySchemas.includes(schema)) return;
          props.onSelect(code, schemaRaw);
        }}
        style={
          mySchemas.includes(schema)
            ? {
                backgroundColor: `silver`,
                color: `gray`,
                cursor: `default`,
              }
            : {
                backgroundColor: `white`,
                color: `#345AD5`,
                cursor: `pointer`,
              }
        }
      >
        <CardText>{schema}</CardText>
      </Card>
    );
  }
}

return (
  <>
    <div class="container">
      <Title>Select schemas</Title>
      <Carousel>{indents}</Carousel>
    </div>
  </>
);
