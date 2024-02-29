State.init({
  disp: false,
});
// used for the mainpage
const Mainpage = styled.div` 
  background-color: #22252a;
  height: 1200px;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// used for the first text
const Text_style = styled.div`
color: #fff;
margin-top: 300px;
font-weight: bold;
display: flex;
justify-content: center;

@media screen and (min-width: 414px) {
    font-size: 20px;
    }
@media screen and (min-width: 768px){
    font-size: 30px;
  }
@media screen and (min-width: 1400px){
    font-size: 40px;
  }
`;

//used for the second text
const Second_p = styled.div`
  display: flex;
  justify-content: center;
  padding-left:10px; 
  color: #fff;
  margin-top : 10px;
  margin-left: 20px;
  font-weight: normal;

  @media screen and (min-width: 414px) {
    font-size: 17px;
    }
  @media screen and (min-width: 768px){
    font-size: 25px;
  }
  @media screen and (min-width: 1400px){
    font-size: 30px;
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

// container for the main multisender
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 500px;
  margin: 0 auto;
  margin-top: 90px;
  border-radius: 20px;
  background-color: #ccc;

  @media screen and (min-width: 414px) {
    width: 60%;
  }

  @media screen and (min-width: 768px){
    width: 60%;
  }

  @media screen and (min-width: 1400px){
    width: 60%;
`;

// used for the label
const CsvLabel = styled.label`
  font-weight: bold;
  margin-top: 15px;
  margin: 0 auto;
   @media screen and (min-width: 414px){
    margin-top: 20px;
    margin-left: 10px;
    font-size: 1.3rem;
  }

  @media screen and (min-width: 768px){
    margin-top: 20px;
    margin-left: 10px;
    font-size: 1.3rem;
  }

  @media screen and (min-width: 1400px){
    margin-top: 20px;
    margin-left: 10px;
    font-size: 1.3rem;
  }
 `;

const Alert = styled.label`
  font-weight: bold;
  margin: 15px;
  margin: 0 auto;
  display : ${state.disp ? "block" : "none"}
 `;

// used for container it contains the text area
const CSVContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;
  width: 80%;
  height: 250px;
`;

//container of sample button used to set sample
const SampleButtonContainer = styled.div`
   display: flex;
   align-items: center;
   margin-top: -5px;
   width: 80%;
   height: 50px;

`;

//sample button
const SampleButton = styled.button`
  height: 40px;
  margin-top : -40px;
  font-size: 1rem;
  border-radius: 0px 0px 30px 30px;
  background-color: #04041b;
  color: #fff;
  font-weight: bold;
  position: relative;
  

  @media screen and (min-width: 414px){
    
    width: 100%;
  }

  @media screen and (min-width: 768px){
   
    width: 100%;
  }

  @media screen and (min-width: 1400px){
    
    width: 100%;
  }
  p{
  margin-top: 5px;
  }
  
`;

//area to add the addresses
const TextArea = styled.textarea`
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid black;
  margin-bottom: 10px;
  overflow-y: scroll;
  @media screen and (min-width: 414px) {
    width: 100%;
    height: 100%;
  }

  @media screen and (min-width: 768px){
    width: 100%;
    height: 100%
  }

  @media screen and (min-width: 1400px){
    width: 100%;
    height: 100%
`;

//container of popup sample
const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// popup  content
const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  z-index: 1000;
`;

// handling popup
const Popup = ({ onClose }) => {
  return (
    <PopupContainer>
      <PopupContent>
        <img
          src="https://i.postimg.cc/J7YBFNhM/Screenshot-2024-01-07-225153.png"
          alt="Popup Image"
          style={{ maxWidth: "100%", maxHeight: "200px", margin: "15px 0" }}
        />
        <SampleButton onClick={onClose}>Close</SampleButton>
      </PopupContent>
    </PopupContainer>
  );
};

// next button stles
const Next = styled.button`
height: 40px;
width: 100%;
margin-top: 10px;
border: 1px solid black;
border-radius: 15px;
background-color: #04041b;
color: #fff;
font-weight: bold;

`;

// styling of simple popup
const SimplePopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  z-index: 1000;
`;

// close button
const CloseButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f1f1f1;
  cursor: pointer;
`;
const user = "fdaomultixender.near";
const Content3 = ({ distributeInput }) => (
  <div>
    <Widget
      src={`${user}/widget/MultiXender_distribute`}
      distributeInput={distributeInput}
    />
  </div>
);

// Main component working
const Main = () => {
  const [isSamplePopupVisible, setSamplePopupVisibility] = useState(false);
  const [isSimplePopupVisible, setSimplePopupVisibility] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [textAreaContent, setTextAreaContent] = useState("");
  const [popupContent, setPopupContent] = useState("");
  const [distributeInput, setDistributeInput] = useState("");
  const [isTransferCompleted, setTransferCompleted] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  // used to open sample popup
  const handleOpenSamplePopup = () => {
    setSamplePopupVisibility(true);
  };

  //used to open simple popup gas one
  const handleOpenSimplePopup = () => {
    setSimplePopupVisibility(true);
  };

  // used to close sample popup
  const handleCloseSamplePopup = () => {
    setSamplePopupVisibility(false);
  };

  //used to close simple popup
  const handleCloseSimplePopup = () => {
    setSimplePopupVisibility(false);
  };

  //text area change handling
  const handleTextAreaChange = (event) => {
    setTextAreaContent(event.target.value);
  };

  // list json handling
  const handleStoreList = () => {
    const newList = getAddressList();

    console.log(newList);

    //  Check for duplicate addresses
    const addressSet = new Set();
    const hasDuplicate = newList.some((item) => {
      if (addressSet.has(item.address)) {
        console.log(`Duplicate address found: ${item.address}`);
        State.update({
          disp: true,
        });
        return true;
      }
      addressSet.add(item.address);
      return false;
    });

    // If duplicates found, return an empty array
    if (hasDuplicate || newList.length === 0) {
      return "";
    }

    // Calculate the sum of amounts
    const sumOfAmounts = Object.values(newList).reduce(
      (total, item) => total + parseFloat(item.amount || 0),
      0
    );

    // Display different messages based on the sum of amounts
    if (sumOfAmounts < 1) {
      setPopupContent(`Amount should be more than 1 NEAR.`);
    } else {
      // Calculate the percentage based on the number of keys
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

  const handleMethod = () => {
    // Destructure the result of handleStoreList
    const { calculatedTotalAmount, distributeInput } = handleStoreList();

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

    const Contract = "fdaomultixender.near";
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

      //   // Check for duplicate addresses
      //   const addressSet = new Set();
      //   const hasDuplicate = jsonArray.some((item) => {
      //     if (addressSet.has(item.address)) {
      //       console.log(`Duplicate address found: ${item.address}`);
      //       return true;
      //     }
      //     addressSet.add(item.address);
      //     return false;
      //   });

      //   // If duplicates found, return an empty array
      //   if (hasDuplicate) {
      //     State.update({
      //       disp: true,
      //     });
      //   }

      return jsonArray;
    } else {
      return [];
    }
  };

  useEffect(() => {
    setAddressList(getAddressList());
  }, [textAreaContent]);

  return (
    <Container>
      <CsvLabel>List of Addresses in Near</CsvLabel>

      <CSVContainer>
        <TextArea
          id="addressTextArea"
          rows="100"
          cols="30"
          value={textAreaContent}
          placeholder="Enter addresses here..."
          onChange={handleTextAreaChange}
        />
      </CSVContainer>
      <SampleButtonContainer>
        <SampleButton onClick={handleOpenSamplePopup}>Sample CSV</SampleButton>
      </SampleButtonContainer>
      <Alert>
        Alert! No Accounts or Repeated Accounts were Found or sum of amount must
        be more than 1 NEAR.
      </Alert>
      <Next onClick={handleStoreList}>Show fees</Next>
      <Next onClick={handleMethod}>Submit</Next>
      {isSamplePopupVisible && <Popup onClose={handleCloseSamplePopup} />}
      {isSimplePopupVisible && (
        <SimplePopup>
          <div>{popupContent}</div>
          <CloseButton onClick={handleCloseSimplePopup}>Close</CloseButton>
        </SimplePopup>
      )}
      {isSubmitClicked && <Content3 distributeInput={distributeInput} />}
    </Container>
  );
};

const FooterContainer = styled.div`
height: 80px;
margin-top: 200px;
color: #fff;
display: flex;
align-items: center;
justify-content: center;

p{
font-size: 1.5rem;
}
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024 Multisender All rights reserved.</p>
    </FooterContainer>
  );
};

// function multisender
function Multisender() {
  return (
    <Mainpage>
      {text()}
      {text2()}
      <Main />
      <Footer />
    </Mainpage>
  );
}

return <Multisender />;
