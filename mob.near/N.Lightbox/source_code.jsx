const show = props.show;
const hide = props.hide ?? (() => {});

return show ? (
  <>
    <div key="backdrop" className="fade modal-backdrop show" />
    <div
      role="dialog"
      aria-modal="true"
      className="fade modal show"
      style={{ display: "block" }}
      onClick={hide}
    >
      <div
        className="modal-dialog modal-xl modal-dialog-centered"
        onClick={(e) => {
          e.stopPropagation && e.stopPropagation();
        }}
      >
        <div className="modal-content position-relative">
          <div className="position-absolute top-0 end-0">
            <button type="button" className="btn-close" onClick={hide}></button>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  </>
) : (
  ""
);
