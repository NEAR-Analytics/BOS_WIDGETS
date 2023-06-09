/* INCLUDE "common.jsx" */
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
/* INCLUDE "communities.jsx" */
/* END_INCLUDE: "communities.jsx" */
State.init({ showModal: false });

const handleToggleModal = () => {
  State.update({ showModal: !state.showModal });
};

return (
  <>
    <div
      style={{
        display: state.showModal ? "block" : "none",
        position: "relative",
        top: "calc(50% - 250px)",
        left: "calc(50% - 250px)",
        backgroundColor: "transparent",
        padding: "20px",
        zIndex: "1000",
        maxHeight: "calc(100vh - 40px)",
        overflow: "auto",
        width: "700px",
      }}
    >
      <Widget
        src={`${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.components.layout.Controls`}
        props={{
          metadata: metadata,
          accountId: accountId,
          widgetName: widgetName,
        }}
      />
    </div>

    <button
      style={{
        fontSize: "1.11em",
        backgroundColor: "#008080",
        color: "white",
        borderRadius: "15px",
        float: "right",
        padding: "10px",
        height: "55px",
        width: "90px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "10px",
      }}
      class="btn"
      onClick={handleToggleModal}
    >
      <span
        style={{
          backgroundColor: "white",
          color: "#008080",
          borderRadius: "50%",
          padding: "5px",
          display: "block",
          marginRight: "5px",
          lineHeight: "1",
        }}
      >
        +
      </span>
      {state.showModal ? " Close" : "  Post"}
    </button>
  </>
);
