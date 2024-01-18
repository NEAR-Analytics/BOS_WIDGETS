// const HeaderContainer = styled.div`
//   height: 70px;
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding-inline: 8px;

// `;

const [msg, setMsg] = useState("");
const handleClick = () => {
  Social.set({
    paulTest: {
      msg,
    },
  });
  Social.set({
      index: {
          paulTest: {
              action: `savedMessage: ${msg}`,
          },
      },
  });
};

const messageEvents = Social.index("paulTest", "action");

const retrievedMsg = Social.get("pavel-pagoda.near/paulTest/msg");

return (
  <div>
    <textarea value={msg} onChange={(e) => setMsg(e.target.value)} />

    <button type="button" onClick={handleClick}>
      Save
    </button>
    <hr />
    <div>{retrievedMsg}</div>
    <div>{JSON.stringify(messageEvents)}</div>
  </div>
);
