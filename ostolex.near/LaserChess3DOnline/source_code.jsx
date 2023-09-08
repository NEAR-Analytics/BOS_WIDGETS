// */laserchess3d/let45fc.testnet-laserchess3d-room-74e209f6-1662-4009-9286-61319b45f4cd/**

// {
//     "sn": "l++3d++kd++b+++2/2b7/3B+6/b++1B1ss+1b+++1B+/b+++1B+1S+S1b++1B/6b+++3/7B++2/2B+DKD3L",
//     "lastMove": {
//         "type": "special",
//         "srcLocation": {
//             "colIndex": "2",
//             "rowIndex": "3",
//         },
//         "destLocation": {
//             "colIndex": "2",
//             "rowIndex": "3",
//         }
//     },
//     "numberOfMoves": "0",
//     "userColor": "blue",
//     "opponentColor": "red",
// }

const widgetKey = "laserchess3d";

const boardSetups = {
  ace: "l++3d++kd++b+++2/2b7/3B+6/b++1B1ss+1b+++1B+/b+++1B+1S+S1b++1B/6b+++3/7B++2/2B+DKD3L",
  curiosity:
    "l++3d++kd++s+++2/19/3B+2b++3/b++B2B+++s+2b+++B+/b+++B+2S+b+2b++B/3B2b+++3/19/2S+DKD3L",
  grail:
    "l++3bd++b+++3/5k4/b++3bd++s+3/b+++1s1B+1B+++3/3b+1b+++1S1B+/3S+DB++3B/4K5/3B+DB++3L",
  mercury:
    "l+3bkb+++2S+/5d++b+++3/b+++2s+1d++4/b++3B+3B1/1b++3b+++3B/4D1S+2B+/3B+D5/s+2B+KB++3L+++",
  sophie:
    "l++3kB+b+++3/3d++1d+3B/b++3bb+++1S+1B+/7s2/2S7/b+++1s+1B+B++3B/b++3D+++1D3/3B+b+++K3L",
  random: "null",
};

const gameTypes = {
  ai: "ai",
  online: "online",
};

State.init({
  roomId: props.roomId,
  sn: props.sn,
  lastMoveData: null,
  firstLoad: true,
});

const getLastMove = (myLastMove, opponentLastMove) => {
  if (
    myLastMove.numberOfMoves === undefined &&
    opponentLastMove.numberOfMoves === undefined
  )
    return userColor === "blue" ? myLastMove : opponentLastMove;
  if (
    myLastMove.numberOfMoves !== undefined &&
    opponentLastMove.numberOfMoves !== undefined
  )
    if (
      parseInt(myLastMove.numberOfMoves) >
        parseInt(opponentLastMove.numberOfMoves) ||
      (myLastMove.userColor === "red" &&
        myLastMove.numberOfMoves === opponentLastMove.numberOfMoves)
    ) {
      return myLastMove;
    } else {
      return opponentLastMove;
    }
  if (
    myLastMove.numberOfMoves !== undefined &&
    opponentLastMove.numberOfMoves === undefined
  ) {
    return myLastMove;
  }
  if (
    opponentLastMove.numberOfMoves !== undefined &&
    myLastMove.numberOfMoves === undefined
  ) {
    return opponentLastMove;
  }
};

const ownerAccountId = state.roomId.split("---")[0];

const userColor = ownerAccountId == context.accountId ? "blue" : "red";
const opponentColor = userColor == "blue" ? "red" : "blue";

let roomsData = Social.get(`*/${widgetKey}/${state.roomId}/**`, "final", {
  subscribe: true,
});

if (roomsData == null) {
  return <h1>Loading game data...</h1>;
}

const players = Object.keys(roomsData);
if (players.length != 2)
  return (
    <h1>Something went wrong. We wonder how you even could get on this page</h1>
  );
const opponentAccountId = players.filter((el) => el !== context.accountId)[0];

const myMoveData = roomsData[context.accountId][widgetKey][state.roomId];
const opponentMoveData = roomsData[opponentAccountId][widgetKey][state.roomId];
let lastMoveData = getLastMove(myMoveData, opponentMoveData);

if (lastMoveData) State.update({ lastMoveData: lastMoveData });

const sn = lastMoveData.sn || state.sn;

const iframeHtml = `
<!doctype html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <title>Laser chess</title>
      <link rel="stylesheet" href="https://near-social-laser-chess.github.io/laser-chess-3d/css/style.css">
      <script defer="defer" src="https://near-social-laser-chess.github.io/laser-chess-3d/bundle.js"></script>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
   </head>
   <body>
      <div class="rotate-buttons">
         <div class="rotate-header">Rotate</div>
         <div class="buttons">
            <button class="rotate-button" type="button" aria-label="rotate piece left" disabled="disabled">
               <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.11 8.53L5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z"></path>
               </svg>
            </button>
            <button class="rotate-button" type="button" aria-label="rotate piece right" disabled="disabled">
               <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z"></path>
               </svg>
            </button>
         </div>
      </div>
      <div class="winner-message" aria-label="winner message">
        <div class="winner-message__content">
            <div id="winner-message__header"></div>
            <div id="winner-message__info"></div>
                <div class="container">
            <div class="row winner-message-buttons" style="width: 100%;">
              <div class="col-md-6">
                <button type="button" class="btn btn-primary"><a href="https://wallet.near.org/send-money/ostolex.near" style="color: #fff;">Support developers</a></button>
              </div>
              <div class="col-md-6">
                <button type="button" class="btn btn-warning"><a href="https://unchain.fund/#donate">Support Ukraine</a></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script>

      const callback = (moveData) => {
          window.top.postMessage(moveData, "*");
      };
      window.addEventListener('message', async (e) => {
            const data = JSON.parse(event.data);
            if (!data) return;
            if (data.initType === "init") {
              await EntryPoint.initGame({
                type: "online",
                userColor: data.additional.userColor,
                opponentColor: data.additional.opponentColor,
                numberOfMoves: parseInt(data.numberOfMoves),
                currentPlayer: \`\${
                  data.currentPlayer ||  data.additional.opponentColor
                }\`,
                sn: data.sn,
              }, callback);
              window.top.postMessage("initialized", "*");
            }
        });
        window.addEventListener('message', async (event) => {
            const moveData = JSON.parse(event.data);
            if (!moveData) {
                return;
            }
            if (moveData.initType === "move") await EntryPoint.makeMove(moveData);
        });  
      
      </script>
   </body>
</html>
`;

const onGameMessage = (moveData) => {
  if (moveData === "initialized") {
    State.update({ firstLoad: false });
    return;
  }
  Social.set({
    [widgetKey]: {
      [state.roomId]: { ...moveData },
    },
  });
};

let whosTurn = "";
if (!lastMoveData.opponentColor) {
  whosTurn = "blue";
} else {
  whosTurn = lastMoveData.opponentColor;
}

const isGameOver = state.sn.toLowerCase().split("k").length - 1 != 2;

if (!lastMoveData) {
  return <h1>Loading...</h1>;
}

return (
  <>
    <h2>You are playing against {opponentAccountId}</h2>
    <h2>
      {!isGameOver
        ? whosTurn == userColor
          ? "Your turn"
          : "Opponent's turn"
        : "Game over"}
    </h2>
    <button class="btn btn-danger" onClick={props.exitCallback}>
      Exit
    </button>
    <iframe
      srcDoc={iframeHtml}
      message={
        !lastMoveData.numberOfMoves
          ? JSON.stringify({
              initType: "init",
              additional: {
                userColor: userColor,
                opponentColor: opponentColor,
              },
              numberOfMoves: 0,
              currentPlayer: "blue",
              sn: state.sn,
            })
          : state.firstLoad
          ? JSON.stringify({
              initType: "init",
              ...lastMoveData,
              additional: {
                userColor: userColor,
                opponentColor: opponentColor,
              },
            })
          : lastMoveData.userColor === userColor
          ? JSON.stringify(null)
          : JSON.stringify({
              initType: "move",
              ...lastMoveData,
              additional: {
                userColor: lastMoveData.userColor,
                opponentColor: lastMoveData.opponentColor,
              },
            })
      }
      onMessage={onGameMessage}
      class="w-100 h-100"
      style={{ width: "100%", height: "700px" }}
    />
  </>
);
