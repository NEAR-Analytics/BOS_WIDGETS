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
                          color: #333;

                                .expense-tracker {
                                        width: 80%;
                                                margin: 20px auto;
                                                        text-align: center;
                                                              }

                                                                    .budget-card {
                                                                            background-color: #f0f0f0;
                                                                                    padding: 20px;
                                                                                            border-radius: 8px;
                                                                                                    margin-bottom: 20px;
                                                                                                          }

                                                                                                                .expense-form {
                                                                                                                        display: flex;
                                                                                                                                justify-content: space-between;
                                                                                                                                        margin-bottom: 20px;
                                                                                                                                              }

                                                                                                                                                    .expense-table {
                                                                                                                                                            width: 100%;
                                                                                                                                                                    border-collapse: collapse;
                                                                                                                                                                            margin-bottom: 20px;
                                                                                                                                                                                  }

                                                                                                                                                                                        .expense-table,
                                                                                                                                                                                              .expense-table th,
                                                                                                                                                                                                    .expense-table td {
                                                                                                                                                                                                            border: 1px solid #ddd;
                                                                                                                                                                                                                    padding: 8px;
                                                                                                                                                                                                                            text-align: left;
                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                        .edit-button {
                                                                                                                                                                                                                                                cursor: pointer;
                                                                                                                                                                                                                                                        color: #007bff;
                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                  `,
  });
}

const Theme = state.theme;

// Sample initial data
State.init({
  budget: 1000,
  totalExpense: 0,
  remainingBudget: 1000,
  expenses: [],
});

const ExpenseTracker = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission to add expense
    // Update budget, totalExpense, remainingBudget, and expenses state
  };

  const handleBudgetEdit = (event) => {
    // Handle editing the budget
    // Update budget, remainingBudget state
  };

  const handleExpenseEdit = (expenseId) => {
    // Handle editing a specific expense
    // Update expenses state
  };

  return (
    <Theme>
      <div class="expense-tracker">
        <div class="budget-card">
          <p>Total Expense for a Day: $ {state.totalExpense}</p>
          <p>Budget: $ {state.budget}</p>
          <p>Remaining Budget: $ {state.remainingBudget}</p>
        </div>

        <div class="expense-form" onSubmit={handleSubmit}>
          {/* Add your input fields for date, description, amount, and category here */}
          <button type="submit">Add Expense</button>
        </div>

        <table class="expense-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through expenses and render table rows */}
            {/* Add an edit button in the last column for each expense */}
          </tbody>
        </table>

        <div>
          <label for="budget">Budget: $</label>
          <input
            type="number"
            id="budget"
            value={state.budget}
            onChange={handleBudgetEdit}
          />
        </div>
      </div>
    </Theme>
  );
};

return <ExpenseTracker />;
