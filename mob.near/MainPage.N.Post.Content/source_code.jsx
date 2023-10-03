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

  .lightbox {
    img {
      width: 100vw;
      height: 100vh;
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  .img-wrapper {
    width: 100%;
    border-radius: 0.5em;
    text-align: center;
    margin-top: 0.5rem;
    overflow: hidden;
    height: 20em;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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

let image = "";
if (content.image) {
  const innerImage = (
    <div className="h-100">
      <Widget
        key="img-widget"
        loading={<div className="img-fluid rounded-3 placeholder" />}
        src="mob.near/widget/Image"
        props={{
          image: content.image,
          className: "rounded-3",
          style: {},
        }}
      />
    </div>
  );
  image = (
    <>
      <div
        key="c-img"
        className="img-wrapper"
        onClick={() => setShowLightbox(true)}
      >
        {innerImage}
      </div>
      <Widget
        key="img-lightbox"
        src="mob.near/widget/N.Lightbox"
        loading=""
        props={{
          show: showLightbox,
          onHide: () => {
            setShowLightbox(false);
          },
          children: innerImage,
        }}
      />
    </>
  );
}

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
      <div className="expand-post">
        <div>
          <a className="stretched-link" onClick={() => setTruncated(false)}>
            Show more
          </a>
        </div>
      </div>
    </div>
    {image}
  </Wrapper>
);
