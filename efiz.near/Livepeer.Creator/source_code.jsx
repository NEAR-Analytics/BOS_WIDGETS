/**
 * Livepeer Creator
 *
 * Widget for uploading a video to Livepeer
 * (https://docs.livepeer.org/reference/livepeer-js/asset/useCreateAsset)
 *
 * Props:
 * @prop {File} video - the video file to upload
 * @prop {Object} metadata - the metadata for the video
 * @prop {Function} handleStatus - a callback for status updates
 * @prop {Function} handleProgress - a callback for progress updates
 * @prop {Function} handleError - a callback for error updates
 * @prop {Function} handleAssets - a callback for asset updates
 * @prop {Function} Button - a component to render the button
 * @prop {Boolean} debug - whether to log debug messages
 */

function handleStatus(status) {
  if (props.debug) {
    console.log("status", status);
  }
  if (props.handleStatus) {
    props.handleStatus(status);
  }
}

function handleProgress(progress) {
  if (props.debug) {
    console.log("progress", progress);
  }
  if (props.handleProgress) {
    props.handleProgress(progress);
  }
}

function handleAssets(assets) {
  if (props.debug) {
    console.log("assets", assets);
  }
  if (props.handleAssets) {
    // Here, do I want to do createThing?
    props.handleAssets(assets);
  }
}

function handleError(error) {
  if (props.debug) {
    console.log("error", error);
  }
  if (props.handleError) {
    props.handleError(error);
  }
}

const UploadButton = styled.button`
  box-sizing: border-box;
  margin: 0 4px;
  min-width: fit-content;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: inline-flex;
  text-align: center;
  line-height: inherit;
  text-decoration: none;
  font-size: inherit;
  padding: 8px 18px;
  background-color: #4dc28a;
  color: black;
  border: 0;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  height: auto;
  font-weight: 600;
  transition: opacity 0.15s;
  cursor: pointer;

  svg {
    width: 1em;
    height: auto;
    vertical-align: middle;
    fill: black;
    margin-right: 8px;
  }
`;

function Button({ disabled, onClick }) {
  return <Widget src="nearui.near/widget/Input.Button" />;
}

return (
  // <Button />
  <LivepeerCreator
    video={props.video}
    metadata={props.metadata}
    Button={props.Button || Button}
    handleStatus={handleStatus}
    handleProgress={handleProgress}
    handleError={handleError}
    handleAssets={handleAssets}
    {...props}
  />
);
