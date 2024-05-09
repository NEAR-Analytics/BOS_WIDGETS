const LogoutButton = () => <button>Logout</button>;
const LoginButton = () => <button>Logout</button>;
const isLoggedIn = false;

const element = <div>{isLoggedIn ? <LogoutButton /> : <LoginButton />}</div>;

return element;
