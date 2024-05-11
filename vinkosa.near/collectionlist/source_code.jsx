const initialData = JSON.parse(
  Social.get("vinkosa.near/collectionList/**").data
);
console.log(initialData);

const EditableList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(initialData);
  }, [initialData]);
  const handleNameChange = (id, newName) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      )
    );
  };

  const handleAmountChange = (id, newAmount) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, amountOwed: newAmount } : item
      )
    );
  };

  const toggleEdit = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, editable: !item.editable } : item
      )
    );
  };

  const getTotalAmountOwed = () => {
    return data.reduce((total, person) => total + person.amountOwed, 0);
  };
  const handleSubmit = () => {
    // Handle submission logic here
    console.log("Form submitted!");
    Social.set({ collectionList: { data } });
  };
  return (
    <>
      <h2>Editable List</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Amount Owed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person, index) => (
            <tr key={person.id}>
              <td>{index + 1}</td>
              <td>
                {person.editable ? (
                  <input
                    type="text"
                    value={person.name}
                    onChange={(e) =>
                      handleNameChange(person.id, e.target.value)
                    }
                  />
                ) : (
                  person.name
                )}
              </td>
              <td>
                {person.editable ? (
                  <input
                    type="number"
                    value={person.amountOwed}
                    onChange={(e) =>
                      handleAmountChange(person.id, parseFloat(e.target.value))
                    }
                  />
                ) : (
                  `$${person.amountOwed}`
                )}
              </td>
              <td>
                <button onClick={() => toggleEdit(person.id)}>
                  {person.editable ? "Save" : "Edit"}
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="3">Total:</td>
            <td>${getTotalAmountOwed()}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

return EditableList();
