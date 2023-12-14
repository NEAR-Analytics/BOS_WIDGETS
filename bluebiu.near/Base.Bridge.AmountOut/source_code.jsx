const { loading, amount, routerAddress, target, onLoad } = props;

useEffect(() => {
  if (!loading || !routerAddress) return;
  const QuoteRouterContract = new ethers.Contract(
    routerAddress,
    [
      {
        inputs: [
          { internalType: "uint16", name: "_dstChainId", type: "uint16" },
          { internalType: "uint8", name: "_functionType", type: "uint8" },
          { internalType: "bytes", name: "_toAddress", type: "bytes" },
          {
            internalType: "bytes",
            name: "_transferAndCallPayload",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "dstGasForCall",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "dstNativeAmount",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "dstNativeAddr",
                type: "bytes",
              },
            ],
            internalType: "struct IStargateRouter.lzTxObj",
            name: "_lzTxParams",
            type: "tuple",
          },
        ],
        name: "quoteLayerZeroFee",
        outputs: [
          { internalType: "uint256", name: "", type: "uint256" },
          { internalType: "uint256", name: "", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );

  QuoteRouterContract.quoteLayerZeroFee(target.dstId, 1, target.address, "0x", {
    dstGasForCall: 0,
    dstNativeAmount: 0,
    dstNativeAddr: "0x0000000000000000000000000000000000000001",
  }).then((res) => {
    const gasCost = ethers.utils.formatUnits(res[0]._hex, 18);
    onLoad({
      received: Big(amount || 0)
        .mul(0.995)
        .toString(),
      gasCost,
    });
  });
}, [loading]);

return "";
