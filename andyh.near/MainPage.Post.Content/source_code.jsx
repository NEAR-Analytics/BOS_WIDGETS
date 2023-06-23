const content = props.content;
const raw = !!props.raw;
console.log({ raw, content });

/*
        <Widget
          src="andyh.near/widget/SocialMarkdown"
          props={{
            text: content.text,
            onHashtag: (hashtag) => (
              <span
                key={hashtag}
                className="d-inline-flex"
                style={{ fontWeight: 500 }}
              >
                <a href={`#/?hashtag=${hashtag}`}>#{hashtag}</a>
              </span>
            ),
          }}
        />
*/

return content ? (
  <>
    {content.text &&
      (raw ? (
        <pre style={{ whiteSpace: "pre-wrap" }}>{content.text}</pre>
      ) : (
        <span>text here</span>
      ))}
  </>
) : (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);
