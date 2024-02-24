if (context.loading) {
  return "Loading...";
}

const guestbookExampleContract = "guestbook.flmel.near";
const messages = Near.view(guestbookExampleContract, "get_messages", {});

if (messages === null) {
  return "Loading...";
}

const [latestMessage, ...rest] = messages.reverse();

const [message, setMessage] = useState("");
const [premium, setPremium] = useState(false);
const [theme, setTheme] = useState(null);

function handleMessageChange(e) {
  setMessage(e.target.value);
}

function handleAmountChange(e) {
  setAmount(e.target.value);
}

function postMessage() {
  const deposit = premium ? "100000000000000000000000" : "0";

  Near.call(
    guestbookExampleContract,
    "add_message",
    { text: message },
    "300000000000000",
    deposit
  );
}

// TailwindCSS
const tailwindCssUrl =
  "https://dl.dropboxusercontent.com/scl/fi/xwrs3zdjjauf96vqrv8pb/gb-output.css?rlkey=ajjk53tv2lwm2am6xu3242788&dl=0";
const tailwindCss = fetch(tailwindCssUrl).body;

if (!tailwindCss) return "Loading CSS";

if (!theme) {
  setTheme(styled.div`${tailwindCss}`);
}

const Theme = theme;

return (
  <>
    <Theme>
      {props.transactionHashes !== undefined ? (
        <Widget
          src="guestbook.flmel.near/widget/Modal"
          props={{ transactionHashes: props.transactionHashes }}
        />
      ) : (
        <></>
      )}

      <div class="container mx-auto text-gray-700">
        <div class="flex space-x-4 mt-8">
          <Widget
            src="guestbook.flmel.near/widget/Card"
            props={{ message: latestMessage, latest: true }}
            class="w-1/2"
          />

          <div class="w-1/2">
            <h1 class="text-8xl font-bold">GuestBook Example</h1>
            <textarea
              type="text"
              value={message}
              onChange={handleMessageChange}
              class="border-2 border-slate-800 rounded-xl p-2 w-full mt-4 font-bold text-lg"
              placeholder="Your review here"
            />

            <div class="flex items-center space-x-4 my-2">
              <label class="form-check-label font-bold" for="flexCheckDefault">
                Make Premium
              </label>
              <input
                class="form-check-input border-2 border-slate-800 py-2 px-2"
                type="checkbox"
                checked={premium}
                onClick={() => setPremium(!premium)}
              />
            </div>

            <button
              onClick={postMessage}
              class="rounded-xl py-2 px-6 bg-slate-800 hover:bg-slate-600 transition text-xl text-gray-100"
            >
              Add Yours
            </button>
          </div>
        </div>

        <div class="columns-3 break-inside-avoid-column mt-4">
          {rest.map((message) => (
            <>
              <Widget
                src="guestbook.flmel.near/widget/Card"
                props={{ message }}
                class="w-1/3"
              />
            </>
          ))}
        </div>
      </div>
    </Theme>
  </>
);
