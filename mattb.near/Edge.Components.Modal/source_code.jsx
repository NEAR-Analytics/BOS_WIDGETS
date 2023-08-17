const { slot } = props;

const Slot = () => <>{slot}</>;

const Overlay = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;

`;

return (
  <Overlay>
    <Slot />
  </Overlay>
);
