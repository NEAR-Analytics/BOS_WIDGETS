const { loading, amount, routerAddress, target, onLoad } = props;

useEffect(() => {
    if (!loading) return

    onLoad({
        received: amount.toString(),
        gasCost: 0,
    });


}, [loading])

return "";
