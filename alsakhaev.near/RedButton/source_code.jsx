const { label, onClick, loading } = props;

const Wrapper = styled.div`
  .main-button {
    display: flex;
    padding: 10px 40px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 20px;
    background: #ff0000;
    color: #fff;
    text-align: center;
    font-family: Helvetica;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border: none;
    cursor: pointer;
    transition-duration: 0.2s;
  }

  .main-button:hover {
    background-color: #ffaaaa;
  }

  .main-button:disabled {
    background: #99cdf8;
    cursor: default;
  }
`;

const Loader = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20px"
    height="20px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      stroke="#ffffff"
      strokeWidth="10"
      r="35"
      strokeDasharray="164.93361431346415 56.97787143782138"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
      ></animateTransform>
    </circle>
  </svg>
);

return (
  <Wrapper>
    <button
      className="main-button"
      onClick={() => onClick?.()}
      disabled={loading}
    >
      {loading ? <Loader /> : label}
    </button>
  </Wrapper>
);
