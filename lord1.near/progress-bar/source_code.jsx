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
  background-color: ${props.backgroundcolor} ;
  padding: 0px;
`;

const ProgrssBar = styled.div`
  width: ${({ percentage }) => `${percentage}%`};
  height: 18px;
  border-radius: 30px;
  
  position: relative;
  background-image: linear-gradient(to right,${props.gradiantcolorleft} ,${
  props.gradiantcolorright
} );
  transition: width 0.5s ease-in-out;
`;

const PercentageValue = styled.span`
  position: absolute;
  visibility: ${props.visibilitypercent}  ;
  height: 20px;
  text-align: right;
  left: ${({ left }) => `calc(${left}% - 15px)`};
  color: ${props.currTheme};
  top: -4px;

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
  visibility: ${props.visibilitydivision}  ;
  padding-right: 2px;
  padding-top: 2px;
  text-align: right;
  font-size: 14px;
  color: ${props.currTheme};
  @media (min-width: 480px) {
    font-size: 14px;
    padding-right: 4px;
    padding-top: 4px;
  }
`;

const width = props.widgetBarWidth ? props.widgetBarWidth : "500";

const percentage = (`${props.inside}` / `${props.total}`) * 100;
const roundPercentage = Math.round(percentage);

return (
  <MainWrapper width={width}>
    <InfoContainer>
      <PercentageValue left={roundPercentage}>
        {roundPercentage}%
      </PercentageValue>
    </InfoContainer>

    <ProgressWrap>
      <ProgrssBar percentage={roundPercentage} />
    </ProgressWrap>
    <RegisterdNumber>
      {props.inside}/{props.total}
    </RegisterdNumber>
  </MainWrapper>
);

//{
//  "inside": "206",
//  "total": "3608",
//  "currTheme": "#F29BC0",
//  "widgetBarWidth": "100",
//  "backgroundcolor": "#E5E9EC",
//  "gradiantcolorleft": "#FFD50D",
//  "gradiantcolorright": "#F29BC0",
//  "visibilitydivision": "hidden",
//  "visibilitypercent": "visible"
//}
