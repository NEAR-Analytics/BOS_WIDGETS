const Message = styled.div`
  position: fixed;
  right: 30px;
  z-index: 8888;
  top: 30px;
  @media (max-width: 640px) {
    bottom: 20px;
    top: inherit;
    left: 0px;
    right: 0px;
    text-align: center;
  }
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #25273a;
  border-radius: 4px;
  padding-right: 10px;
  position: relative;
  color: #fff;
  padding-bottom: 14px;
  .pt-14 {
    padding-top: 14px;
  }
  @media (max-width: 640px) {
    display: inline-flex;
  }
`;
const Title = styled.div`
  margin-right: 20px;
  font-size: 18px;
  font-weight: 600;
  padding-left: 4px;
  padding-bottom: 4px;
`;
const Text = styled.div`
  padding-left: 4px;
  font-size: 14px;
  font-weight: 400;
  .link {
    color: #fff;
    cursor: pointer;
    text-decoration: underline;
  }
`;
const Flex = styled.div`
  display: flex;
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

const SCAN_MAP = {
  42161: "https://arbiscan.io/tx/",
};

const { status, title, text, hash, chainId, onClose } = props;

const BAR_COLOR_MAP = {
  1: "#22C134", // success
  2: "#E74BBB", // fail
  3: "#979ABE", // info
};
setTimeout(() => {
  onClose();
}, 3500);
return (
  <Message>
    <Content>
      <Flex>
        {status === 1 && (
          <Widget
            src="bluebiu.near/widget/0vix.LendingCheckedIcon"
            props={{
              color: "#22C134",
            }}
          />
        )}
        {status === 2 && (
          <div className="pt-14">
            <IconWrapper>
              <Widget
                src="bluebiu.near/widget/0vix.LendingWarningIcon"
                props={{ color: "#E74BBB" }}
              />
            </IconWrapper>
          </div>
        )}
        {status === 3 && (
          <Widget
            src="bluebiu.near/widget/0vix.LendingCheckedIcon"
            props={{ color: "#979ABE" }}
          />
        )}
        <div className="pt-14">
          <Title>{title}</Title>
          <Text>{text}</Text>
          {hash && SCAN_MAP[chainId] && (
            <Text>
              <a
                href={SCAN_MAP[chainId] + hash}
                blank="_target"
                className="link"
              >
                View Transaction
              </a>
            </Text>
          )}
        </div>
      </Flex>
      <div className="pt-14">
        <Widget
          src="bluebiu.near/widget/Arbitrum.Swap.CloseIcon"
          props={{
            onClose: () => {
              onClose?.();
            },
            size: 18,
          }}
        />
      </div>
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
