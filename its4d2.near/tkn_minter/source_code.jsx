const translations = {
  en: {
    title: "Créateur de jetons tkn.near",
    description:
      "Here you can create a new token on NEAR using the tkn.near contract.",
    ownerIdDescription:
      "This is the account ID of the token owner, which is the currently logged-in account.",
    totalSupplyDescription:
      "This is the total number of tokens you want to create, without considering the decimal places. The actual total supply will be calculated based on this value and the number of decimal places you specify.",
    tokenNameDescription: "This is the human-readable name of your token.",
    tokenSymbolDescription:
      "This is the abbreviated symbol for your token, usually 3-5 uppercase letters.",
    tokenIconDescription:
      "This is the Base64-encoded image data for your token icon. You can use a service like base64-image.de to convert your image to Base64.",
    tokenDecimalsDescription:
      "This is the number of decimal places for your token.",
    createTokenButton: "Create Token",
    loginPrompt: "Please log in to create a new token.",
  },
  fr: {
    title: "Créateur de jetons tkn.near",
    description:
      "Sur cette page, vous pouvez créer un nouveau jeton sur NEAR en utilisant le contrat tkn.near.",
    ownerIdDescription:
      "Il s'agit de l'identifiant du compte propriétaire du jeton, c'est-à-dire le compte actuellement connecté.",
    totalSupplyDescription:
      "Indiquez ici le nombre total de jetons à créer, sans compter les décimales. La quantité finale sera calculée à partir de ce nombre et du nombre de décimales que vous spécifierez.",
    tokenNameDescription:
      "Donnez un nom à votre jeton, facilement compréhensible.",
    tokenSymbolDescription:
      "Choisissez un symbole court pour votre jeton, généralement 3 à 5 lettres majuscules.",
    tokenIconDescription:
      "Vous pouvez ajouter une icône à votre jeton en fournissant une image encodée en Base64. Utilisez un service comme base64-image.de pour convertir votre image.",
    tokenDecimalsDescription:
      "Précisez le nombre de décimales pour votre jeton.",
    createTokenButton: "Créer mon jeton",
    loginPrompt: "Veuillez vous connecter pour pouvoir créer un nouveau jeton.",
  },
  zh: {
    title: "Créateur de jetons tkn.near",
    description: "在這裡，您可以使用 tkn.near 合約在 NEAR 上建立一個新的代幣。",
    ownerIdDescription: "代幣擁有者的帳戶。",
    totalSupplyDescription:
      "請輸入您要建立的代幣總量,不包含小數位數。實際的總發行量會根據這個數字和您指定的小數位數計算出來。",
    tokenNameDescription: "幫您的代幣取一個好記的名字。",
    tokenSymbolDescription:
      "為您的代幣選一個簡短有力的符號，通常是 3 到 5 個大寫英文字母。",
    tokenIconDescription:
      "您可以為代幣上傳一個 Base64 編碼的圖示。可以用 base64-image.de 這類的服務把圖片轉換成 Base64 格式。",
    tokenDecimalsDescription: "請設定您的代幣要有幾位小數。",
    createTokenButton: "建立代幣",
    loginPrompt: "請先登入才能建立新的代幣。",
  },
};

const ownerId = context.accountId;
const contract = "tkn.near";

State.init({
  language: "en",
  totalSupply: "",
  tokenName: "",
  tokenSymbol: "",
  tokenIcon: "",
  tokenDecimals: "",
});

const onLanguageChange = (language) => {
  State.update({ language });
};

const onInputChange =
  (key) =>
  ({ target: { value } }) => {
    State.update({ [key]: value });
  };

const onCreateBtnClick = () => {
  if (
    state.totalSupply &&
    state.tokenName &&
    state.tokenSymbol &&
    state.tokenDecimals
  ) {
    const decimals = parseInt(state.tokenDecimals);
    const actualTotalSupply = state.totalSupply + "0".repeat(decimals);

    Near.call([
      {
        contractName: contract,
        methodName: "create_token",
        args: {
          args: {
            owner_id: ownerId,
            total_supply: actualTotalSupply,
            metadata: {
              spec: "ft-1.0.0",
              name: state.tokenName,
              symbol: state.tokenSymbol,
              icon: state.tokenIcon || null,
              decimals: decimals,
            },
          },
        },
        deposit: 3000000000000000000000000,
      },
    ]);
  } else {
    alert(translations[state.language].loginPrompt);
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
  position: relative;
`;

const LanguageSelector = styled.div`
  position: absolute;
  top: 2rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const Flag = styled.span`
  font-size: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 1.5rem;
`;

const Text = styled.p`
 font-size: 1rem;
 text-align: center;
 margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;

const Label = styled.label`
 font-size: 1rem;
 font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  box-sizing: border-box;
`;

const SmallText = styled.small`
 font-size: 0.875rem;
 color: #6c757d;
`;

const Button = styled.button`
 padding: 0.5rem 1rem;
 font-size: 1rem;
 color: white;
 background-color: #007bff;
 border: none;
 border-radius: 5px;
 cursor: pointer;
 transition: background-color 0.2s;

 &:hover {
   background-color: #0056b3;
 }
`;

return (
  <Wrapper>
    <LanguageSelector>
      <Flag onClick={() => onLanguageChange("en")}>🇺🇸</Flag>
      <Flag onClick={() => onLanguageChange("fr")}>🇫🇷</Flag>
      <Flag onClick={() => onLanguageChange("zh")}>🇭🇰</Flag>
    </LanguageSelector>
    <Title>{translations[state.language].title}</Title>
    <Text>{translations[state.language].description}</Text>
    {context.accountId ? (
      <>
        <FormGroup>
          <Label htmlFor="ownerId">Owner ID</Label>
          <Input id="ownerId" value={ownerId} disabled />
          <SmallText>
            {translations[state.language].ownerIdDescription}
          </SmallText>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="totalSupply">
            Total Supply
            <span style={{ color: "red" }}>*</span>
          </Label>
          <Input
            id="totalSupply"
            placeholder="1000000"
            onChange={onInputChange("totalSupply")}
          />
          <SmallText>
            {translations[state.language].totalSupplyDescription}
          </SmallText>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="tokenName">
            Token Name
            <span style={{ color: "red" }}>*</span>
          </Label>
          <Input
            id="tokenName"
            placeholder="Test Coin"
            onChange={onInputChange("tokenName")}
          />
          <SmallText>
            {translations[state.language].tokenNameDescription}
          </SmallText>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="tokenSymbol">
            Symbol
            <span style={{ color: "red" }}>*</span>
          </Label>
          <Input
            id="tokenSymbol"
            placeholder="TEST"
            onChange={onInputChange("tokenSymbol")}
          />
          <SmallText>
            {translations[state.language].tokenSymbolDescription}
          </SmallText>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="tokenIcon">Icon</Label>
          <Input
            id="tokenIcon"
            placeholder="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAI..."
            onChange={onInputChange("tokenIcon")}
          />
          <SmallText>
            {translations[state.language].tokenIconDescription
              .split(" ")
              .map((word, index) => {
                if (word === "base64-image.de") {
                  return (
                    <a
                      key={index}
                      href="https://www.base64-image.de/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {word}
                    </a>
                  );
                } else {
                  return <span key={index}>{word} </span>;
                }
              })}
          </SmallText>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="tokenDecimals">
            Decimals
            <span style={{ color: "red" }}>*</span>
          </Label>
          <Input
            id="tokenDecimals"
            placeholder="6"
            onChange={onInputChange("tokenDecimals")}
          />
          <SmallText>
            {translations[state.language].tokenDecimalsDescription}
          </SmallText>
        </FormGroup>
        <Button onClick={onCreateBtnClick}>
          <i className="fas fa-plus-circle"></i>{" "}
          {translations[state.language].createTokenButton}
        </Button>
      </>
    ) : (
      <Text
        style={{
          color: "#856404",
          backgroundColor: "#fff3cd",
          padding: "1rem",
          borderRadius: "5px",
        }}
      >
        {translations[state.language].loginPrompt}
      </Text>
    )}
  </Wrapper>
);
