const accountId = context.accountId;

<Widget src="near/widget/Explorer.Account" />;

return (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "linear-gradient(to right, black, #3a0201, black)",
      backgroundSize: "100% 100%",
      backgroundPosition: "center",
      position: "relative",
      overflow: "hidden",
      zIndex: 0,
    }}
  >
    <div style={{ width: "100%" }}>
      <div
        style={{
          background: "orange",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "262px",
          width: "100%",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="https://ipfs.fleek.co/ipfs/bafybeihjvub4e3yqyazxr62dxpbohji45wnx7hp7gadxjbiet2nrgkhapy"
          alt="VG Logo"
        />
      </div>
      <div
        style={{
          backgroundSize: "auto",
          backgroundPosition: "center",
          height: "181px",
          width: "100%",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ width: "auto" }}>
          <input
            type="text"
            value={state.prompt}
            style={{
              width: "auto",
              backgroundColor: "black",
              color: "white",
              fontFamily: '"Press Start 2P", sans-serif',
              border: "1px solid #3a0201",
            }}
            onChange={(e) => {
              state.prompt = e.target.value;
              State.update(state);
            }}
          />
        </div>
      </div>
      <div
        style={{
          backgroundColor: "black",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "75px",
          width: "100%",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      ></div>
      <div
        style={{
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "81px",
          width: "100%",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      ></div>
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeiaye7rrdceoz44waxyn5ozulhopx6pbq7d4336cn6nenjwxuftsbe)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "8px",
          width: "100%",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      ></div>
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeihdd765olkr6w2d5p7tiv3cyjqae4eh3b3aokyezyksi65alswybu)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "526px",
          color: "#333",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="https://ipfs.fleek.co/ipfs/bafybeiburel4azxripu5f6awh6azhitxbptqovppliyav6ilwndswk6yeq"
          style={{ position: "absolute", zIndex: 0 }}
        />
      </div>
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeihm5fiwy6dos2f4hiz67yaan3jafkndw5zkh23mb5rnue7qu6rh2y)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "123px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>
      <div
        style={{
          backgroundImage:
            "url(https://ipfs.fleek.co/ipfs/bafybeiamgwdx5uhhbgt7usn2wjxybn2b265mubicdj7bkyawgzjrmb22l4)",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "523px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>
    </div>
  </div>
);
