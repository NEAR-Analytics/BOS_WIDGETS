const { account, dexConfig, addAction, toast, onLoad } = props;

const { positionManagerAddress, targetAddress } = dexConfig;

useEffect(() => {
  const handleAction = ({ pool, method, onSuccess, onError }) => {
    const Contract = new ethers.Contract(
      method === "safeTransferFrom" ? positionManagerAddress : targetAddress,
      [
        {
          inputs: [
            {
              components: [
                { internalType: "uint256", name: "tokenId", type: "uint256" },
                { internalType: "address", name: "recipient", type: "address" },
                {
                  internalType: "uint128",
                  name: "amount0Max",
                  type: "uint128",
                },
                {
                  internalType: "uint128",
                  name: "amount1Max",
                  type: "uint128",
                },
              ],
              internalType:
                "struct INonfungiblePositionManagerStruct.CollectParams",
              name: "params",
              type: "tuple",
            },
          ],
          name: "collect",
          outputs: [
            { internalType: "uint256", name: "", type: "uint256" },
            { internalType: "uint256", name: "", type: "uint256" },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "_tokenId", type: "uint256" },
          ],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "tokenId", type: "uint256" },
          ],
          name: "safeTransferFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      Ethers.provider().getSigner()
    );
    let params = [];
    if (method === "collect") {
      params = [
        [
          pool.id,
          account,
          "340282366920938463463374607431768211455",
          "340282366920938463463374607431768211455",
        ],
      ];
    }
    if (method === "withdraw") {
      params = [pool.id];
    }
    if (method === "safeTransferFrom") {
      params = [account, targetAddress, pool.id];
    }
    Contract.estimateGas[method](...params)
      .then((res) => {
        console.log("estimateGas", res);
        let toastId = toast.loading({
          title: "Confirming...",
        });
        Contract[method](...params, { gasLimit: Big(res).mul(1.2).toFixed(0) })
          .then((tx) => {
            toast.dismiss(toastId);
            toastId = toast.loading({
              title: "Pending...",
            });
            const action =
              method === "collect"
                ? "Collect Fees"
                : method === "withdraw"
                ? "Unstake"
                : "Stake";
            tx.wait()
              .then((res) => {
                const { status, transactionHash } = res;
                toast.dismiss(toastId);
                if (status === 1) {
                  onSuccess();
                  toast.success({
                    title: `${action} successfully!`,
                  });
                } else {
                  onError();
                  toast.fail({
                    title: `${action} faily!`,
                  });
                }
                if (method !== "collect") {
                  addAction({
                    type: "Staking",
                    template: "Hyperlock",
                    account,
                    status,
                    transactionHash,
                    extra_data: JSON.stringify({
                      action,
                      token0Symbol: pool.token0.symbol,
                      token1Symbol: pool.token1.symbol,
                      amount0: pool.amount0.toString(),
                      amount1: pool.amount1.toString(),
                      price0: pool.price0,
                      price1: pool.price1,
                    }),
                  });
                }
              })
              .catch((err) => {
                toast.dismiss(toastId);
                onError(err);
              });
          })
          .catch((err) => {
            toast.dismiss(toastId);
            toast.fail({
              title: err?.message?.includes("user rejected transaction")
                ? "User rejected transaction"
                : `Add faily!`,
            });
            onError(err);
          });
      })
      .catch((err) => {
        onError(err);
      });
  };

  onLoad(handleAction);
}, []);
