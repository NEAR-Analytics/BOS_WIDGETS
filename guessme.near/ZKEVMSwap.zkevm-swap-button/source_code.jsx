const { onSuccess, onError } = props;

console.log(props, 'propsssss')

return (
    <Widget
        src="bluebiu.near/widget/Arbitrum.Swap.HandlerV2"
        props={{
            inputCurrencyAmount: inputCurrencyAmount,
            outputCurrencyAmount: outputCurrencyAmount,
            inputCurrency: inputCurrency,
            outputCurrency: outputCurrency,
            wethAddress: props.wethAddress,
            account: props.account,
            routerAddress: props.routerAddress,
            swapping: props.swapping,
            title: props.title,
            onSuccess: (res) => {
                // State.update({ swapping: false });
                onSuccess(res);
            },
            onError: (err) => {
                // State.update({ swapping: false });
                console.log(err);
                onError(err);
            }
        }}
    />
)