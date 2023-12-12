const [expenses, setExpenses] = useState([]);
const [budget, setBudget] = useState(1000);
const [isEditing, setIsEditing] = useState(false);
const [editedBudget, setEditedBudget] = useState(budget);
const [description, setDescription] = useState("");
const [amount, setAmount] = useState("");
const [category, setCategory] = useState("");
const [searchQuery, setSearchQuery] = useState("");
const [editModalOpen, setEditModalOpen] = useState(false);
const [expenseToEdit, setExpenseToEdit] = useState(null);

const onAddExpense = (newExpense) => {
  setExpenses([...expenses, newExpense]);
};

const onDeleteExpense = (id) => {
  const updatedExpenses = expenses.filter((expense) => expense.id !== id);
  setExpenses(updatedExpenses);
};

const onEditExpense = (editedExpense) => {
  const updatedExpenses = expenses.map((expense) =>
    expense.id === editedExpense.id ? editedExpense : expense
  );
  setExpenses(updatedExpenses);
};

const onEditBudget = (newBudget) => {
  setBudget(newBudget);
};

const categorizeExpense = (description) => {
  // ... (unchanged)

  return "others"; // Default category if no match
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (!description || !amount) return;

  const expenseCategory = categorizeExpense(description);

  const newExpense = {
    id: Date.now(),
    description,
    amount: parseFloat(amount),
    category: category || expenseCategory,
  };

  onAddExpense(newExpense);

  setDescription("");
  setAmount("");
  setCategory("");
};

const handleEdit = () => {
  onEditBudget(editedBudget);
  setIsEditing(false);
};

const openEditModal = (expense) => {
  setExpenseToEdit(expense);
  setEditModalOpen(true);
};

const closeEditModal = () => {
  setExpenseToEdit(null);
  setEditModalOpen(false);
};

const handleEditExpense = () => {
  onEditExpense(expenseToEdit);
  closeEditModal();
};

const filteredExpenses = expenses.filter(
  (expense) =>
    expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchQuery.toLowerCase())
);

useEffect(() => {
  if (expenseToEdit) {
    setDescription(expenseToEdit.description);
    setAmount(expenseToEdit.amount.toString());
    setCategory(expenseToEdit.category);
  }
}, [expenseToEdit]);

const handleEditmodel = () => {
  const editedExpense = {
    ...expenseToEdit,
    description,
    amount: parseFloat(amount),
    category,
  };

  onEditExpense(editedExpense);
  onClose();
};
return (
  <div className="app-container">
    <h1 className="header">Expense Tracker</h1>

    <div>
      <h2>Budget Overview</h2>
      {isEditing ? (
        <div>
          <label>
            New Budget:
            <input
              type="number"
              value={editedBudget}
              onChange={(e) => setEditedBudget(parseFloat(e.target.value))}
            />
          </label>
          <button onClick={handleEdit} className="edit">
            Save
          </button>
        </div>
      ) : (
        <>
          <div className="budget-overview">
            <p className="budget">Budget: ₦{budget.toFixed(2)}</p>
            <p className="expense">
              Total Expenses: ₦
              {expenses
                .reduce((total, expense) => total + expense.amount, 0)
                .toFixed(2)}
            </p>

            <p className="remain">
              Remaining Budget: ₦
              {(
                budget -
                expenses.reduce((total, expense) => total + expense.amount, 0)
              ).toFixed(2)}
            </p>
          </div>
          <button onClick={() => setIsEditing(true)} className="edit">
            Edit Budget
          </button>
        </>
      )}
    </div>
    <div className="form-ex">
      <br />
      <div className="form-input">
        <label>
          Description:
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
      </div>
      <br />
      <button onClick={handleSubmit}>Add Expense</button>
    </div>
    <div>
      <h2>Expense List</h2>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search expenses..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {/* Display filtered expenses */}
        {filteredExpenses.map((expense) => (
          <li key={expense.id}>
            <div>
              <strong>{expense.description}</strong>
              <span>{expense.category}</span>
              <span>${expense.amount}</span>
            </div>
            <div>
              <button onClick={() => openEditModal(expense)}>Edit</button>
              <button onClick={() => onDeleteExpense(expense.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className={`modal ${editModalOpen ? "open" : ""}`}>
        <div className="modal-content">
          <span className="close" onClick={closeEditModal}>
            &times;
          </span>
          <h2>Edit Expense</h2>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
          <button onClick={handleEditmodel}>Save Changes</button>
        </div>
      </div>
    </div>
  </div>
);
