return props.labels ? (
  <div class="card-title">
    {props.labels.map((label) => {
      const labelRoute =
        "#/y3k.near/widget/apps.ama.main" + "?labelFilter=" + label;
      return (
        <a href={labelRoute}>
          <span class="badge p-0 pe-2 text-primary">{label}</span>
        </a> // need to add filter logic to routes so it filters backlog feed with tag // try adding to prop logic in features
      );
    })}
  </div>
) : null;
