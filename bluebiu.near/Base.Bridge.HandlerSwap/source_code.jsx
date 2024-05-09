const {
  amount,
  account,
  currency,
  routerAddress,
  routerEthAddress,
  target,
  loading,
  onSuccess,
  onError,
} = props;
if (!loading) return "";
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
})
  .then((quoteRes) => {
    const _amount = ethers.utils.parseUnits(
      Big(amount).toFixed(currency.decimals).toString(),
      currency.decimals
    );
    const RouterContract = currency.isNative
      ? new ethers.Contract(
          routerEthAddress,
          [
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_dstChainId",
                  type: "uint16",
                },
                {
                  internalType: "address payable",
                  name: "_refundAddress",
                  type: "address",
                },
                { internalType: "bytes", name: "_toAddress", type: "bytes" },
                {
                  internalType: "uint256",
                  name: "_amountLD",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_minAmountLD",
                  type: "uint256",
                },
              ],
              name: "swapETH",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
          ],
          Ethers.provider().getSigner()
        )
      : new ethers.Contract(
          routerAddress,
          [
            {
              inputs: [
                {
                  internalType: "uint16",
                  name: "_dstChainId",
                  type: "uint16",
                },
                {
                  internalType: "uint256",
                  name: "_srcPoolId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_dstPoolId",
                  type: "uint256",
                },
                {
                  internalType: "address payable",
                  name: "_refundAddress",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_amountLD",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_minAmountLD",
                  type: "uint256",
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
                { internalType: "bytes", name: "_to", type: "bytes" },
                { internalType: "bytes", name: "_payload", type: "bytes" },
              ],
              name: "swap",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
          ],
          Ethers.provider().getSigner()
        );
    const method = currency.isNative ? "swapETH" : "swap";
    const minAmount = ethers.utils.parseUnits(
      Big(amount || 0)
        .mul(0.995)
        .toFixed(currency.decimals),
      currency.decimals
    );
    const params = currency.isNative
      ? [
          target.dstId,
          account,
          account,
          _amount.toString(),
          minAmount.toString(),
          {
            value: Big(quoteRes[0].toString())
              .add(_amount.toString())
              .toString(),
          },
        ]
      : [
          target.dstId,
          currency.poolId,
          target.poolId,
          account,
          _amount,
          minAmount,
          { dstGasForCall: 0, dstNativeAmount: 0, dstNativeAddr: "0x" },
          account,
          "0x",
          { value: quoteRes[0] },
        ];
    RouterContract[method](...params)
      .then((tx) => {
        tx.wait()
          .then((res) => {
            onSuccess(res);
          })
          .catch((err) => {
            onError(tx);
          });
      })
      .catch((err) => {
        onError(err);
      });
  })
  .catch((err) => {
    onError(err);
  });

return "";
