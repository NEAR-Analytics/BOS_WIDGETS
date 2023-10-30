State.init({
  projects: [],
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
  const proposals = getProposalsByProject(1, 1, 1, 10);
  console.log(proposals);
  console.log(state.projects);
  openTab({ currentTarget: document.getElementById("pending-tab") }, "pending");
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
          style={tabButtonStyle}
          onClick={() => openTab("pending")}
        >
          Pending Issues
        </button>
        <button
          id="approval-tab"
          className={`tablinks ${
            state.activeTab === "approved" ? "active" : ""
          }`}
          style={tabButtonStyle}
          onClick={() => openTab("approved")}
        >
          Approved Issues
        </button>
        <button
          id="declined-tab"
          className={`tablinks ${
            state.activeTab === "declined" ? "active" : ""
          }`}
          style={tabButtonStyle}
          onClick={() => openTab("declined")}
        >
          Declined Issues
        </button>
      </div>
      <div
        id="pending"
        className={`tabcontent ${activeTab === "pending" ? "activeTab" : ""}`}
        style={{
          ...tabcontentStyle,
          ...(activeTab === "pending" ? { display: "block" } : {}),
        }}
      >
        <h3>Pending Issues</h3>
        <div id="proposals-pending-content">Content for Pending Issues</div>
      </div>
      <div
        id="approved"
        className={`tabcontent ${activeTab === "approved" ? "activeTab" : ""}`}
        style={{
          ...tabcontentStyle,
          ...(activeTab === "approved" ? { display: "block" } : {}),
        }}
      >
        <h3>Approved Issues</h3>
        <div id="proposals-approved-content">Content for Approved Issues</div>
      </div>
      <div
        id="declined"
        className={`tabcontent ${activeTab === "declined" ? "activeTab" : ""}`}
        style={{
          ...tabcontentStyle,
          ...(activeTab === "declined" ? { display: "block" } : {}),
        }}
      >
        <h3>Declined Issues</h3>
        <div id="proposals-declined-content">Content for Declined Issues</div>
      </div>
    </div>
    <button onClick={testView}>test view</button>
  </div>
);
