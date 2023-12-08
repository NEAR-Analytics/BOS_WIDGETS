return (
  <>
    <h1> Welcome to the NCD </h1>
    {context.accountId
      ? "Continue with the lessons"
      : "Please login to start the course"}
  </>
);
