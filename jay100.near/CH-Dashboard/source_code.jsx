const pixelFont = fetch(
  "https://fonts.googleapis.com/css?family=Press+Start+2P"
).body;

State.init({
  display_weapons: true,
});

const PlayerDashboard = () => {
  let playerData = Near.view("pixeltoken.near", "ch_get_player_data", {
    account_id: context.accountId,
  });

  let joined_raids = playerData.playerdata.joined_raids;

  let fight_balance = playerData.playerdata.fight_balance;

  let items_ids = playerData.playerdata.item_ids.map((id) => {
    return id;
  });

  let character_ids = playerData.playerdata.character_ids.map((id) => {
    return id;
  });

  let items_data = Near.view("pixeltoken.near", "ch_get_items_by_ids", {
    token_ids: items_ids,
  });

  let characters_data = Near.view(
    "pixeltoken.near",
    "ch_get_characters_by_ids",
    {
      character_ids: character_ids,
    }
  );

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
          <p>Player:{context.accountId}</p>
          <p>Fight Balance:{fight_balance}</p>
        </div>

        <div className="col">
          <WeaponButton
            onClick={() => {
              State.update({
                display_weapons: true,
              });
            }}
            className="btn"
          >
            Weapons
          </WeaponButton>
          <CharacterButton
            onClick={() => {
              State.update({
                display_weapons: false,
              });
            }}
            className="btn"
          >
            Characters
          </CharacterButton>
        </div>
      </div>
      {state.display_weapons ? (
        <WeaponsContainer className="row">
          {items_data.map((item) => {
            return (
              <WeaponDataContainer>
                <WeaponDataList>
                  <WeaponDetailItem>Token ID:{item.token_id}</WeaponDetailItem>
                  <WeaponDetailItem>
                    Item Type:{item.item_type}
                  </WeaponDetailItem>
                  <WeaponDetailItem>Rarity:{item.rarity_type}</WeaponDetailItem>
                  <WeaponDetailItem>Strength:{item.strength}</WeaponDetailItem>
                  <WeaponDetailItem>
                    Dexterity:{item.dexterity}
                  </WeaponDetailItem>
                  <WeaponDetailItem>
                    Endurance:{item.endurance}
                  </WeaponDetailItem>
                  <WeaponDetailItem>
                    Intelligence:{item.intelligence}
                  </WeaponDetailItem>
                  <WeaponDetailItem>Luck:{item.luck}</WeaponDetailItem>
                  <WeaponDetailItem>Price:{item.price}</WeaponDetailItem>
                  <WeaponDetailItem>CD:{item.cd}</WeaponDetailItem>
                </WeaponDataList>
              </WeaponDataContainer>
            );
          })}
        </WeaponsContainer>
      ) : (
        <CharactersContainer className="row">
          {characters_data.map((character) => {
            return (
              <CharacterDataContainer className="col">
                <CharacterDataList>
                  <CharacterDetailItem>
                    Character ID:{character.character_id}
                  </CharacterDetailItem>
                  <CharacterDetailItem>
                    Class ID:{character.class_type}
                  </CharacterDetailItem>
                  <CharacterDetailItem>
                    Exp:{character.experience}
                  </CharacterDetailItem>
                  <CharacterDetailItem>
                    Level:{character.level}
                  </CharacterDetailItem>
                  <CharacterDetailItem>
                    Injured Time:{character.injured_timer}
                  </CharacterDetailItem>
                </CharacterDataList>
              </CharacterDataContainer>
            );
          })}
        </CharactersContainer>
      )}
    </DashBoardContainer>
  );
};

return (
  <>
    <PlayerDashboard />
  </>
);
