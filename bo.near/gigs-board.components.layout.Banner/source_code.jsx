/* INCLUDE: "common.jsx" */
const nearDevGovGigsContractAccountId =
  props.nearDevGovGigsContractAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];
const nearDevGovGigsWidgetsAccountId =
  props.nearDevGovGigsWidgetsAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];

function widget(widgetName, widgetProps, key) {
  widgetProps = {
    ...widgetProps,
    nearDevGovGigsContractAccountId: props.nearDevGovGigsContractAccountId,
    nearDevGovGigsWidgetsAccountId: props.nearDevGovGigsWidgetsAccountId,
    referral: props.referral,
  };
  return (
    <Widget
      src={`${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.${widgetName}`}
      props={widgetProps}
      key={key}
    />
  );
}

function href(widgetName, linkProps) {
  linkProps = { ...linkProps };
  if (props.nearDevGovGigsContractAccountId) {
    linkProps.nearDevGovGigsContractAccountId =
      props.nearDevGovGigsContractAccountId;
  }
  if (props.nearDevGovGigsWidgetsAccountId) {
    linkProps.nearDevGovGigsWidgetsAccountId =
      props.nearDevGovGigsWidgetsAccountId;
  }
  if (props.referral) {
    linkProps.referral = props.referral;
  }
  const linkPropsQuery = Object.entries(linkProps)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return `#/${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.pages.${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}
/* END_INCLUDE: "common.jsx" */

const Banner = styled.div`
   {
    height: 62px;
    background: #181818;
    margin-top: -24px;
    overflow: hidden !important;
    padding: 20px;

    img {
      height: 36px;
    }

    margin-bottom: 25px;
  }
`;

const Gradient = styled.div`
   {
    position: relative;
    left: -48vw;
    width: 173vw;
    height: 70vw;
    top: -70vw;
    transform: rotate(9.78deg);
    background: linear-gradient(
      -90deg,
      rgb(0, 204, 255) 0.57%,
      rgb(50, 82, 166) 100.57%
    );
    opacity: 0.22;
    filter: blur(17vw);
  }
`;

return (
  <>
    <Banner>
      <a href={href("Feed")}>
        <img src="https://ipfs.near.social/ipfs/bafkreibjsn3gswlcc5mvgkfv7ady2lzkd2htm55l472suarbd34qryh2uy"></img>
      </a>
      {/* <Gradient></Gradient> */}
    </Banner>
  </>
);
