const Card1 = styled.div`
   width: 220px;
  height: 270px;
  background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
  border-radius: 20px;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.30);
  }

`;
const Card2 = styled.div`
   width: 220px;
  height: 270px;
  background-color: #1a1a1a;
  transition: all 0.2s;
  border-radius: 20px;

  .sc-gxYJeL:hover & {
    transform: scale(0.98);
    border-radius: 20px;
  }

`;

const content = props.content || `content`;

return (
  <Card1>
    <Card2>{content}</Card2>
  </Card1>
);
