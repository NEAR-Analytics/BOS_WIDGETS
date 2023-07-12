const accountId = props.accountId ?? context.accountId;

const widgetPath = props.widgetPath ?? "hack.near/widget/Academy";

const starEdge = Social.keys(
  `${context.accountId}/graph/star/${widgetPath}`,
  undefined,
  {
    values_only: true,
  }
);

const loading = starEdge === null;
const star = starEdge && Object.keys(starEdge).length;

const type = star ? "unstar" : "star";

const data = {
  graph: { star: { [widgetPath]: star ? null : "" } },
  index: {
    graph: JSON.stringify({
      key: "star",
      value: {
        type,
        widgetPath: widgetPath,
      },
    }),
    notify: JSON.stringify({
      key: accountId,
      value: {
        type,
      },
    }),
  },
};

const starClick = () => Social.set(data);

const StarButton = styled.button`
  border: 0 !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 23%;
  width: 2.5em;
  height: 2.5em;
`;

return (
  <StarButton
    className=" btn me-1"
    disabled={!context.accountId}
    onClick={starClick}
  >
    <i className={`bi m-1 fs-2 p-1 ${starred ? "bi-star-fill" : "bi-star"}`} />
    {loading ? "Loading..." : star ? "Starred" : "Star"}
  </StarButton>
);
