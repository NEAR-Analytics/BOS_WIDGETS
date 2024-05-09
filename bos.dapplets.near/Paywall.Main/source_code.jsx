const { nearAccountId } = props
const { authorId, id } = props.link

if (!id) return <></>

const userAccountId = context.accountId || nearAccountId
const CONTRACT_ADDRESS = "v2.paywall.near"

State.update({
  hasContent: Near.view(
      CONTRACT_ADDRESS,
      "has_content",
      { context_id: id },
      'final',
      true
    )
})

if (state.hasContent) {
  State.update({
    content: Near.view(
        CONTRACT_ADDRESS,
        "get_one",
        {
          context_id: id,
          account_id: userAccountId || ''
        },
        'final',
        true
      )
  })
}

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
)
