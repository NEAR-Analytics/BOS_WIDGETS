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
        accountId:
          "ce90f4869315210948fc16fb0440731ca7deb9604d3860dca81d2bafa6ffb74e",
        font: "Times New Roman",
        type: "everything",
        text: "mahith",
        domain: "mahith",
      }}
    />
  </div>
);
