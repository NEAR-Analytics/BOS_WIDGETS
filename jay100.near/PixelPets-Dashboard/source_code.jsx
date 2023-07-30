const pixelFont = fetch(
  "https://fonts.googleapis.com/css?family=Press+Start+2P"
).body;

const PlayerDashboard = () => {
  let playerData = Near.view("pixeltoken.near", "get_player_data", {
    account_id: context.accountId,
  });

  let player_balance = playerData.balance;

  let own_sungen = playerData.owns_sungen;
  let sungen_timer = playerData.sungen_timer;

  let pets_ids = playerData.playerdata.pet_ids.map((id) => {
    return id;
  });

  let pets_data = Near.view("pixeltoken.near", "get_pets_by_ids", {
    pet_ids: pets_ids,
  });

  let hatching = playerData.playerdata.hatching;
  let train_timer = playerData.playerdata.train_timer;
  let matches_won = playerData.playerdata.matches_won;
  let matches_lost = playerData.playerdata.matches_lost;
  let rating = playerData.playerdata.rating;
  let fight_balance = playerData.playerdata.fight_balance;

  let PXTDecimalPlace = Near.view(
    "pixeltoken.near",
    "ft_metadata",
    {}
  ).decimals;

  const DashBoardContainer = styled.div`
    font-family: "Pixel Emulator", "Press Start 2P", "Courier new", "monospace";
    ${pixelFont}
    background-color: rgb(12, 12, 31);
    padding: 0.6rem;
    color: white;
    overflow-x: hidden;
  `;

  const PetsContainer = styled.div`
     display: flex;
     align-items: center;
     justify-content: space-around;
    overflow-y: scroll;
    height: 80vh;
  `;

  const PetDataContainer = styled.div`
    background-color: rgb(40, 40, 128);
    box-shadow: rgb(200, 224, 224) 0px 0px 0px 1px, rgb(128, 128, 128) 0px 0px 0px 2px, rgb(40, 48, 48) 0px 0px 0px 3px, rgb(48, 48, 136) 0px 0px 0px 1px inset;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: 0.5rem;
    width: fit-content;
    height: fit-content;
  `;

  const PetDataList = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0.2rem;
  `;

  const PetDetailItem = styled.li`
      list-style: inside url(data:image/gif;base64,R0lGODlhEAAQAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAQABAAQAIOlI+py+0Po5y02ouzPgUAOw==) square;
    font-size: 0.85rem;
    padding: 0.3rem;
    display: flex;
  `;

  return (
    <DashBoardContainer>
      <div className="row">
        <div className="col">
          <p>Player:{context.accountId}</p>
          <p>
            PixelToken:
            {(parseInt(player_balance.pixeltoken) / 1000000).toFixed(
              PXTDecimalPlace
            )}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p>Common Eggs:{player_balance.egg_common}</p>
          <p>Rare Eggs:{player_balance.egg_rare}</p>
        </div>
        <div className="col">
          <p>Epic Eggs:{player_balance.egg_rare}</p>
          <p>Legendary Eggs:{player_balance.egg_rare}</p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p>Matches Won:{matches_won}</p>
          <p>Matches Lost:{matches_lost}</p>
        </div>
        <div className="col">
          <p>Rating:{rating}</p>
          <p>Fight Balance:{fight_balance}</p>
        </div>
      </div>

      <PetsContainer className="row">
        {pets_data.map((pet) => {
          return (
            <PetDataContainer>
              <PetDataList>
                <PetDetailItem>Token ID:{pet.token_id}</PetDetailItem>
                <PetDetailItem>Pet Type:{pet.pet_type}</PetDetailItem>
                <PetDetailItem>Train Level:{pet.train_level}</PetDetailItem>
                <PetDetailItem>Exp:{pet.xp}</PetDetailItem>
                <PetDetailItem>Level:{pet.level}</PetDetailItem>
                <PetDetailItem>Power Level:{pet.power_level}</PetDetailItem>
                <PetDetailItem>Price:{pet.price}</PetDetailItem>
                <PetDetailItem>Rarity:{pet.rarity}</PetDetailItem>
                <PetDetailItem>State:{pet.state}</PetDetailItem>
                <PetDetailItem>State Timer:</PetDetailItem>
                <PetDetailItem>{pet.state_timer}</PetDetailItem>
              </PetDataList>
            </PetDataContainer>
          );
        })}
      </PetsContainer>
    </DashBoardContainer>
  );
};

return (
  <>
    <PlayerDashboard />
  </>
);
