const Card = styled.div`
  background: ${(props) => (props.isWhiteBackground ? "#000000" : "#fffff")};
  width: 540px;
  text-align: center;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

let component = props.component || <> </>;

return (
  <Card>
    <span>{props.title}</span>
    {component}
  </Card>
);
