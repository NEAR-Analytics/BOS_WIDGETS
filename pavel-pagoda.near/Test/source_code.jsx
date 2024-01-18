// const HeaderContainer = styled.div`
//   height: 70px;
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding-inline: 8px;

// `;

const [msg, setMsg] = useState("");
const onClick = () => {
  Social.set({
    post: {
      main: JSON.stringify({
        type: "md",
        text: "I've read the docs!"
      })
    }
  })
}

return (
  <div>
    <textarea value={msg} onChange={(e) => setMsg(e.target.value)} />
    <button type="button">Save</button>
  </div>
);
