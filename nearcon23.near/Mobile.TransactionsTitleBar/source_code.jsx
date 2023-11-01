const Container = styled.div`
  position: relative;
  min-height: 64px;
  background-color: #00EC97;
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding: 0 10px;
`;

const TitleBarText = styled.h3`
  color: #000000;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 0px !important;
`;

const { secretkey, nearconId } = props;

return (
  <Container>
    <Link
      style={{
        width: "fit-content",
        height: 16,
        backgroundColor: "transparent",
        borderWidth: 0,
        padding: 0,
        width: 40,
        height: 40,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      to="/mobile"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 10 16"
        fill="none"
      >
        <path
          d="M9.47909 14.1453C9.67283 14.3391 9.78166 14.6018 9.78166 14.8758C9.78166 15.1498 9.67283 15.4125 9.47909 15.6063C9.28536 15.8 9.0226 15.9089 8.74863 15.9089C8.47465 15.9089 8.21189 15.8 8.01816 15.6063L1.14316 8.73128C1.04702 8.63548 0.970735 8.52163 0.918686 8.39628C0.866636 8.27093 0.839844 8.13654 0.839844 8.00081C0.839844 7.86509 0.866636 7.73069 0.918686 7.60534C0.970735 7.47999 1.04702 7.36615 1.14316 7.27034L8.01816 0.395343C8.21189 0.201611 8.47465 0.0927734 8.74863 0.0927734C9.0226 0.0927734 9.28536 0.201611 9.47909 0.395344C9.67283 0.589076 9.78166 0.851833 9.78166 1.12581C9.78166 1.39979 9.67283 1.66255 9.47909 1.85628L3.33542 7.99995L9.47909 14.1453Z"
          fill="black"
        />
      </svg>
    </Link>
    <TitleBarText>Transactions</TitleBarText>
  </Container>
);
