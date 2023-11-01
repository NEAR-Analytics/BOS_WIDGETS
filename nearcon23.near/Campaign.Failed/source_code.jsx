const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;

    background-color: #000000;

`;
const Content = styled.div`
  padding: 20px;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  
  flex: 1;
  position: relative;
`;
const Button = styled.button`

  background-color: #00ec97;
  color: #000000;

    width:100%;
  height: 48px;
  border-radius: 24px;
  border: none;

  font-familly: Mona Sans;

  font-size: 18px;
  font-weight: 600;
`;

return (
  <Container>
    <svg
      width="347"
      height="460"
      viewBox="0 0 347 460"
      fill="none"
      style={{
        position: "absolute",
        zIndex: 1,

        top: 200,
      }}
    >
      <g>
        <path
          d="M305.155 46.2263C246.264 -14.7871 149.151 -15.4025 89.4891 44.3802C87.2305 46.6434 85.0886 48.9777 83.0025 51.3426C80.9165 48.9777 78.7748 46.6434 76.5162 44.3802C16.8544 -15.4025 -80.2593 -14.7871 -139.15 46.2263C-196.797 105.953 -194.213 201.672 -135.577 260.427L49.8701 446.249C68.1671 464.583 97.833 464.583 116.13 446.249L301.577 260.427C360.213 201.672 362.797 105.953 305.15 46.2263H305.155Z"
          fill="#161615"
        />
      </g>
    </svg>

    <Content>
      <h1
        style={{
          color: "#FFFFFF",
          fontFamily: "FK Grotesk",
          fontSize: 42,
          fontWeight: 400,
          textAlign: "center",

          margin: "32px 0 8px 0",
          zIndex: 3,
        }}
      >
        Sorry, it looks like you already claimed this.
      </h1>

      <Link to="/mobile" style={{ width: "100%", zIndex: 10, marginTop: 24 }}>
        <Button
          style={{
            minHeight: 48,

            zIndex: 4,
          }}
        >
          Home
        </Button>
      </Link>
    </Content>
  </Container>
);
