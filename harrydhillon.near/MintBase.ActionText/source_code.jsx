const link = props?.link;

const linkColor = props.theme === "dark" ? "#c5d0ff" : "#4f58a3";
const iconCopy = props?.iconCopy ?? true;

return (
  <>
    <a
      style={{ padding: 5, paddingRight: 0, color: linkColor }}
      target="_blank"
      href={link}
    >
      {link}
    </a>
    {iconCopy && (
      <OverlayTrigger
        placement="auto"
        overlay={
          <Tooltip>{state.copied ? "Copied!" : "Copy to clipboard"}</Tooltip>
        }
      >
        <button
          style={{
            backgroundColor: "transparent",
            borderWidth: 0,
            paddingLeft: 2,
            color: "currentColor",
          }}
          onClick={() => {
            clipboard.writeText(props.link ?? props?.copyText).then(() => {
              State.update({ copied: true });
              setTimeout(() => {
                State.update({ copied: false });
              }, 2000);
            });
          }}
        >
          <svg
            width="12px"
            height="12px"
            viewBox="0 0 22 22"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            class="fill-current text-gray-700 dark:text-gray-300 group-hover:text-blue-300 dark:group-hover:text-blue-100 transition ease-in-out duration-500 dark:text-undefined"
          >
            <path d="M20.24 0H7.92C7.45322 0 7.00556 0.185428 6.67549 0.515492C6.34543 0.845556 6.16 1.29322 6.16 1.76V6.16H1.76C1.29322 6.16 0.845556 6.34543 0.515492 6.67549C0.185428 7.00556 0 7.45322 0 7.92V20.24C0 20.4711 0.0455238 20.7 0.133972 20.9135C0.22242 21.1271 0.352061 21.3211 0.515492 21.4845C0.678923 21.6479 0.872944 21.7776 1.08648 21.866C1.30001 21.9545 1.52887 22 1.76 22H14.08C14.3111 22 14.54 21.9545 14.7535 21.866C14.9671 21.7776 15.1611 21.6479 15.3245 21.4845C15.4879 21.3211 15.6176 21.1271 15.706 20.9135C15.7945 20.7 15.84 20.4711 15.84 20.24V15.84H20.24C20.7068 15.84 21.1544 15.6546 21.4845 15.3245C21.8146 14.9944 22 14.5468 22 14.08V1.76C22 1.52887 21.9545 1.30001 21.866 1.08648C21.7776 0.872944 21.6479 0.678923 21.4845 0.515492C21.3211 0.352061 21.1271 0.22242 20.9135 0.133972C20.7 0.0455238 20.4711 0 20.24 0ZM14.08 20.24H1.76V7.92H6.16V14.08C6.16 14.5468 6.34543 14.9944 6.67549 15.3245C7.00556 15.6546 7.45322 15.84 7.92 15.84H14.08V20.24ZM20.24 14.08H7.92V1.76H20.24V14.08Z" />
          </svg>
        </button>
      </OverlayTrigger>
    )}
  </>
);
