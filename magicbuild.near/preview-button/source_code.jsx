State.init({
  props,
});
const cep = "magicbuild.near";
return (
  <>
    <label></label>
    <button
      data-bs-toggle="modal"
      data-bs-target="#export"
      class="btn btn-dark form-control "
    >
      👀 Preview
    </button>
    <div
      class="modal fade"
      id="export"
      tabindex="-1"
      aria-labelledby="exportLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exportLabel">
              Preview Front-End
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <Widget src={`${cep}/widget/preview`} props={state} />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
);
