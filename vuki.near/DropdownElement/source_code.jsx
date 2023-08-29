const app = props.app ?? { name: "App", icon: null };
const icon = props.icon ?? null;
const backgroundColor = props.backgroundColor ?? "#090723";
const onClick = props.onClick ?? null;

const Card = styled.div`
display: inline-flex;
flex-direction: row;
align-items: center;
background-color: ${backgroundColor};
cursor: pointer;
padding: 1rem;
overflow: hidden;
cursor: ${onClick ? "pointer" : "default"};
width: 100%;
`;

const Title = styled.div`
color: #FFF;
/* text-sm/leading-5/font-medium */
font-family: Inter;
font-size: 0.875rem;
font-style: normal;
font-weight: 500;
line-height: 1.25rem;
margin-left: 1rem;
`;

return (
  <Card onClick={onClick}>
    <Widget
      src="vuki.near/widget/DropdownIcon"
      props={{
        icon: app.icon,
      }}
    />
    <Title>{app.name}</Title>
  </Card>
);
