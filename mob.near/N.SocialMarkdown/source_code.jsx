const [mentions, setMentions] = useState({});

const makeRenderMention = (mentions) => (accountId) => {
  if (accountId in mentions) {
    return mentions[accountId];
  }
  const mention = (
    <span
      key={accountId}
      className="d-inline-flex"
      style={{ color: "var(--bs-link-color)" }}
    >
      <Widget
        key="w"
        loading={<div>{accountId.toLowerCase()}</div>}
        src="mob.near/widget/N.ProfileLine"
        props={{
          accountId: accountId.toLowerCase(),
          fast: true,
          hideAccountId: true,
          tooltip: true,
          gray: true,
          hideCheckmark: true,
          onRender: (res) => {
            setMentions((mentions) => {
              mentions[accountId] = (
                <span
                  key={accountId}
                  className="d-inline-flex"
                  style={{ color: "var(--bs-link-color)" }}
                >
                  {res}
                </span>
              );
              return mentions;
            });
          },
        }}
      />
    </span>
  );
  mentions[accountId] = mention;
  setMentions(mentions);
  return mention;
};

const [localRenderMention, setLocalRenderMention] = useState(() =>
  makeRenderMention(mentions)
);

useEffect(() => {
  setLocalRenderMention(() => makeRenderMention(mentions));
}, [mentions]);

const renderMention =
  props.renderMention ?? props.onMention ?? localRenderMention;

const onHashtag = props.onHashtag;

const Wrapper = styled.div`
  word-break: break-word;
  p {
    white-space: pre-line;
  }
  > :last-child {
    margin-bottom: 0 !important;
  }
`;

return (
  <Wrapper>
    <Markdown
      text={props.text}
      onMention={renderMention}
      onHashtag={onHashtag}
    />
  </Wrapper>
);
