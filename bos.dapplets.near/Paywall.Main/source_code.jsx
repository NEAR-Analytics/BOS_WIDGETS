const { nearAccountId } = props;
const { authorId, linkId } = props.link;

if (!linkId) return <></>;

const userAccountId = context.accountId || nearAccountId

const CONTRACT_ADDRESS = "v2.paywall.near";

// function getContentById() {
  // const S3_STORAGE_URL =
  //   "https://miscellaneous.s3-website.fr-par.scw.cloud/web3hackfest-2023";

  // const contents = [
  //   {
  //     id: "f43ce7bdc6a26d1ab2582c1e6a4ebbd1",
  //     link: S3_STORAGE_URL + "/MrConCreator/0001.png",
  //     author: "mock.dapplets.mear",
  //     cost: "200000000000000000000000",
  //     context_id: "1694994895662977529"
  //   },
  //   {
  //     id: "f43ce7bdc6a26d1ab2582c1e6a4ebbd2",
  //     link: S3_STORAGE_URL + "/MrConCreator/0002.png",
  //     author: "mock.dapplets.mear",
  //     cost: "200000000000000000000000",
  //     context_id: "1694995203663290832"
  //   },
  //   {
  //     id: "f43ce7bdc6a26d1ab2582c1e6a4ebbd3",
  //     link: S3_STORAGE_URL + "/MrConCreator/0003.png",
  //     author: "mock.dapplets.mear",
  //     cost: "200000000000000000000000",
  //     context_id: "1694995269547438149"
  //   },
  //   {
  //     id: "f43ce7bdc6a26d1ab2582c1e6a4ebbd4",
  //     link: S3_STORAGE_URL + "/MrConCreator/0004.png",
  //     author: "mock.dapplets.mear",
  //     cost: "200000000000000000000000",
  //     context_id: "1694995303642939408"
  //   },
  // ];

  // return contents.find((x) => x.id === linkId);
// }

// const isPurchased = () => userAccountId
//   ? Near.view(
//       CONTRACT_ADDRESS,
//       "purchased",
//       {
//         account_id: userAccountId,
//         content_id: linkId
//       },
//       "final",
//       true
//     )
//   : false;

const setContent = () => {
  // const content = getContentById()
  // return content ? { content, is_purchased: isPurchased() } : null
  const content = userAccountId
    ? Near.view(
        CONTRACT_ADDRESS,
        "get_content_by_post_for_account",
        {
          context_id: linkId,
          account_id: userAccountId
        }
      )
    : []
  console.log(content[0])
  State.update({
    content: content[0]
  })
}

setContent()

return (
  <>
    {state.content
      ? <Widget src="bos.dapplets.near/widget/Paywall.Content" props={{ content: state.content, CONTRACT_ADDRESS, nearAccountId }}/>
      : <Widget src="bos.dapplets.near/widget/Paywall.Form" props={{ linkId, CONTRACT_ADDRESS }}/>}
  </>
);
