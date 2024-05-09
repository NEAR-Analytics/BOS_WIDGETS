const LogoutButton = () => <button>Logout</button>;
const LoginButton = () => <button>Logout</button>;
const isLoggedIn = true;

const element = <div>{isLoggedIn ? <LogoutButton /> : <LoginButton />}</div>;

return element;
