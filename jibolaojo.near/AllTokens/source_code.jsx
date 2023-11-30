const [assetsTab, setAssetsTab] = useState(true);
const Assets = () => <Widget src={"jibolaojo.near/widget/Assets"} />;
const Collectibles = () => <Widget src={"jibolaojo.near/widget/Collectibles"} />;
return (
    <>
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "1rem",
            }}
        >
            <span
                style={{
                    color: assetsTab ? "black" : "#aaa",
                    borderBottom: "2px solid",
                    borderColor: assetsTab ? "black" : "transparent",
                    cursor: "pointer",
                    fontWeight: 500,
                    margin: "0 0.5rem",
                }}
                onClick={() => setAssetsTab(true)}
            >
                Assets
            </span>
            <span
                style={{
                    color: !assetsTab ? "black" : "#aaa",
                    borderBottom: "2px solid",
                    borderColor: !assetsTab ? "black" : "transparent",
                    cursor: "pointer",
                    fontWeight: 500,
                    margin: "0 0.5rem",
                }}
                onClick={() => setAssetsTab(false)}
            >
                Collectibles
            </span>
        </div>
        <div
            style={{
                padding: "0 1rem",
                maxHeight: "20rem",
                overflow: "auto",
            }}
        >

            {assetsTab ? <Assets /> : <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "1rem",
                }}
            ><Collectibles /></div>}
        </div>
    </>
);
