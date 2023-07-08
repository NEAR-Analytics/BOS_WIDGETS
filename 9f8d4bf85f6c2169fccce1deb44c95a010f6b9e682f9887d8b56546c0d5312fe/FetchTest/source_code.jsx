function asyncTestFetch() {
  asyncFetch("https://jsonplaceholder.typicode.com/todos/1").then((res) => {
    console.log(res);
  });
}

const todo = fetch("https://jsonplaceholder.typicode.com/todos/1").body;

return (
  <div>
    {todo.title} || Id: {todo.id}
  </div>
);
