State.init({
  messages: [],
  iframe: {},
});

const sender = Ethers.send("eth_requestAccounts", [])[0];
if (!sender) return "Please login first";

const signer = Ethers.provider().getSigner();
const onIframe = (data) => {
  if (data.type === "signMessage") {
    signer.signMessage(data.data).then((result) => {
      State.update({ iframe: { id: data.id, resolve: result } });
    });
  }

  if (data.type === "getAddress") {
    State.update({ iframe: { id: data.id, resolve: sender } });
  }

  if (data.type === "getItem") {
    const result = Storage.privateGet(data.data);
    State.update({ iframe: { id: data.id, resolve: { result } } });
  }

  if (data.type === "setItem") {
    Storage.privateSet(data.data.key, data.data.value);
    State.update({ iframe: { id: data.id, resolve: true } });
  }

  if (data.type === "loadMessages") {
    State.update({
      iframe: { id: data.id, resolve: true },
      messages: data.data,
    });
  }

  if (data.type === "newMessage") {
    State.update({
      iframe: { id: data.id, resolve: true },
      messages: state.messages.concat([data.data]),
    });
  }
};

const handleStartChat = () => {
  State.update({
    chat: true,
    msgValue: "",
    iframe: {
      type: "startChat",
      data: state.msgValue,
    },
  });
};

const handleMessage = () => {
  State.update({
    msgValue: "",
    iframe: {
      type: "message",
      data: state.msgValue,
    },
  });
};

const xmtpMessages = `
<script src="https://nftstorage.link/ipfs/bafybeifophz4lgi5iyz5rpjmvy7pujqidloqkv4skanhvy3z7p5airwjdu"></script>
<script>
 class IframeRPC {
    _id = 0;
    _tasks = new Map();
    _subs = new Map();

    constructor() {
        window.addEventListener("message", (event) => {
            const data = event.data
            let task = this._tasks.get(data.id)
            if (data.resolve) task.resolve(data.resolve)
            if (data.reject) task.reject(data.reject)
            if (data.type) this._subs.get(data.type)?.forEach(cb => cb(data.data))
        }, false);
    }

    call(type, data) {
        const id = this._id++;
        window.top.postMessage({ type, data, id }, "*");
        return new Promise((resolve, reject) => {
            this._tasks.set(id, { resolve, reject })
        })
    }

    on(type, cb) {
        const listeners = this._subs.get(type)
        if (listeners == null) return this._subs.set(type, new Set([cb]));
        listeners.set(cb);
    }
 }
 
class RemoteSigner {
    constructor(rpc) {
        this.rpc = rpc;
    }

    getAddress() {
        return this.rpc.call("getAddress")
    }

    signMessage(data) {
        return this.rpc.call("signMessage", data)
    }
}

const rpc = new IframeRPC();
const signer = new RemoteSigner(rpc);
window.MockLocalStorage = {
    setItem(key, value) {
        console.log(key, value)
        return rpc.call("setItem", { key, value })
    },
    getItem(key) {
        return rpc.call("getItem", key).then(t => t.result)
    }
}
 

let conversation;
rpc.on("message", (data) => {
    conversation.send(data);
})

rpc.on("startChat", async (address) => {
    const xmtp = await window.xmtp.Client.create(signer, {basePersistence: window.MockLocalStorage });
    conversation = await xmtp.conversations.newConversation(address);
 
    const messages = await conversation.messages();
    rpc.call("loadMessages", messages.map(t => ({ text: t.content })));

    for await (const message of await conversation.streamMessages()) {
        rpc.call("newMessage", { text: message.content });
    }
});
</script>
`;

const MessageForm = styled.div`
    display: flex;
    flex-direction: row;
    height: 60px;
    input { 
        border-radius: 8px 0 0 8px; 
        flex: 1; 
    }

    button { 
        border-radius: 0 8px 8px 0; 
        flex-shrink: 0;
        height: 100%;
    }
`;

const ChatView = styled.div`
    border: 1px solid #6c757d;
    width: 400px;
    height: 600px;
    border-radius: 16px;
`;

const Message = styled.div`
    border-radius: 12px;
    border: 1px solid #6c757d;
    padding: 12px;
    margin-bottom: 8px;
`;

return (
  <div style={{ margin: 24 }}>
    <iframe
      style={{ display: "none" }}
      srcDoc={xmtpMessages}
      message={state.iframe}
      onMessage={onIframe}
    ></iframe>
    <p>Account: {sender}</p>

    <ChatView>
      <div style={{ flex: 1, height: 500, padding: 16, overflowY: "auto" }}>
        {state.messages.map((t) => (
          <Message>{t.text}</Message>
        ))}
      </div>

      <div style={{ padding: 16 }}>
        <MessageForm>
          <input
            value={state.msgValue}
            onChange={(e) => State.update({ msgValue: e.target.value })}
          />
          {state.chat ? (
            <button onClick={handleMessage}>Send</button>
          ) : (
            <button onClick={handleStartChat}>Start chat</button>
          )}
        </MessageForm>
      </div>
    </ChatView>
  </div>
);
