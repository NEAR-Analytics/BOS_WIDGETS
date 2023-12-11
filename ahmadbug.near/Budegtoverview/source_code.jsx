const totalExpenses = expenses((total, expense) => total + expense.amount, 0);
const remainingBudget = budget - totalExpenses;

const handleEdit = (e) => {
  const newBudget = parseFloat(e.target.value);
  onEditBudget(newBudget);
};

return (
  <div>
    <h2>Budget Overview</h2>
    <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
    <p>Budget: ${budget.toFixed(2)}</p>
    <p>Remaining Budget: ${remainingBudget.toFixed(2)}</p>
    <label>
      Edit Budget:
      <input type="number" value={budget} onChange={handleEdit} />
    </label>
  </div>
);
