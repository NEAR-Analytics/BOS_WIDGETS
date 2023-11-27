const Header = styled.div`
height: 2rem;
display: flex;
justify-content: center;
background-color: red;
align-items: center;
`;

const header = (
  <Header>
    <p>Hello world</p>
  </Header>
);

return <div>{header}</div>;
