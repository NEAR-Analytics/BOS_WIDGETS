const accountId = props.accountId || context.accountId;
const contractId = "guestbook.workshopcamp.near";

State.init({
  messages: [],
  status: null,
});

const getMessages = () => {
  const messages = Near.view(contractId, "get_messages", null);
  State.update({
    messages,
  });
};

const postMessage = () => {
  if (!accountId) return;

  if (state.status === null || state.status == "") return;

  Near.call(contractId, "add_message", {
    text: state.status,
  });

  getMessages();
};

getMessages();

const content = (
  <div>
    <div className="hero min-h-screen bg-primary">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-base-content">BOS workshop</h1>
          <p className="mb-4 text-base-content">
            Welcome to the GuestBook, add your message for everyone to see!
          </p>
          <p className="mb-4 text-base-content">
            You are logged in as <b>{accountId}</b>
          </p>
          <div className="my-2">
            <textarea
              placeholder="Your status"
              className="textarea textarea-bordered textarea-lg w-full max-w-xs"
              value={state.status}
              onChange={({ target: { value } }) =>
                State.update({ status: value })
              }
            ></textarea>
          </div>
          <button className="btn btn-primary mb-4" onClick={postMessage}>
            Add a message
          </button>

          <div className="my-4">
            {state.messages.map((status) => (
              <div className="card bg-base-100 shadow-xl mb-4">
                <div className="card-body">
                  <h2 className="card-title text-base-content">
                    {status.text}
                  </h2>
                  <p className="text-left text-base-content">{status.sender}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

return (
  <Widget
    src="igris.near/widget/DaisyUIWrapper"
    props={{ children: content, daisyUiTheme: "cyberpunk" }}
  />
);
