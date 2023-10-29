State.init({
  projects: [],
});

const TabComponent = () => {
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

  const mobileTabcontentStyle = {
    padding: "6px 8px",
  };

  const paginationStyle = {
    display: "inline-block",
  };

  const paginationLinkStyle = {
    color: "black",
    float: "left",
    padding: "8px 16px",
    textDecoration: "none",
    transition: "background-color .3s",
    border: "1px solid #ddd",
  };

  const paginationLinkActiveStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "1px solid #4CAF50",
  };

  const paginationLinkHoverStyle = {
    backgroundColor: "#ddd",
  };

  const mobileTabButtonStyle = {
    width: "100%",
  };

  const proposalStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
  };

  const priceStyle = {
    fontWeight: "bold",
  };

  const projectStyle = {
    marginTop: "5px",
  };

  const descriptionStyle = {
    marginTop: "10px",
  };

  const bugReportFormStyle = {
    marginTop: "20px",
  };

  const errorMessageStyle = {
    color: "red",
    fontSize: "14px",
    marginTop: "4px",
  };

  const formGroupStyle = {
    marginBottom: "20px",
  };

  const formControlStyle = {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };
};

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
};

return (
  <div>
    <div id="approvals-block">
      <h1 id="bug-eye-project-tile">Test</h1>
      <div style={tabStyle} className="tab">
        <button
          id="pending-tab"
          className="tablinks active"
          style={tabButtonStyle}
        >
          Pending Issues
        </button>
        <button id="approval-tab" className="tablinks" style={tabButtonStyle}>
          Approved Issues
        </button>
        <button id="declined-tab" className="tablinks" style={tabButtonStyle}>
          Declined Issues
        </button>
      </div>
      <div id="pending" className="tabcontent" style={tabcontentStyle}>
        <h3>Pending Issues</h3>
        <div id="proposals-pending-content"></div>
      </div>
      <div id="approved" className="tabcontent" style={tabcontentStyle}>
        <h3>Approved Issues</h3>
        <div id="proposals-approved-content"></div>
      </div>
      <div id="declined" className="tabcontent" style={tabcontentStyle}>
        <h3>Declined Issues</h3>
        <div id="proposals-declined-content"></div>
      </div>
    </div>
    <button onClick={testView}>test view</button>
  </div>
);
