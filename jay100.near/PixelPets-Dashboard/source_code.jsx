const pixelFont = fetch(
  "https://fonts.googleapis.com/css?family=Press+Start+2P"
).body;

State.init({
  display_weapons: true,
});

const PlayerDashboard = () => {
  let playerData = Near.view("pixeltoken.near", "get_player_data", {
    account_id: "chloe.near",
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

  console.log(playerData.playerdata);

  const DashBoardContainer = styled.div`
    font-family: "Pixel Emulator", "Press Start 2P", "Courier new", "monospace";
    ${pixelFont}
    background-color: rgb(12, 12, 31);
    padding: 0.6rem;
    color: white;
    overflow-x: hidden;
  `;

  const WeaponsContainer = styled.div`
     display: flex;
     align-items: center;
     justify-content: space-around;
    overflow-y: scroll;
    height: 80vh;
  `;

  const CharactersContainer = styled.div`
     display: flex;
     align-items: center;
     justify-content: space-around;
    overflow-y: scroll;
    height: 80vh;
  `;

  const WeaponDataContainer = styled.div`
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

  const CharacterDataContainer = styled.div`
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

  const CharacterDataList = styled.ul`
    padding: 0.2rem;
  `;

  const WeaponDataList = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0.2rem;
  `;

  const CharacterDetailItem = styled.li`
      list-style: inside url(data:image/gif;base64,R0lGODlhEAAQAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAQABAAQAIOlI+py+0Po5y02ouzPgUAOw==) square;
    font-size: 0.85rem;
    padding: 0.3rem;
  `;

  const WeaponDetailItem = styled.li`
      list-style: inside url(data:image/gif;base64,R0lGODlhEAAQAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAQABAAQAIOlI+py+0Po5y02ouzPgUAOw==) square;
    font-size: 0.85rem;
    padding: 0.3rem;
    display: flex;
  `;

  const WeaponButton = styled.button`
    width: 100%;
    padding: 0.5rem;
    border-radius: 8px;
    border: none;
    color: white;
    background-color: red;
  `;
  const CharacterButton = styled.button`
    width: 100%;
    padding: 0.5rem;
    border-radius: 8px;
    border: none;
    color: white;
    background-color: blue;
  `;

  return (
    <DashBoardContainer>
      <div className="row">
        <div className="col">
          <p>Player:chloe.near</p>
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
    </DashBoardContainer>
  );
};

return (
  <>
    <PlayerDashboard />
  </>
);
