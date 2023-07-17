const user = "gagdiez.near";
const props = { name: "welcome to my first pager on NEAR" };
State.init({
  img: null,
});

return (
  <>
    <div class="container min-vw-100">
      <h3>Hector's first web page</h3>
      <p>
        {" "}
        This is the brand new way to make brand new web pages and to improve all
        yor strategies, so what are you waiting for!
      </p>
      <hr />

      <Widget src={`${user}/widget/Greetings`} props={props} />
    </div>
    <div className="container row">
      <div>
        Image upload: <br />
        <IpfsImageUpload image={state.img} />
      </div>
      <div>
        Raw State:
        <pre>{JSON.stringify(state)}</pre>
      </div>
      <div className="mt-2">
        {state.img.cid && (
          <img
            src={`https://ipfs.near.social/ipfs/${state.img.cid}`}
            alt="uploaded"
          />
        )}
      </div>
    </div>
  </>
);
