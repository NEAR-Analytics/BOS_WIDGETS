const { slot, onClose, initState } = props;

State.init({
  closed: initState || true,
});

const Slot = () => <>{slot}</>;

const Box = styled.div`
    background-color:#fff;
    padding:1.5rem;
    min-height:200px;
    width:100%;
    max-width:400px;
`;

const Overlay = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    background-color:rgba(0,0,0,.5);
`;

return (
  <>
    {!state.closed && (
      <Overlay
        onClick={() => {
          State.update({ closed: !state.closed });

          if (typeof onClose === "function") {
            onClose(state.closed);
          }
        }}
      >
        <Box>
          <Slot />
        </Box>
      </Overlay>
    )}
  </>
);
