// used for the mainpage
const Mainpage = styled.div` 
  background-color: #edf0f4;
  height: auto;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center; 
`;

// used for the first text
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

//used for the second text
const Second_p = styled.div`
  font-family: 'Lato', sans-serif;
  // font-weight: bold;
  display: flex;
  justify-content: center;
  color: #072754;
  font-size: 2rem;
  margin-top : 10px;
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
  margin-top : 50px;
  // font-weight : 500;
  display: flex;
  justify-content: center;
  font-size: 2.5rem;
  
  span {
    color: #ff0000; /* Red color for the 'X' */
  }
`;

//to display first text
function text() {
  return (
    <Text_style>
      <p>Send Tokens to Multiple Adresses</p>
    </Text_style>
  );
}

//to display second text
function text2() {
  return (
    <Second_p>
      <p>Empowered by NEAR Protocol's cutting-edge technology</p>
    </Second_p>
  );
}

function text3() {
  return (
    <Third_p>
      Multi<span>X</span>ender
    </Third_p>
  );
}

// next button stles
const NextUpper = styled.button`
  font-family: 'Lato', sans-serif;
  height: 60px; /* Increase height for a bigger button */
  width: 200px; /* Adjust width as needed */
  margin-top: 20px; /* Increase top margin */
  border: none; /* Remove border */
  border-radius: 30px; /* Adjust border radius */
  background-color: #f8931f;
  color: #000;
  font-weight: bold;
  font-size: 18px; /* Increase font size */
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease; /* Smooth transition for animations */
  
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%;
    height: 300%;
    background-color: rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease; /* Smooth transition for animations */
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
    transform: scale(0.95); /* Add slight scale down effect on click */
  }

  &:focus {
    outline: none; /* Remove default focus outline */
  }
   @media screen and (max-width: 500px) {
    width: 150px; /* Adjust width for mobile view */
    font-size: 16px; /* Adjust font size for mobile view */
  }
`;

const NextLower = styled.button`
  font-family: 'Lato', sans-serif;
  height: 60px; /* Increase height for a bigger button */
  width: 200px; /* Adjust width as needed */
  margin-top: 20px; /* Increase top margin */
  margin-right: 10px; /* Add margin between buttons */
  border: none; /* Remove border */
  border-radius: 30px; /* Adjust border radius */
  background-color: #f8931f;
  color: #000;
  font-weight: bold;
  font-size: 18px; /* Increase font size */
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease; /* Smooth transition for animations */
  
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%;
    height: 300%;
    background-color: rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease; /* Smooth transition for animations */
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
    transform: scale(0.95); /* Add slight scale down effect on click */
  }

  &:focus {
    outline: none; /* Remove default focus outline */
  }

   @media screen and (max-width: 500px) {
    width: 150px; /* Adjust width for mobile view */
    font-size: 16px; /* Adjust font size for mobile view */
  }
`;

// styling of simple popup
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
    top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
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
    margin-bottom: 5px; /* Adjust margin bottom for better alignment */
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
    margin-bottom: 5px; /* Adjust margin bottom for better alignment */
    margin-left: 0%;
    text-align: center;
  }
`;

// close button
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
  justify-content: center; /* Horizontally center items */
  align-items: center; /* Vertically center items */
  flex-direction: column;

  @media screen and (max-width: 500px) {
    margin-bottom: 5px; /* Adjust margin bottom for better alignment */
    flex-direction: column;
    align-items: center; 
    justify-content: center;
    margin-top: -100px; 
  }
`;

const Plus = styled.div`
  background-color: white;
  color: black;
  padding: 10px; /* Increased padding for better touch area */
  width: 50%;
  border-radius: 8px; /* Increased border-radius for a smoother look */
  margin-left: 23%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border: 2px solid transparent; /* Added border for better contrast */
  transition: background-color 0.3s, border-color 0.3s; /* Transition border color along with background color */

  &:hover {
    background-color: #072754;
    border-color: #072754; 
  }
  .plus-icon {
    color: red; /* Change the color of the plus icon */
  }
  @media screen and (max-width: 500px) {
  margin: auto;
  display: flex;
  justify-content: center;
  }
  
`;

// const Submit = styled.div``;
const Divbutton = styled.div`
display: flex;
width: 100%;
margin-top: 20px;
justify-content: center;
`;
const DeleteButton = styled.button`
  width: 50px; /* Set the initial width of the button */
  display: inline-block;
  transition: width 0.3s ease; /* Smooth transition effect for width */

  &:hover {
    width: 50px; /* Adjust the width when hovered */
    transform: scale(1.1); /* Scale up the content by 10% on hover */
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

// Config for Bos app
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

// Main component working
const Main = () => {
  const [isSimplePopupVisible, setSimplePopupVisibility] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [popupContent, setPopupContent] = useState("");
  const [distributeInput, setDistributeInput] = useState("");
  const [isTransferCompleted, setTransferCompleted] = useState(false);

  // this one is for future reference if popup needed
  //used to open simple popup gas one
  // const handleOpenSimplePopup = () => {
  //   setSimplePopupVisibility(true);
  // };

  //used to close simple popup
  const handleCloseSimplePopup = () => {
    setSimplePopupVisibility(false);
  };

  // list json handling
  const handleStoreList = () => {
    const newList = handleSubmit();

    // Check for duplicate addresses
    const addressSet = new Set();
    const hasDuplicate = newList.some((item) => {
      if (addressSet.has(item.address)) {
        console.log(`Duplicate address found: ${item.address}`);
        setPopupContent("Repeated accounts were found.");
        setSimplePopupVisibility(true); // Show the popup
        return true;
      }
      addressSet.add(item.address);
      return false;
    });

    // If duplicates found, return an empty object
    if (hasDuplicate || newList.length === 0) {
      return {};
    }

    // Calculate the sum of amounts
    const sumOfAmounts = Object.values(newList).reduce(
      (total, item) => total + parseFloat(item.amount || 0),
      0
    );

    // Display different messages based on the sum of amounts
    if (sumOfAmounts < 1) {
      // Display the popup content for amounts less than 1 NEAR
      setPopupContent("Sum of amount must be more than 1 NEAR.");
      setSimplePopupVisibility(true); // Show the popup
      return {}; // Return empty object as there's no valid distribution
    } else {
      // Calculate the percentage based on the number of keys
      let platformAmount = newList.length * 0.004 + sumOfAmounts * 0.005;

      const calculatedTotalAmount = sumOfAmounts + platformAmount;

      // Display the popup with total amount and gas amount
      setPopupContent(
        `Total Amount: ${calculatedTotalAmount}\nPlatform Amount: ${platformAmount}\nGas Fees: 0.0001`
      );

      const recipients = Object.values(newList).map((item) => ({
        account_id: item.address,
        amount: Number((item.amount * 1e24).toString())
          .toLocaleString("fullwide", { useGrouping: false })
          .toString(),
      }));

      // Show the simple popup
      setSimplePopupVisibility(true);
      // Return an object with the necessary values
      return {
        calculatedTotalAmount,
        distributeInput: {
          input: JSON.stringify({ recipients }),
        },
      };
    }
  };

  const handleSubmit = () => {
    const newList = inputs;
    return newList;
  };

  const handleMethod = () => {
    // Check if the account ID is not valid
    for (let index = 0; index < inputs.length; index++) {
      if (state[`validAccount_${index}`] === false) {
        setPopupContent("Enter valid Account id");
        setSimplePopupVisibility(true);
        return;
      } else if (inputs[index].address.trim() === "") {
        setPopupContent("Account id should not blank");
        setSimplePopupVisibility(true);
        return;
      }
    }
    // Destructure the result of handleStoreList
    const { calculatedTotalAmount, distributeInput } = handleStoreList();

    // Check if calculatedTotalAmount or distributeInput is not valid
    if (!calculatedTotalAmount || !distributeInput || distributeInput === "") {
      // Set disp to true if any of the conditions are met
      State.update({
        disp: true,
      });

      // Return an empty string for distributeInput
      return "";
    }

    // Set simple popup visibility to false
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

  // getting address json list
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

    // Early exit for address field to skip numeric checks
    if (field === "address") {
      input.address = value;
      setInputs(updatedInputs);
      return;
    }

    // Handling empty string case to avoid NaN
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

    // Numeric validation only for amount fields
    if (!value.match(/^\d*\.?\d*$/)) {
      // Regex to allow only numbers and decimal points
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

    // Update the amounts and convert as necessary
    if (field === "amount") {
      input.amount = value;
      input.usdAmount = (numValue * res).toFixed(2); // Convert and format to USD
    } else if (field === "usdAmount") {
      input.usdAmount = value;
      input.amount = (numValue / res).toFixed(2); // Convert and format to NEAR
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

                // debounce
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
              placeholder="NEAR"
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
              value={input.usdAmount}
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
        <NextLower onClick={handleMethod}>Multisend</NextLower>
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

const FooterContainer = styled.div`
  height: 80px;
  margin-top: 200px;
  color: #000;
  background-color: #edf0f4; /* Dark background color */
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif; /* Example font family */

  p {
    font-size: 1.5rem;
    margin: 0; /* Remove default margin */
  }

  @media screen and (max-width: 500px) {
    height: 120px; /* Adjust height for smaller screens */
    margin-top: 100px; /* Adjust margin for smaller screens */
    padding: 20px; /* Add padding for better spacing */
    text-align: center; /* Center text on smaller screens */
    p{
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

// function multisender
function Multisender() {
  return (
    <Mainpage>
      {text()}
      {text2()}
      {text3()}
      <Main />
      <Footer />
    </Mainpage>
  );
}

return <Multisender />;
