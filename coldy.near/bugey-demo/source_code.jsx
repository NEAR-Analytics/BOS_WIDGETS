State.init({
  projectId: 1,
  pendingProposals: {
    pages: 1,
    proposals: [],
  },
  approvedProposals: {
    pages: 1,
    proposals: [],
  },
  declinedProposals: {
    pages: 1,
    proposals: [],
  },
  activeTab: "pending",
});

const contractId = "bugeye.learnclub.near";

const getProjectsList = (page, limit) => {
  return Near.view(contractId, "get_projects", {
    page,
    limit,
  });
};

const getProposalsByProject = (project_id, status, page, limit) => {
  return Near.view(contractId, "get_proposals_by_project", {
    project_id,
    status,
    page,
    limit,
  });
};

const testView = () => {
  State.update({
    projects: getProjectsList(1, 10),
  });
  const proposals = getProposalsByProject(state.projectId, 1, 1, 10);
};

const tabStyle = {
  display: "flex",
  border: "1px solid #ccc",
  backgroundColor: "#f1f1f1",
};

const tabButtonStyle = {
  background: "inherit",
  border: "none",
  outline: "none",
  cursor: "pointer",
  padding: "14px 16px",
  transition: "0.3s",
  fontSize: "17px",
  flex: "1",
  boxSizing: "border-box",
};

const tabButtonHoverStyle = {
  backgroundColor: "#ddd",
};

const tabButtonActiveStyle = {
  backgroundColor: "#ccc",
};

const tabcontentStyle = {
  display: "none",
  padding: "6px 12px",
  border: "1px solid #ccc",
  borderTop: "none",
};

const openTab = (tabName) => {
  State.update({
    activeTab: tabName,
  });
  console.log(state.activeTab);
};

const setPendingProposals = () => {
  const pendingProposalsData = getProposalsByProject(state.projectId, 0, 1, 10);
  if (pendingProposalsData[0] && pendingProposalsData[1]) {
    State.update({
      pendingProposals: {
        pages: pendingProposalsData[1],
        proposals: pendingProposalsData[0],
      },
    });
  }
};

const viewProposals = (proposals) => {
  let content = "";
  if (proposals.length > 0) {
    for (let proposal of proposals) {
      content += `<div id="${proposal.id}" class="proposal">
            <div class="id">Issue Id: <strong>${proposal.id}</strong></div>
            <div class="reward">Requested Reward: <strong>${proposal.price} Near  <a href="https://explorer.mainnet.near.org/accounts/${proposal.author_wallet}" target="_blank">(by ${proposal.author_wallet})</a></strong></div>
            <div class="project">
                Project: <strong>${proposal.project_id}</strong>
            </div>
            <div class="description">Proposal: ${proposal.text}</div>
        </div>`;
    }
  } else {
    content = "No issues";
  }
  console.log(content);
  return content;
};

const setInitial = () => {
  setPendingProposals();
};

setInitial();

return (
  <div>
    <div id="approvals-block">
      <h1 id="bug-eye-project-title">Test</h1>
      <div style={tabStyle} className="tab">
        <button
          id="pending-tab"
          className={`tablinks ${
            state.activeTab === "pending" ? "active" : ""
          }`}
          style={
            state.activeTab === "pending"
              ? { ...tabButtonStyle, ...tabButtonActiveStyle }
              : tabButtonStyle
          }
          onClick={() => openTab("pending")}
        >
          Pending Issues
        </button>
        <button
          id="approval-tab"
          className={`tablinks ${
            state.activeTab === "approved" ? "active" : ""
          }`}
          style={
            state.activeTab === "approved"
              ? { ...tabButtonStyle, ...tabButtonActiveStyle }
              : tabButtonStyle
          }
          onClick={() => openTab("approved")}
        >
          Approved Issues
        </button>
        <button
          id="declined-tab"
          className={`tablinks ${
            state.activeTab === "declined" ? "active" : ""
          }`}
          style={
            state.activeTab === "declined"
              ? { ...tabButtonStyle, ...tabButtonActiveStyle }
              : tabButtonStyle
          }
          onClick={() => openTab("declined")}
        >
          Declined Issues
        </button>
      </div>
      <div
        id="pending"
        className={`tabcontent ${
          state.activeTab === "pending" ? "activeTab" : ""
        }`}
      >
        {state.activeTab === "pending" && (
          <div>
            <h3>Pending Issues</h3>
            <div id="proposals-pending-content">
              {viewProposals(state.pendingProposals.proposals)}
            </div>
          </div>
        )}
      </div>
      <div
        id="approved"
        className={`tabcontent ${
          state.activeTab === "approved" ? "activeTab" : ""
        }`}
      >
        {state.activeTab === "approved" && (
          <div>
            <h3>Approved Issues</h3>
            <div id="proposals-approved-content">
              Content for Approved Issues
            </div>
          </div>
        )}
      </div>
      <div
        id="declined"
        className={`tabcontent ${
          state.activeTab === "declined" ? "activeTab" : ""
        }`}
      >
        {state.activeTab === "declined" && (
          <div>
            <h3>Declined Issues</h3>
            <div id="proposals-declined-content">
              Content for Declined Issues
            </div>
          </div>
        )}
      </div>
    </div>
    <button onClick={testView}>test view</button>
  </div>
);
