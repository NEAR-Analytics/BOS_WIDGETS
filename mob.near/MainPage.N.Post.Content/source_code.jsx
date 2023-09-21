const content = props.content;

const [truncated, setTruncated] = useState(props.truncateContent ?? true);

const Wrapper = styled.div`
  overflow: hidden;
  .truncated-content {
    max-height: 23em;
    position: relative;

    .expand-post {
      position : absolute;
      z-index  : 1;
      top   : 20em;
      left     : 0;
      background-image : linear-gradient(to bottom, 
                        rgba(255,255,255, 0), 
                        rgba(255,255,255, 1) 50%);
      width    : 100%;
      height   : 3em;
      > div {
        position: relative;
        width: 100%;
        height: 100%;
        veritcal-align: bottom;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        cursor: pointer;
        > a {
          margin-bottom: 0.2em;
        }
      }
    }
  }

  .full-content {
    .expand-post {
      display: none;
    }
  }
`;

const [onHashtag] = useState(() => (hashtag) => (
  <span
    key={hashtag}
    className="d-inline-flex"
    style={{ color: "var(--bs-link-color)" }}
  >
    <a href={`/?hashtag=${hashtag}`}>#{hashtag}</a>
  </span>
));

return (
  <Wrapper>
    <div className={truncated ? "truncated-content" : "full-content"}>
      <div key="text" className="text-break">
        <Widget
          key="content"
          loading={
            <div
              className="w-100 placeholder-glow"
              style={{ minHeight: "100px" }}
            />
          }
          src="mob.near/widget/N.SocialMarkdown"
          props={{
            text: content.text,
            onHashtag,
          }}
        />
      </div>
      {content.image && (
        <div key="c-img" className="w-100 rounded-3 text-center mt-2">
          <Widget
            key="img-widget"
            loading={<div className="img-fluid rounded-3 placeholder-glow" />}
            src="mob.near/widget/Image"
            props={{
              image: content.image,
              className: "img-fluid rounded-3",
              style: { maxHeight: "40em" },
            }}
          />
        </div>
      )}
      <div className="expand-post">
        <div>
          <a className="stretched-link" onClick={() => setTruncated(false)}>
            Read more...
          </a>
        </div>
      </div>
    </div>
  </Wrapper>
);
