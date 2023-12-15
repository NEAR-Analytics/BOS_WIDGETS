// filter registry contract for overlap // redocard so not included
return (
  <Widget
    src={`a_liutiev.near/widget/keypom.projects.listPage`}
    props={{
      descriptor: "projects",
      urlProps: props.urlProps,
      entity: "projects",
      filters: [
        "vertical",
        "readiness",
        "size",
        "integration",
        "dev",
        "stage",
        "distribution",
      ],
      renderItem: (accountId) => (
        <Widget
          src={`a_liutiev.near/widget/keypom.projects.projectCard`}
          props={{
            accountId,
          }}
        />
      ),
    }}
  />
);
