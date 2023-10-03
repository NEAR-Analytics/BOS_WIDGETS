const content = props.content;

const [truncated, setTruncated] = useState(props.truncateContent ?? true);

const Wrapper = styled.div`
  overflow: hidden;
  .truncated-content {
    max-height: 18em;
    position: relative;
    overflow: hidden;

    .expand-post {
      position : absolute;
      z-index  : 1;
      top   : 15em;
      left     : 0;
      background-image : linear-gradient(to bottom, 
                        rgba(255,255,255, 0), 
                        rgba(255,255,255, 1) 25%);
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
          margin: 0 0 0.7em 0.7em;
        }
      }
    }

    @media(max-width: 991px) {
      max-height: 23em;
      .expand-post {
        top: 20em;
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

const [showLightbox, setShowLightbox] = useState(false);

const [onImage] = useState(() => (props) => (
  <Widget
    key="content-img"
    src="mob.near/widget/MainPage.N.Post.Content.Image"
    loading=""
    props={{
      image: {
        url: props.src,
      },
      alt: props.alt ?? "inline image",
    }}
  />
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
            onImage,
          }}
        />
      </div>
      <div className="expand-post">
        <div>
          <a className="stretched-link" onClick={() => setTruncated(false)}>
            Show more
          </a>
        </div>
      </div>
    </div>
    {content.image && (
      <Widget
        key="content-img"
        src="mob.near/widget/MainPage.N.Post.Content.Image"
        loading=""
        props={{ image: content.image, alt: "attached image" }}
      />
    )}
  </Wrapper>
);
