function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  const removeTodo = (todoToRemove) => {
    const updatedTodos = todos.filter((todo) => todo !== todoToRemove);
    setTodos(updatedTodos);
  };
  const Padding = styled.div`
  background-color: white;
  color: white;
  padding: 20px 0;
  text-align: center;
  margin: auto';
`;
  const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

  const StyledTable = styled.table`
  border-collapse: collapse;
  width: 70%;
  margin-top: 20px;
`;

  const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 12px;
  text-align: center;
`;

  const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;
  return (
    <div>
      <div class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
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
      <TableWrapper>
        <h1 align="center">Todo List</h1>
        <div>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
          />
          <Padding>
            <button onClick={addTodo}>Add Todo</button>
          </Padding>
        </div>
        <StyledTable>
          <thead>
            <tr>
              <TableHeader>Todo</TableHeader>
              <TableHeader>Action</TableHeader>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo}>
                <TableCell>{todo}</TableCell>
                <TableCell>
                  <button onClick={() => removeTodo(todo)}>Remove</button>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </div>
  );
}

function Nearian() {
  return (
    <div>
      <Todo />
    </div>
  );
}
return <Nearian />;
