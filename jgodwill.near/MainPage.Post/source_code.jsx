const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/main`, blockHeight) ?? "null");
const subscribe = !!props.subscribe;
const raw = !!props.raw;

const notifyAccountId = accountId;
const item = {
  type: "social",
  path: `${accountId}/post/main`,
  blockHeight,
};

State.init({
  receiver: accountId,
  sender: context.accountId,
  description: nftDescription,
  title,
  image,
  content,
  imageUrl: undefined,
  profile,
});

const res = fetch(`https://api.near.social/time?blockHeight=${blockHeight}`);
if (!res) {
  return "Loading";
}
if (!res.ok || res.body === "null") {
  return "unknown";
}

const timeMs = parseFloat(res.body);

const date = new Date(timeMs);
const postDate = `${date.toLocaleDateString([], {
  day: "numeric",
  month: "short",
  year: "numeric",
})}`;
// const formattedDate = formatDate(timeMs);
const nftDescription = state?.content.text ?? "BOS minting powered by GenaDrop";
console.log("post date", postDate);

const hasImageInPost = content?.image;
// console.log("content", content);

const link = `/mob.near/widget/MainPage.Post.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

const getData = () => {
  State.update({
    description: `${state?.content?.text.trim().slice(0, 140)}... 💖 from ${
      state.sender
    }`,
    title: `${state.profile.name || accountId.split(".near")[0]} ${postDate}`,
    profile: Social.get(`${accountId}/profile/**`, "final"),
    content: JSON.parse(
      Social.get(`${accountId}/post/main`, blockHeight) ?? "null"
    ),
  });
  return state?.content?.image.ipfs_cid
    ? State.update({
        imageUrl: `https://ipfs.near.social/ipfs/${state?.content?.image.ipfs_cid}`,
      })
    : State.update({
        imageUrl: state?.content?.image.url,
      }) || fallbackUrl;
};

getData();

const nftMint = () => {
  if (!hasImageInPost) {
    return;
  }
  if (!accountId) {
    console.log("Please login"); // add share dogvwallet
  } else if (!state.description) {
    State.update({
      showAlert: true,
      toastMessage: "Please enter a description for the NFT",
    });
    setTimeout(() => {
      State.update({
        showAlert: false,
      });
    }, 3000);
  } else {
    const metadata = {
      name: state.title,
      description: `${state.description.trim().slice(0, 140)}...`,
      properties: [],
      image: state.imageUrl,

      //   image: `ipfs://${state.image.ipfs_cid}`,
      //   image: `ipfs://${state.image.cid}`,
      //   image: `ipfs://${state.imageCid}`,
    };
    console.log("come", metadata);
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: metadata,
    }).then((res) => {
      console.log("GO ON SOUN", res);
      const cid = res.body.cid;
      const gas = 200000000000000;
      const deposit = 10000000000000000000000;
      Near.call([
        {
          contractName: "nft.genadrop.near",
          methodName: "nft_mint",
          args: {
            token_id: `${Date.now()}`,
            metadata: {
              title: state.title,
              description: state.description,
              //   media: `https://ipfs.io/ipfs/${state.imageCid}`,
              // media: `https://ipfs.io/ipfs/${state.image.cid}`,
              media: state.imageUrl,

              //   media: `https://ipfs.io/ipfs/${state.image.ipfs_cid}`,
              reference: `ipfs://${cid}`,
              //   reference: `ipfs://${state.cid}`,
            },
            receiver_id: accountId,
          },
          gas: gas,
          deposit: deposit,
        },
      ]);
    });
  }
};

return (
  <div className="border-bottom pt-3 pb-1">
    <Widget
      src="jgodwill.near/widget/MainPage.Post.Header"
      props={{
        accountId,
        hasImageInPost,
        blockHeight,
        nftMint,
        link,
        postType: "post",
        flagItem: item,
      }}
    />
    <div className="mt-3 text-break">
      <Widget
        src="mob.near/widget/MainPage.Post.Content"
        props={{ content, raw }}
      />
    </div>
    {blockHeight !== "now" && (
      <div className="mt-1 d-flex justify-content-between">
        <div className="me-4">
          <Widget
            src="mob.near/widget/CommentButton"
            props={{
              onClick: () =>
                !state.showReply && State.update({ showReply: true }),
            }}
          />
        </div>
        <div className="me-4">
          <Widget
            src="mob.near/widget/RepostButton"
            props={{
              notifyAccountId,
              item,
            }}
          />
        </div>
        <div className="me-4">
          <Widget
            src="mob.near/widget/LikeButton"
            props={{
              notifyAccountId,
              item,
            }}
          />
        </div>
        <div>
          <Widget
            src="mob.near/widget/MainPage.Post.ShareButton"
            props={{ accountId, blockHeight, postType: "post" }}
          />
        </div>
      </div>
    )}
    <div className="mt-3 ps-5">
      {state.showReply && (
        <div className="mb-2">
          <Widget
            src="mob.near/widget/MainPage.Comment.Compose"
            props={{
              notifyAccountId,
              item,
              onComment: () => State.update({ showReply: false }),
            }}
          />
        </div>
      )}
      <Widget
        src="mob.near/widget/MainPage.Comment.Feed"
        props={{
          item,
          highlightComment: props.highlightComment,
          limit: props.commentsLimit,
          subscribe,
          raw,
        }}
      />
    </div>
  </div>
);
