const { accountId } = props;

const iconPaywall = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
    >
        <rect width="28" height="28" rx="14" fill="#3D7FFF" />
        <path
            d="M9.95298 6.27128C11.4575 6.27128 12.2098 6.94947 12.2098 8.30585V8.78059C12.6293 7.96676 13.1718 7.30363 13.8373 6.79122C14.5027 6.26374 15.2767 6 16.1591 6C16.9403 6 17.6203 6.21099 18.1989 6.63298C18.7776 7.03989 19.2188 7.61259 19.5226 8.35106C19.8409 9.07447 20 9.91844 20 10.883C20 11.9982 19.8409 13.0155 19.5226 13.9348C19.2188 14.8391 18.7993 15.6228 18.264 16.2859C17.7288 16.934 17.1284 17.4313 16.4629 17.7779C15.7975 18.1246 15.1103 18.2979 14.4014 18.2979C13.7071 18.2979 13.0561 18.117 12.4485 17.7553C11.8553 17.3936 11.3924 16.949 11.0597 16.4215L9.95298 23H8L10.2568 9.5492C10.3002 9.293 10.3219 9.082 10.3219 8.91622C10.3219 8.20789 9.96745 7.85372 9.25859 7.85372L9.95298 6.27128ZM14.2278 16.4894C14.9078 16.4894 15.5298 16.2633 16.094 15.8112C16.6727 15.344 17.1356 14.7035 17.4828 13.8896C17.83 13.0758 18.0036 12.1414 18.0036 11.0864C18.0036 10.0616 17.7794 9.25532 17.3309 8.66755C16.8825 8.06472 16.2966 7.7633 15.5732 7.7633C14.9946 7.7633 14.4376 7.95168 13.9024 8.32846C13.3816 8.70523 12.9331 9.23271 12.557 9.9109C12.1808 10.5891 11.9132 11.3879 11.7541 12.3072L11.3635 14.5904C11.6817 15.1933 12.094 15.6605 12.6004 15.992C13.1067 16.3236 13.6492 16.4894 14.2278 16.4894Z"
            fill="white"
        />
    </svg>
);

const LabelImage = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    width: fit-content;
    padding-right: 12px;
    border-radius: 200px;
    background: #fff;
    height: 28px;
    box-sizing: border-box;
    bottom: 10px;
    left: 10px;
    box-shadow: 0px 3px 6px 0px rgba(24, 124, 205, 0.25),
        0px 12px 12px 0px rgba(24, 124, 205, 0.21),
        0px 26px 16px 0px rgba(24, 124, 205, 0.13),
        0px 47px 19px 0px rgba(24, 124, 205, 0.04),
        0px 73px 20px 0px rgba(24, 124, 205, 0);
`;

const SpanLabel = styled.span`
    display: inline-block;
    color: #222;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 10px;
    opacity: 0.6;
    font-weight: 400;
    line-height: normal;
    padding: 0 4px;
    box-sizing: border-box;
`;
const SpanAuthor = styled.span`
    color: #3d7fff;
    display: inline-block;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: normal;
    text-decoration-line: underline;
    box-sizing: border-box;
`;

return (
    <LabelImage>
        {iconPaywall}
        {accountId ? (
            <>
                <SpanLabel>by</SpanLabel>
                <SpanAuthor>{accountId}</SpanAuthor>
            </>
        ) : null}
    </LabelImage>
)