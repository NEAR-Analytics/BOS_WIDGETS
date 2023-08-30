const partnersList = [
  {
    website: "https://www.herdrop.com/",
    imageSrc: "/static/media/herdao.18aa16e7.png",
  },
  {
    website: "https://proofofvibes.vercel.app/",
    imageSrc: "/static/media/proofofvibes.3ec1baec.svg",
  },
  {
    website: "https://www.bluntdao.com/",
    imageSrc: "/static/media/bluntdao.6154b86b.svg",
  },
  {
    website: "https://www.onboarddao.com/",
    imageSrc: "/static/media/onboarddao.3a02aa23.svg",
  },
  {
    website: "https://www.herdrop.com/",
    imageSrc: "/static/media/herdao.18aa16e7.png",
  },
  {
    website: "https://app.proofofvibes.com/",
    imageSrc: "/static/media/proofofvibes.3ec1baec.svg",
  },
  {
    website: "https://www.bluntdao.com/",
    imageSrc: "/static/media/bluntdao.6154b86b.svg",
  },
  {
    website: "http://twitter.com/AuroraNftClub/",
    imageSrc: "/static/media/auroranft.d651860a.png",
  },
  {
    website: "https://www.onboarddao.com/",
    imageSrc: "/static/media/onboarddao.3a02aa23.svg",
  },
];

const displayedPartnersList = partnersList.map((partner, index) => (
  <li
    className="splide__slide splide__slide--clone"
    id={`splide01-clone${index + 1 > 9 ? index + 1 : "0" + index + 1}`}
    role="group"
    aria-roledescription="slide"
    aria-label={`${index + 1} of ${partnersList.length}`}
    style={{ marginRight: "2rem" }}
    aria-hidden="true"
  >
    <div>
      <a
        href={partner.website}
        target="_blank"
        rel="noreferrer"
        className="MediaBar_slide__1kp_U"
        tabindex="-1"
      >
        <img
          src={`https://www.genadrop.io${partner.imageSrc}`}
          alt={partner.website}
        />
      </a>
    </div>
  </li>
));
const Partners = styled.div`
    .Partners_wrapper {
  width: 100%;
}
.Partners_container * {
  transition: max-width .3s;
}
.splide.is-initialized, .splide.is-rendered {
  visibility: visible;
}
.splide__list {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  margin: 0 !important;
  padding: 0 !important;
}
.splide__list {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  margin: 0 !important;
  padding: 0 !important;
}
li{
    list-style: none;
}
`;
return (
  <Partners>
    <div className="Partners_wrapper">
      <div
        className="splide is-initialized splide--loop splide--ltr splide--draggable is-active"
        extensions="[object Object]"
        id="splide01"
        role="region"
        aria-roledescription="carousel"
      >
        <div
          className="splide__track splide__track--loop splide__track--ltr splide__track--draggable"
          id="splide01-track"
          style={{ paddingLeft: "0px", paddingRight: "0px" }}
          aria-live="off"
          aria-relevant="additions"
        >
          <ul
            className="splide__list"
            id="splide01-list"
            role="presentation"
            style={{ transform: "translateX(-2278.27px)" }}
          >
            {displayedPartnersList}
          </ul>
        </div>
      </div>
    </div>
  </Partners>
);
