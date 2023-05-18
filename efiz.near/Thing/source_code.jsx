const a = props.a;

const Container = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const Key = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const Value = styled.span`
  color: #888;
`;

function composeData(a) {
  return {
    post: {
      main: JSON.stringify({
        data,
        type: a.value.type,
      }),
    },
    index: {
      post: JSON.stringify({
        key: "main",
        value: {
          type: a.value.type,
        },
      }),
    },
  };
}

if (a.value.type === "image") {
  return (
    <Container>
      <Row>
        <Key>accountId:</Key>
        <Value>{a.accountId}</Value>
      </Row>
      <Row>
        <Key>blockHeight:</Key>
        <Value>{a.blockHeight}</Value>
      </Row>
      <Row>
        <Key>value.type:</Key>
        <Value>{a.value.type}</Value>
      </Row>
      <Row>
        <Key>action:</Key>
        <Value>{a.action}</Value>
      </Row>
      <Row>
        <Key>key:</Key>
        <Value>{a.key}</Value>
      </Row>
      <Row>
        <Key>index:</Key>
        <Value>{a.index}</Value>
      </Row>
    </Container>
  );
}
