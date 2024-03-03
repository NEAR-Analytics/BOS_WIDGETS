const TriggerEar = styled.div`
  display: block;
  width: 2px;
  height: 2px;
  border-radius: 2px;
  background: #fff;
  position: relative;

  &:before {
    content: "";
    display: block;
    width: 2px;
    height: 2px;
    border-radius: 2px;
    background: #fff;
    position: absolute;
    top: 4px;
  }

  &:after {
    content: "";
    position: absolute;
    display: block;
    width: 2px;
    height: 2px;
    border-radius: 2px;
    background: #fff;
    bottom: 4px;
  }
`;

return <TriggerEar />