const [show, setShow] = useState(true);
const onHide = props.onHide ?? (() => setShow(false));
const [searchTerm, setSearchTerm] = useState("");

const Wrapper = styled.div`
  white-space: normal;
  .lightbox {
    backdrop-filter: blur(5px);
  }
`;

const content = (
  <div
    className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
    onClick={(e) => {
      e.stopPropagation();
    }}
  >
    <div className="modal-content">
      <div className="modal-header">
        <div className="modal-title h4">GIF Search</div>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onHide}
        ></button>
      </div>
      <div className="modal-body">
        <input
          autoFocus
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  </div>
);

return (
  <Wrapper>
    <Widget
      key="gif-search"
      src="mob.near/widget/N.Lightbox"
      loading=""
      props={{
        show,
        onHide,
        children: content,
      }}
    />
  </Wrapper>
);
