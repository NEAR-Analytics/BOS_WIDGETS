const content = props.content;
const raw = !!props.raw;

return content ? (
  <>
    {content.text &&
      (raw ? (
        <pre style={{ whiteSpace: "pre-wrap" }}>{content.text}</pre>
      ) : (
        <div className="text-break">
          <Widget
            src="mob.near/widget/N.SocialMarkdown"
            props={{
              text: content.text,
              onHashtag: (hashtag) => (
                <span
                  key={hashtag}
                  className="d-inline-flex"
                  style={{ fontWeight: 500, color: "var(--bs-link-color)" }}
                >
                  <a href={`/?hashtag=${hashtag}`}>#{hashtag}</a>
                </span>
              ),
            }}
          />
        </div>
      ))}
    {content.image &&
      (raw ? (
        <div>
          <pre>{JSON.stringify(content.image, undefined, 2)}</pre>
        </div>
      ) : (
        <div className="w-100 rounded-3 text-center">
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: content.image,
              className: "img-fluid rounded-3",
              style: { maxHeight: "100vh" },
            }}
          />
        </div>
      ))}
  </>
) : (
  <div className="w-100" style={{ minHeight: "100px" }} />
);
