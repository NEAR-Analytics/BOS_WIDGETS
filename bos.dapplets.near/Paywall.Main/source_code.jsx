const { nearAccountId } = props;
const { authorId, id } = props.link;

if (!id) return <></>;

const userAccountId = context.accountId || nearAccountId

const CONTRACT_ADDRESS = "v2.paywall.near";

const setContent = () => {
  const content = userAccountId
    ? Near.view(
        CONTRACT_ADDRESS,
        "get_content_by_post_for_account",
        {
          context_id: id,
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
      : <Widget src="bos.dapplets.near/widget/Paywall.Form" props={{ linkId: id, CONTRACT_ADDRESS }}/>}
  </>
);
