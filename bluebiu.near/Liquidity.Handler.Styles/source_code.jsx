const StyledFont = styled.div`
  color: ${(props) => props.color || '#000'};
  font-family: ${(props) => props.fontFamily || 'Gantari'};
  font-size: ${(props) => props.fontSize || '16px'};
  font-style: ${(props) => props.fontStyle || 'normal'};
  font-weight: ${(props) => props.fontWeight || '400'};
  line-height: ${(props) => props.lineHeight || 'normal'};
  white-space: ${(props) => props.whiteSpace || 'normal'};
`;
const StyledFlex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'row'};
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  gap: ${(props) => props.gap || '0px'};
`;
const StyledDashedUndeline = styled.div`
  padding: 2px 0;
  border-bottom: 1px dashed #979ABE;
`

const TitleText = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 32px;
  color: #ffffff;
  @media (max-width: 900px) {
    display: none;
  }
`;
const ContainerLogin = styled.div`
  display: flex;
  max-width: 500px;

  flex-direction: column;
  margin: 80px auto auto auto;

  .web3-connect {
    width: 480px;
    height: 60px;
    border-radius: 10px;
    background-color: #fff;
    color: #0f1126;
    font-size: 18px;
    font-weight: 500;
    border: none;
    margin-top: 20px;
  }

  @media (max-width: 736px) {
    max-width: 100%;
    .web3-connect {
      width: 100%;

      font-size: 16px;
      height: 40px;
    }
  }
`;
// List
const ListWrapper = styled.div`
  margin-top: 20px;
`
const SvgIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &.icon-right {
    position: absolute;
    right: 28px;
    top: 50%;
    transform: translateY(-50%);

    &.rotate {
      transform: translateY(-50%) rotate(90deg);
    }
  }
`
const Table = styled.div`
  
`
const THead = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 30px;
`
const Th = styled.div`
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:first-of-type {
    width: 40%;
  }
  &:nth-of-type(2) {
    width: 10%;
  }
  &:nth-of-type(3) {
    width: 10%;
  }
  &:nth-of-type(4) {
    width: 10%;
  }
  &:nth-of-type(5) {
    width: 10%;
  }
  &:nth-of-type(6) {
    width: 10%;
  }
  &:nth-of-type(7) {
    width: 10%;
  }
`
const TBody = styled.div`
`
const TrWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid #373A53;
  margin-bottom: 8px;
  overflow: hidden;
`
const Tr = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 84px;
  background: #262836;
  padding: 0 24px;
`
const Td = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  &.column {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  &:first-of-type {
    width: 40%;
  }
  &:nth-of-type(2) {
    width: 10%;
  }
  &:nth-of-type(3) {
    width: 10%;
  }
  &:nth-of-type(4) {
    width: 10%;
  }
  &:nth-of-type(5) {
    width: 10%;
  }
  &:nth-of-type(6) {
    width: 10%;
  }
  &:nth-of-type(7) {
    width: 10%;
  }
`
const TdTxt = styled.div`
  color: #FFF;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  &.gray {
    color: #979ABE;
    font-size: 12px;
  }
`
const PoolPercentage = styled.div`
  padding: 3px 8px;
  border-radius: 24px;
  background: rgba(151, 154, 190, 0.1);
  color: #979ABE;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const StrategyTxt = styled.div`
  padding: 7px 10px;
  border-radius: 6px;
  background: rgba(151, 154, 190, 0.1);
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const StyledVaultImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 26px;
    height: 26px;
    border-radius: 50%;
  }
`
// Detail

const Row = styled.div`
  display: flex;
  flex-direction: row;
  &.price-input {
    width: 500px;
    margin: 0 auto 20px;
    align-items: center;
    justify-content: center;
    gap: 14px;
  }
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
const DetailWrapper = styled.div`
  background: #262836;

`
const FilterButtonList = styled.div`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #373A53;
  border-bottom: 1px solid #373A53;
`
const FilterButton = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 48px;
  border-left: 1px solid #373A53;
  border-right: 1px solid #373A53;
  color: #979ABE;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  &:first-of-type {
    border-right: none;
  }
  &.isActive {
    color: #FFF;
    &:after {
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      bottom: -2px;
      height: 5px;
      flex-shrink: 0;
      background: #1362E4;
    }
  }
`
const InputWrapList = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const InputWrap = styled.div`
  position: relative;
  height: 46px;
  background: #33364B;
  border-radius: 12px;
  border: 1px solid #33364B;
  overflow: hidden;
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }
  
  input::-webkit-outer-spin-button{
    -webkit-appearance: none !important;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }
  &.inSufficient {
    border-color: #FF547D;
  }

`
const Input = styled.input`
  border: none;
  outline: none;
  background: #1B1E27;
  margin: 0;
  width: 100%;
  height: 100%;
  color: #FFF;
  font-family: Gantari;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  padding: 0 80px 0 10px;
  border-radius: 8px;
  border: 1px solid #33364B;
`
const InputSuffix = styled.div`
  position: absolute;
  top: 13px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  span {
    color: #FFF;
    text-align: right;
    font-family: Gantari;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  img {
    width: 20px;
    border-radius: 50%;
  }

`
const StyledImageList = styled.div`
  display: flex;
  align-items: center;
  
`
const PriceWrap = styled.div`
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const TotalPrice = styled.span`
  color: #979ABE;
  font-family: Gantari;
  font-size: 12px;
  opacity: 0.3;
`
const BalancePrice = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #979ABE;
  text-align: right;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  span {
    color: #FFF;
    text-decoration-line: underline;
    cursor: pointer;
  }
`

const StyledButtonList = styled.div`
  width: 500px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
`
const StyledButton = styled.button`
  outline: none;
  border: none;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  border-radius: 8px;
  background-color: var(--button-color);
  color: var(--button-text-color);
  font-family: Gantari;
  font-size: 16px;
  font-weight: 500;
  &[disabled] {
    opacity: 0.5!important;
    cursor: not-allowed;
  }
  &:hover {
    opacity: 0.8;
  }
`

const StyledLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: rotate 1.5s linear  infinite;
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
const StyledEmptyTips = styled.div`
  text-align: center;
  padding-top: 82px;
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
return {
  StyledFont,
  StyledFlex,
  StyledDashedUndeline,
  TitleText,
  ContainerLogin,
  ListWrapper,
  SvgIcon,
  Table,
  THead,
  Th,
  TBody,
  TrWrapper,
  Tr,
  Td,
  TdTxt,
  PoolPercentage,
  StrategyTxt,
  StyledVaultImage,
  Row,
  Column,
  DetailWrapper,
  FilterButtonList,
  FilterButton,
  InputWrapList,
  InputWrap,
  Input,
  InputSuffix,
  StyledImageList,
  PriceWrap,
  TotalPrice,
  BalancePrice,
  StyledButtonList,
  StyledButton,
  StyledLoading,
  StyledEmptyTips
}