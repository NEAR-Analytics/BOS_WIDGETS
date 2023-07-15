const Embedded = styled.span`
  white-space: normal;
`;

const renderMention =
  props.renderMention ??
  ((accountId) => (
    <Widget
      key={accountId}
      src={`mob.near/widget/Account.ProfileInline`}
      props={{
        accountId,
        hideAvatar: true,
      }}
    />
  ));

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
  <Markdown
    text={props.text}
    onMention={renderMention}
    onWidget={renderWidget}
  />
);
