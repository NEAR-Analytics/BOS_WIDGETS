const StakeButton = styled.button`
  background-color: #c7ff18;
  width: 100%;
  height: 60px;
  border-radius: 8px;
  color: #000;
  font-size: 18px;
  font-weight: 500;
  border: none;
  transition: 0.5s;

  &:disabled {
    opacity: 0.5;
  }
  @media (max-width: 768px) {
    height: 40px;
    font-size: 16px;
  }
`;

const {
  disabled,
  amount,
  ethAccount,
  lpToken,
  stakeType,
  liquidAddress,
  minAmountOut,
  onSuccess,
} = props;

State.init({
  isApproved: false,
  approving: false,
  loading: false,
});

const getAllowance = () => {
  const TokenContract = new ethers.Contract(
    lpToken.address,
    [
      {
        constant: true,
        inputs: [
          {
            name: "_owner",
            type: "address",
          },
          {
            name: "_spender",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );
  TokenContract.allowance(ethAccount, liquidAddress).then((allowanceRaw) => {
    State.update({
      isApproved: !Big(Number(allowanceRaw._hex)).eq(0),
    });
  });
};

if (stakeType) {
  getAllowance();
} else {
  State.update({ isApproved: true });
}

const handleApprove = () => {
  State.update({
    approving: true,
  });
  const TokenContract = new ethers.Contract(
    lpToken.address,
    [
      {
        constant: false,
        inputs: [
          {
            name: "_spender",
            type: "address",
          },
          {
            name: "_value",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );
  TokenContract.approve(liquidAddress, ethers.utils.parseUnits(amount, 18))
    .then((tx) => {
      tx.wait().then((res) => {
        const { status, transactionHash } = res;
        State.update({
          isApproved: status === 1,
          approving: false,
        });
      });
    })
    .catch(() => {
      State.update({
        approving: false,
      });
    });
};

if (!state.isApproved) {
  return (
    <StakeButton onClick={handleApprove} disabled={state.approving}>
      {state.approving ? " Wait..." : " Approve"}
    </StakeButton>
  );
}

const stakeEth = () => {
  State.update({
    loading: true,
  });
  const Erc20Contract = new ethers.Contract(
    lpToken.address,
    [
      {
        inputs: [
          { internalType: "address", name: "_receiver", type: "address" },
        ],
        name: "depositETH",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "payable",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );
  Erc20Contract.depositETH(ethAccount, {
    value: ethers.utils.parseEther(amount),
  })
    .then((tx) => {
      tx.wait().then((res) => {
        State.update({
          loading: false,
        });
        if (res.status === 1) onSuccess?.();
      });
    })
    .catch((err) => {
      console.log(err);
      State.update({
        loading: false,
      });
    });
};
const unstakeEthFastly = () => {
  State.update({
    loading: true,
  });
  const StakingContract = new ethers.Contract(
    liquidAddress,
    [
      {
        inputs: [
          { internalType: "uint256", name: "_amount", type: "uint256" },
          { internalType: "uint256", name: "_minOut", type: "uint256" },
        ],
        name: "swapmpETHforETH",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );
  StakingContract.swapmpETHforETH(
    ethers.utils.parseEther(amount),
    ethers.utils.parseEther(Big(minAmountOut).mul(0.995).toString()),
    {
      gasLimit: 5000000,
    }
  )
    .then((tx) => {
      tx.wait()
        .then((res) => {
          onSuccess?.(res);
          State.update({
            loading: false,
          });
        })
        .catch((err) => {
          State.update({
            loading: false,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      State.update({
        loading: false,
      });
    });
};
const unstakeEthDelay = () => {
  State.update({
    loading: true,
  });
  const Erc20Contract = new ethers.Contract(
    lpToken.address,
    [
      {
        inputs: [
          { internalType: "uint256", name: "shares", type: "uint256" },
          { internalType: "address", name: "receiver", type: "address" },
          { internalType: "address", name: "owner", type: "address" },
        ],
        name: "redeem",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );
  Erc20Contract.redeem(ethers.utils.parseEther(amount), ethAccount, ethAccount)
    .then((tx) => {
      tx.wait()
        .then((res) => {
          onSuccess?.(res);
          State.update({
            loading: false,
          });
        })
        .catch((err) => {
          State.update({
            loading: false,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      State.update({
        loading: false,
      });
    });
};

const handleClick = () => {
  if (stakeType === 0) {
    stakeEth();
    return;
  }
  if (stakeType === 1) {
    unstakeEthFastly();
    return;
  }
  if (stakeType === 2) {
    unstakeEthDelay();
    return;
  }
};

return (
  <StakeButton disabled={disabled || state.loading} onClick={handleClick}>
    {state.loading ? "Wait..." : stakeType ? "Unstake" : "Stake Now"}
  </StakeButton>
);
