const testCall = () => {
  return Near.call("nearsocialexamples.near", "set_greeting", {
    message: "Hi Near Social",
  });
};

return <button onClick={testCall}>TEST</button>;
