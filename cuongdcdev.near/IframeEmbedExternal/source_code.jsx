if (!props.src) {
  return (
    <>
      Plz set url first! (Also make sure the site allows embedded in an iframe)!
      <a href="mob.near/widget/WidgetSource?src=cuongdcdev.near/widget/IframeEmbedExternal">
        Read guide here
      </a>
    </>
  );
}
const Css = styled.b`
html {overflow: auto};
iframe {
    margin: 0px;
    padding: 0px;
    height: 100%;
    min-height: 5000px;
    border: none;
    display: block;
    width: 100%;
    border: none;
    overflow-y: auto;
    overflow-x: hidden;
}

.DialogOverlay {
  background-color: rgba(0, 0, 0, 0.68);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.DialogContent {
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 450px;
  // height: 450px;
  max-height: 85vh;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}
.DialogContent:focus {
  outline: none;
}

.DialogDescription {
  margin: 10px 0 20px;
  color: var(--mauve11);
  font-size: 15px;
  line-height: 1.5;
}

@keyframes overlayShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes contentShow {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.5);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
`;

State.init({
  opened: false,
});

return (
  <>
    <Css>
      <Dialog.Root open={state.opened}>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Description className="DialogDescription">
            <a href={state.url} className="link-primary" target="_blank">
              Click here to open the link
              <p className="fw-light fst-italic text-truncate">
                <small>{state.url}</small>
              </p>
            </a>
          </Dialog.Description>
          <div>
            <a
              className="btn btn-outline-primary btn-sm px-4"
              href={state.url}
              target="_blank"
            >
              Open Link
            </a>
            <a
              aria-label="Close"
              className="btn mx-2 btn-outline-dark btn-sm"
              onClick={() => {
                State.update({ opened: false });
              }}
            >
              Close
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Root>

      <iframe
        src={props.src}
        onMessage={(rs) => {
          State.update({ opened: true, url: rs.url, rs: rs });
        }}
        message={{ iframeDisableLink: true }}
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        width="100%"
        height="100%"
        scrolling="auto"
      ></iframe>
    </Css>
  </>
);
