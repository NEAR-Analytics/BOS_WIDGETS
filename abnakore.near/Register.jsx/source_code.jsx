return (
  <div>
    <h1>Register</h1>
    <div>
      <Link to="/">Home</Link>
    </div>
    <div className="form">
      <div className="flex">
        <Widget
          src="abnakore.near/widget/Input.jsx"
          props={{ type: "text", placeholder: "First Name", required: true }}
        />
        <Widget
          src="abnakore.near/widget/Input.jsx"
          props={{ type: "text", placeholder: "Last Name", required: true }}
        />
      </div>
      <Widget
        src="abnakore.near/widget/Input.jsx"
        props={{ type: "email", placeholder: "Email", required: true }}
      />
      <Widget
        src="abnakore.near/widget/Input.jsx"
        props={{ type: "password", placeholder: "Password", required: true }}
      />

      <Widget
        src="abnakore.near/widget/Input.jsx"
        props={{
          type: "password",
          placeholder: "Confirm Password",
          required: true,
        }}
      />
      <button className="submit">Submit</button>
      <p className="signin">
        Already have an acount ? <Link to="/signin">Sign in</Link>{" "}
      </p>
    </div>
  </div>
);
