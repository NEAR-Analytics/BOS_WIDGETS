const isDebug = props.isDebug;

const writersWhiteList = [
  "neardigitalcollective.near",
  "blaze.near",
  "jlw.near",
  "kazanderdad.near",
  "joep.near",
  "sarahkornfeld.near",
  "yuensid.near",
  "shubham007.near",
  "fiftycent.near",
];

const sayALotWorkers = [
  "silkking.near",
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
];

if (isDebug) {
  sayALotWorkers.forEach((accountId) => writersWhiteList.push(accountId));
}

const authorForWidget = "sayalot.near";
const accountId = props.accountId ?? context.accountId;
// if (!accountId) {
//   return "No account ID";
// }

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
if (profile === null) {
  return "Loading";
}

return (
  <div
    className="container-fluid"
    style={{
      backgroundColor: "rgb(230, 230, 230)",
      borderRadius: "20px",
      padding: "0",
    }}
  >
    <Widget
      src={`${authorForWidget}/widget/SayALot_MainNavigation`}
      props={{ currentNavPill: "articles", writersWhiteList, isDebug }}
    />
    <div style={{ margin: "0 auto", width: "90%", minWidth: "360px" }}>
      <Widget
        src={`${authorForWidget}/widget/SayALot_AllArticlesList`}
        props={{ writersWhiteList, isDebug }}
      />
    </div>
  </div>
);
