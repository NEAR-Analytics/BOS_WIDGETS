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
        src="mintlu.near/widget/kp-ticket2"
        props={{ key: props.key, pk: props.pk }}
      />
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
      <h1>NEAR Toronto: Rooftop Rendezvous🦩</h1>
      <p>
        Welcome to the 🦩NEAR Toronto: Rooftop Rendezvous🦩, a chill community
        event that concludes the Blockchain Futurist Conference. Join us as we
        celebrate the intersection of innovation, technology, and community,
        immersed in a social atmosphere filled with great people and creativity
        (more info below).
      </p>
      <p>
        In collaboration with: NEAR Foundation, TENAMINT, Seahorse Social, KPW
        Comms, Proof of Vibes, Marma J Foundation, NEAR Foundation, Music Feast,
        GDS Consulting, Brothers Grimm Ultra Premium Vodka, CreativesDAO.
      </p>
    </div>
  );
} else if (state.keyUse == 0) {
  // Key has been depleted, show resources for NEAR
  return (
    <div className="content">
      <h1>Now that you have a wallet...</h1>
      <a
        href={"https://near.org/learn/#anker_near"}
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
