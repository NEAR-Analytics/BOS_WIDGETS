const [isEditing, setIsEditing] = useState(false);
const [editedBudget, setEditedBudget] = useState(budget);

const handleEdit = () => {
  onEditBudget(editedBudget);
  setIsEditing(false);
};

return (
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
);
