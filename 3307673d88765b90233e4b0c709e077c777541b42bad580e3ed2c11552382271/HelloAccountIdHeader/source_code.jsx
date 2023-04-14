const accountId = context.accountId;

if (context.loading) {
  return "Loading";
}

if (!accountId) {
  return "Please sign in with NEAR wallet to use this widget";
}

return (
  <div>
    <h1> Hi this is Aadesh Mallya </h1>
    <h3> Some details about me: </h3>
    <ol>
      <li> I am a CS grad at Northeastern University </li>
      <li> I am a part of the NU Blockchain group </li>
      <li> This is an intermediate challenge of NEAR wallet </li>
    </ol>
  </div>
);
