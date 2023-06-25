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
            value: "Switch to the proper Mainnet",
            handleButtonClick: () => {},
          }}
        />
      </div>
      <div>Part2</div>
    </DeviderComponent>
  </div>
);
