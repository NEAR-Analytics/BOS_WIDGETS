const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: #dde4e1;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 175px);
`;
const Button = styled.button`
  padding: 12px 16px;
  border: none;
  border-radius: 4px;
  background-color: #000;
  color: #a5a5a5;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #1c1a1a;
  }
`;
const StlyedInput = styled.input`
  color: black;
  padding: 4px;
`;
const Dropdown = styled.select`
  background-color: #1c1c1c;
  width: 300px;
  height: 47px;
  padding: 10px 20px 10px 20px;
  border: 1px solid #444;
`;
const OptionComponent = styled.div`
  padding: 20px;
  border-radius: 4px;
  width: 80%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Separator = styled.div`
  height: 10px;
  width: 100%;
`;
const MonospaceText = styled.span`
  font-family: monospace;
`;
const apiKeyCode = `
\`\`\`js
<Player.ApiKey />
<Player.GetUploadUrl />
<Player.ResumableUploadAsset />
<Player.GetSrc />
<Player.Display />
\`\`\`
`;
const localServerCode = `
\`\`\`js
<Player.FileUploader url={url} />
<Player.Display />
\`\`\`
`;
const uploadVideoRemoteCode = `
\`\`\`js
<Player.FileUploader
	url={"https://livepeer-webserver-613b208ef083.herokuapp.com"}
/>
<Player.Display />
\`\`\`
`;
const displayVideoRemoteCode = `
\`\`\`js
<Player.Display
	url={"https://livepeer-webserver-613b208ef083.herokuapp.com"}
	playbackId={"62fa7rxnbjzmoj2a"}
/>
\`\`\`
`;
const broadcastApiKeyCode = `
\`\`\`js
<Broadcast.ApiKey />
<Broadcast.GenerateStream />
<Broadcast.Player />
\`\`\`
`;
const broadcastLocalCode = `
\`\`\`js
<Broadcast.GenerateStream url={url} />
<Broadcast.Player />
<Broadcast.WatchStream pId={pId} />
\`\`\`
`;
const broadcastRemoteCode = `
\`\`\`js
<Broadcast.GenerateStream
url={"https://livepeer-webserver-613b208ef083.herokuapp.com"}
/>
<Broadcast.Player />
<Broadcast.WatchStream pId={pId} />
\`\`\`
`;
const Option1 = () => (
  <OptionComponent>
    <div>
      <h3>Description:</h3>
      <p style={{ textAlign: "left" }}>
        The first method for using our components involves directly providing
        the API key in the front-end. After creating an account on Livepeer and
        generating API keys, input them into the{" "}
        <MonospaceText>Player.ApiKey</MonospaceText> component to set them. The
        keys will be stored in the Zustand state and will be accessible in all
        other components. At this point, you can call the Livepeer function to
        upload and display a video asset. Please note the following:
        <li>
          There is a background process to parse the asset, so larger videos may
          experience a delay before becoming playable.
        </li>
        <li>
          There is an alternative component for video uploads called
          <MonospaceText>DirectUploadAsset</MonospaceText>. While it is less
          reliable because it does not use "tus," it remains a viable option.
        </li>
      </p>
    </div>
    <h3>Code:</h3>
    <Markdown text={apiKeyCode} />
    <Player.ApiKey />
    <Separator />
    <Player.GetUploadUrl />
    <Separator />
    <Player.ResumableUploadAsset />
    <Separator />
    <Player.GetSrc />
    <Separator />
    <Player.Display />
    <Separator />
  </OptionComponent>
);
const Option2 = ({ url }) => {
  return (
    <OptionComponent>
      <div>
        <h3>Description:</h3>
        <p style={{ textAlign: "left" }}>
          For the second option, you can provide your own web server URL. You
          may use a basic web server available in this
          <a
            href="https://github.com/bb-face/livepeer-web-server"
            target="_blank"
          >
            repository
          </a>
          for testing purposes. Once the link is configured, you can utilize the
          components to upload and display a video.
        </p>
        <h3>External data:</h3>
        {!inputSet ? (
          <div>
            <StlyedInput
              type="text"
              onChange={(event) => setUrl(event.target.value)}
              value={url}
            />
            <Button onClick={() => setInputSet(true)}>Set url</Button>
          </div>
        ) : (
          <>
            {url}
            <Button onClick={resetUrl}>X</Button>
          </>
        )}
      </div>
      <h3>Code:</h3>
      <Markdown text={localServerCode} />
      <Player.FileUploader url={url} />
      <Separator />
      <Player.Display />
    </OptionComponent>
  );
};
const Option3 = ({ showVideo, handleClick }) => {
  return (
    <OptionComponent>
      <div>
        <h3>Description:</h3>
        <p style={{ textAlign: "left" }}>
          These components are connected to our deployed server, eliminating the
          need for additional setup. This example demonstrates how to display a
          video using the <MonospaceText>playbackId</MonospaceText> and{" "}
          <MonospaceText>url</MonospaceText> properties of the component
        </p>
      </div>
      <h3>Code:</h3>
      <Markdown text={displayVideoRemoteCode} />
      <Button type="button" onClick={() => handleClick()}>
        Click me
      </Button>
      {showVideo && (
        <Player.Display
          url={"https://livepeer-webserver-613b208ef083.herokuapp.com"}
          playbackId={"62fa7rxnbjzmoj2a"}
        />
      )}
    </OptionComponent>
  );
};
const Option1Broadcast = () => {
  return (
    <OptionComponent>
      <div>
        <h3>Description:</h3>
        <p style={{ textAlign: "left" }}>
          The first method for using our components involves directly providing
          the API key in the front-end. After creating an account on Livepeer
          and generating API keys, input them into the Player.ApiKey component
          to set them. The keys will be stored in the Zustand state and will be
          accessible in all other components. At this point, you can call the
          Livepeer function to start a stream!
          <p>
            To share the stream, use the link that appears after creating a
            stream asset in the <MonospaceText>GenerateStream</MonospaceText>{" "}
            component, or use the <MonospaceText>WatchStream</MonospaceText>
            component and provide the <MonospaceText>playbackId</MonospaceText>.
          </p>
        </p>
      </div>
      <h3>Code:</h3>
      <Markdown text={broadcastApiKeyCode} />
      <Broadcast.ApiKey />
      <Separator />
      <Broadcast.GenerateStream />
      <Separator />
      <Broadcast.Player />
      <Separator />
    </OptionComponent>
  );
};
const Option2Broadcast = ({ url, pId }) => {
  return (
    <OptionComponent>
      <div>
        <h3>Description:</h3>
        <p style={{ textAlign: "left" }}>
          For the second option, you can provide your own web server URL. You
          may use a basic web server available in this
          <a
            href="https://github.com/bb-face/livepeer-web-server"
            target="_blank"
          >
            repository
          </a>
          for testing purposes. Once the link is configured, you can utilize the
          components to upload and display a video.
        </p>
        <h3>External data:</h3>
        <div>
          {!isPidSet ? (
            <>
              <StlyedInput
                type="text"
                onChange={(event) => setPid(event.target.value)}
                value={pId}
              />
              <Button onClick={() => setIsPidSet(true)}>Set playbackId</Button>
            </>
          ) : (
            <>
              {pId}
              <Button
                onClick={() => {
                  setPid("");
                  setIsPidSet(false);
                }}
              >
                X
              </Button>
            </>
          )}
          <div></div>
          {!inputSet ? (
            <div>
              <StlyedInput
                type="text"
                onChange={(event) => setUrl(event.target.value)}
                value={url}
              />
              <Button onClick={() => setInputSet(true)}>Set url</Button>
            </div>
          ) : (
            <>
              {url}
              <Button
                onClick={() => {
                  setUrl("");
                  setInputSet(false);
                }}
              >
                X
              </Button>
            </>
          )}
        </div>
      </div>
      <h3>Code:</h3>
      <Markdown text={broadcastLocalCode} />
      <Broadcast.GenerateStream url={url} />
      <Separator />
      <Broadcast.Player />
      <Separator />
      {isPidSet && <Broadcast.WatchStream pId={pId} />}
    </OptionComponent>
  );
};
const Option3Broadcast = ({ pId }) => {
  return (
    <OptionComponent>
      <div>
        <h3>Description:</h3>
        <p style={{ textAlign: "left" }}>
          This component functions identically to the previous one, but there is
          no need to insert the server URL as it utilizes our own web server.
        </p>
        <h3>External data:</h3>
        <div>
          {!isPidSet ? (
            <>
              <StlyedInput
                type="text"
                onChange={(event) => setPid(event.target.value)}
                value={pId}
              />
              <Button onClick={() => setIsPidSet(true)}>Set playbackId</Button>
            </>
          ) : (
            <>
              {pId}
              <Button
                onClick={() => {
                  setPid("");
                  setIsPidSet(false);
                }}
              >
                X
              </Button>
            </>
          )}
        </div>
      </div>
      <h3>Code:</h3>
      <Markdown text={broadcastRemoteCode} />
      <Broadcast.GenerateStream
        url={"https://livepeer-webserver-613b208ef083.herokuapp.com"}
      />
      <Separator />
      <Broadcast.Player />
      <Separator />
      {isPidSet && <Broadcast.WatchStream pId={pId} />}
    </OptionComponent>
  );
};
const [selectedOption, setSelectedOption] = useState("apiKey");
const [selectedComponent, setSelectedComponent] = useState("player");
const [displayVideo, setDisplayVideo] = useState(false);
const [url, setUrl] = useState("");
const [pId, setPid] = useState("");
const [isPidSet, setIsPidSet] = useState(false);
const [inputSet, setInputSet] = useState(false);
const [showVideo, setShowVideo] = useState(false);
function handleClick() {
  setShowVideo(!showVideo);
}
function resetUrl() {
  setUrl("");
  setInputSet(false);
}
return (
  <Container>
    <div
      style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        Select which component you want to check:
        <Dropdown
          value={selectedComponent}
          onChange={(event) => setSelectedComponent(event.target.value)}
        >
          <option value="player">Player</option>
          <option value="broadcast">Broadcast</option>
        </Dropdown>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        Select how you want to initialise the components:
        <Dropdown
          value={selectedOption}
          onChange={(event) => setSelectedOption(event.target.value)}
        >
          <option value="apiKey">Provide api key</option>
          <option value="localServer">Use your local server</option>
          <option value="remoteServer">Use a remote server</option>
        </Dropdown>
      </div>
    </div>
    {selectedComponent === "player" && (
      <>
        {selectedOption === "apiKey" && <Option1 />}
        {selectedOption === "localServer" && (
          <>
            <Option2
              url={url}
              inputSet={inputSet}
              setInputSet={setInputSet}
              resetUrl={resetUrl}
            />
          </>
        )}
        {selectedOption === "remoteServer" && (
          <Option3 showVideo={showVideo} handleClick={handleClick} />
        )}
      </>
    )}
    {selectedComponent === "broadcast" && (
      <>
        {selectedOption === "apiKey" && <Option1Broadcast />}
        {selectedOption === "localServer" && (
          <Option2Broadcast
            url={url}
            isPidSet={isPidSet}
            setIsPidSet={setIsPidSet}
            pId={pId}
            setPid={setPid}
            inputSet={inputSet}
            setInputSet={setInputSet}
          />
        )}
        {selectedOption === "remoteServer" && (
          <Option3Broadcast
            pId={pId}
            setPid={setPid}
            isPidSet={isPidSet}
            setIsPidSet={setIsPidSet}
          />
        )}
      </>
    )}
  </Container>
);
