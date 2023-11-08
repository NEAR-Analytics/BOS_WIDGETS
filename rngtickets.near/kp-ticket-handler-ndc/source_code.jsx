const kpContract = "v2.keypom.near";
let have_pk = false;
let curUse;
if (
  props.key != undefined &&
  props.key != "" &&
  props.pk != undefined &&
  props.pk != ""
) {
  have_pk = true;
  curUse = Near.view(kpContract, "get_key_information", {
    key: props.key,
  }).cur_key_use;
  if (curUse == undefined) {
    curUse = 0;
  }
}

State.init({
  keyUse: curUse,
  contract: kpContract,
  havePk: have_pk,
});

State.update({
  keyUse: curUse,
});

// rendering stuff
if (state.keyUse == 1) {
  // QR code
  return (
    <>
      <Widget
        src="rngtickets.near/widget/kp-ticket2"
        props={{ key: props.key, pk: props.pk }}
      />
      <div className="content">
        <h1>NEAR WORLDWIDE</h1>
        <p>November 9, 19:30 - 20:00</p>
        <p>
          Community HQ
          <br />
          Rua Pereira Henriques
          <br />
          31950-242
          <br />
          Lisboa, Portugal
        </p>
        <p>
          NEAR WORLDWIDE is an electrifying event bridging the gap between the
          many regional communities that represent the NEAR ecosystem worldwide.
          This event is a transformative experience focused on global
          connectivity, innovation, and community growth. Join us in celebrating
          the global community with this immersive experience and be ready to be
          amazed, inspired, and connected like never before.
        </p>
      </div>
    </>
  );
} else if (state.keyUse == 2) {
  return (
    <div className="content">
      <h1>You're all set! Enjoy the event</h1>
      <a
        href={`https://app.mynearwallet.com/linkdrop/${state.contract}/${props.pk}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="onboard_button">Claim your POAP</button>
      </a>
    </div>
  );
} else if (state.keyUse == 0 && !state.havePk) {
  // Event Landing Page
  return (
    <div className="content">
      <h1>NEAR WORLDWIDE</h1>
      <p>November 9, 19:30 - 20:00</p>
      <p>
        Community HQ
        <br />
        Rua Pereira Henriques
        <br />
        31950-242
        <br />
        Lisboa, Portugal
      </p>
      <p>
        NEAR WORLDWIDE is an electrifying event bridging the gap between the
        many regional communities that represent the NEAR ecosystem worldwide.
        This event is a transformative experience focused on global
        connectivity, innovation, and community growth. Join us in celebrating
        the global community with this immersive experience and be ready to be
        amazed, inspired, and connected like never before.
      </p>
    </div>
  );
} else if (state.keyUse == 0) {
  // Key has been depleted, show resources for NEAR
  return (
    <div className="content">
      <h1>Now that you have a wallet...</h1>
      <a
        href={"https://near.org/learn"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="onboard_button">
          Continue your journey into NEAR
        </button>
      </a>
    </div>
  );
} else {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        Please visit drops page or enter key info in URL props
      </div>{" "}
    </div>
  );
}
