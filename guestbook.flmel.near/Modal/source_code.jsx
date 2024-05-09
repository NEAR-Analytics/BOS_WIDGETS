const [showModal, setShowModal] = useState(false);

function Modal({ onClose, show, children }) {
  if (!show) {
    return <></>;
  }

  return (
    <div
      class="modal-backdrop"
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
      }}
      onClick={() => {
        // close modal when outside of modal is clicked
        onClose();
      }}
    >
      <div
        class="rounded-2xl bg-white px-4 py-4"
        style={{
          width: '60%',
          minHeight: '100px',
          padding: '25px',
        }}
        onClick={e => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        <div class="rounded-lg bg-lime-300 py-4 px-4 border-2">
          {children}
        </div>
      </div>
    </div>
  )
}

useEffect(() => {
  if (props.transactionHashes) {
    setShowModal(true);
  }
}, []);

const closeModal = () => {
  setShowModal(false);
}

return (
  <Modal show={showModal} onClose={closeModal}>
    <h1 class="text-xl font-bold">Thank You!</h1>
    <div class="h-2 w-20 bg-slate-700"></div>
    <p class="font-bold mt-2">For leaving a review in our GuestBook</p>
  </Modal>
)
