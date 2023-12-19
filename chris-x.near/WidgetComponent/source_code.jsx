const Button = styled.button`
  background-color: #8f73ff;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #b290ff;
  }
`;

State.init({
  // data1: "xxx",
});

const onSave = () => {
  Storage.privateSet("secretKey", "changeddd");
};

const onRead = () => {
  //   State.update({ data1: "HHH" });
  const mySecretData = Storage.privateGet("secretKey");
  State.update({ data1: mySecretData });
};
// Storage.privateSet("secretKey", "my-secret-value");

// const mySecretData = Storage.privateGet("secretKey");

return (
  <>
    <h2>{mySecretData}</h2>
    <h2>{state.data1}</h2>
    <Button
      onClick={() => {
        onSave();
      }}
    >
      Save
    </Button>

    <Button
      onClick={() => {
        onRead();
      }}
    >
      Read
    </Button>

    <div>
      <div>
        <button
          onClick={() => {
            clipboard.writeText(state.data1);
          }}
        >
          Copy "HelloWorld!" to clipboard
        </button>
      </div>
      <textarea className="form-control mt-2" placeholder="Test pasting here" />
    </div>
  </>
);
