const HelpComponent = styled.div`
  display: flex;
  justify-content: center;
  width: 188px;
  height: 322px;
  border-radius: 10px;
  border: 0;
  color: white;
  background-color: #1e1e1e;
  position: relative;
`;

const HelpContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding : 18px;
  position: relative;
`;

const Question = styled.div`
  position: absolute;
  top: -45px;
`;

const Text = styled.p`
  margin: 0;
  text-align:center;
`;

const Circle = styled.p`
  width: 160px;
  height: 160px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.08);
  position: absolute;
  border-radius: 50%;
`;

const HelpButton = styled.a`
  width: 156px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #F3F3F3;
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.24px;
  text-decoration: none;
  color: black;
  padding: 10px;
`;

const QuestionIcon = () => (
  <svg
    width="96"
    height="92"
    viewBox="0 0 96 92"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_f_1_3711)">
      <rect
        x="24"
        y="24"
        width="48"
        height="44"
        rx="22"
        fill="url(#paint0_linear_1_3711)"
      />
    </g>
    <rect
      x="26"
      y="18"
      width="44"
      height="44"
      rx="22"
      fill="url(#paint1_linear_1_3711)"
      stroke="#F3F3F3"
      strokeWidth="4"
    />
    <path
      d="M48.844 45.764V45.12C48.844 43.692 49.908 42.852 51.28 41.872C52.904 40.724 54.836 39.296 54.836 36.3C54.836 32.576 52.316 30.168 48.144 30.168C44.084 30.168 41.144 32.996 41.144 37H44.7C44.7 34.844 46.072 33.36 48.06 33.36C50.02 33.36 51.196 34.62 51.196 36.524C51.196 38.148 50.048 39.1 48.788 40.108C47.304 41.256 45.736 42.572 45.736 45.12V45.764H48.844ZM47.416 51.364C48.648 51.364 49.684 50.328 49.684 49.152C49.684 47.92 48.648 46.912 47.416 46.912C46.156 46.912 45.148 47.92 45.148 49.152C45.148 50.356 46.156 51.364 47.416 51.364Z"
      fill="#F3F3F3"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1_3711"
        x1="24.6857"
        y1="24.3813"
        x2="41.368"
        y2="76.9221"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#232323" />
        <stop offset="1" stop-color="#070707" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1_3711"
        x1="24.6857"
        y1="16.416"
        x2="44.1993"
        y2="72.7525"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#232323" />
        <stop offset="1" stop-color="#070707" />
      </linearGradient>
    </defs>
  </svg>
);

return (
  <HelpComponent>
    <Question>
      <QuestionIcon />
    </Question>

    <HelpContent>
      <Circle
        style={{
          top: -100,
          left: -100,
        }}
      />

      <Circle
        style={{
          bottom: -100,
          right: -100,
        }}
      />
      <div>
        <Text>Need</Text>
        <Text>Support?</Text>
      </div>

      <HelpButton
        href="https://socializer-user-guide.nearverselabs.com/"
        target="blank"
      >
        User Guide
      </HelpButton>
      <HelpButton href="https://t.me/NearverseLabs_Support" target="blank">
        Telegram Support
      </HelpButton>
    </HelpContent>
  </HelpComponent>
);
