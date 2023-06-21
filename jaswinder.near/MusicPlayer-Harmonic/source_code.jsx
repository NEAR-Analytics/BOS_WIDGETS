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

return (
  <>
    <h1 className="text-xl font-bold text-center my-6">
      Decentralised Music Streaming
    </h1>
    <div className="flex flex-col items-center justify-center h-full space-y-6">
      <div className="text-2xl font-bold">
        Currently playing: {songs[state.currentSongIndex].title}
      </div>
      <p className="text-xl font-medium">
        (Note: Still working on some State management so you got to pause the
        current song before playing the next one.)
      </p>
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
          className: "w-64 h-64 object-cover shadow-lg",
          fallbackUrl:
            "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry",
        }}
      />
      <div className="mt-2 flex space-x-4">
        <button
          className="px-4 py-2 text-white bg-black rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          onClick={pauseCurrentSong}
        >
          Pause
        </button>
        <button
          className="px-4 py-2 text-white bg-black rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          onClick={playCurrentSong}
        >
          Play
        </button>
        <button
          className="px-4 py-2 text-white bg-black rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          onClick={playNextSong}
        >
          Next
        </button>
      </div>
    </div>
  </>
);
