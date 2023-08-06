const accountId = props.accountId ?? "ogruss.near"; // with human in it
let hasToken = false;
const width = props.width ?? "20px";

const issuer = "fractal.i-am-human.near";
const Icon = styled.div`
.blue-icon {
  width: ${width};
  }
`;

if (accountId) {
  const getFirstSBTToken = () => {
    const view = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
      account: `${accountId}`,
      issuer: issuer,
    });
    return view?.[0]?.[1]?.[0];
  };
  hasToken = getFirstSBTToken() !== undefined;
}

function BlueCheck() {
  return (
    <Icon>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg"
        className="blue-icon"
      ></img>
    </Icon>
  );
}

if (hasToken) {
  return (
    <>
      <BlueCheck />
    </>
  );
} else {
  return <></>;
}
