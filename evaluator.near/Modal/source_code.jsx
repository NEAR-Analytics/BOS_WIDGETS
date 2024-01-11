const [showModal, setShowModal] = useState(false);
const [txDetails, setTxDetails] = useState(null);

// TODO: SWITCH to give the functions calls 

function Modal({ onClose, show, children, successValue }) {
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
        class="rounded-lg bg-white shadow-lg px-4 py-4"
        style={{
          width: '60%',
          minHeight: '200px',
          padding: '25px',
        }}
        onClick={e => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        <div class={`rounded-lg border-2 ${success? "border-lime-300" : "border-red-300"} py-4 px-4`}>
                  {children}
        </div>
      </div>
    </div>
  )
}

useEffect(() => {
  if (props.transactionHashes) {
    const transaction = asyncFetch("https://rpc.mainnet.near.org", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "dontcare",
        method: "tx",
        params: [props.transactionHashes, context.accountId],
      }),
    }).then((tx) => {
    console.log(tx);
      setShowModal(true);

      const txMethodName =
        tx?.body?.result?.transaction?.actions[0].FunctionCall.method_name;
      const txLink = `https://nearblocks.io/txns/${props.transactionHashes}`;
      const txResultValue = tx?.body?.result;
      console.log(txResultValue);

      console.log(tx);

      setTxDetails({
        txMethodName,
        txLink,
        txResultValue
      });

    });
  }
}, []);

const closeModal = () => {
  setShowModal(false);
}

return (
  <Modal show={showModal} onClose={closeModal} success={txDetails.txResultValue}>
    <h2>{txDetails.txResultValue}</h2>

    <p>Method: {txDetails.txMethodName}</p>
    <div class="flex justify-end">
      <p class="font-bold">Check your transaction: 
        <a href={txDetails.txLink} class="border rounded py-1 px-3">here</a></p>
    </div>
  </Modal>
)





