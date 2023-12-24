let k = props.k ?? false;
if (!k) {
  return (
    <h4>
      You need to create Keypom drop first!
      <br /> Search for "Linkdrop plus" <br />
      or click here to open the app on near.org:
      <a href="https://near.org/mzmarshall.near/widget/linkdrop_plus">
        Linkdrop plus
      </a>
    </h4>
  );
}
const data = JSON.parse(Buffer.from(k, "base64").toString("utf-8"));

const linkClaim =
  "https://wallet.near.org" + "/linkdrop/v2.keypom.near/" + data.k;

State.update({
  qrCodeData: linkClaim,
});

console.log(
  "Data",
  data,
  "claim link , ",
  linkClaim,
  "State: " + state.qrCodeData
);

const dropInfo = Social.getr(`${data.u}/keypomConfig`);

return (
  <>
    <div className="container text-center">
      <img
        className="rounded mx-auto d-block img-fluid"
        src={`https://ipfs.near.social/ipfs/${dropInfo.img}`}
        alt="uploaded"
      />

      <Markdown className="my-2" text={dropInfo.desc} />

      <a href={linkClaim} target="_blank">
        <button className="btn btn-primary btn-lg">🎁 Claim Drop</button>
      </a>
    </div>
  </>
);
