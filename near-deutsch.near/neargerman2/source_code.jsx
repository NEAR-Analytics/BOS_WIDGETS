const buttonStyle = {
  color: "#ffffff",
  backgroundColor: "#000000",
  fontSize: "15px",
  padding: "15px 40px",
  cursor: "pointer",
  border: "0",
  margin: "10px 0",
  width: "400px",
};

return (
  <div>
    <div>Our Social Media Channels</div>
    <div>
      <button style={buttonStyle}>
        <a
          href="https://t.me/Near_German"
          target="_blank"
          height="auto"
          style={{ color: "#ffffff" }}
        >
          Near German Telegram
        </a>
      </button>
    </div>
    <div>
      <button style={buttonStyle}>
        <a
          href="https://twitter.com/@Near_German"
          target="_blank"
          height="auto"
          style={{ color: "#ffffff" }}
        >
          Near German Twitter
        </a>
      </button>
    </div>
    <div>
      <button style={buttonStyle}>
        <a
          href="https://medium.com/@Near_German"
          target="_blank"
          height="auto"
          style={{ color: "#ffffff" }}
        >
          Near German Medium
        </a>
      </button>
    </div>
    <div>
      <button style={buttonStyle}>
        <a
          href="https://near.social/mob.near/widget/ProfilePage?accountId=near-deutsch.near"
          target="_blank"
          height="auto"
          style={{ color: "#ffffff" }}
        >
          Near German Near Social
        </a>
      </button>
    </div>
  </div>
);
