const name = props.name;
const slogan = props.slogan;

const Gradient = styled.div`
  {
  height: 250px;
  text-align: center;
  background: #121216;
  );

  font-family: Arial, sans-serif;
  }

  .text-primary-gradient {
  color: #53fdca;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(#FFF, #ADFF2F);
  -webkit-background-clip: text;
  background-clip: text;
  }

  .subtitle-above {
  font-size: 18px;
  letter-spacing: 1px;
  font-family: Courier, monospace;
  }

  .subtitle-below {
  font-size: 16px;
  }

  .slogan {
  font-weight: 600;
  font-size: 60px;
  }
`;
return (
  <>
    <Gradient className="d-flex flex-column justify-content-center">
      <h1 class="mb-3 text-white slogan">
        <span class="text-primary-gradient">Habilidash</span>
      </h1>
      <div class="subtitle-below text-white opacity-75">
        Reinventando las redes profesionales en la era blockchain.
      </div>
    </Gradient>

    <div class="row mt-4">
      <div class="col-6 col-lg-4">
        <Widget
          src="simplar.near/widget/HomePage.Card"
          props={{
            title: "Chat",
            text: "Join the general chat, interact with a community of developers",
            img: "https://docs.near.org/assets/images/protocol-b73c2a3ace3307226ee7eb2149ee432f.png",
          }}
        />
      </div>
      <div class="col-6 col-lg-4">
        <Widget
          src="simplar.near/widget/HomePage.Card"
          props={{
            title: "Support",
            text: "Ask questions, share knowledge, progress in the community",
            img: "https://docs.near.org/assets/images/nomicon-e9015216636f4e0d5b70f0164873047e.png",
          }}
        />
      </div>
      <div class="col-6 col-lg-4">
        <Widget
          src="simplar.near/widget/HomePage.Card"
          props={{
            title: "Learn",
            text: "Follow our interactive tutorial to improve your skills",
            img: "https://docs.near.org/assets/images/validate-ce6dff758aaccef6500fe717afe8b850.png",
          }}
        />
      </div>
    </div>

    <hr class="mt-2 mb-4 w-50 mx-auto" />

    <h5 class="text-center my-4"> External Resources </h5>

    <div class="row">
      <div class="col-6">
        <Widget
          src="simplar.near/widget/HomePage.Card"
          props={{
            title: "NEAR Documentation",
            text: "Learn how to build contracts and unleash the power of web 3.",
            img: "https://docs.near.org/assets/images/examples-3f16d5c47908efa06a53dac8ff8594da.png",
          }}
        />
      </div>
      <div class="col-6">
        <Widget
          src="simplar.near/widget/HomePage.Card"
          props={{
            title: "Awesome NEAR",
            text: "Learn how to build contracts and unleash the power of web 3.",
            img: "https://docs.near.org/assets/images/awesomenear-ff922bc30e8be30068f1b177940f2b4a.jpg",
          }}
        />
      </div>
    </div>
  </>
);
