const [editModalOpen, setEditModalOpen] = useState(false);
const [expenseToEdit, setExpenseToEdit] = useState(null);
const [searchQuery, setSearchQuery] = useState("");

const openEditModal = (expense) => {
  setExpenseToEdit(expense);
  setEditModalOpen(true);
};

const closeEditModal = () => {
  setExpenseToEdit(null);
  setEditModalOpen(false);
};

// Filter expenses based on search query
const filteredExpenses = expenses.filter(
  (expense) =>
    expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchQuery.toLowerCase())
);

return (
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
            <button onClick={() => onDeleteExpense(expense.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
