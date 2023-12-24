const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1em;
    @media screen and (max-width: 1200px){
      font-size: 2.5rem;
    }
    @media screen and (max-width: 900px){
      font-size: 2rem;
    }
    @media screen and (max-width: 540px){
      font-size: 1.5rem;
    }
`;
const OrgsSection = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  grid-gap: 4em;
  gap: 4em;
  padding: 3em 0px;
  &>.right{
    flex: 60% 1;
    max-width: 36em;
    &>.orgs-desc{
    margin-bottom: 2em;
    font-size: 1.5rem;
      @media screen and (max-width: 900px){
        font-size: 1.2rem;
      }
      @media screen and (max-width: 540px){
        font-size: 1rem;
      }
    }
    &>.orgs-link{
      display: inline-flex;
      align-items: center;
      justify-content: center;
      grid-gap: 1em;
      gap: 1em;
      text-decoration: none;
      color: unset;
      cursor: pointer;
    }
      @media screen and (max-width: 900px){
      max-width: 100%;
      text-align: center;
      margin-bottom: 3em;
      }
  }
  &>.left{
  display: grid;
  grid-template-columns: repeat(2,1fr);
  grid-gap: 2em;
  gap: 2em;
  & .org {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2.5em;
    background: #fff;
    border: 1px solid transparent;
    border-right-color: transparent;
    border-right-style: solid;
    border-right-width: 1px;
    border-right: 3px solid #e5e8eb;
    box-shadow: -26px -18px 30px -12px rgba(93,134,194,.1),26px 18px 18px rgba(93,134,194,.1);
    position: relative;
    transition: all .3s;
    cursor: pointer;
    width: 13em;
    height: 12.5em;
    &:hover{
      border: 3px solid #e5e8eb;
    }
    @media screen and (max-width: 540px){
      width: 8em;
      height: 7.5em;
      border-radius: .7em;
    }
  }
  & .Orgs_icon {
  position: absolute;
  width: 5em;
  -webkit-animation: Orgs_rotate__2EIfH 12s linear infinite;
  animation: Orgs_rotate__2EIfH 12s linear infinite;
  animation-delay: 0s;
  top: -2em;
  left: -2em;
  z-index: -1;
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
  @media screen and (max-width: 540px)
  width: 3.5em;
  }
  & .Orgs_logo{
    @media screen and (max-width: 540px){
      width: 4em;
    }
  }
  }
  }
  @media screen and (max-width: 900px){
  flex-direction: column;
  grid-gap: 2em;
  gap: 2em;
  }
  }
`;
const Accent = styled.span`
color: #9BB486;
`;
return (
  <>
    <OrgsSection>
      <div className="right">
        <H1>
          <span>Backed by</span>
          <Accent>NEAR's Best</Accent>
        </H1>
        <div className="orgs-desc">
          We are supported by the best in the NEAR Ecosystem
        </div>
        <a className="orgs-link" href="https://NEAReFi.org/partner">
          <div>Partner w/ Us</div>
          <img
            className="arrow"
            alt="arrow"
            width="10px"
            src="https://www.svgrepo.com/show/5465/right-arrow.svg"
            target="_blank"
            rel="noreferrer"
          />
        </a>
      </div>
      <div className="left">
        <a
          className="org"
          href="https://banyan.gg/"
          target="_blank"
          rel="noreferrer"
        >
          <img className="Orgs_logo" src="" alt="Banyan Collective" />
          <img
            className="Orgs_icon"
            src="https://www.genadrop.com/static/media/logo-celo-icon.d1fed266.png"
            alt=""
          />
        </a>
        <a
          className="org"
          href="https://near.foundation/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="Orgs_logo"
            src="data:image/png;base64,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"
            alt=""
          />
          <img
            className="Orgs_icon"
            src="https://www.genadrop.com/static/media/logo-near-icon.df006c52.png"
            alt=""
          />
        </a>
        <a
          className="org"
          href="https://www.minorityprogrammers.com/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="Orgs_logo"
            src="https://www.genadrop.com/static/media/logo-mp.73b4202c.png"
            alt="MPA"
          />
          <img
            className="Orgs_icon"
            src="https://www.genadrop.com/static/media/logo-polygon-icon.e75cb119.png"
            alt=""
          />
        </a>
        <a
          className="org"
          href="https://www.neardc.org/"
          target="_blank"
          rel="noreferrer"
        >
          <img className="Orgs_logo" src="" alt="NEAR Digital Collective" />
          <img
            className="Orgs_icon"
            src="https://pbs.twimg.com/profile_images/1622941553839816707/nmf3MWw1_400x400.jpg"
            alt="NEAR DC Logo"
          />
        </a>
      </div>
    </OrgsSection>
  </>
);
