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
State.init({ selected: null });

/**
 * Render
 */
return (
  <>
    <div class="container">
      <Title>Select a main group</Title>
      <Carousel>
        {Object.keys(props.data).map((code) => (
          <Card
            onClick={() => {
              State.update({ selected: code });
              props.onSelect(code);
            }}
            style={{
              backgroundColor: state.selected === code ? `#345AD5` : `white`,
              color: state.selected === code ? `white` : `#345AD5`,
            }}
          >
            <CardText>{props.data[code].name}</CardText>
          </Card>
        ))}
      </Carousel>
    </div>
  </>
);
