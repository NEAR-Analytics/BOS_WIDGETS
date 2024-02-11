if (context.loading) {
  return "Loading...";
}

const guestbookExampleContract = "guestbook.flmel.near";

const [message, setMessage] = useState('');
const [amount, setAmount] = useState(0);

function handleMessageChange(e) {
  setMessage(e.target.value);
};

function handleAmountChange(e) {
  setAmount(e.target.value);
};

function postMessage() {
  // Near.call(guestbookExampleContract, "add_message", { message });
}

// const messages = Near.view(guestbookExampleContract, "get_messages", {});

let messages = [
  {
    premium: false,
    sender: 'evaluator.flmel.testnet',
    text: 'Hello from Evaluator'
  },
  {
    premium: true,
    sender: 'evaluator.flmel.testnet',
    text: 'Hello from Evaluator'
  },
  {
    premium: false,
    sender: 'evaluator.flmel.testnet',
    text: '�B7rⱵEp�K%U)���zFw7XJ�Y�65%G��'
  },
  {
    premium: true,
    sender: 'evaluator.flmel.testnet',
    text: '�B7rⱵEp�K%U)���zFw7XJ�Y�65%G��'
  },
  {
    premium: false,
    sender: 'flmel.testnet',
    text: 'messagegeeeee non premium'
  },
  { premium: true, sender: 'flmel.testnet', text: 'premium' }
]

function addMessage() {
  const message = "Hello, World!";

  Near.call(guestbookExampleContract, "add_message", { message });
}

function Card(props) {
  const { message } = props;
  return <>
    {message.text}
  </>
}

return <>
  <div>
    <input onChange={handleChange} value={message} />
    <button onClick={postMessage}>Add to our GusetBook</button>
  </div>

  {messages.map((message) =>
    <>
      {Card({ message })}
    </>
  )}


</>
