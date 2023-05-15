const MainStyledComponent = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #efefef;
`;

const PageTitleComponent = styled.p`
    font-size: 40px;
    font-weight: bold;
    text-transform: uppercase;
    margin: 0px;
    padding: 0px;
    color: black;
`;

const LoginStyledInputComponent = {
  border: "1px solid blue",
  borderRadius: "5px",
  width: "80%",
  height: "50px",
  marginTop: "10px",
  marginBottom: "10px",
};

return (
  <MainStyledComponent>
    <PageTitleComponent>LOGIN</PageTitleComponent>
    <input
      style={LoginStyledInputComponent}
      placeholder="Email Address"
      type="email"
    />
    <input
      style={LoginStyledInputComponent}
      placeholder="Password"
      type="password"
    />
  </MainStyledComponent>
);
