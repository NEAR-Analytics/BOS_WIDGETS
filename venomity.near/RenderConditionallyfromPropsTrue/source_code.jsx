function UserGreeting() {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting() {
  return <h1>Please sign up.</h1>;
}

function Welcome(props) {
  return <div>{props.isLoggedIn ? <UserGreeting /> : <GuestGreeting />}</div>;
}

function App() {
  // Assuming isLoggedIn is a boolean variable
  const isLoggedIn = true;

  return (
    <div className="App">
      <Welcome isLoggedIn={isLoggedIn} />
    </div>
  );
}

return App();
