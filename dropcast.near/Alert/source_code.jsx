const setNotification = props?.setNotification || ((param) => {});

const Alert = styled.div`
  background-color: rgb(7 165 46);
  padding: 20px;
  display: flex;
  border-radius: 8px;

  .icon {
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
  }
  position:relative;
`;
const Label = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  margin-left: 10px;
  line-height: 19.2px;
  .fd {
    font-weight: 600;
  }
`;
const { text, type } = props;
// const [isVisible, setIsVisible] = useState(true);

return (
  <>
    <Alert
      style={{
        backgroundColor: type === "info" ? "rgb(85 183 197)" : "rgb(7 165 46)",
      }}
    >
      <svg
        width="20px"
        height="20px"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="icon"
      >
        <path
          d="M10 2.94047e-06C15.5137 3.42249e-06 20 4.48558 20 10C20 15.5137 15.5137 20 10 20C4.48558 20 -3.42256e-06 15.5144 -2.94047e-06 10C-2.45838e-06 4.48558 4.48558 2.45838e-06 10 2.94047e-06ZM10 18.5651C14.7231 18.5651 18.5651 14.7231 18.5651 10C18.5651 5.27766 14.7231 1.43493 10 1.43493C5.27766 1.43493 1.43492 5.27694 1.43492 10C1.43492 14.7231 5.27766 18.5651 10 18.5651ZM11.0762 14.6635C11.0762 14.3781 10.9628 14.1044 10.761 13.9025C10.5592 13.7007 10.2854 13.5873 10 13.5873C9.71457 13.5873 9.44084 13.7007 9.23901 13.9025C9.03719 14.1044 8.9238 14.3781 8.9238 14.6635C8.9238 14.9489 9.03719 15.2227 9.23901 15.4245C9.44084 15.6263 9.71457 15.7397 10 15.7397C10.2854 15.7397 10.5592 15.6263 10.761 15.4245C10.9628 15.2227 11.0762 14.9489 11.0762 14.6635ZM10 4.2603C10.396 4.2603 10.7175 4.581 10.7175 4.97776L10.7175 11.4349C10.7175 11.831 10.396 12.1524 10 12.1524C9.60396 12.1524 9.28254 11.831 9.28254 11.4349L9.28254 4.97776C9.28254 4.581 9.60396 4.2603 10 4.2603Z"
          fill="#C7FF18"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="15"
        height="15"
        viewBox="0 0 30 30"
        style={{
          position: "absolute",
          right: "5px",
          top: "4px",
          cursor: "pointer",
        }}
        onClick={() => {
          setNotification("");
        }}
      >
        <path
          d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"
          fill="white"
        ></path>
      </svg>

      <Label>{text}</Label>
    </Alert>
  </>
);
