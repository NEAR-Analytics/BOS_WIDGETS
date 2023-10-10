const contract = "guest-book.near";
const messages = Near.view(contract, "getMessages", {}).reverse();
console.log(messages);

const addNewMessage = () => {
  if (state.newMessage.trim() == "") {
    return;
  }

  Near.call(contract, "addMessage", {
    text: state.newMessage,
  });
};
function Header() {
  return <h1 style={styleHeader}>FDAO Attendance Sheet🗓️</h1>;
}
const styleHeader = {
  backgroundColor: "black",
  margin: "auto -16px",
  padding: "16px 32px",
  color: "orange",
  fontWeight: "bold",
};

const body = styled.div`
  .box{
  font-size: 20px;
  font-weight: bold;
  border-radius: 3px;
  padding: 10px 10px;
  cursor: pointer;
  margin: 10px 0;
  transition: background-color 0.3s, border-color 0.3s, transform 0.1s;

  &:hover {
  transform: scale(1.01); 
  }

  
`;

const styleNote = {
  borderRadius: "7px",
  border: "solid",
  padding: "10px",
  width: "240px",
  marginLeft: "20%",
  margin: "16px",
  float: "left",
};

const stylebutton = {
  marginLeft: "40%",
  position: "relative",
  right: "18px",
  bottom: "-18px",
  background: "black",
  color: "orange",
  border: "none",
  borderRadius: "50%",
  width: "100px",
  height: "50px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
  cursor: "pointer",
  outline: "none",
};

const Attendancesheet = {
  borderRadius: "7px",
  border: "solid",
  padding: "10px",
  width: "90%",
  margin: "16px",
  float: "left",
  background: "black",
};

const merimrziterakya = {
  margin: "auto -16px",
  padding: "16px 32px",
  color: "orange",
  fontWeight: "bold",
};
const tumerilaila = {
  color: "orange",
};

return (
  <body>
    <Header />
    <div>
      <div class="p-3">
        <br />
        {context.accountId ? (
          <div class=" border-red p-3">
            <div class="row">
              <div>
                <input
                  placeholder="Attendance event"
                  style={styleNote}
                  onChange={(e) => State.update({ newMessage: e.target.value })}
                />
              </div>
            </div>
            <button
              class="btn btn-primary mt-2"
              style={stylebutton}
              onClick={async () => {
                addNewMessage();
              }}
            >
              Mark
            </button>
          </div>
        ) : (
          <p class="text-center py-2">
            You must login to add the winner in list.
          </p>
        )}
        <br />
        <div style={Attendancesheet}>
          <h3 style={merimrziterakya}>Attendance Sheet</h3>
          <table className="table table-sm">
            <thead>
              <tr class="p-2 mb-3 bg-primary text-white text-center weight-bold">
                <th>Account</th>
                <th>Event</th>
              </tr>
            </thead>
            <tbody style={tumerilaila}>
              {messages.map((data, key) => {
                return (
                  <tr class="text-center">
                    <td>{data.sender}</td>
                    <td>{data.text}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </body>
);
