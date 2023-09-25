const [show, setShow] = useState(true);
const backdrop = false;

const Lightbox = styled.div`
  .modal-bg {
    position: fixed;
`;

return show ? (
  <>
    <div
      key="backdrop"
      className="fade modal-backdrop show"
      onClick={(e) => {
        console.log("dialog");
        setShow(false);
      }}
    />
    <div
      role="dialog"
      aria-modal="true"
      className="fade modal show"
      tabindex="-1"
      style={{ display: "block" }}
    >
      <div
        className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
        onClick={(e) => {
          console.log("modal");
          return true;
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">Saving data</div>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <div></div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-success"> Save Data</button>
            <button className="btn btn-secondary">Close</button>
          </div>
        </div>
      </div>
    </div>
  </>
) : (
  ""
);
