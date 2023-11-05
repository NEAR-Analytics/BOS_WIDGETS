const user = "e8794e6edab6fbd5467dd00ecdf030817330f61e295b91271e3e64d2d46747c8";
const props = {
  motto: "The decentralized dashboard of your organisation 🔥",
  title: "Kryptosphere Accelerator",
  description:
    "AB.RAND is a platform enabling start-ups, DDAs or innovative departments to create a decentralized template in which the user interface is decentralized, thus resisting censorship. With this solution, using NEAR protocol's BOS, the user can see at a glance everything that's going on in the site.  ",
};
const cardStyles = {
  container: {
    display: "flex",
  },
  imageDiv: {
    display: "inline-block",
    width: 2500,
    height: 1500,
    marginRight: "10%",
    justifyContent: "space-between",
  },
  logo: {
    width: 2500,
    height: 1500,
  },
  buttonDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  information: {
    display: "flex",
    alignItems: "center",
  },
  presentation: {
    paddingLeft: "2%",
  },
};
const openLink = () => {
  // You can use window.open(url, target) to open a new tab or window
  // Replace 'https://www.example.com' with the URL you want to open
  window.open(
    "https://docs.google.com/document/d/1BR_e5_UiDXFBY32pwtOoWMCQro1Ru8aHkW1uwo1tYUk/edit?usp=sharing",
    "_blank"
  );
  console.log("THIS Is it");
};
return (
  <>
    <div style={cardStyles.container}>
      <div style={cardStyles.information}>
        <div style={cardStyles.logo}>
          <Widget
            src={`${user}/widget/ImageCard`}
            props={{
              img: {
                cid: "bafkreifjycweey5gepbr257cwmkw6z5zfxmf625bsp7q2dx6sm7ppkdura",
              },
            }}
          />
        </div>
        <div style={cardStyles.presentation}>
          <Widget src={`${user}/widget/PresentationCard`} props={props} />
        </div>

        <div>
          <a
            href={
              "https://docs.google.com/document/d/1BR_e5_UiDXFBY32pwtOoWMCQro1Ru8aHkW1uwo1tYUk/edit?usp=sharing"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <button type="button">Open Link in New Tab</button>
          </a>
        </div>
        <div>
          <Widget src={`${user}/widget/NewsletterCard`} />
          <div style={cardStyles.startupComposition}>
            <div>
              <h6 style={{ textAlign: "center" }}>Teams</h6>
              <div style={cardStyles.imageDiv}>
                <Widget
                  src={`${user}/widget/ImageCard`}
                  props={{
                    img: {
                      cid: "bafkreifhtbu7t6npsr22bfu5tyu7vixx77fgowaq2b2mqbajoszcb3tknm",
                    },
                  }}
                />
                <Widget
                  src={`${user}/widget/ImageCard`}
                  props={{
                    img: {
                      cid: "bafkreifjkjwykkodxrqe6hysemcjf3axikgi7l3cslajqphvqmm7fvowbi",
                    },
                  }}
                />
                <Widget
                  src={`${user}/widget/ImageCard`}
                  props={{
                    img: {
                      cid: "bafkreif6tk24iqi3ljv7imvh2nld43pbzul4ksoczu65g2yhgo7trfakhy",
                    },
                  }}
                />
              </div>
            </div>

            <div>
              <h6 style={{ textAlign: "center" }}>Advisor</h6>
              <div style={cardStyles.imageDiv}>
                <Widget src={`${user}/widget/ImageCard`} props={props} />
                <Widget src={`${user}/widget/ImageCard`} props={props} />
                <Widget src={`${user}/widget/ImageCard`} props={props} />
              </div>
            </div>

            <div>
              <h6 style={{ textAlign: "center" }}>Startups</h6>
              <div style={cardStyles.imageDiv}>
                <Widget src={`${user}/widget/ImageCard`} props={props} />
                <Widget src={`${user}/widget/ImageCard`} props={props} />
                <Widget src={`${user}/widget/ImageCard`} props={props} />
              </div>

              <div style={cardStyles.imageDiv}>
                <Widget src={`${user}/widget/ImageCard`} props={props} />
                <Widget src={`${user}/widget/ImageCard`} props={props} />
                <Widget src={`${user}/widget/ImageCard`} props={props} />
              </div>

              <div style={cardStyles.imageDiv}>
                <Widget src={`${user}/widget/ImageCard`} props={props} />
                <Widget src={`${user}/widget/ImageCard`} props={props} />
                <Widget src={`${user}/widget/ImageCard`} props={props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
