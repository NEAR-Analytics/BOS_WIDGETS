const renderMention =
  props.renderMention ??
  props.onMention ??
  ((accountId) => (
    <span
      key={accountId}
      className="d-inline-flex"
      style={{ color: "var(--bs-link-color)" }}
    >
      <Widget
        src="mob.near/widget/N.ProfileLine"
        props={{
          accountId: accountId.toLowerCase(),
          hideAccountId: true,
          tooltip: true,
        }}
      />
    </span>
  ));

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
