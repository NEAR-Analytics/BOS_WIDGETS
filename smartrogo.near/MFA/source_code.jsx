const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [otp, setOtp] = useState("");

const handleLogin = () => {
  // Perform authentication logic using username, password, and OTP
  console.log("Authenticating...", { username, password, otp });
};

return (
  <div>
    <h1>Login with Multi-Factor Authentication</h1>
    <label>
      Username:
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </label>
    <br />
    <label>
      Password:
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </label>
    <br />
    <label>
      OTP (One-Time Password):
      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
    </label>
    <br />
    <button onClick={handleLogin}>Login</button>
  </div>
);
