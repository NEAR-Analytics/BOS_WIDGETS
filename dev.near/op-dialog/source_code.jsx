const { headerText, modalText, buttonOkText, buttonCancelText } = props;

const [displayModal, setDisplayModal] = useState(true);

const onButtonOk = () => {
  if (typeof props.onButtonOk == "function") {
    props.onButtonOk();
  }
  setDisplayModal(false);
};

const onButtonCancel = () => {
  if (typeof props.onButtonCancel == "function") {
    props.onButtonCancel();
  }
  setDisplayModal(false);
};

return (
  <div
    class="modal fade show"
    tabindex="-1"
    role="dialog"
    style={{ display: displayModal ? "block" : "none" }}
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{headerText ?? "Header"}</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => setDisplayModal(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>{modalText ?? "Text"}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => onButtonOk(false)}
          >
            {buttonOkText ?? "Ok"}
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            onClick={() => onButtonCancel(false)}
            data-dismiss="modal"
          >
            {buttonCancelText ?? "Cancel"}
          </button>
        </div>
      </div>
    </div>
  </div>
);
