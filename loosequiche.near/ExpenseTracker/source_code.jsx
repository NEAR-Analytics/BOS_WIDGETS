function App() {
  const [activeContent, setActiveContent] = useState("ExpenseTracker");
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleButtonClick = () => {
    setActiveContent("ExpenseTracker");
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAddExpense = () => {
    if (description && amount) {
      const newExpense = {
        id: new Date().getTime(),
        description,
        amount: parseFloat(amount),
      };
      setExpenses([...expenses, newExpense]);
      setDescription("");
      setAmount("");
    }
  };

  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  // Calculate total expense
  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <div>
      <div className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" onClick={handleButtonClick}>
            <img
              src="https://res.cloudinary.com/dglhc1pfj/image/upload/f_auto,q_auto/v1/samples/lhoetmcicrxlihdcdpou"
              alt=""
              width="50px"
              height="50px"
            />
            Near India
          </a>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        {activeContent === "ExpenseTracker" && (
          <div style={{ padding: "20px" }}>
            <h2>Expense Tracker</h2>
            <div>
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={handleDescriptionChange}
              />
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={handleAmountChange}
              />
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <button onClick={handleAddExpense}>Add Expense</button>
              </div>
            </div>
            <div>
              <h3>Expenses:</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {expenses.map((expense) => (
                  <li key={expense.id} style={{ marginBottom: "5px" }}>
                    {expense.description} - ${expense.amount}
                    <button onClick={() => handleDeleteExpense(expense.id)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Total Expense: ${totalExpense}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

return <App />;
