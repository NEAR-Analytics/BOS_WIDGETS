State.init({ theme: null });

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Pacifico&family=Manrope:wght@200;300;400;500;600;700;800"
).body;

if (!cssFont) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
              ${cssFont}
                    font-family: 'Pacifico', cursive, Manrope, sans-serif;
                          color: white;

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

                                                                                                                    .heading {
                                                                                                                            font-size: 36px;
                                                                                                                                    font-weight: 800;
                                                                                                                                            margin-bottom: 20px;
                                                                                                                                                  }

                                                                                                                                                        .form-input {
                                                                                                                                                                margin-bottom: 10px;
                                                                                                                                                                      }

                                                                                                                                                                            .expense-table {
                                                                                                                                                                                    width: 100%;
                                                                                                                                                                                            margin-top: 20px;
                                                                                                                                                                                                    border-collapse: collapse;
                                                                                                                                                                                                          }

                                                                                                                                                                                                                .expense-table th, .expense-table td {
                                                                                                                                                                                                                        border: 1px solid #fff;
                                                                                                                                                                                                                                padding: 8px;
                                                                                                                                                                                                                                        color: white;
                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                    .budget-card {
                                                                                                                                                                                                                                                            width: 100%;
                                                                                                                                                                                                                                                                    margin-top: 20px;
                                                                                                                                                                                                                                                                            padding: 16px;
                                                                                                                                                                                                                                                                                    border-radius: 12px;
                                                                                                                                                                                                                                                                                            background-color: rgba(255, 255, 255, 0.1);
                                                                                                                                                                                                                                                                                                    display: flex;
                                                                                                                                                                                                                                                                                                            justify-content: space-between;
                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                      `,
  });
}

const Theme = state.theme;

const ExpenseTracker = () => {
  // State to hold expense data
  const [expenses, setExpenses] = useState([]);
  // State for budget overview
  const [budgetOverview, setBudgetOverview] = useState({
    totalExpense: 0,
    budget: 1000, // Set your initial budget here
    remainingBudget: 1000,
  });

  // Function to handle expense submission
  const handleExpenseSubmit = (expense) => {
    // Update total expense and remaining budget
    const newTotalExpense = budgetOverview.totalExpense + expense.amount;
    const newRemainingBudget = budgetOverview.budget - newTotalExpense;

    // Update expense list
    const newExpenses = [...expenses, expense];

    // Update state
    setBudgetOverview({
      ...budgetOverview,
      totalExpense: newTotalExpense,
      remainingBudget: newRemainingBudget,
    });
    setExpenses(newExpenses);
  };

  return (
    <Theme>
      <div class="expense-tracker">
        <div class="heading">Expense Tracker</div>
        {/* Expense Form */}
        <div
          onSubmit={(e) => {
            e.preventDefault();
            // Collect form data
            const date = e.target.elements.date.value;
            const description = e.target.elements.description.value;
            const amount = parseFloat(e.target.elements.amount.value);
            const category = e.target.elements.category.value;

            // Validate amount is a number
            if (isNaN(amount)) {
              alert("Amount must be a number");
              return;
            }

            // Validate non-empty fields
            if (!date || !description || isNaN(amount) || !category) {
              alert("Please fill in all fields");
              return;
            }

            // Create expense object
            const expense = { date, description, amount, category };

            // Call handleExpenseSubmit
            handleExpenseSubmit(expense);

            // Clear the form
            e.target.reset();
          }}
        >
          <div class="form-input">
            <input type="date" name="date" required />
          </div>
          <div class="form-input">
            <input
              type="text"
              name="description"
              placeholder="Description"
              required
            />
          </div>
          <div class="form-input">
            <input type="number" name="amount" placeholder="Amount" required />
          </div>
          <div class="form-input">
            <input
              type="text"
              name="category"
              placeholder="Category"
              required
            />
          </div>
          <button class="proceed-button" type="submit">
            Add Expense
          </button>
        </div>

        {/* Expense Table */}
        <table class="expense-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.date}</td>
                <td>{expense.description}</td>
                <td>{expense.amount}</td>
                <td>{expense.category}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Budget Overview Card */}
        <div class="budget-card">
          <div>
            <p>
              Total Expense for the Day: $
              {budgetOverview.totalExpense.toFixed(2)}
            </p>
            <p>Budget: ${budgetOverview.budget.toFixed(2)}</p>
          </div>
          <div>
            <p>
              Remaining Budget: ${budgetOverview.remainingBudget.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </Theme>
  );
};

return <ExpenseTracker />;
