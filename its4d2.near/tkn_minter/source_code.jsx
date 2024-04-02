const ownerId = context.accountId;
const contract = "tkn.near";

State.init({
  totalSupply: "",
  tokenName: "",
  tokenSymbol: "",
  tokenIcon: "",
  tokenDecimals: "",
});

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
    alert("Veuillez remplir tous les champs obligatoires.");
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
`;

const Title = styled.h1`
 font-size: 2rem;
 font-weight: bold;
 text-align: center;
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
    <Title>tkn.near minter</Title>
    <Text>
      Ici, vous pouvez créer un nouveau jeton sur NEAR en utilisant le contrat
      tkn.near.
    </Text>
    {context.accountId ? (
      <>
        <FormGroup>
          <Label htmlFor="ownerId">ID du propriétaire</Label>
          <Input id="ownerId" value={ownerId} disabled />
          <SmallText>
            Il s'agit de l'ID du compte propriétaire du jeton, c'est-à-dire le
            compte actuellement connecté.
          </SmallText>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="totalSupply">
            Offre totale <span style={{ color: "red" }}>*</span>
          </Label>
          <Input
            id="totalSupply"
            placeholder="1000000"
            onChange={onInputChange("totalSupply")}
          />
          <SmallText>
            Il s'agit du nombre total de jetons que vous souhaitez créer, sans
            tenir compte des décimales. L'offre totale réelle sera calculée en
            fonction de cette valeur et du nombre de décimales que vous
            spécifiez.
          </SmallText>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="tokenName">
            Nom du jeton <span style={{ color: "red" }}>*</span>
          </Label>
          <Input
            id="tokenName"
            placeholder="Test Coin"
            onChange={onInputChange("tokenName")}
          />
          <SmallText>
            C'est le nom de votre jeton lisible par un être humain.
          </SmallText>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="tokenSymbol">
            Symbole du jeton <span style={{ color: "red" }}>*</span>
          </Label>
          <Input
            id="tokenSymbol"
            placeholder="TEST"
            onChange={onInputChange("tokenSymbol")}
          />
          <SmallText>
            Il s'agit du symbole abrégé de votre jeton, généralement 3 à 5
            lettres majuscules.
          </SmallText>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="tokenIcon">Icône du jeton (facultatif)</Label>
          <Input
            id="tokenIcon"
            placeholder="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAI..."
            onChange={onInputChange("tokenIcon")}
          />
          <SmallText>
            Il s'agit des données d'image codées en Base64 pour l'icône de votre
            jeton. Vous pouvez utiliser un service tel que{" "}
            <a
              href="https://www.base64-image.de/"
              target="_blank"
              rel="noopener noreferrer"
            >
              base64-image.de
            </a>{" "}
            pour convertir votre image en Base64.
          </SmallText>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="tokenDecimals">
            Décimales du jeton <span style={{ color: "red" }}>*</span>
          </Label>
          <Input
            id="tokenDecimals"
            placeholder="6"
            onChange={onInputChange("tokenDecimals")}
          />
          <SmallText>
            Il s'agit du nombre de décimales pour votre jeton.
          </SmallText>
        </FormGroup>
        <Button onClick={onCreateBtnClick}>
          <i className="fas fa-plus-circle"></i> Créer le jeton
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
        Veuillez vous connecter pour créer un nouveau jeton.
      </Text>
    )}
  </Wrapper>
);
