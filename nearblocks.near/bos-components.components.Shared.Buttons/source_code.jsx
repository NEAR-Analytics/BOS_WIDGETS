/* INCLUDE COMPONENT: "includes/icons/QRCodeIcon.jsx" */
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */





const QRCodeIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M16 17v-1h-3v-3h3v2h2v2h-1v2h-2v2h-2v-3h2v-1h1zm5 4h-4v-2h2v-2h2v4zM3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm15 0h3v2h-3v-2zM6 6v2h2V6H6zm0 10v2h2v-2H6zM16 6v2h2V6h-2z" />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/QRCodeIcon.jsx" */
/* INCLUDE COMPONENT: "includes/Common/QrCode.jsx" */
/**
 * @interface Props
 * @param {string} [value] - The data value to be encoded as a QR code (e.g., a URL, text, etc.).
 * @param {number} [width] - The width of the QR code component.
 * @param {number} [height] - The height of the QR code component.
 */






const QrCode = (props) => {
  const srcData = `
    <html>
    <body>
      <div id="qrcode" style="display: flex; flex-direction: column; justify-content: center; align-items: center;"></div>
    
      <script src="https://cdn.jsdelivr.net/npm/easyqrcodejs@4.5.0/dist/easy.qrcode.min.js"></script>
      <script type="text/javascript">
        new QRCode(document.getElementById("qrcode"), {
        text: "${props.value}",
        width: ${props.width},
        height: ${props.height},
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H, // L, M, Q, H
        logoBackgroundTransparent: true,
        logoWidth: 150, 
        logoHeight: 150,
        dotScale: .6,
        dotScaleTiming: .6,
        dotScaleA:.6,
      });
       </script> 
    </body>
    </html>
    `;

  return (
    <div>
      <iframe
        srcDoc={srcData}
        style={{
          width: 320,
          minWidth: 320,
          height: 320,
          minHeight: 320,
          marginTop: 30,
        }}
      />
    </div>
  );
};/* END_INCLUDE COMPONENT: "includes/Common/QrCode.jsx" */
/* INCLUDE COMPONENT: "includes/icons/CopyIcon.jsx" */
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */





const CopyIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M7 6V3a1 1 0 011-1h12a1 1 0 011 1v14a1 1 0 01-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 013 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z" />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/CopyIcon.jsx" */
/* INCLUDE COMPONENT: "includes/icons/CloseCircle.jsx" */
const CloseCircle = (props) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick('All');
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      className={props.className}
      onClick={handleClick}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z" />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/CloseCircle.jsx" */

/**
 * @interface Props
 * @param {string} [id] - The account identifier passed as a string.
 */





function MainComponent(props) {
  const [showTooltip, setShowTooltip] = useState(false);
  const onCopyClick = () => {
    clipboard.writeText(props.id);
    setShowTooltip((t) => !t);
    setTimeout(() => {
      setShowTooltip((t) => !t);
    }, 5000);
  };
  return (
    <>
      <span className="inline-flex space-x-2 h-7">
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                type="button"
                onClick={onCopyClick}
                className="bg-green-500 bg-opacity-10 hover:bg-opacity-100 group rounded-full p-1.5 w-7 h-7"
              >
                <CopyIcon className="fill-current -z-50 text-green-500 group-hover:text-white h-4 w-4" />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content
              className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
              sideOffset={5}
              side="bottom"
            >
              {showTooltip ? 'Copied!' : 'Copy account ID to clipboard'}
              <Tooltip.Arrow className="fill-white" />
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="bg-green-500 items-center bg-opacity-10 hover:bg-opacity-100 group rounded-full p-1.5 w-7 h-7">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <QRCodeIcon className="fill-current text-green-500 group-hover:text-white h-4 w-4" />
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
                    sideOffset={8}
                    side="bottom"
                  >
                    Click to view QR Code
                  </Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
            </button>
          </Dialog.Trigger>
          <Dialog.Overlay className="bg-green-500 bg-opacity-10 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="z-50 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] w-96 h-96 ">
            <Dialog.Title>
              <div className="flex items-center justify-between bg-gray-100 px-3 py-4">
                <h4 className="flex items-center text-xs break-all">
                  {props.id}
                </h4>
                <Dialog.Close asChild className="text-gray-500 fill-current">
                  <button
                    className="text-gray-500 fill-current"
                    aria-label="Close"
                  >
                    <CloseCircle />
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Title>
            <div className="p-4">
              <QrCode value={props.id} width={160} height={160} />
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </span>
    </>
  );
}

return MainComponent(props, context);