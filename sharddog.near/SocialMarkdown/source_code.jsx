const renderMention =
  props.renderMention ??
  props.onMention ??
  ((accountId) => (
    <span key={accountId} className="d-inline-flex" style={{ fontWeight: 500 }}>
      <Widget
        src="mob.near/widget/ProfileLine"
        props={{
          accountId: accountId.toLowerCase(),
          hideAccountId: true,
          tooltip: true,
        }}
      />
    </span>
  ));

const onHashtag = props.onHashtag;
const onWidget = props.onWidget;

const Wrapper = styled.div`
  word-break: break-word;
  p {
    white-space: pre-line;
  }
`;

const renderWidget =
  props.renderWidget ??
  // URL pattern: scheme://authority/path?query#fragment
  (({ url, scheme, authority, path, query }) => {
    // widget URL now allows "bos" and "near" schemes
    if (url && ["bos", "near"].includes(scheme) && authority && path) {
      const location = authority + path;
      const segments = location.split("/");
      if (segments && segments.length >= 3) {
        const src = segments.slice(segments.length - 3).join("/");
        const props = {
          ...{ markdown: props.text },
          ...(query ?? {}),
        };
        return (
          <Embedded className="embedded-widget">
            <Widget key={url} src={src} props={props} />
          </Embedded>
        );
      }
    }
    // If not a valid widget URL, return the original URL
    return url;
  });

return (
  <Wrapper>
    <Markdown
      text={props.text}
      onMention={renderMention}
      onHashtag={onHashtag}
      onWidget={onWidget}
      onURL={renderWidget}
    />
  </Wrapper>
);
