return <><div
    style={{
        fontSize: "2rem",
        fontWeight: 500,
        textAlign: "center",
        margin: "0 0 1rem",
    }}
>
    <Widget
        src={"jibolaojo.near/widget/WalletBalance"}
        componentProps={{
            balance_type: "spendable",
        }}
    />{" "}
    NEAR
</div>
    <Widget src={"jibolaojo.near/widget/AllTokens"} />
</>