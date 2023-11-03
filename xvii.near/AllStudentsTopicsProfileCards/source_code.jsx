const ProfileCard = ({ accountId, topic }) => {
  const profileUrl = `/ndcplug.near/widget/DAO.main?daoId=${accountId}`;
  // Faking the profile data since there's no API call here
  const profile = {
    name: accountId,
    image: "https://placeimg.com/60/60/people", // Placeholder image URL
  };

  const onPointerUp = () => {
    console.log("Avatar clicked for", accountId);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "16px",
        width: "100%",
        borderRadius: "12px",
        background: "#fff",
        border: "1px solid #ECEEF0",
        boxShadow:
          "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
        overflow: "hidden",
        padding: "16px",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          width: "100%",
          minWidth: "0",
        }}
      >
        <a
          href={profileUrl}
          onPointerUp={onPointerUp}
          style={{
            width: "60px",
            height: "60px",
            flexShrink: "0",
            border: "1px solid #ECEEF0",
            overflow: "hidden",
            borderRadius: "56px",
            textDecoration: "none",
          }}
        >
          {/* You would use the Widget component here like before */}
          <img
            src={profile.image}
            alt={profile.name}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </a>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            minWidth: "0",
          }}
        >
          <a
            href={profileUrl}
            onPointerUp={onPointerUp}
            style={{
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px",
              color: "#11181C",
              marginBottom: "4px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {profile.name || accountId.split(".near")[0]}
          </a>
          <a
            href={profileUrl}
            onPointerUp={onPointerUp}
            style={{
              textDecoration: "none",
              color: "#687076",
              fontSize: "12px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            @{accountId}
          </a>
          {/* Render tags here if you have them */}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
          Research topic selected:
        </div>
        <div>{topic}</div>
      </div>

      {/* Add FollowButton Widget if necessary */}
    </div>
  );
};

const ProfileCards = () => {
  const accounts = [
    {
      accountId: "cripteros.near",
      topic: "NEAR UX for Spanish speaking contributors",
    },
    { accountId: "dabbie3229.near", topic: "Gender in Web3" },
    {
      accountId: "hannah17.near",
      topic: "Decentralized Finance (DeFi) and Ref Finance",
    },
    { accountId: "xvii.near", topic: "Defi NEAR vs ETH" },
  ];

  return (
    <div>
      {accounts.map((account, index) => (
        <ProfileCard
          key={index}
          accountId={account.accountId}
          topic={account.topic}
        />
      ))}
    </div>
  );
};

// Usage
return <ProfileCards />;
