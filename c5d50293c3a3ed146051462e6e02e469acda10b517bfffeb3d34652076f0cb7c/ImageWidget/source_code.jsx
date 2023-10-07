const media = {
  tablet: "@media(min-width: 768px)",
};

const SectionHeroStyle = styled.div`
  border: 2px solid #0e6efd;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 266px;
  max-width: 266px;
  height: 266px;

  .hero-content {
    justify-content: center;

    ${media.tablet} {
      grid-template-columns: max-content max-content;
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
    }
  }
`;

const MobileData = ({ size, color, stroke, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-mobiledata"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    stroke-width={stroke}
    stroke={color}
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 12v-8" />
    <path d="M8 20v-8" />
    <path d="M13 7l3 -3l3 3" />
    <path d="M5 17l3 3l3 -3" />
  </svg>
);

const SingleIconStyle = styled.div`
  margin: 20px;
  color: #0e6efd;
`;

const Icon = ({ icon, ...props }) => {
  switch (icon) {
    case "data":
      return <MobileData {...props} />;
  }
};

const Hero = ({ title, description, icon }) => {
  return (
    <SectionHeroStyle>
      <div className="hero-content">
        <div className="hero-data">
          <SingleIconStyle>
            <Icon icon={icon} size={64} color={"currentColor"} stroke={2} />
          </SingleIconStyle>
          <h4>{title}</h4>
          <p className="hero-description">{description}</p>
        </div>
      </div>
    </SectionHeroStyle>
  );
};

return <Hero {...props} />;
