const content = props.content;
const raw = !!props.raw;

const [truncated, setTruncated] = useState(props.truncateContent ?? true);

const Wrapper = styled.div`
  overflow: hidden;
  .truncated-content {
    max-height: 30em;
    position: relative;

    .expand-post {
      position : absolute;
      z-index  : 1;
      top   : 27rem;
      left     : 0;
      background-image : linear-gradient(to bottom, 
                        rgba(255,255,255, 0), 
                        rgba(255,255,255, 1) 70%);
      width    : 100%;
      height   : 3rem;
      a {
        z-index: 2;
        position: absolute;
        cursor: pointer;
        bottom: 0;
      }
    }
  }

  .full-content {
    .expand-post {
      display: none;
    }
  }
`;

return (
  <Wrapper>
    <div className={truncated ? "truncated-content" : "full-content"}>
      {content ? (
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
                  loading={
                    <div className="img-fluid rounded-3 placeholder-glow" />
                  }
                  src="mob.near/widget/Image"
                  props={{
                    image: content.image,
                    className: "img-fluid rounded-3",
                    style: { maxHeight: "25em" },
                  }}
                />
              </div>
            ))}
        </div>
      ) : (
        <div className="w-100 overflow-hidden" style={{ minHeight: "100px" }} />
      )}
      <div className="expand-post">
        <a className="" onClick={() => setTruncated(false)}>
          Read more...
        </a>
      </div>
    </div>
  </Wrapper>
);
