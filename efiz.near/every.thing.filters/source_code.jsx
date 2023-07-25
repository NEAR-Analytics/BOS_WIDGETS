const handleFilter = props.handleFilter;
State.init({
  accountId: "",
});

return (
  <div className="mb-2 d-flex align-items-baseline gap-2">
    Filter:
    {state.accountId ? (
      <a className="btn btn-outline-primary">
        <Widget
          src="mob.near/widget/ProfileLine"
          props={{ accountId: state.accountId, link: false }}
        />
        <i
          className="bi bi-x-square"
          onClick={() => State.update({ accountId: "" })}
        ></i>
      </a>
    ) : (
      <>
        <input
          className="form-control d-inline-block w-auto"
          placeholder={"accountId"}
          value={state.accountIdVal}
          onChange={(e) =>
            State.update({
              accountIdVal: e.target.value,
            })
          }
        />
        <button
          onClick={() => {
            State.update({ accountId: state.accountIdVal });
            handleFilter({
              accountId: accountIdVal,
            });
          }}
        >
          apply
        </button>
      </>
    )}
    {state.tag ? (
      <a className="btn btn-outline-primary">
        <span className="badge text-bg-secondary">#{state.tag}</span>
        <i className="bi bi-x-square"></i>
      </a>
    ) : (
      <>
        <input
          className="form-control d-inline-block w-auto"
          placeholder={"tag"}
          value={state.tag}
          onChange={(e) =>
            State.update({
              tagVal: e.target.value,
            })
          }
        />
        <button
          onClick={() => {
            State.update({ tag: state.tagVal });
            handleFilter({
              tag: tagVal,
            });
          }}
        >
          apply
        </button>
      </>
    )}
  </div>
);
