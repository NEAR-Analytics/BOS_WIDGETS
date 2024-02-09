const imageUrl = props.imageUrl;

const attestorId = props.attestorId ?? "devs.near";
const accountId = props.accountId ?? "hack.near";

const badgeId = props.badgeId ?? "builder";

let badge = props.badge ?? false;

let checkpoint =
  props.checkpoint ||
  Social.get(`${attestorId}/badge/${badgeId}/accounts/${accountId}`);

if (checkpoint.length > 0 || checkpoint === "") {
  badge = true;
}

const imageSrc =
  imageUrl ||
  "https://builders.mypinata.cloud/ipfs/QmQmKGGJXhkhGrTbE4MgJ3G1wUUu8eo7mNKwRSCB5tihCw";

return (
  <>
    <span>{badge && <img src={imageSrc} />}</span>
  </>
);
