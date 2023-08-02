// const accountId = props.accountId;
// maybe add testing variable
// const blockHeight =
//   props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
// https://social.near.page/p/readylayerone.near/95080094
// https://social.near.page/p/readylayerone.near/95862539
const blockHeight = 97835986;
// const blockHeight = 95080094;
// const blockHeight = 95862539;
const accountId = "readylayerone.near";
const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/main`, blockHeight) ?? "null");
const subscribe = !!props.subscribe;
const raw = !!props.raw;
// const profile = props.profile || Social.get(`${accountId}/profile/**`, "final");

const notifyAccountId = accountId;
const item = {
  type: "social",
  path: `${accountId}/post/main`,
  blockHeight,
};
// const formatDate = (timestamp) => {
//   const date = new Date(timestamp);
//   const month = date.getMonth() + 1; // Months are zero-based, so we add 1
//   const day = date.getDate();
//   const year = date.getFullYear();
//   return `${month}/${day}/${year}`;
// };
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

const nftTitle = accountId + " " + formatDate;
State.init({
  receiver: accountId,
  toastMessage: "",
  showAlert: false,
  description: nftDescription,
  title: nftTitle.slice(0, 20),
  image,
  content,
  imageUrl: undefined,
  profile,
});

const hasImageInPost = state?.content?.image; // TO-DO change this to check if has image in post
const getImageUrl = () => {
  State.update({
    description: state?.content?.text,
    profile: Social.get(`${accountId}/profile/**`, "final"),
    content: JSON.parse(
      Social.get(`${accountId}/post/main`, blockHeight) ?? "null"
    ),
  });
  console.log(postDate);
  return state?.content?.image.ipfs_cid
    ? State.update({
        imageUrl: `https://ipfs.near.social/ipfs/${state?.content?.image.ipfs_cid}`,
      })
    : State.update({
        imageUrl: state?.content?.image.url,
      }) || fallbackUrl;
};

getImageUrl();
// console.log("content: ", state.content);
const link = `#/mob.near/widget/MainPage.Post.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

const nftMint = () => {
  if (!hasImageInPost) {
    return;
  }
  if (!accountId) {
    console.log("Please login"); // add share dogvwallet
    State.update({
      showAlert: true,
      toastMessage: "Please log in before continuing",
    });
    setTimeout(() => {
      State.update({
        showAlert: false,
      });
    }, 3000);
  } else if (!state.title) {
    console.log("Please Enter title");
    State.update({
      showAlert: true,
      toastMessage: "Please enter a title for the NFT",
    });

    setTimeout(() => {
      State.update({
        showAlert: false,
      });
    }, 3000);
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
      name: `${state.profile.name || accountId.split(".near")[0]}${postDate}`,
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
              title: `${
                state.profile.name || accountId.split(".near")[0]
              }${postDate}`,
              description: `${state.description.trim().slice(0, 140)}...`,
              //   media: `https://ipfs.io/ipfs/${state.imageCid}`,
              // media: `https://ipfs.io/ipfs/${state.image.cid}`,
              media: `${state.imageUrl}`,

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
    <div className="d-flex flex-row align-items-center">
      <div className="flex-grow-1 text-truncate">
        <a
          className="text-dark text-decoration-none text-truncate"
          href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
        >
          <Widget
            src="mob.near/widget/Profile.ShortInlineBlock"
            props={{ accountId, tooltip: true }}
          />
        </a>
      </div>
      <span className="text-nowrap text-muted">
        <small>
          {blockHeight === "now" ? (
            "now"
          ) : (
            <a className="text-muted" href={link}>
              <Widget src="mob.near/widget/TimeAgo" props={{ blockHeight }} />
            </a>
          )}
        </small>
        {blockHeight !== "now" && (
          <span>
            <a
              href="javascript:void"
              className="link-secondary ms-2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fs-6 bi bi-three-dots" />
            </a>
            <ul className="dropdown-menu">
              <li className="dropdown-item">
                <a
                  className="link-dark text-decoration-none"
                  href={`${link}&raw=true`}
                >
                  <i className="bi bi-filetype-raw" /> View raw markdown source
                </a>
              </li>
              {hasImageInPost && (
                <li className="dropdown-item">
                  <a
                    className="link-dark text-decoration-none"
                    onClick={nftMint}
                  >
                    <i className="bi bi-gift" /> Send This Post to Author as NFT
                  </a>
                </li>
              )}
              <li>
                <Widget
                  src="mob.near/widget/MainPage.Common.HideAccount"
                  props={{ accountId }}
                />
              </li>
              {props.flagItem && (
                <li>
                  <Widget
                    src="mob.near/widget/MainPage.Common.FlagContent"
                    props={{
                      item: props.flagItem,
                      label: `Flag ${postType} for moderation`,
                    }}
                  />
                </li>
              )}
            </ul>
          </span>
        )}
      </span>
    </div>
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
