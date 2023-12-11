const [description, setDescription] = useState("");
const [amount, setAmount] = useState("");
const [category, setCategory] = useState("");

// Simple keyword-based categorization
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

const handleSubmit = (e) => {
  e.preventDefault();
  if (!description || !amount) return;

  // Categorize the expense based on the description
  const expenseCategory = categorizeExpense(description);

  const newExpense = {
    id: Date.now(),
    description,
    amount: parseFloat(amount),
    category: category || expenseCategory,
  };

  onAddExpense(newExpense);

  // Reset form fields
  setDescription("");
  setAmount("");
  setCategory("");
};

return (
  <div onSubmit={handleSubmit} className="form-ex">
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
    <button type="submit" className="btn-submit">
      Add Expense
    </button>
  </div>
);
