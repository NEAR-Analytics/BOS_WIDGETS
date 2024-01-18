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
    index: {
      paulTest2: JSON.stringify({ 
          key: "action", 
          value: `savedMessage: ${msg}`,
      }),
    },
  });
};


const retrievedMsg = Social.get("pavel-pagoda.near/paulTest/msg");
const messageEvents = Social.index("paulTest2", "action", {
    subscribe: true,
});

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
