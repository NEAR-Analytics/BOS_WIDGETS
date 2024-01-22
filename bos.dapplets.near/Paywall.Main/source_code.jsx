const { nearAccountId } = props;
const { authorId, id } = props.link;

if (!id) return <></>;

const userAccountId = context.accountId || nearAccountId
const MOCKED_ADDRESS = "ncownthflapqowieuryt.near" // ToDo: one needs account address to get content for context
const CONTRACT_ADDRESS = "v2.paywall.near";

State.update({
  content: Near.view(
      CONTRACT_ADDRESS,
      "get_content_by_post_for_account",
      {
        context_id: id,
        account_id: userAccountId || MOCKED_ADDRESS
      }
    )[0]
})

return (
  <>
    {state.content
      ? <Widget
          src="bos.dapplets.near/widget/Paywall.Content"
          props={{
            content: state.content,
            CONTRACT_ADDRESS,
            nearAccountId,
          }
        }/>
      : authorId === userAccountId
      ? <Widget
          src="bos.dapplets.near/widget/Paywall.Form"
          props={{ linkId: id, CONTRACT_ADDRESS }}
        />
      : <></>}
  </>
);
