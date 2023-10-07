const media = {
  mobile: "@media(max-width: 768px)",
  tablet: "@media(min-width: 768px)",
};

const SectionHeroStyle = styled.div`
  margin-top: 2rem;

  .hero-container {
    ${media.tablet} {
      margin-inline: auto;
      max-width: 900px;
    }
  }

  .hero-content {
    justify-content: center;

    ${media.tablet} {
      grid-template-columns: max-content max-content;
      padding-top: 9rem;
    }

    .hero-image {
      justify-self: center;

      ${media.tablet} {
        order: 1;
      }

      img {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
      }
    }

    .hero-data {
      text-align: center;

      ${media.tablet} {
        text-align: initial;
      }

      .hero-title {
        font-size: 2rem;
        color: #0e6efd;
      }

      .hero-subtitle {
        font-size: 1.5rem;
        color: #555;
        font-weight: 500;
        margin-bottom: 0.75rem;
      }

      .hero-description {
        font-size: 1rem;
        margin-bottom: 2rem;
      }

      .hero-button {
        display: inline-block;
        color: #fff;
        background-color: #3498db;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 8px rgba(52, 152, 219, 0.25);
        transition: background-color 0.5s;

        &:hover {
          background-color: #2980b9;
        }
      }
    }
  }
`;

const Hero = () => {
  return (
    <SectionHeroStyle>
      <div className="hero-container row container">
        <div className="row hero-content">
          <div className="hero-data">
            <h1 className="hero-title">
              Hi, it's{" "}
              <span style={{ color: "var(--first-color)" }}>Packet</span>
            </h1>
            <h3 className="hero-subtitle">Decentralized Mobile Data Storage</h3>
            <p className="hero-description">
              Exchange your mobile data cross-carrier seamlessly.
            </p>
            <Web3Connect connectLabel="Connect with wallet" />
          </div>
        </div>
      </div>
    </SectionHeroStyle>
  );
};

return <Hero />;
