// Load React, React Dom and the Core Bridge library
const code = `
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<div id="bridge-root"></div>

<script>
// Viewer port
let viewerPort

// Outside of the component state controller
let state = {
  externalAppUrl: '',
  initialPath: null,
  iframeHeight: 480,
  userInfo: null,
  sessionStorageClone: {},
  connectMessageSent: false,
}

// Core Component
function NearSocialBridgeCore(props) {
  const [externalAppUrl, setExternalAppUrl] = React.useState(state.externalAppUrl)
  const [connectMessageSent, setConnectMessageSent] = React.useState(state.connectMessageSent)
  const [iframeHeight, setIframeHeight] = React.useState(state.iframeHeight)
  const [sessionStorageClone, setSessionStorageClone] = React.useState(state.sessionStorageClone)

  React.useEffect(() => {
    const handler = (e) => {
      // Set the Viewer port
      if (!viewerPort && e.data.type === 'connect-view') {
        viewerPort = e.source
        setExternalAppUrl(e.data.externalAppUrl)
        setIframeHeight(e.data.initialIframeHeight || 480)
        state.externalAppUrl = e.data.externalAppUrl
        state.initialPath = e.data.initialPath
        state.userInfo = e.data.userInfo
        state.iframeHeight = e.data.initialIframeHeight || 480
      }

      // When get a message from the View
      if (viewerPort && e.data.from === 'view') {
        // Is it message to the core?
        if (e.data.type.includes('core:')) {
          // process eventual message to core here
          return
        }

        // Send to external app
        sendMessage(e.data)
      }
    }

    window.addEventListener('message', handler)

    return () => {
      window.removeEventListener('message', handler)
    }
  }, [])

  const sendMessage = (message) => {
    var iframe = document.getElementById('myIframe')
    iframe.contentWindow.postMessage(message, '*')
  }

  const sendMessageToView = (message) => {
    viewerPort.postMessage(message, '*')
  }

  // Answer Factory
  const buildAnswer = (requestType, payload) => {
    return {
      from: 'core',
      type: 'answer',
      requestType,
      payload,
    }
  }

  // Create connection payload
  const createConnectionPayload = () => {
    // Return the connect payload
    return {
      type: 'connect',
      payload: {
        initialPath: state.initialPath,
        userInfo: state.userInfo,
      },
      created_at: Date.now(),
    }
  }

  const onMessageHandler = (message) => {
    // Internal Request Handler
    if (message.data.from === 'external-app') {
      // Is to the Core
      if (message.data.type.includes('nsb:')) {
        internalRequestHandler(message.data)
      } else {
        // Is to the View
        sendMessageToView(message.data)
      }
    }
  }

  // Internal Request handlers
  const internalRequestHandler = (message) => {
    switch (message.type) {
      case 'nsb:session-storage:hydrate-viewer':
        sessionStorageHydrateViewer(message.type, message.payload)
        break
      case 'nsb:session-storage:hydrate-app':
        sessionStorageHydrateApp(message.type, message.payload)
        break
      case 'nsb:navigation:sync-content-height':
        syncContentHeight(message.type, message.payload)
        sendMessageToView(message)
        break
    }
  }

  const sessionStorageHydrateViewer = (requestType, payload) => {
    if (payload) {
      setSessionStorageClone(payload)
      state.sessionStorageClone = payload
    }

    const responseBody = buildAnswer(requestType, payload)
    sendMessage(responseBody)
  }

  const sessionStorageHydrateApp = (requestType, payload) => {
    const responseBody = buildAnswer(requestType, state.sessionStorageClone)
    sendMessage(responseBody)
  }

  const syncContentHeight = (requestType, payload) => {
    if (payload.height) {
      setIframeHeight(payload.height)
      state.iframeHeight = payload.height
    }

    const responseBody = buildAnswer(requestType)
    sendMessage(responseBody)
  }

  function onLoadHandler(e) {
    // On load iframe
    // On get msg from External App
    if (!connectMessageSent) {
      setConnectMessageSent(true)
      state.connectMessageSent = true
      window.addEventListener('message', onMessageHandler, false)
    }

    // Send the welcome message (connects with the external app)
    const welcomePayload = createConnectionPayload()
    sendMessage(welcomePayload)

    // Wait a bit and send the message again to ensure the app and scripts are loaded and ready
    setTimeout(() => {
      sendMessage(welcomePayload)
    }, 2000)
  }

  // Wait for the external app url to render the iframe
  if (!state.externalAppUrl) return null

  return React.createElement('iframe', {
    sandbox: 'allow-scripts',
    id: 'myIframe',
    src: externalAppUrl,
    style: { border: 'none', width: '100%', height: iframeHeight + 'px', margin: 0, padding: 0 },
    onLoad: onLoadHandler,
  })
}

const domContainer = document.querySelector('#bridge-root')
const root = ReactDOM.createRoot(domContainer)
root.render(React.createElement(NearSocialBridgeCore, {}))

</script>
`;

// External App Url
const externalAppUrl = "https://near-test-app.firebaseapp.com/";
// const externalAppUrl = "https://b07a5a5a8b0d.ngrok.app";

// User Info
const accountId = context.accountId ?? "*";
const profileInfo = Social.getr(`${accountId}/profile`);
const userInfo = { accountId, profileInfo };

// Initial Path
const initialPath = props.path;

// Initial iframe height
const initialIframeHeight = 500;

// Initial State
State.init({
  iframeHeight: initialIframeHeight,
  currentMessage: {
    type: "connect-view",
    externalAppUrl,
    userInfo,
    initialPayload,
    initialIframeHeight,
  },
});

// Message sender
const sendMessage = (message) => {
  State.update({
    currentMessage: message,
  });
};

// Answer Factory
const buildAnswer = (requestType, payload) => {
  return {
    from: "view",
    type: "answer",
    requestType,
    payload,
    created_at: Date.now(),
  };
};

const onMessageHandler = (message) => {
  requestsHandler(message);
};

// REQUEST HANDLERS BELOW
const requestsHandler = (message) => {
  switch (message.type) {
    case "nsb:navigation:sync-content-height":
      setIframeHeight(message.type, message.payload);
      break;
    case "get-room-data":
      getRoomDataHandler(message.type, message.payload);
      break;
  }
};

// [DON'T REMOVE]: Set thew new iFrame height based on the new screen/route
const setIframeHeight = (requestType, payload) => {
  State.update({ iframeHeight: payload.height + 20 });
};

// Get room data handler
const getRoomDataHandler = (requestType, payload) => {
  const roomData = Social.index(payload.roomId, "data", {
    limit: 100,
    order: "desc",
  });

  // Wait data to come
  setTimeout(() => {
    const roomExists = roomData && roomData.length > 0;

    if (!roomExists) {
      const responseBody = buildAnswer(requestType, {
        error: "room not found",
      });
      sendMessage(responseBody);
      return;
    }

    const responseBody = buildAnswer(requestType, {
      messages: roomData,
    });
    sendMessage(responseBody);
  }, payload.wait || 3000);
};
// REQUEST HANDLERS ABOVE

return (
  <div>
    <iframe
      className="w-100"
      style={{ height: `${state.iframeHeight}px` }}
      srcDoc={code}
      message={state.currentMessage}
      onMessage={onMessageHandler}
    />
  </div>
);
