const MeterStatusContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  width: 100%;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 5px 5px -4px rgba(49, 65, 97, 0.08);
   @media (min-width: 768px) {
    flex-flow: row;
  }
   @media (min-width: 1024px) {
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
  width: 126px;
  min-height: 120px;
  height: 120px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  svg {
    position: absolute;
    z-index: 5;
  }
  #animated-circle {
    z-index: 15;
  }
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

let size = props.size;

const sizeProps = {
  small: {
    widthAndHeight: 100,
    d: "M 10,50 A 40,40 0 1 1 90,50 A 40,40 0 1 1 10,50 Z",
    strokeAndFrom: 251.2,
    strokeWidth: 5,
  },
  medium: {
    widthAndHeight: 150,
    d: "M 20,75 A 55,55 0 1 1 130,75 A 55,55 0 1 1 20,75 Z",
    strokeAndFrom: 344.7,
    strokeWidth: 8,
  },
  large: {
    widthAndHeight: 200,
  },
};

function calcHeatStatusAnimationPercentage(
  totalNumberOfTokens,
  totalIssuedTokens
) {
  let totalPercentageOfIssuedTokens = Math.round(
    (totalIssuedTokens / totalNumberOfTokens) * 100
  );
  //10.3

  let startingDashoffsetValue = sizeProps[size].strokeAndFrom;

  let onePercentageOfDash = startingDashoffsetValue / 100;

  let fullCircle = startingDashoffsetValue / 2 + onePercentageOfDash;
  console.log("fullCircle", fullCircle);
  let onePercentageOfCircle = fullCircle / 100;

  console.log("fullCircle", fullCircle);
  console.log("onePercentageOfCircle", onePercentageOfCircle);

  let finalvalueOfCircle =
    onePercentageOfCircle * totalPercentageOfIssuedTokens;

  let fin = Math.round(startingDashoffsetValue - finalvalueOfCircle);
  console.log("fin", fin);
  return fin;
  // let tokensPercentage = totalNumberOfTokens / 10; // calc percentage  x / 1000  * 100

  // let onePercentOfDashOffset = startingDashoffsetValue / 100;
}

const value = calcHeatStatusAnimationPercentage(1000, 1000);
//173
return (
  <MeterWrapper>
    <MeterStatusContainer>
      <HeatStatusBox>
        <HeatSatWrapper>
          <svg
            width={sizeProps[size].widthAndHeight}
            height={sizeProps[size].widthAndHeight}
            id="animated-circle"
          >
            <path
              id="circle-path"
              d={sizeProps[size].d}
              stroke="#FFD50D"
              stroke-width={sizeProps[size].strokeWidth + 1}
              fill="none"
              stroke-dasharray={sizeProps[size].strokeAndFrom}
              stroke-dashoffset={sizeProps[size].strokeAndFrom}
            >
              <animate
                attributeName="stroke-dashoffset"
                from={sizeProps[size].strokeAndFrom}
                to={value}
                dur="1s"
                fill="freeze"
              />
            </path>
          </svg>

          <svg
            width={sizeProps[size].widthAndHeight}
            height={sizeProps[size].widthAndHeight}
          >
            <path
              d={sizeProps[size].d}
              stroke="#4498E0"
              stroke-width={sizeProps[size].strokeWidth}
              fill="none"
            />
          </svg>

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
