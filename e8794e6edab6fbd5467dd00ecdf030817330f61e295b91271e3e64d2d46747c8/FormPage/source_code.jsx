// This is just a small demo of implementing forms on BOS.
// See the browser inspector console output to see the console.log output.

State.init({
  name: "",
  description: "",
  profilPicture: null,
  startupLogo: null,
  calendar: "",
  linkedin: "",
});

const submitForm = () => {
  console.log(
    "form:",
    state.name,
    state.description,
    state.profilPicture,
    state.startupLogo,
    state.calendar,
    state.linkedin
  );
};

return (
  <>
    <div>
      <p>What is your name?</p>
      <input
        type="text"
        id="name"
        value={state.name}
        onChange={(e) => {
          State.update({ [e.target.id]: e.target.value });
        }}
      />
      <p>Describe in one sentence</p>
      <input
        type="text"
        id="description"
        value={state.description}
        onChange={(e) => {
          State.update({ [e.target.id]: e.target.value });
        }}
      />
      <div className="container row">
        <div>
          Profile picture: <br />
          <IpfsImageUpload image={state.profilPicture} />
        </div>
        <div className="mt-2">
          {state.profilPicture.cid && (
            <img
              src={`https://ipfs.near.social/ipfs/${state.profilPicture.cid}`}
              alt="uploaded"
            />
          )}
        </div>
      </div>

      <div className="container row">
        <div>
          Startup profile: <br />
          <IpfsImageUpload image={state.startupLogo} />
        </div>
        <div className="mt-2">
          {state.startupLogo.cid && (
            <img
              src={`https://ipfs.near.social/ipfs/${state.startupLogo.cid}`}
              alt="uploaded"
            />
          )}
        </div>
      </div>

      <p>Calendar</p>
      <input
        type="text"
        id="calendar"
        value={state.calendar}
        onChange={(e) => {
          State.update({ [e.target.id]: e.target.value });
        }}
      />

      <p>Linkedin</p>
      <input
        type="text"
        id="linkedin"
        value={state.linkedin}
        onChange={(e) => {
          State.update({ [e.target.id]: e.target.value });
        }}
      />
      <input type="submit" value="Submit form" onClick={submitForm} />
    </div>
  </>
);
