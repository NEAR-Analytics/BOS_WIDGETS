// Built for BOS hack by ilerik.near

State.init({ 
    commitLoading: false,
    data: { wot: { attest: ["meta_irony.near inperson"] } },
    attestations: Social.getr(`vself.near/wot/attest`)
});

const Loading = (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);

// Just create a default export function (no need to `return` it, see `.bos`
// folder after `npm run build` if you want to understand what is happening)
function MainComponent(props, context) {
  return (
    <div>
      <h1>Web Of Trust Manager</h1>
      <p>
        This component allows you to manage your Web Of Trust (WOT) by issuing attestations to other NEAR accounts.
        There are two types of attestations at the moment: <b>in person</b> and <b>online</b>.
      </p>
      <div>
        <label for="account">Enter NEAR account name you know for sure to be run by real person:</label>
        <br></br>
        <input name="account" placeholder={data.wot.attest}></input>
        <br></br>
        <label for="confidense">Choose your confidense level:</label>        
        <select name="confidense" id="confidense">
            <option value="inperson">Feels like you have met in person</option>
            <option value="online">Definetly accountable online persona</option>
            <option value="tbd">Coming...</option>
        </select>        
        <button
            disabled={state.commitLoading}
            onClick={() => {
            State.update({ commitLoading: true });
            Social.set(state.data, {
                force: true,
                onCommit: () => {
                State.update({ commitLoading: false });
                },
                onCancel: () => {
                State.update({ commitLoading: false });
                },
            });
            }}
        > {state.commitLoading && Loading} Attest</button>
        <CommitButton force data={state.data}>
            Save
        </CommitButton>
      </div>
      <br></br>
      <p>{state.attestations}</p>
    </div>
  );
}

return MainComponent(props, context);