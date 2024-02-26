function Welcome(props) {
  if (props.isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function UserGreeting() {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting() {
  return <h1>Please sign up.</h1>;
}

function App() {
  // Assuming isLoggedIn is true for this example
  const user = {
    isLoggedIn: true,
  };

  return (
    <div className="App">
      <Welcome isLoggedIn={user.isLoggedIn} />
    </div>
  );
}

return App();
