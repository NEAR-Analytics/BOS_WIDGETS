const content = props.content;
const raw = !!props.raw;

return content ? (
  <div className="overflow-hidden">
    {content.text &&
      (raw ? (
        <pre style={{ whiteSpace: "pre-wrap" }}>{content.text}</pre>
      ) : (
        <div className="text-break">
          <Widget
            loading={
              <div
                className="w-100 placeholder-glow"
                style={{ minHeight: "100px" }}
              />
            }
            src="mob.near/widget/N.SocialMarkdown"
            props={{
              text: content.text,
              onHashtag: (hashtag) => (
                <span
                  key={hashtag}
                  className="d-inline-flex"
                  style={{ color: "var(--bs-link-color)" }}
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
        <div className="w-100 rounded-3 text-center mt-2">
          <Widget
            loading={<div className="img-fluid rounded-3 placeholder-glow" />}
            src="mob.near/widget/Image"
            props={{
              image: content.image,
              className: "img-fluid rounded-3",
              style: { maxHeight: "40em" },
            }}
          />
        </div>
      ))}
  </div>
) : (
  <div className="w-100 overflow-hidden" style={{ minHeight: "100px" }} />
);
