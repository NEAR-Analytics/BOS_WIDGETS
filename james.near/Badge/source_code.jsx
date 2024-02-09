const [image, setImage] = useState(props.imageUrl);
const defaultImageUrl =
  "https://builders.mypinata.cloud/ipfs/QmPFStM3F842nFwW3taftACD1UjaLT1wbMzePi39eefSyU";

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

const handleImageError = () => {
  setImage(defaultImageUrl);
};

return (
  <>
    {badge && (
      <span>
        <img
          src={image || defaultImageUrl}
          onError={handleImageError}
          alt="📛"
        />
      </span>
    )}
  </>
);
