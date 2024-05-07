const Dialog = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: none;
  &.display {
    display: block;
  }
`;
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 640px) {
    align-items: flex-end;
  }
`;
const Content = styled.div`
  background-color: var(--dialog-bg-color);
  border-radius: 16px;
  width: 334px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  gap: 10px;
  @media (max-width: 640px) {
    width: 100%;
    border-radius: 16px 16px 0px 0px;
  }
`;
const InfoIcon = styled.div`
  text-align: center;
  color: var(--dialog-info-color);
`;
const Text = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  text-align: center;
`;
const Button = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  background-color: var(--button-color);
  line-height: 60px;
  border: none;
  font-size: 18px;
  font-weight: 500;
  color: var(--button-text-color);
`;

const { display, chain, mainnet, showMainnet, currentChainId, onClose } = props;
return (
  <Dialog className={display ? "display" : ""}>
    <Overlay
      onClick={() => {
        console.log("close");
        onClose();
      }}
    >
      <Content>
        <InfoIcon>
          <Widget
            src="bluebiu.near/widget/0vix.LendingInfoIcon"
            props={{ size: 34 }}
          />
        </InfoIcon>
        <Text>
          {!currentChainId &&
            `Please switch to ${chain.name} or ${mainnet.name}`}
          {currentChainId === chain.id && `Please switch to ${chain.name}`}
          {currentChainId === mainnet.id && `Please switch to ${mainnet.name}`}
        </Text>
        <Button
          onClick={() => {
            Ethers.send("wallet_switchEthereumChain", [
              {
                chainId: `0x${Number(currentChainId || chain.id).toString(16)}`,
              },
            ]);
          }}
        >
          Switch Network
        </Button>
      </Content>
    </Overlay>
  </Dialog>
);
