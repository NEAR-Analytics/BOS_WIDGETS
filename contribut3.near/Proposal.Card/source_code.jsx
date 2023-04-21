const ownerId = "contribut3.near";
const projectId = props.projectId;
const cid = props.cid;
const vendorId = props.vendorId;

State.init({
  request: null,
  requestIsFetched: false,
  proposal: null,
  proposalIsFetched: false,
  profile: null,
  profileIsFetched: false,
});

if (!state.requestIsFetched) {
  Near.asyncView(
    ownerId,
    "get_request",
    { account_id: projectId, cid },
    "final",
    false
  ).then((request) => State.update({ request, requestIsFetched: true }));
}

if (!state.proposalIsFetched) {
  Near.asyncView(
    ownerId,
    "get_proposal",
    { project_id: projectId, vendor_id: vendorId, cid },
    "final",
    false
  ).then((proposal) => State.update({ proposal, proposalIsFetched: true }));
}

if (!state.profileIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${vendorId}/profile/**`] },
    "final",
    false
  ).then((data) => State.update({ profile: data[vendorId].profile, profileIsFetched: true }));
}

if (!state.requestIsFetched || !state.proposalIsFetched || !state.profileIsFetched) {
  return <>Loading...</>;
}


