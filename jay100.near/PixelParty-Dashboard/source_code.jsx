const pixelFont = fetch(
  "https://fonts.googleapis.com/css?family=Press+Start+2P"
).body;

const PlayerDashboard = () => {
  let frameData = Near.view("pixeltoken.near", "load_frames", {
    start: 0,
    end: 50,
  });

  //   let pets_ids = playerData.playerdata.pet_ids.map((id) => {
  //     return id;
  //   });

  //   let pets_data = Near.view("pixeltoken.near", "get_pets_by_ids", {
  //     pet_ids: pets_ids,
  //   });

  let PXTDecimalPlace = Near.view(
    "pixeltoken.near",
    "ft_metadata",
    {}
  ).decimals;

  console.log(frameData);

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
