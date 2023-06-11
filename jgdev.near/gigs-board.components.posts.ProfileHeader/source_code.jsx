/* INCLUDE: "common.jsx" */
const nearDevGovGigsContractAccountId =
  props.nearDevGovGigsContractAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];
const nearDevGovGigsWidgetsAccountId =
  props.nearDevGovGigsWidgetsAccountId ||
  (context.widgetSrc ?? "jgdev.near").split("/", 1)[0];

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
  return `/#/${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.pages.${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}
/* END_INCLUDE: "common.jsx" */

let inner = (
  <>
    {!hideImage && (
      <Widget
        key="image"
        src="mob.near/widget/ProfileImage"
        props={{
          style: {
            width: "3em", // Increased size
            height: "3em", // Increased size
            marginRight: "0.1em",
            borderRadius: "50%", // Added border radius
            "@media (max-width: 768px)": {
              // Small screens
              marginBottom: "12em",
            },
            "@media (min-width: 768px)": {
              // Medium screens
              marginBottom: "6em",
            },
          },
          profile,
          accountId,
          className: "d-inline-block",
          imageClassName: "rounded w-100 h-100 align-top",
        }}
      />
    )}
    {!hideName && <span key="name">{name}</span>}
    {!hideAccountId && (
      <span key="accountId" className="text-muted ms-1">
        @{accountId}
      </span>
    )}
  </>
);
