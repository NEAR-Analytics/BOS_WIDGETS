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
  "https://builders.mypinata.cloud/ipfs/QmPFStM3F842nFwW3taftACD1UjaLT1wbMzePi39eefSyU";

return (
  <>
    <span>{badge && <img src={imageSrc} alt="✅" />}</span>
  </>
);
