// Styling components
const Mainpage = styled.div`
  background-color: #edf0f4;
  height: auto;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text_style = styled.div`
  font-family: 'Lato', sans-serif;
  color: #072754;
  margin-top: 100px;
  font-weight: bold;
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 3rem;
  @media screen and (max-width: 500px) {
    display: flex;
    font-size: 2rem;
  }
`;

const Second_p = styled.div`
  font-family: 'Lato', sans-serif;
  display: flex;
  justify-content: center;
  color: #072754;
  font-size: 2rem;
  margin-top: 10px;
  text-align: center;
  @media screen and (max-width: 500px) {
    font-size: 1.5rem;
    display: flex;
    margin: 10px auto;
    justify-content: center;
    text-align: center;
  }
`;

const Third_p = styled.p`
  color: #072754;
  font-family: 'Lato', sans-serif;
  font-weight: bold;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  font-size: 2.5rem;

  span {
    color: #ff0000; /* Red color for the 'X' */
  }
`;

const NextUpper = styled.button`
  font-family: 'Lato', sans-serif;
  height: 60px;
  width: 200px;
  margin-top: 20px;
  border: none;
  border-radius: 30px;
  background-color: #f8931f;
  color: #000;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%;
    height: 300%;
    background-color: rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    border-radius: 50%;
    z-index: 0;
    transform: translate(-50%, -50%);
  }

  &:hover:before {
    width: 0;
    height: 0;
  }

  &:hover {
    color: #000;
    background-color: #df841c;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
  @media screen and (max-width: 500px) {
    width: 150px;
    font-size: 16px;
  }
`;

const NextLower = styled.button`
  font-family: 'Lato', sans-serif;
  height: 60px;
  width: 200px;
  margin-top: 20px;
  margin-right: 10px;
  border: none;
  border-radius: 30px;
  background-color: #f8931f;
  color: #000;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%;
    height: 300%;
    background-color: rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    border-radius: 50%;
    z-index: 0;
    transform: translate(-50%, -50%);
  }

  &:hover:before {
    width: 0;
    height: 0;
  }

  &:hover {
    color: #000;
    background-color: #df841c;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 500px) {
    width: 150px;
    font-size: 16px;
  }
`;

const SimplePopup = styled.div`
  position: fixed;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 8px;
  border-radius: 10px;
  z-index: 1000;
  @media screen and (max-width: 500px) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const InputLabel = styled.label`
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  color: white;
  align-items: center;
  font-size: 1.5rem;
  margin-bottom: 5px;

  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const Label1 = styled.label`
  display: flex;
  justify-content: center;
  font-family: 'Lato', sans-serif;
  color: #072754;
  font-size: 1.5rem;
  margin: 20px;

  @media screen and (max-width: 500px) {
    margin-bottom: 5px;
    margin-left: 0%;
    text-align: center;
  }
`;

const Label2 = styled.label`
  display: flex;
  color: #072754;
  font-family: 'Lato', sans-serif;
  font-size: 1.5rem;
  margin-right: 40px;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 500px) {
    margin-bottom: 5px;
    margin-left: 0%;
    text-align: center;
  }
`;

const CloseButton = styled.button`
  margin-top: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f1f1f1;
  cursor: pointer;
  margin: auto;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  margin-top: 100px;
`;

const Inputdiv = styled.div`
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 500px) {
    margin-bottom: 5px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: -100px;
  }
`;

const Plus = styled.div`
  background-color: white;
  color: black;
  padding: 10px;
  width: 50%;
  border-radius: 8px;
  margin-left: 23%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border: 2px solid transparent;
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    background-color: #072754;
    border-color: #072754;
  }
  .plus-icon {
    color: red;
  }
  @media screen and (max-width: 500px) {
    margin: auto;
    display: flex;
    justify-content: center;
  }
`;

const Divbutton = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  justify-content: center;
`;

const DeleteButton = styled.button`
  width: 50px;
  display: inline-block;
  transition: width 0.3s ease;

  &:hover {
    width: 50px;
    transform: scale(1.1);
  }

  @media screen and (max-width: 500px) {
    margin: auto;
    display: flex;
    justify-content: center;
  }
`;

const InputAddress = styled.input`
  height: 40px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  border-radius: 10px;
  @media screen and (max-width: 500px) {
    margin: auto;
    display: flex;
    justify-content: center;
  }
`;

const InputAmount = styled.input`
  height: 40px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  border-radius: 10px;
  width: 100px;
  @media screen and (max-width: 500px) {
    margin: auto;
    display: flex;
    justify-content: center;
  }
`;

const FooterContainer = styled.div`
  height: 80px;
  margin-top: 200px;
  color: #000;
  background-color: #edf0f4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;

  p {
    font-size: 1.5rem;
    margin: 0;
  }

  @media screen and (max-width: 500px) {
    height: 120px;
    margin-top: 100px;
    padding: 20px;
    text-align: center;
    p {
      font-size: 1.1rem;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024 Multixender All rights reserved.</p>
    </FooterContainer>
  );
};

const Text = () => (
  <Text_style>
    <p>Send Tokens to Multiple Addresses</p>
  </Text_style>
);

const Text2 = () => (
  <Second_p>
    <p>Empowered by NEAR Protocol's cutting-edge technology</p>
  </Second_p>
);

const Text3 = () => (
  <Third_p>
    Multi<span>X</span>ender
  </Third_p>
);

// Function to get config
function getConfig(network) {
  switch (network) {
    case "mainnet":
      return {
        nodeUrl: "https://rpc.mainnet.near.org",
      };
    case "testnet":
      return {
        nodeUrl: "https://rpc.testnet.near.org",
      };
    default:
      throw Error(`Unconfigured environment '${network}'.`);
  }
}

const config = getConfig("mainnet");
const usdtConfig = "usdt.tether-token.near";

// Main component working
const Main = () => {
  const [isSimplePopupVisible, setSimplePopupVisibility] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [popupContent, setPopupContent] = useState("");
  const [distributeInput, setDistributeInput] = useState("");
  const [isTransferCompleted, setTransferCompleted] = useState(false);
  const [selectedToken, setSelectedToken] = useState("NEAR");

  const handleCloseSimplePopup = () => {
    setSimplePopupVisibility(false);
  };

  const handleStoreList = () => {
    const newList = handleSubmit();

    const addressSet = new Set();
    const hasDuplicate = newList.some((item) => {
      if (addressSet.has(item.address)) {
        console.log(`Duplicate address found: ${item.address}`);
        setPopupContent("Repeated accounts were found.");
        setSimplePopupVisibility(true);
        return true;
      }
      addressSet.add(item.address);
      return false;
    });

    if (hasDuplicate || newList.length === 0) {
      return {};
    }

    const sumOfAmounts = Object.values(newList).reduce(
      (total, item) => total + parseFloat(item.amount || 0),
      0
    );

    if (sumOfAmounts < 1) {
      setPopupContent("Sum of amount must be more than 1 NEAR.");
      setSimplePopupVisibility(true);
      return {};
    } else {
      let platformAmount = 0;
      if (newList.length >= 1 && newList.length <= 10) {
        platformAmount = sumOfAmounts * 0.01;
      } else if (newList.length >= 11 && newList.length <= 25) {
        platformAmount = sumOfAmounts * 0.02;
      } else if (newList.length >= 26 && newList.length <= 50) {
        platformAmount = sumOfAmounts * 0.03;
      } else if (newList.length >= 50 && newList.length <= 100) {
        platformAmount = sumOfAmounts * 0.04;
      } else {
        platformAmount = sumOfAmounts * 0.06;
      }

      const calculatedTotalAmount = sumOfAmounts + platformAmount;

      setPopupContent(
        `Total Amount: ${calculatedTotalAmount}\nPlatform Amount: ${platformAmount}\nGas Fees: 0.0001`
      );

      const recipients = Object.values(newList).map((item) => ({
        account_id: item.address,
        amount: Number(
          (selectedToken === "NEAR"
            ? item.amount * 1e24
            : selectedToken === "USDT"
            ? item.amount * 1e6
            : item.amount
          ).toString()
        )
          .toLocaleString("fullwide", { useGrouping: false })
          .toString(),
      }));

      setSimplePopupVisibility(true);
      return {
        calculatedTotalAmount,
        distributeInput: {
          input: JSON.stringify({ recipients }),
        },
        platformAmount,
        sumOfAmounts,
      };
    }
  };

  const handleSubmit = () => {
    const newList = inputs;
    return newList;
  };
  const handleftmethod = () => {
    for (let index = 0; index < inputs.length; index++) {
      if (state[`validAccount_${index}`] === false) {
        setPopupContent("Enter valid Account id");
        setSimplePopupVisibility(true);
        return;
      } else if (inputs[index].address.trim() === "") {
        setPopupContent("Account id should not be blank");
        setSimplePopupVisibility(true);
        return;
      }
    }
    const {
      calculatedTotalAmount,
      distributeInput,
      platformAmount,
      sumOfAmounts,
    } = handleStoreList();

    if (!calculatedTotalAmount || !distributeInput || distributeInput === "") {
      State.update({
        disp: true,
      });

      return "";
    }

    setSimplePopupVisibility(false);
    let newsumOfAmounts =
      selectedToken === "USDT" ? sumOfAmounts * 1e6 : sumOfAmounts;
    try {
      Near.call([
        {
          contractName: "usdt.fdaomultixender.near",
          methodName: "set_recipients",
          args: distributeInput,
          deposit: platformAmount * 1e24,
          gas: 100000000000000,
        },
        {
          contractName:
            selectedToken === "USDT"
              ? "usdt.tether-token.near"
              : "4e807467ba9e3119d5356c5568ef63e9c321b471.factory.bridge.near",
          methodName: "ft_transfer_call",
          args: {
            receiver_id: "usdt.fdaomultixender.near",
            amount: `${newsumOfAmounts}`,
            msg: "Sending Near to Recepients",
          },
          deposit: 1,
          gas: 100000000000000,
        },
      ]);
    } catch (error) {
      console.error("Error during Near.call:", error);
    }
  };
  const handleMethod = () => {
    for (let index = 0; index < inputs.length; index++) {
      if (state[`validAccount_${index}`] === false) {
        setPopupContent("Enter valid Account id");
        setSimplePopupVisibility(true);
        return;
      } else if (inputs[index].address.trim() === "") {
        setPopupContent("Account id should not be blank");
        setSimplePopupVisibility(true);
        return;
      }
    }
    const {
      calculatedTotalAmount,
      distributeInput,
      platformAmount,
      sumOfAmounts,
    } = handleStoreList();

    if (!calculatedTotalAmount || !distributeInput || distributeInput === "") {
      State.update({
        disp: true,
      });

      return "";
    }

    setSimplePopupVisibility(false);

    const Contract = "multi.fdaomultixender.near";
    const Method = "transfer";
    const transferAccountId = "";
    const Gas = 100000000000000;
    const newcalculatedTotalAmount = calculatedTotalAmount * 1e24;

    try {
      Near.call(
        Contract,
        Method,
        distributeInput,
        transferAccountId,
        newcalculatedTotalAmount
      );
    } catch (error) {
      console.error("Error during Near.call:", error);
    }
  };

  const getAddressList = () => {
    if (typeof textAreaContent === "string") {
      const jsonArray = textAreaContent
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line, index) => {
          const [address, amount] = line.split(",").map((item) => item.trim());
          return {
            key: index + 1,
            address,
            amount: parseFloat(amount) || 0,
          };
        });

      return jsonArray;
    } else {
      return [];
    }
  };

  useEffect(() => {
    setAddressList(getAddressList());
  }, [textAreaContent]);

  const [inputs, setInputs] = useState([
    { key: 1, address: "", amount: "", usdAmount: "" },
  ]);

  const handleAdd = () => {
    setInputs((prevInputs) => [
      ...prevInputs,
      {
        key: prevInputs.length + 1,
        address: "",
        amount: "",
        usdAmount: "",
      },
    ]);
  };

  const handleDelete = () => {
    if (inputs.length > 1) {
      setInputs((prevInputs) => prevInputs.slice(0, -1));
    }
  };

  const handleDeleteInput = (index) => {
    setInputs((prevInputs) => prevInputs.filter((input, i) => i !== index));
  };

  const handleInputChange = (event, index, field) => {
    const { value } = event.target;
    let updatedInputs = [...inputs];
    let input = updatedInputs[index];

    if (field === "address") {
      input.address = value;
      setInputs(updatedInputs);
      return;
    }

    if (value === "") {
      input[field] = "";
      if (field === "amount") {
        input.usdAmount = "";
      } else if (field === "usdAmount") {
        input.amount = "";
      }
      setInputs(updatedInputs);
      return;
    }

    if (!value.match(/^\d*\.?\d*$/)) {
      setPopupContent("Field must consist of numbers only.");
      setSimplePopupVisibility(true);
      return;
    }

    const numValue = parseFloat(value);
    if (numValue < 0) {
      setPopupContent("The field can only be positive.");
      setSimplePopupVisibility(true);
      return;
    }
    if (numValue === 0) {
      setPopupContent("The field cannot be zero.");
      setSimplePopupVisibility(true);
      return;
    }

    if (field === "amount") {
      input.amount = value;
      input.usdAmount = (numValue * res).toFixed(2);
    } else if (field === "usdAmount") {
      input.usdAmount = value;
      input.amount = (numValue / res).toFixed(2);
    }

    setInputs(updatedInputs);
  };

  const initialValidationStates = inputs.map(() => undefined);
  const [validationStates, setValidationStates] = useState(
    initialValidationStates
  );

  const updateValidationState = (index, isValid) => {
    setValidationStates((prevStates) => {
      const newValidationStates = [...prevStates];
      newValidationStates[index] = isValid;
      return newValidationStates;
    });
  };

  const data = fetch("https://api.coingecko.com/api/v3/coins/near", {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  });

  const main_price = data.body.market_data.current_price.usd;

  const res = main_price;

  return (
    <Container>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "left",
          marginBottom: "10px",
        }}
      >
        <Label1>Token Address</Label1>
        <select
          value={selectedToken}
          onChange={(e) => setSelectedToken(e.target.value)}
          style={{
            width: "50%",
            fontSize: "1.2rem",
            height: "34px",
            marginTop: "20px",
          }}
        >
          <option value="NEAR">NEAR</option>
          <option value="USDT">USDT</option>
          <option value="OTTO">OTTO</option>
        </select>
      </div>
      <InputLabel>
        <Label1>Account Id</Label1>
        <Label2>Token Amount</Label2>
      </InputLabel>
      <Inputdiv>
        {inputs.map((input, index) => (
          <div key={input.key} className="flex justify-between mb-2">
            {state[`validAccount_${index}`] === false && (
              <div
                style={{
                  color: "red",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                Account does not exist
              </div>
            )}
            <InputAddress
              value={input.address}
              name="address"
              placeholder="Enter account ID"
              style={{
                border:
                  state[`validAccount_${index}`] === false
                    ? "2px solid red"
                    : state[`validAccount_${index}`]
                    ? "2px solid green"
                    : "none",
              }}
              onChange={(event) => {
                handleInputChange(event, index, "address");

                const value = event.target.value;

                clearTimeout(state.timer);
                State.update({
                  timer: setTimeout(() => {
                    if (value !== "") {
                      asyncFetch(config.nodeUrl, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          jsonrpc: "2.0",
                          id: "dontcare",
                          method: "query",
                          params: {
                            request_type: "view_account",
                            finality: "final",
                            account_id: value,
                          },
                        }),
                      }).then((response) => {
                        if (response.body.error) {
                          State.update({ [`validAccount_${index}`]: false });
                        } else {
                          State.update({ [`validAccount_${index}`]: true });
                        }
                      });
                    } else {
                      State.update({
                        [`validAccount_${index}`]: undefined,
                      });
                    }
                  }, 300),
                });
              }}
            />
            <InputAmount
              type="text"
              className="m-2 p-2 w-1/2 amount"
              placeholder={
                selectedToken === "NEAR"
                  ? "NEAR"
                  : selectedToken === "USDT"
                  ? "USDT"
                  : "OTTO"
              }
              name="Amount"
              value={input.amount}
              onChange={(event) => handleInputChange(event, index, "amount")}
              style={{ textAlign: "centre" }}
            />
            <InputAmount
              type="text"
              className="m-2 p-2 w-1/2 amount"
              placeholder="USD"
              name="Amount"
              value={
                selectedToken === "NEAR"
                  ? input.usdAmount
                  : selectedToken === "USDT"
                  ? input.amount
                  : "NA"
              }
              onChange={(event) => handleInputChange(event, index, "usdAmount")}
              style={{ textAlign: "centre" }}
            />

            <DeleteButton onClick={() => handleDeleteInput(index)}>
              ❌
            </DeleteButton>
          </div>
        ))}
      </Inputdiv>

      <Plus onClick={handleAdd}>
        <span role="img" aria-label="Add Icon" className="plus-icon">
          ➕
        </span>
      </Plus>

      <Divbutton>
        <NextUpper onClick={handleStoreList} style={{ marginRight: "20px" }}>
          Show fees
        </NextUpper>
        <NextLower
          onClick={selectedToken === "NEAR" ? handleMethod : handleftmethod}
        >
          Multisend
        </NextLower>
      </Divbutton>
      {isSimplePopupVisible && (
        <SimplePopup>
          <div>{popupContent}</div>
          <CloseButton onClick={handleCloseSimplePopup}>❌</CloseButton>
        </SimplePopup>
      )}
      {isSubmitClicked && <Content3 distributeInput={distributeInput} />}
    </Container>
  );
};

return (
  <Mainpage>
    <Text />
    <Text2 />
    <Text3 />
    <Main />
    <Footer />
  </Mainpage>
);
