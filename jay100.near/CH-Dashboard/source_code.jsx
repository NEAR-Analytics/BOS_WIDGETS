const pixelFont = fetch(
  "https://fonts.googleapis.com/css?family=Press+Start+2P"
).body;

const PlayerDashboard = () => {
  let playerData = Near.view("pixeltoken.near", "ch_get_player_data", {
    account_id: context.accountId,
  });

  console.log(playerData);

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

  const TroopsContainer = styled.div`
     display: flex;
     align-items: center;
     justify-content: space-around;
    overflow-y: scroll;
    height: 80vh;
  `;

  const TroopDataContainer = styled.div`
    background-color: rgb(40, 40, 128);
    box-shadow: rgb(200, 224, 224) 0px 0px 0px 1px, rgb(128, 128, 128) 0px 0px 0px 2px, rgb(40, 48, 48) 0px 0px 0px 3px, rgb(48, 48, 136) 0px 0px 0px 1px inset;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: 0.5rem;
    width: 65%;
    height: fit-content;
  `;

  const TroopDataList = styled.ul`
    padding: 0.2rem;
  `;

  const TroopDetailItem = styled.li`
      list-style: inside url(data:image/gif;base64,R0lGODlhEAAQAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAQABAAQAIOlI+py+0Po5y02ouzPgUAOw==) square;
    font-size: 0.9rem;
    padding: 0.3rem;
  `;

  return (
    <DashBoardContainer>
      <div className="row">
        <p>Player:{context.accountId}</p>
      </div>
    </DashBoardContainer>
  );
};

return (
  <>
    <PlayerDashboard />
  </>
);
