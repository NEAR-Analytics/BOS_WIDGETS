const MainWrapper = styled.div`
  width: ${({ width }) => width}px;;
  max-width: 280px;
  @media (min-width: 480px) {
    max-width: 360px;
  }
  @media (min-width: 768px) {
    max-width: ${({ width }) => width}px;
  }
`;
const ProgressWrap = styled.div`
  position: relative;
  width: 100%;
  border-radius: 30px;
  display: flex;
  background-color: #E5E9EC;
  padding: 0px;
`;

const ProgrssBar = styled.div`
  width: ${({ percentage }) => `${percentage}%`};
  height: 18px;
  border-radius: 30px;
  position: relative;
  background-image: linear-gradient(to right, ${props.Deg_start}, ${
  props.Deg_end
});
  transition: width 0.5s ease-in-out;
`;

const PercentageValue = styled.span`
  position: absolute;
  height: 25px;
  text-align: right;
  font-size:13px;
  left: ${({ left }) => `calc(${left}% - 15px)`};
  color: ${({ currTheme }) => (currTheme === "light" ? "#FFFFFF" : "#000000")};
  background: ${props.Dot_bf};
 border-radius:30px;
  top: 17px;
  z-index:10;
  line-height: 25px;
`;

const InfoContainer = styled.div`
  position: relative;
  max-width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
  padding: 0px;
  font-size: 14px;
  font-weight: bold;
  @media (min-width: 480px) {
    font-size: 16px;
  }
`;

const RegisterdNumber = styled.div`
  width: 100%;
  display:block;
  padding-right: 2px;
  padding-top: 2px;
  text-align: right;
  font-size: 8px;
  color: ${({ currTheme }) => (currTheme === "light" ? "#2F373E" : "#fff")};
  @media (min-width: 480px) {
    font-size: 8px;
    padding-right: 4px;
    padding-top: 4px;
  }
`;

const width = props.widgetBarWidth ? props.widgetBarWidth : "300";
const currTheme = props.currTheme === "dark" ? "dark" : "light";

const ProgressNumber = props.progress ? props.progress : 0;
const registerUsersNum = Near.view("registry.i-am-human.near", "sbt_supply", {
  issuer: "gooddollar-v1.i-am-human.near",
});

const totalUsrNum = 100;
const percentage = (ProgressNumber / 100) * 100;
const roundPercentage = Math.round(percentage);

return (
  <MainWrapper width={width}>
    <InfoContainer>
      <PercentageValue left={roundPercentage} currTheme={currTheme}>
        {roundPercentage}%
      </PercentageValue>
    </InfoContainer>

    <ProgressWrap>
      <ProgrssBar percentage={roundPercentage} />
    </ProgressWrap>
    <RegisterdNumber currTheme={currTheme}>
      {ProgressNumber}/100
    </RegisterdNumber>
  </MainWrapper>
);
