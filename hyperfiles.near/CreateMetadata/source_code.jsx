const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 5px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

function CreateMetadata(props) {
  const [name, setName] = useState(props.name ?? "");
  const [description, setDescription] = useState(props.description ?? "");

  return (
    <div>
      <h3>Metadata</h3>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  );
}

//module.exports = { MetadataComponent };

return { CreateMetadata };
