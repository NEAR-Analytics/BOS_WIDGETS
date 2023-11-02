const nearconIdSufix = ".nearcon23.near";

const amount = props?.amount ?? "";
const sendAccount = props?._id ?? "";

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
    <div
      style={{
        display: "flex",
        gap: "10px",
        width: "80%",
        alignItems: "center",
      }}
    >
      <p
        style={{
          fontWeight: 500,
          fontFamily: "Mona Sans",
          marginBottom: 0,
          color: "white",
          fontSize: 30,
        }}
      >
        {props.idx}
      </p>
      <img
        style={{ objectFit: "cover", height: 40, width: 40, borderRadius: 100 }}
        src={
          senderCid
            ? `https://ipfs.near.social/ipfs/${senderCid}`
            : "https://ipfs.near.social/ipfs/bafkreieojnjn7cvfuko6qtmbdhwfqqxy4aw4xmrxzomb3lisek4p4nllba"
        }
      />
      <p
        style={{
          fontWeight: 500,
          fontFamily: "Mona Sans",
          marginBottom: 0,
          color: "white",
          fontSize: 30,
        }}
      >
        {trimName(sendAccount)}
      </p>
    </div>

    <div
      style={{
        display: "flex",
        width: "20%",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
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
        </p>
      </div>
    </div>
  </div>
);
