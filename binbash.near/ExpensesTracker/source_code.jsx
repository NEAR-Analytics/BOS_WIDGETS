const accountId = props.accountId || context.accountId;
const contractId = "binbash.near";

State.init({
  messages: [],
  status: null,
});

const getMessages = () => {
  const messages = Near.view(contractId, "get_all_statuses", null);
  State.update({
    messages,
  });
};

const postMessage = () => {
  if (!accountId) return;

  if (state.status === null || state.status == "") return;

  Near.call(contractId, "set_status", {
    message: state.status,
  });

  getMessages();
};

getMessages();

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Pacifico&family=Manrope:wght@200;300;400;500;600;700;800"
).body;

if (!cssFont) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
              ${cssFont}
                    font-family:  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                          color: #fff;

                                .expense-tracker {
                                        width: 550px;
                                                padding: 16px;
                                                        border-radius: 12px;
                                                                background: linear-gradient(270deg, #5a58e5 17.37%, #66acf7 100%);
                                                                        display: flex;
                                                                                flex-direction: column;
                                                                                        align-items: center;
                                                                                                justify-content: center;
                                                                                                        text-align: center;
                                                                                                              }
                                                
        .list{
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
           gap: 8px;
           background: #fff;
           color: #000;
           padding: 10px;
           width: 300px;
           border-radius: 10px
        }     
        .budget-overview{
            display: flex;
            justify-content: space-between;
           
            flex-direction: column;
            font-size:20px
        }  
        .budget-overview{
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 19px;
  align-items: center;
  
}
.budget{
  background-color:#fff ;
  padding: 10px;
  border-radius: 5px;
  font-weight: 600;
  color: rgb(58, 58, 58);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
}
.expense{
  background-color: rgb(255, 205, 205);
  padding: 10px;
  border-radius: 5px;
  font-weight: 600;
  color: red;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
}
.remain{
  background-color: rgb(189, 255, 189);
  padding: 10px;
  border-radius: 5px;
  font-weight: 600;
  color: green;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
}                                                                                                                                                       display: flex;
                                                                                                                                                                                                                                                                                                            justify-content: space-between;
                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                      `,
  });
}

const Theme = state.theme;

const [expenses, setExpenses] = useState([]);
const [budget, setBudget] = useState(1000);
const [isEditing, setIsEditing] = useState(false);
const [editedBudget, setEditedBudget] = useState(budget);
const [description, setDescription] = useState("");
const [amount, setAmount] = useState("");
const [category, setCategory] = useState("");
const [searchQuery, setSearchQuery] = useState("");

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
  const keywordsToCategories = {
    food: ["groceries", "restaurant", "food"],
    utilities: ["electricity", "water", "internet", "utilities"],
    entertainment: ["movies", "books", "games", "entertainment"],
    travel: ["airfare", "hotel", "transportation", "travel"],
    others: ["miscellaneous", "others"],
  };

  for (const [cat, keywords] of Object.entries(keywordsToCategories)) {
    if (
      keywords.some((keyword) => description.toLowerCase().includes(keyword))
    ) {
      return cat;
    }
  }

  return "others"; // Default category if no match
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!description || !amount) return;

  const expenseCategory = categorizeExpense(description);

  const newExpense = {
    id: Date.now(),
    description,
    amount: parseFloat(amount),
    category: category || expenseCategory,
  };

  // Sign and submit the expense transaction to the blockchain
  await postExpense({
    id: newExpense.id,
    description: newExpense.description,
    amount: newExpense.amount,
    category: newExpense.category,
  });

  onAddExpense(newExpense);

  setDescription("");
  setAmount("");
  setCategory("");
};

const remainingBudget = budget - totalExpenses;
const budgetThreshold = 0.8 * budget;

if (remainingBudget < budgetThreshold) {
  // Show notification
  showNotification("Budget Alert", {
    body: "You have spent 80% of your budget!",
  });
}

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

return (
  <Theme>
    <div className="expense-tracker">
      <h1 className="heading">Expense Tracker</h1>
      <p className="mb-4 text-base-content">
        You are logged in as <b>{accountId}</b>
      </p>
      <div>
        <h4>Budget Overview</h4>
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
            <button onClick={handleEdit} className="btn btn-success">
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
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary"
            >
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
        </div>
        <br />
        <button onClick={postMessage}>Add Expense</button>
      </div>
      <br />
      <div className="expense-table">
        <h2>Expense List</h2>
        <br />
        {/* Search input */}
        <input
          type="text"
          placeholder="Search expenses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <br />
        <ul>
          {/* Display filtered expenses */}
          {filteredExpenses.map((expense) => (
            <li className="container row" key={expense.id}>
              <div className=" list">
                <strong>{expense.description}</strong>
                <span>{expense.category}</span>
                <span>${expense.amount}</span>

                <button
                  onClick={() => onDeleteExpense(expense.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Theme>
);
