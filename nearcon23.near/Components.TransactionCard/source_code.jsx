const isSend = props?.sent;
const amount = props?.amount ?? 1;
const account = props?.accountId ?? "philoutside";
const time = props?.time ?? "";
const imageToShow = props.image;

return (
  <div
    style={{
      padding: 10,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 0,
      paddingTop: 15,
      width: "100%",
      border: "0px solid #00000012",
      borderBottomWidth: 1,
    }}
  >
    <div style={{ display: "flex", gap: "10px", width: "80%" }}>
      <img
        style={{
          objectFit: "contain",
          height: 40,
          width: 40,
          borderRadius: 100,
        }}
        src={
          imageToShow
            ? `https://ipfs.near.social/ipfs/${imageToShow}`
            : "https://ipfs.near.social/ipfs/bafkreieojnjn7cvfuko6qtmbdhwfqqxy4aw4xmrxzomb3lisek4p4nllba"
        }
      />
      <div>
        <p
          style={{
            fontWeight: "600",
            fontFamily: "Mona Sans",
            marginBottom: 0,
            fontSize: 16,
            width: 160,
            wordBreak: "break-all",
          }}
        >
          @{account?.split(".")?.[0]}
        </p>
        <p style={{ fontSize: 14, color: "#0000007A" }}>{time}</p>
      </div>
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        width: "fit-content",
      }}
    >
      <p
        style={{
          fontSize: 28,
          display: "flex",
          alignItems: "end",
        }}
      >
        {amount}
        <span
          style={{
            fontSize: 20,
            color: "#A1A09A",
            marginBottom: 4,
            marginLeft: 2,
          }}
        >
          {" "}
          NCON
        </span>
      </p>
      <div style={{ padding: 10, marginBottom: 1 }}>
        {isSend ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 10 10"
            fill="none"
          >
            <path
              d="M9.64022 1.11118V7.47514C9.64022 7.67439 9.56107 7.86549 9.42017 8.00639C9.27928 8.14728 9.08818 8.22644 8.88892 8.22644C8.68966 8.22644 8.49857 8.14728 8.35767 8.00639C8.21678 7.86549 8.13762 7.67439 8.13762 7.47514L8.1385 2.92314L1.64196 9.41968C1.50131 9.56033 1.31054 9.63935 1.11163 9.63935C0.912719 9.63935 0.721954 9.56033 0.581302 9.41968C0.440649 9.27903 0.361631 9.08826 0.361631 8.88935C0.361631 8.69044 0.440649 8.49967 0.581302 8.35902L7.07784 1.86248L2.5254 1.86115C2.32615 1.86115 2.13505 1.782 1.99415 1.6411C1.85326 1.5002 1.7741 1.30911 1.7741 1.10985C1.7741 0.910593 1.85326 0.719497 1.99415 0.578601C2.13505 0.437705 2.32615 0.35855 2.5254 0.35855L8.88936 0.35855C8.98815 0.358436 9.08598 0.377838 9.17725 0.415643C9.26851 0.453447 9.35141 0.508909 9.42118 0.578843C9.49095 0.648777 9.54622 0.731804 9.58381 0.823159C9.6214 0.914512 9.64057 1.01239 9.64022 1.11118Z"
              fill="#FF7966"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 10 10"
            fill="none"
          >
            <path
              d="M9.73173 0.580568C9.87238 0.72122 9.9514 0.911985 9.9514 1.1109C9.9514 1.30981 9.87238 1.50058 9.73173 1.64123L3.23519 8.13777L7.78851 8.13733C7.98777 8.13733 8.17886 8.21648 8.31976 8.35738C8.46066 8.49828 8.53981 8.68937 8.53981 8.88863C8.53981 9.08789 8.46066 9.27898 8.31976 9.41988C8.17886 9.56078 7.98777 9.63993 7.78851 9.63993L1.42455 9.63993C1.32584 9.6401 1.22807 9.62079 1.13684 9.58309C1.04561 9.54539 0.962717 9.49006 0.892918 9.42026C0.823119 9.35046 0.767785 9.26757 0.730089 9.17634C0.692394 9.08511 0.673078 8.98734 0.673249 8.88863L0.673248 2.52467C0.673249 2.42601 0.692682 2.32831 0.730438 2.23716C0.768194 2.14601 0.823535 2.06318 0.8933 1.99342C0.963064 1.92365 1.04589 1.86831 1.13704 1.83056C1.22819 1.7928 1.32589 1.77337 1.42455 1.77337C1.52321 1.77337 1.62091 1.7928 1.71206 1.83056C1.80321 1.86831 1.88603 1.92365 1.9558 1.99342C2.02556 2.06318 2.0809 2.14601 2.11866 2.23716C2.15642 2.32831 2.17585 2.42601 2.17585 2.52467L2.17453 7.07711L8.67107 0.580568C8.81172 0.439915 9.00249 0.360897 9.2014 0.360898C9.40031 0.360897 9.59108 0.439916 9.73173 0.580568Z"
              fill="#00EC97"
            />
          </svg>
        )}
      </div>
    </div>
  </div>
);
