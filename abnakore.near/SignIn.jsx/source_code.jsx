// const props = ;

return (
  <div>
    <h1>Sign In</h1>
    <div>
      <Link to="/">Home</Link>
    </div>
    <div className="form">
      <Widget
        src="abnakore.near/widget/Input.jsx"
        props={{ type: "email", placeholder: "Email", required: true }}
      />
      <button className="submit">Submit</button>
      <p className="signin">
        Don't have an acount ? <Link to="/register">Register</Link>{" "}
      </p>
    </div>
    <p className="member">
      <Link to="/admin">I'm a member</Link>{" "}
    </p>
  </div>
);
