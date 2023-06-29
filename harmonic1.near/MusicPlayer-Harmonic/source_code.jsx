const accountId = props.accountId || context.accountId;
const marketId = "simple.market.mintbase1.near";
const AFFILIATE_ACCOUNT = props.affiliateAccount || "jass.near";

const data = fetch("https://graph.mintbase.xyz", {
  method: "POST",
  headers: {
    "mb-api-key": "omni-site",
    "Content-Type": "application/json",
    "x-hasura-role": "anonymous",
  },
  body: JSON.stringify({
    query: `
     query MyQuery {
  mb_views_active_listings(
    order_by: {}
    where: {nft_contract_id: {_eq: "daorecords.mintbase1.near"}}
    distinct_on: metadata_id
  ) {
    listed_by
    created_at
    price
    nft_contract_id
    token_id
    metadata_id
    title
    reference_blob(path: "animation_url")
  }
}
`,
  }),
});

//CSS
const styles = {
  container: {
    display: "flex",
    overflowY: "auto", // add this
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "",
    height: "100%",
  },
  playerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "",
    justifyContent: "center",
    margin: "1rem",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
  songListContainer: {
    width: "24rem",
    height: "24rem",
    overflowY: "auto",
    backgroundColor: "#f0f0f0",
    borderRadius: "0.5rem",
    padding: "1rem",
  },
  heading: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "1.5rem",
  },
};

// Initialize state
let songs = data.body.data.mb_views_active_listings.filter(
  (listing) => listing.reference_blob !== "https://near.social/null"
);
State.init({
  currentSongIndex: 0,
});

let audioElem = new Audio();

// Call this when you want to play the current song
function playCurrentSong() {
  audioElem.src = songs[state.currentSongIndex].reference_blob;
  audioElem.play();
}

// Call this when you want to pause the current song
function pauseCurrentSong() {
  audioElem.pause();
}

// Call this when you want to play the next song
function playNextSong() {
  // Update the current song index
  let nextSongIndex = (state.currentSongIndex + 1) % songs.length;
  State.update({
    currentSongIndex: nextSongIndex,
  });
}

// Call this when you want to play the previous song
function playPreviousSong() {
  // Calculate the previous song index
  let previousSongIndex =
    (state.currentSongIndex - 1 + songs.length) % songs.length;
  State.update({
    currentSongIndex: previousSongIndex,
  });
}

// Call this when you want to select a specific song
function selectSong(index) {
  State.update({
    currentSongIndex: index,
  });
}

return (
  <>
    <h1 style={styles.heading}>Decentralised Music Streaming</h1>

    <div style={styles.container}>
      <div style={styles.playerContainer}>
        <Widget
          src="mob.near/widget/NftImage"
          props={{
            nft: {
              tokenId: songs[state.currentSongIndex].token_id,
              contractId: songs[state.currentSongIndex].nft_contract_id,
            },
            style: {
              width: 300,
              height: 300,
              objectFit: "cover",
              minWidth: size,
              minHeight: size,
              maxWidth: size,
              maxHeight: size,
              overflowWrap: "break-word",
            },
            thumbnail: "thumbnail",
            //className: "w-64 h-64 object-cover shadow-lg",
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry",
          }}
        />
        <div style={styles.buttonContainer}>
          <button
            style={{
              backgroundColor: "black",
              color: "white",
              marginRight: "10px",
            }}
            onClick={playPreviousSong}
          >
            Previous
          </button>
          <button
            style={{
              backgroundColor: "black",
              color: "white",
              marginRight: "10px",
            }}
            onClick={pauseCurrentSong}
          >
            Pause
          </button>
          <button
            style={{
              backgroundColor: "black",
              color: "white",
              marginRight: "10px",
            }}
            onClick={playCurrentSong}
          >
            Play
          </button>
          <button
            style={{
              backgroundColor: "black",
              color: "white",
              marginRight: "10px",
            }}
            onClick={playNextSong}
          >
            Next
          </button>
        </div>
      </div>
      <div style={styles.songListContainer}>
        <h2 className="text-2xl font-bold">Songs list:</h2>
        {songs.map((song, i) => (
          <div
            className={`cursor-pointer p-2 rounded-lg hover:bg-blue-200 ${
              state.currentSongIndex === i ? "bg-blue-300" : ""
            }`}
            key={song.token_id}
            onClick={() => selectSong(i)}
          >
            {song.title}
          </div>
        ))}
      </div>
    </div>
  </>
);
