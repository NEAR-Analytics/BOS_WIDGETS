const Message = styled.div`
  position: fixed;
  right: 30px;
  z-index: 8888;
  top: 100px;
  @media (max-width: 640px) {
    top: calc(100vh - 88px);
    left: 0px;
    right: 0px;
    text-align: center;
  }
`;
const Content = styled.div`
  height: 53px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #25273a;
  color: #7c7f96;
  border-radius: 4px;
  padding-right: 10px;
  position: relative;
  @media (max-width: 640px) {
    display: inline-flex;
  }
`;
const Text = styled.div`
  color: #fff;
  margin-right: 20px;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
`;
const Bar = styled.div`
  height: 3px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  border-radius: 0px 0px 4px 4px;

  &.sketching {
    animation: sketching 3s linear 0.5s;
    transform-origin: left;

    @keyframes sketching {
      0% {
        width: 100%;
      }
      100% {
        width: 0%;
      }
    }
  }
`;
const IconWrapper = styled.div`
  padding: 0px 16px;
`;

const { status, text, onClose } = props;

const BAR_COLOR_MAP = {
  1: "#22C134", // success
  2: "#E74BBB", // fail
  3: "transparent", // loading
};
if (status !== 3) {
  setTimeout(() => {
    onClose();
  }, 3500);
}
return (
  <Message>
    <Content>
      <Flex>
        {status === 1 && (
          <Widget src="bluebiu.near/widget/0vix.LendingCheckedIcon" />
        )}
        {status === 2 && (
          <IconWrapper>
            <Widget
              src="bluebiu.near/widget/0vix.LendingWarningIcon"
              props={{ color: "#E74BBB" }}
            />
          </IconWrapper>
        )}
        {status === 3 && (
          <IconWrapper>
            <Widget src="bluebiu.near/widget/0vix.LendingLoadingIcon" />
          </IconWrapper>
        )}
        <Text>{text}</Text>
      </Flex>
      <Widget
        src="bluebiu.near/widget/Arbitrum.Swap.CloseIcon"
        props={{
          onClose: () => {
            onClose?.();
          },
          size: 18,
        }}
      />
      <Bar
        className="sketching"
        style={{
          backgroundColor: BAR_COLOR_MAP[status],
          width: `${state.barWidth}%`,
        }}
      />
    </Content>
  </Message>
);
