const BodyContent = styled.div`
  padding: 32px;
  text-align: center;
`;
const DeviderComponent = styled.div`
  display:flex;
  justify-content: space-around;
`;
return (
  <div>
    <Widget
      src="s-farshad-k.near/widget/hero-header"
      props={{
        title: "EthWinner Employee check",
        subtitle:
          "We make finding a good colleague easier for your next project!",
      }}
    />
    <DeviderComponent>
      <div>
        <Widget
          src="a_liutiev.near/widget/button_general"
          props={{
            value: <span>Register a Company</span>,
            handleButtonClick: () => {
              updatePage("addCompany");
            },
          }}
        />
      </div>
      <div>
        <Widget
          src="a_liutiev.near/widget/button_general"
          props={{
            value: <span>Register as an Employee</span>,
            handleButtonClick: () => {
              updatePage("addPerson");
            },
          }}
        />
      </div>
    </DeviderComponent>
  </div>
);
