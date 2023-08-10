return (
  <div>
    <button
      class="btn btn-danger rounded-0"
      type="button"
      data-toggle="tooltip"
      data-placement="top"
      title="Delete"
      onClick={() => props.onClickDelete(props.key)}
    >
      <i class="bi bi-trash" />
    </button>
    <i class={`bi fs-3 ${fileIcon}`} />
    <div key={props.key} value={props.value}>
      <img
        class="rounded w-100 h-100"
        style={{ border: "2px solid #555" }}
        src={`https://ipfs.io/ipfs/${props.value}`}
        alt="upload preview"
      />
    </div>
  </div>
);
