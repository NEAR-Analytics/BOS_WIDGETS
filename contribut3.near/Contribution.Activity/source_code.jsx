const ownerId = "contribut3.near";
const projectId = props.projectId;
const vendorId = props.vendorId;
const title = props.title;
const status = props.status;
const actions = props.actions;

State.init({
  name: "",
  nameIsFetched: false,
  vendorName: "",
  vendorNameIsFetched: false,
});

if (!state.nameIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${projectId}/profile/name`] },
    "final",
    false
  ).then((data) =>
    State.update({
      name: data[projectId].profile.name,
      nameIsFetched: true,
    })
  );
}

if (!state.vendorNameIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${vendorId}/profile/name`] },
    "final",
    false
  ).then((data) =>
    State.update({
      vendorName: data[vendorId].profile.name,
      vendorNameIsFetched: true,
    })
  );
}

if (!state.nameIsFetched || !state.vendorNameIsFetched) {
  return <>Loading...</>;
}

const activity = [
  {
    id: "created",
    text: <><b>{state.name}</b> created a contract <b>"{title}"</b> with <b>{state.vendorName}</b></>
  }, {
    id: "awaiting",
    text: <>Awaiting approval by <b>{state.vendorName}</b></>
  },
];

if (!("Rejected" in status) && !("Created" in status)) {
  activity.push({
    id: "accepted",
    text: <><b>{state.vendorName}</b> accepted contract</>
  });
  activity.push({
    id: "started",
    text: <>Contract has started</>
  });
}

if ("Rejected" in status) {
  activity.push({
    id: "rejected",
    text: <><b>{state.vendorName}</b> rejected contract</>
  });
}

if (status === "Ongoing" || "Delivered" in status || "Completed" in status) {
  activity.push({
    id: "ongoing",
    text: <>Work in progress</>
  });
}

contribution.actions.forEach(({ description, start_date, end_date }) => activity.push({
  id: start_date,
  text: <>{description}</>,
  timestamp: `${new Date(Number(start_date)).toLocaleDateString()}${end_date ? " - " + new Date(Number(end_date)).toLocaleDateString() : ""}`
}));

if ("Delivered" in status || "Completed" in status) {
  activity.push({
    id: "delivered",
    text: <>Contract marked as delivered by <b>{state.vendorName}</b></>
  });
}

if ("Completed" in status) {
  activity.push({
    id: "completed",
    text: <>Contract completed</>
  });
}

const List = styled.ul`
  list-style-type: image;
  list-style-image: url(https://ipfs.near.social/ipfs/bafkreicxzxikc435dyiwilxuitevu5uiwoea4ls6o7ckdev3esjs6r3p5q);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
  gap: 2em;
`;

return <List>{
  activity.reverse().map(({ id, text, timestamp }) => <li key={id}><span>{text}</span><small>{timestamp}</small></li>)
}</List>;
