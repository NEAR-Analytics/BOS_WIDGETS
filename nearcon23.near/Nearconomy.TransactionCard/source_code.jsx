const nearconIdSufix = ".nearcon23.near";

const isSend = props?.sent;
const amount = props?.amount ?? "";
const sendAccount = props?.sendAccount ?? "";
const recieveAccount = props?.recieveAccount ?? "";
const time = props?.time ?? "";
const receiverCid = props?.receiverCid;
const senderCid = props.senderCid;

const trimName = (nearconId) => {
  let name = (nearconId || "")?.replace(nearconIdSufix, "");

  if (name.length > 12) {
    name = name.substring(0, 15) + "...";
  }

  return "@" + name;
};

return (
  <div
    style={{
      padding: 20,
      // paddingTop: 15,
      // paddingBottom: 0,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      backgroundColor: "black",
      border: "0px solid #FFFFFF3F",
      borderBottomWidth: 1,
    }}
  >
    <div style={{ display: "flex", gap: "10px", width: "100%" }}>
      <img
        style={{ objectFit: "cover", height: 40, width: 40, borderRadius: 100 }}
        src={
          senderCid
            ? `https://ipfs.near.social/ipfs/${senderCid}`
            : "https://ipfs.near.social/ipfs/bafkreieojnjn7cvfuko6qtmbdhwfqqxy4aw4xmrxzomb3lisek4p4nllba"
        }
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontWeight: 500,
            fontFamily: "Mona Sans",
            marginBottom: 0,
            color: "white",
            fontSize: 24,
          }}
        >
          {trimName(sendAccount)}
        </p>
      </div>
    </div>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: 8,
        }}
      >
        <h3
          style={{ margin: 0, fontSize: 30, fontWeight: 600, color: "white" }}
        >
          {amount}
        </h3>
        <p
          style={{
            fontSize: 20,
            color: "#00EC97",
            marginBottom: 0,
            marginRight: 5,
            fontFamily: "Mona Sans",
            display: "flex",
            gap: 4,
            alignItems: "center",
          }}
        >
          NCON
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6402 8.11118V14.4751C16.6402 14.6744 16.5611 14.8655 16.4202 15.0064C16.2793 15.1473 16.0882 15.2264 15.8889 15.2264C15.6897 15.2264 15.4986 15.1473 15.3577 15.0064C15.2168 14.8655 15.1376 14.6744 15.1376 14.4751L15.1385 9.92314L8.64196 16.4197C8.50131 16.5603 8.31054 16.6394 8.11163 16.6394C7.91272 16.6393 7.72195 16.5603 7.5813 16.4197C7.44065 16.279 7.36163 16.0883 7.36163 15.8894C7.36163 15.6904 7.44065 15.4997 7.5813 15.359L14.0778 8.86248L9.5254 8.86115C9.32615 8.86115 9.13505 8.782 8.99415 8.6411C8.85326 8.5002 8.7741 8.30911 8.7741 8.10985C8.7741 7.91059 8.85326 7.7195 8.99415 7.5786C9.13505 7.4377 9.32615 7.35855 9.5254 7.35855L15.8894 7.35855C15.9881 7.35844 16.086 7.37784 16.1772 7.41564C16.2685 7.45345 16.3514 7.50891 16.4212 7.57884C16.4909 7.64878 16.5462 7.7318 16.5838 7.82316C16.6214 7.91451 16.6406 8.01239 16.6402 8.11118Z"
              fill="#096D50"
            />
          </svg>
        </p>
      </div>

      <p style={{ color: "rgba(255, 255, 255, 0.45)", margin: "0 0 0 18px" }}>
        {time}
      </p>
    </div>

    <div
      style={{
        display: "flex",
        gap: "10px",
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontWeight: 500,
            fontFamily: "Mona Sans",
            marginBottom: 0,
            color: "white",
            fontSize: 24,
          }}
        >
          {trimName(recieveAccount)}
        </p>
      </div>

      <img
        style={{ objectFit: "cover", height: 40, width: 40, borderRadius: 100 }}
        src={
          receiverCid
            ? `https://ipfs.near.social/ipfs/${receiverCid}`
            : "https://ipfs.near.social/ipfs/bafkreieojnjn7cvfuko6qtmbdhwfqqxy4aw4xmrxzomb3lisek4p4nllba"
        }
      />
    </div>
  </div>
);
