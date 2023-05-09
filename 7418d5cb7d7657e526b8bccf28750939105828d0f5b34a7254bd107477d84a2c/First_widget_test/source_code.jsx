const pathKeyFrames = (value) => keyframes` 
0% {opacity: 0}
50% {opacity: 0}
80% {opacity: 0}
95% {opacity: 1}
100% { stroke-dashoffset: ${value}; opacity: 1;}`;

const MeterStatusContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  width: 100%;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 5px 5px -4px rgba(49, 65, 97, 0.08);
  @media @media (min-width: 768px) {
    flex-flow: row;
  }
  @media @media (min-width: 1024px) {
    flex-flow: column;
    grid-area: heatstatus;
  }
`;

const HeatStatusBox = styled.div`
  position: relative;
  height: 215px;
   display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  padding: 34px;
  width: 100%;

  &:first-child {
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 16px;
      width: calc(100% - 32px);
      height: 1px;
      background-color: #E5EAF1;
    }
  }

  @media (min-width: 768px) {
  padding: 34px 0 28px;

    &:first-child {
      &:after {
        bottom: 36px;
        left: 100%;
        width: 1px;
        height: 138px;
      }
    }
  }

  @media (min-width: 1024px) {
    padding: 48px 0 44px;
    &:first-child {
      &:after {
        bottom: 0;
        left: 20%;
        width: 60%;
        height: 1px;
      }
    }
  }

  @media (min-width: 1140px) {
    padding: 34px 0;
  }
  @media (min-width: 1440px) {
    padding: 46px 0;
    height: 240px;

  }
`;
const MeterWrapper = styled.div`
  width: 100%;
`;

const HeatSatWrapper = styled.div`
  position: relative;
  width: 116px;
  min-height: 80px;
  height: 80px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  
  
`;

const HeatStatInfo = styled.div`
  position: relative;
  margin-top: 30px;
  p {
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: center;
    color: #68728C;
    &:first-child {
      margin-bottom: 4px;
      font-size: 14px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.29;
      letter-spacing: normal;
      text-align: center;
      color: #314161;

    }
  }
`;
const HeatInfoBox = styled.div`
  position: relative;
  
  p {
    margin: 0;
    text-align: center;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: center;
    color: ${({ theme }) => theme.colors.secondary};

   
  }
`;

const GreyCircle = styled.div`
  width: 120px;
  height: 110px;
  border-radius: 50%;
  border-style: solid;
  border-width: 5px;
  border-color: grey;
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  top:0;
  left:0;
  pointer-events:none;
`;

let user_account = context.accountId;
let register_users_num = Near.view("registry.i-am-human.near", "sbt_supply", {
  issuer: "gooddollar-v1.i-am-human.near",
});

function calcHeatStatusAnimationPercentage(value) {
  let startingDashoffsetValue = 400;
  let onePercentOfDashOffset = 2;
  let totalAnimationDashOffsetValue =
    startingDashoffsetValue + onePercentOfDashOffset * value;
  return totalAnimationDashOffsetValue;
}

return (
  <MeterWrapper>
    <MeterStatusContainer>
      <HeatStatusBox>
        <HeatSatWrapper
          heat={
            register_users_num
              ? calcHeatStatusAnimationPercentage(register_users_num)
              : 0
          }
        >
          <GreyCircle />
          <HeatInfoBox>
            <p>{register_users_num}</p>
            <p>/1000</p>
          </HeatInfoBox>
        </HeatSatWrapper>
      </HeatStatusBox>
    </MeterStatusContainer>
    {register_users_num}
  </MeterWrapper>
);
