return (
  <div className="d-flex flex-column">
    <div className="mt-auto py-3">
      <div className="container">
        <div className="d-flex justify-content-end">
          <a href={"/#/evrything-docs.near/widget/Everything.Documentation"}>
            documentation
          </a>
        </div>
      </div>
    </div>
    <Widget
      src="evrything.near/widget/Everything.Template"
      props={{
        accountId: "aayush1204.near",
        font: "Times New Roman",
        type: "everything",
        text: "Aayush Halgekar",
        domain: "aayush12042000",
      }}
    />
  </div>
);
