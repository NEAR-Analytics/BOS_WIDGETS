const labelName = props.label ?? "Nombre Tanda";
const placeholderName = props.placeholder ?? "super tanda";
const labelDescription = props.label ?? "Descrición";
const placeholderDescription = props.placeholder ?? "una tanda con Meta Pool";
const labelContribution = props.label ?? "Contribución";
const placeholderContribution = props.placeholder ?? "1.0";
const labelPenalty = props.label ?? "Penalización";
const placeholderPenalty = props.placeholder ?? "0.1";
const labelStart = props.label ?? "Inicio";
const placeholderStart = props.placeholder ?? "20/10/2023";
const labelEnd = props.label ?? "Final";
const placeholderEnd = props.placeholder ?? "20/10/2024";
const labelInterval = props.label ?? "Intervalo";
const placeholderInterval = props.placeholder ?? "15";
const labelTaxPayer = props.label ?? "Contribuyentes";
const placeholderTaxPayer = props.placeholder ?? "4";
const labelTokenAddress = props.label ?? "Token Address";
const placeholderTokenAddress =
  props.placeholder ?? "0x2137df2e54abd6bF1c1a8c1739f2EA6A8C15F144";

State.init({
  chainId: 0,
  price: 0,
});

/**
 * Ethereum Contract
 */

const priceFeedAddress = "0x07dD4Ce17De84bA13Fc154A7FdB46fC362a41E2C";

const priceFeedABI = [
  {
    inputs: [],
    name: "getPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

if (Ethers.provider()) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });

  if (state.chainId === 1313161555) {
    if (state.price === 0) {
      const priceFeedContract = new ethers.Contract(
        priceFeedAddress,
        priceFeedABI,
        Ethers.provider().getSigner()
      );

      priceFeedContract.getPrice().then((priceRes) => {
        State.update({ price: ethers.utils.formatEther(priceRes) });
      });
    }
  }
}

const handleButtonClick =
  props.handleButtonClick || (() => console.log("button clicked"));

const value = props.value ?? "";
const onChange = props.onChange ?? (() => {});
const validate = props.validate ?? (() => {});
const error = props.error ?? "";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px;
  gap: 0.45em;
  width: 100%;
`;

const Label = styled.label`
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1.25em;
  color: #344054;
`;

const Error = styled.span`
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  font-size: 0.75em;
  line-height: 1.25em;
  color: #ff4d4f;
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease-in-out;

  &.show {
    height: 1.25em;
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.75em;
  gap: 0.5em;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(11, 24, 40, 0.05);
  border-radius: 4px;
  color: #101828;
  width: 100%;
`;

return (
  <Container>
    <div>Meta Tandas</div>
    <Label>{labelName}</Label>
    <Input
      type="text"
      placeholder={placeholderName}
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
      onBlur={() => validate()}
    />
    <Label>{labelDescription}</Label>
    <Input
      type="text"
      placeholder={placeholderDescription}
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
      onBlur={() => validate()}
    />
    <Label>{labelContribution}</Label>
    <Input
      type="text"
      placeholder={placeholderContribution}
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
      onBlur={() => validate()}
    />
    <Label>{labelPenalty}</Label>
    <Input
      type="text"
      placeholder={placeholderPenalty}
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
      onBlur={() => validate()}
    />
    <Label>{labelStart}</Label>
    <Input
      type="text"
      placeholder={placeholderStart}
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
      onBlur={() => validate()}
    />
    <Label>{labelEnd}</Label>
    <Input
      type="text"
      placeholder={placeholderEnd}
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
      onBlur={() => validate()}
    />
    <Label>{labelInterval}</Label>
    <Input
      type="text"
      placeholder={placeholderInterval}
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
      onBlur={() => validate()}
    />
    <Label>{labelTaxPayer}</Label>
    <Input
      type="text"
      placeholder={placeholderTaxPayer}
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
      onBlur={() => validate()}
    />
    <Label>{labelTokenAddress}</Label>
    <Input
      type="text"
      placeholder={placeholderTokenAddress}
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
      onBlur={() => validate()}
    />
    <button class="btn btn-primary" onClick={handleButtonClick}>
      Iniciar Tanda
    </button>
    <Error className={error ? "show" : ""}>{error}</Error>
  </Container>
);
