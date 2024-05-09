const accountId = props.accountId || context.accountId;
const autoPlay = props.autoPlay || false;

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

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: #F8F8F8;
  border-color: #F5F5F5;
  border-radius: 0.5rem;
  //border: 1px solid, // Add a black border
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), // Add a shadow effect;

  @media (max-width: 400px) {
    /* Set styles for smaller screens */
    display: flex;
    flex-direction: column;
    background: white;
  }
`;

//CSS
const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    //justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    borderRadius: "0.5rem",
  },
  // innerContainer: {
  //   display: "flex",
  //   flexDirection: "row",
  //   backgroundColor: "#F8F8F8",
  //   borderColor: "#F5F5F5",
  //   borderRadius: "0.5rem",
  //   //border: "1px solid", // Add a black border
  //   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Add a shadow effect
  // },
  playerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "",
    padding: "1rem",
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
    padding: "1rem",
  },
  heading: {
    textAlign: "center",
    fontWeight: "bold",
    margin: "1.5rem",
  },
  song: {
    cursor: "pointer",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    marginBottom: "0.5rem",
  },
  selectedSong: {
    backgroundColor: "#60A5FA",
  },
};

// Initialize state
let songs = data.body.data.mb_views_active_listings.filter(
  (listing) => listing.reference_blob !== "https://near.social/null"
);

State.init({
  currentSongIndex: 0,
  autoPlay: autoPlay,
});

const currentSong = songs[state.currentSongIndex].reference_blob;
const audioElem = new Audio(currentSong);

function playSong() {
  audioElem.play();
}

if (state.autoPlay) {
  playSong();
}

// Call this when you want to play the current song
function playCurrentSong() {
  audioElem.play();
}

// Call this when you want to pause the current song
function pauseCurrentSong() {
  audioElem.pause();
}

// Call this when you want to play the next song
function playNextSong() {
  audioElem.pause();
  // Update the current song index
  let nextSongIndex = (state.currentSongIndex + 1) % songs.length;
  State.update({
    currentSongIndex: nextSongIndex,
    autoPlay: true,
  });
}

// Call this when you want to play the previous song
function playPreviousSong() {
  audioElem.pause();
  // Calculate the previous song index
  let previousSongIndex =
    (state.currentSongIndex - 1 + songs.length) % songs.length;
  State.update({
    currentSongIndex: previousSongIndex,
    autoPlay: true,
  });
}

// Call this when you want to select a specific song
function selectSong(index) {
  State.update({
    currentSongIndex: index,
  });
}
return (
  <div
    className="container py-3"
    style={{ height: "100%", width: "100%", backgroundColor: "#fff" }}
  >
    <div className="row">
      <div className="col-lg-6">
        <Widget
          src="mob.near/widget/NftImage"
          props={{
            nft: {
              tokenId: songs[state.currentSongIndex].token_id,
              contractId: songs[state.currentSongIndex].nft_contract_id,
            },
            style: {
              width: "100%",
              height: "auto",
              objectFit: "cover",
            },
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry",
          }}
        />
        <div className="d-flex justify-content-center my-3">
          <button className="btn btn-primary mx-2" onClick={playPreviousSong}>
            Previous
          </button>
          <button className="btn btn-secondary mx-2" onClick={pauseCurrentSong}>
            Pause
          </button>
          <button className="btn btn-success mx-2" onClick={playCurrentSong}>
            Play
          </button>
          <button className="btn btn-primary mx-2" onClick={playNextSong}>
            Next
          </button>
        </div>
      </div>

      <div className="col-lg-6">
        <div
          className="overflow-auto"
          style={{
            width: "24rem",
            height: "24rem",
            overflowY: "auto",
            padding: "1rem",
          }}
        >
          {" "}
          <h3 className="font-weight-bold text-center my-3">Songs</h3>
          {songs.map((song, i) => (
            <Widget
              key={i}
              src="efiz.near/widget/MusicPlayer-Harmonic.Track"
              props={{
                styles,
                selected: state.currentSongIndex === i,
                selectSong: () => selectSong(i),
                song,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);
