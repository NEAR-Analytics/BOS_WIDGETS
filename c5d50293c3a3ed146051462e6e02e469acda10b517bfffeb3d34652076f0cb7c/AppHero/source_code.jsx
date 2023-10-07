const media = {
  mobile: "@media(max-width: 768px)",
  tablet: "@media(min-width: 768px)",
};

const SectionHeroStyle = styled.div`
  border: 2px solid #0e6efd;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 840px;
  height: 224px;
  max-width: 840px;
`;

const IconStyle = styled.div`
    margin: 20px;
    color: #0e6efd;
`;

const MobileData = ({ size, color, stroke, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-mobiledata"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    stroke-width={stroke}
    stroke={color}
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 12v-8" />
    <path d="M8 20v-8" />
    <path d="M13 7l3 -3l3 3" />
    <path d="M5 17l3 3l3 -3" />
  </svg>
);

const LineStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ButtonStyle = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

const ContinueButtonStyle = styled.button`
  background-color: white;
  padding: 4px;
  color: ${(props) => (props.disabled ? "gray" : "green")};
  border: 1px solid ${(props) => (props.disabled ? "gray" : "green")};
  border-radius:6px;
  width: 172px;
  &:hover {
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    color: ${(props) => (props.disabled ? "gray" : "white")};
    background-color: ${(props) => (props.disabled ? "white" : "green")};
    transition: 0.3s;
  }
`;

// new styles

const AppSectionStyle = styled.div`
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 840px;
  height: 224px;
  max-width: 840px;
  flex-direction: row;
`;

const UserSectionStyle = styled.div`
  border: 2px solid #0e6efd;
  border-radius: 10px;
  padding: 20px;
  width: 590px;
  height: 224px;
`;

function Hero({ address }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <AppSectionStyle>
        <Widget
          src="c5d50293c3a3ed146051462e6e02e469acda10b517bfffeb3d34652076f0cb7c/widget/Yaypeg"
          props={{
            width: "224px",
            height: "224px",
            address,
            gif: true,
          }}
        />
        <UserSectionStyle></UserSectionStyle>
      </AppSectionStyle>
    </>
  );
}

return <Hero {...props} />;
