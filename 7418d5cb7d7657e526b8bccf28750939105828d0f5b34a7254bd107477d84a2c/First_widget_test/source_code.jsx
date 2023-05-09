const HeadingOne = styled.h1`
  position: relative;
  font-weight: 300;
  font-size: 4.5em;
  color: #402d2d;
`;

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

// const AnimatedHeatBar = styled(HeatBar)`
// position: absolute;
// left: 0;
//   #color-path {
//     opacity: 0;
//     animation: ${({ heat }) =>
//       heat !== 0 && pathKeyFrames(heat)}  1.4s linear forwards;
//   }

// `;

let user_account = context.accountId;
let register_users_num = Near.view("registry.i-am-human.near", "sbt_supply", {
  issuer: "gooddollar-v1.i-am-human.near",
});

return (
  <MeterWrapper>
    <MeterStatusContainer>
      <HeatStatusBox>
        <HeatSatWrapper>
          // <AnimatedHeatBar heat={50} />
          <HeatInfoBox>
            <p>{heat.val}</p>
            <p>/100</p>
          </HeatInfoBox>
        </HeatSatWrapper>
      </HeatStatusBox>
    </MeterStatusContainer>
    {register_users_num}
  </MeterWrapper>
);
