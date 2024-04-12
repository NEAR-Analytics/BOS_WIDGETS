const COMET_ABI = [
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "supply",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "manager", type: "address" },
      { internalType: "bool", name: "isAllowed", type: "bool" },
    ],
    name: "allow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "isAllowed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
];
const BULKER_ABI = [
  {
    inputs: [
      { internalType: "bytes32[]", name: "actions", type: "bytes32[]" },
      { internalType: "bytes[]", name: "data", type: "bytes[]" },
    ],
    name: "invoke",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const {
  update,
  actions,
  bulkerActionCodes,
  comet,
  bulkerAddress,
  wethAddress,
  account,
  onLoad,
  onCancel,
} = props;

const TYPE_MAP = {
  Collateral: "Supply",
  Borrow: "Withdraw",
  Repay: "Supply",
  Supply: "Supply",
  Withdraw: "Withdraw",
};

useEffect(() => {
  if (!update || !actions.length) return;
  const CometContract = new ethers.Contract(
    comet.address,
    COMET_ABI,
    Ethers.provider().getSigner()
  );
  const BulkerContract = new ethers.Contract(
    bulkerAddress,
    BULKER_ABI,
    Ethers.provider().getSigner()
  );

  const getActionAmount = (action) =>
    Big(action.amount).mul(Big(10).pow(action.asset.decimals)).toFixed(0);

  const buildTx = ({ contract, method, params, options }) => {
    const _contract = contract === "comet" ? CometContract : BulkerContract;
    const createTx = (gas) => {
      const _gas = gas ? Big(gas.toString()).mul(1.2).toFixed(0) : 4000000;
      _contract.populateTransaction[method](...params, {
        ...options,
        gasLimit: _gas,
      })
        .then((res) => {
          onLoad({
            gas: _gas,
            unsignedTx: res,
            isError: false,
          });
        })
        .catch((err) => {
          onLoad({});
        });
    };
    _contract.estimateGas[method](...params, options)
      .then((gas) => {
        createTx(gas);
      })
      .catch((err) => {
        console.log("estimateGas", err);
        createTx();
      });
  };

  if (actions.length === 1) {
    const action = actions[0];
    const actionType = TYPE_MAP[action.type];
    const _amount = getActionAmount(action);
    if (!action.asset.isNative) {
      buildTx({
        contract: "comet",
        method: actionType === "Supply" ? "supply" : "withdraw",
        params: [action.asset.address, _amount],
        options: {},
      });
      return;
    }
  }

  const checkAllowed = (cb) => {
    CometContract.isAllowed(account, bulkerAddress)
      .then((res) => {
        if (res) {
          cb?.();
        } else {
          CometContract.allow(bulkerAddress, true)
            .then((tx) => {
              tx.wait()
                .then((res) => {
                  if (res.status === 1) {
                    cb?.();
                  }
                })
                .catch(() => {
                  onCancel?.();
                });
            })
            .catch((err) => {
              onCancel?.();
            });
        }
      })
      .catch((err) => {
        console.log("check allowed err", err);
        onCancel?.();
      });
  };

  checkAllowed(() => {
    try {
      const codes = [];
      const callDatas = [];
      const value = Big(0);
      actions.forEach((action) => {
        const _amount = getActionAmount(action);
        const actionType = TYPE_MAP[action.type];
        if (actionType === "Supply") {
          codes.push(
            action.asset.isNative
              ? bulkerActionCodes.ACTION_SUPPLY_NATIVE_TOKEN
              : bulkerActionCodes.ACTION_SUPPLY_ASSET
          );
          if (action.asset.isNative) value = value.add(_amount);
        }
        if (actionType === "Withdraw") {
          codes.push(
            action.asset.isNative
              ? bulkerActionCodes.ACTION_WITHDRAW_NATIVE_TOKEN
              : bulkerActionCodes.ACTION_WITHDRAW_ASSET
          );
        }

        const callData = ethers.utils.defaultAbiCoder.encode(
          action.asset.isNative
            ? ["address", "address", "uint"]
            : ["address", "address", "address", "uint"],
          action.asset.isNative
            ? [comet.address, account, _amount]
            : [comet.address, account, action.asset.address, _amount]
        );
        callDatas.push(callData);
      });

      buildTx({
        contract: "bulker",
        method: "invoke",
        params: [codes, callDatas],
        options: { value: value.toFixed(0) },
      });
    } catch (err) {
      console.log("build tx error");
    }
  });
}, [update]);
