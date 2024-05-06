const { show, context } = props;

const TriggerEar = styled.div`
  position: absolute;
  background: #384bff;
  border: 1px solid #384bff;
  width: 6px;
  height: 49px;
  right: -6px;
  top: 10px;
  border-radius: 0px 4px 4px 0px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  z-index: 79;
  transition: all 0.2s;
`;

const Dots = styled.div`
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

return (
  <TriggerEar
    style={{ opacity: show ? 0 : 1 }}
    data-mweb-context-type="ear-trigger"
    data-mweb-context-parsed={JSON.stringify({ id: context?.id })}
  >
    <Dots />
    <div data-mweb-insertion-point="hidden" style={{ display: "none" }} />
  </TriggerEar>
);
