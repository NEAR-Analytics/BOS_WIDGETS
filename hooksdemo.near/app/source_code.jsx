const Container = styled.div`
  width: 500px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  margin-left: 5px;
  cursor: pointer;
  background-color: rgba(
    135,
    206,
    250,
    0.7
  ); /* Sky Blue with alpha for glass effect */
  color: black;
  transition: 0.3s ease-in-out;
  border: none;
  border-radius: 4px;
  backdrop-filter: blur(5px); /* Glassy effect */

  &:hover {
    background-color: rgba(135, 206, 250, 0.9); /* Darker shade on hover */
  }
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TaskItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`;

const TotalCount = styled.div`
  margin-top: 20px;
  font-size: 18px;
`;

const [tasks, setTasks] = useState([]);
const [newTask, setNewTask] = useState("");
const [editedTask, setEditedTask] = useState({ index: null, text: "" });
const [totalCount, setTotalCount] = useState(0);

// useEffect to update total count when tasks change
useEffect(() => {
  console.log("here");
  setTotalCount(tasks.length);
}, [tasks]);

// useCallback to memoize the add task function
const addTask = useCallback(() => {
  if (newTask.trim() !== "") {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTask("");
  }
}, [newTask]);

// useCallback to memoize the remove task function
const removeTask = useCallback((index) => {
  setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  setEditedTask({ index: null, text: "" }); // Reset edited task if removing
}, []);

// useCallback to memoize the edit task function
const editTask = useCallback(() => {
  if (editedTask.index !== null && editedTask.text.trim() !== "") {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === editedTask.index ? editedTask.text : task
      )
    );
    setEditedTask({ index: null, text: "" }); // Reset edited task after editing
  }
}, [editedTask]);

// useMemo to memoize the total count text
const totalCountText = useMemo(
  () => `Total Tasks: ${totalCount}`,
  [totalCount]
);

return (
  <Container>
    <h2>Task Tracker</h2>
    <Input
      type="text"
      placeholder="Enter a new task"
      value={newTask}
      onChange={(e) => setNewTask(e.target.value)}
    />
    <Button onClick={addTask}>Add Task</Button>
    <TaskList>
      {tasks.map((task, index) => (
        <TaskItem key={index}>
          {editedTask.index === index ? (
            <Input
              type="text"
              value={editedTask.text}
              onChange={(e) => setEditedTask({ index, text: e.target.value })}
            />
          ) : (
            <span>{task}</span>
          )}
          <div>
            {editedTask.index !== index && (
              <Button onClick={() => setEditedTask({ index, text: task })}>
                Edit
              </Button>
            )}
            <Button onClick={() => removeTask(index)}>Remove</Button>
          </div>
        </TaskItem>
      ))}
    </TaskList>
    {editedTask.index !== null && (
      <Button onClick={editTask}>Save Changes</Button>
    )}
    <TotalCount>{totalCountText}</TotalCount>
  </Container>
);
