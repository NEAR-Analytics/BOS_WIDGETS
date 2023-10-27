const [src, setSrc] = useState("");

const Row = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
`;
const Button = styled.button``;
const Input = styled.input``;

const handleSubmit = () => {
  Social.set({
    settings: {
      every: {
        action: src,
      },
    },
  });
};

return (
  <div>
    <Row>
      <p>
        Input a widget src below that you would like to display when the black
        button is clicked:
      </p>
    </Row>
    <Row>
      <Input
        type="text"
        value={src}
        onChange={(e) => setSrc(e.target.value)}
        placeholder={"efiz.near/widget/Tree"}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </Row>
  </div>
);
