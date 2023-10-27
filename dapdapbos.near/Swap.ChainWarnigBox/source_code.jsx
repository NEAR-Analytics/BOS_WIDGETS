const { chain } = props;
const WarningIcon = (
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 2.32851e-06C26.3733 3.14795e-06 34 7.62549 34 17C34 26.3733 26.3733 34 17 34C7.62548 34 -3.14806e-06 26.3745 -2.32851e-06 17C-1.50896e-06 7.62548 7.62548 1.50896e-06 17 2.32851e-06ZM17 31.5606C25.0292 31.5606 31.5606 25.0292 31.5606 17C31.5606 8.97202 25.0292 2.43938 17 2.43938C8.97202 2.43937 2.43937 8.9708 2.43937 17C2.43937 25.0292 8.97202 31.5606 17 31.5606ZM18.8295 24.928C18.8295 24.4427 18.6368 23.9774 18.2937 23.6343C17.9506 23.2912 17.4852 23.0984 17 23.0984C16.5148 23.0984 16.0494 23.2912 15.7063 23.6343C15.3632 23.9774 15.1705 24.4427 15.1705 24.928C15.1705 25.4132 15.3632 25.8785 15.7063 26.2216C16.0494 26.5647 16.5148 26.7575 17 26.7575C17.4852 26.7575 17.9506 26.5647 18.2937 26.2216C18.6368 25.8785 18.8295 25.4132 18.8295 24.928ZM17 7.2425C17.6733 7.2425 18.2197 7.7877 18.2197 8.46219L18.2197 19.4394C18.2197 20.1126 17.6733 20.6591 17 20.6591C16.3267 20.6591 15.7803 20.1126 15.7803 19.4394L15.7803 8.46219C15.7803 7.7877 16.3267 7.2425 17 7.2425Z"
      fill="#FF5794"
    />
  </svg>
);

const SwitchButton = styled.div`
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Gantari;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: center;
  border-radius: 10px;
  width: 100%;
  padding: 20px 0px;
  background: var(--button-color);

  color: #000000;
`;

const Wrapper = styled.div`
  border: 1px solid var(--border-color);

  position: absolute;

  z-index: 100;

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  padding: 20px 28px;

  font-family: Gantari;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 334px;

  color: white;
  border-radius: 12px;
  /* background: linear-gradient(0deg, #201d1d, #201d1d); */

  background-color: #181a27;

  gap: 20px;
`;

const handleSwitchChain = (chain) => {
  const chainId = chain.chainId;

  const res = Ethers.send("wallet_switchEthereumChain", [
    { chainId: `0x${Number(chainId).toString(16)}` },
  ]);

  if (res === undefined) {
    Ethers.send("wallet_addEthereumChain", [chain]);
  }
};

return (
  <Wrapper>
    {WarningIcon}

    <div>Please switch to {chain.chainName}</div>

    <SwitchButton onClick={() => handleSwitchChain(chain)}>
      Switch Network
    </SwitchButton>
  </Wrapper>
);
