const style = props.style || {
  paddingTop: 0,
  paddingLeft: 0,
  paddingBottom: 0,
  paddingRight: 0,
  marginTop: 0,
  marginLeft: 0,
  marginBottom: 0,
  marginRight: 0,
  accent: "#0d9488",
};
const props = props.props || {
  headerText: "Explore Our Bike Gallery",
  subHeaderText:
    "Browse through our collection of high-quality bikes available for sale",
  galleryImages: [
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
};

const bp = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
};

const GalleryWrapper = styled.div`
  padding: ${({ style }) =>
    `${style?.paddingTop || 0}px ${style?.paddingRight || 0}px ${
      style?.paddingBottom || 0
    }px ${style?.paddingLeft || 0}px`};
  margin: ${({ style }) =>
    `${style?.marginTop || 0}px ${style?.marginRight || 0}px ${
      style?.marginBottom || 0
    }px ${style?.marginLeft || 0}px`};
  background-color: white;
  &:not(.light *) {
    background-color: #080a11;
  }
`;

const GalleryContainer = styled.div`
  max-width: 96rem;
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  padding: 5rem 1rem;
  text-align: center;
  flex-direction: ${({ style }) => style?.flexDirection || "column"};

  @media (max-width: ${bp.lg}) {
    flex-direction: column !important;
  }
`;

const GalleryHeader = styled.h2`
  font-size: 1.875rem;
  color: black;
  font-weight: bold;
  margin-bottom: 1.5rem;

  &:not(.light *) {
    color: white;
  }

  @media (min-width: ${bp.xl}) {
    font-size: 3rem;
  }
`;

const GallerySubHeader = styled.p`
  font-size: 0.875rem;
  color: #4b5563;

  &:not(.light *) {
    color: #d1d5db;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 1.125rem;
  }
`;

const GalleryImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  align-items: center;
  gap: 1.5rem;
  width: 100%;

  @media (min-width: ${bp.lg}) {
    grid-template-columns: repeat(2, 1fr);
    width: 50%;
  }
`;

return (
  <GalleryWrapper id={id} style={style}>
    <GalleryContainer>
      <div
        style={{
          width: "100%",
          maxWidth: "48rem",
        }}
      >
        <GalleryHeader>{props?.headerText}</GalleryHeader>
        <GallerySubHeader>{props?.subHeaderText}</GallerySubHeader>
      </div>
      <GalleryImageContainer>
        {props?.galleryImages?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="bike"
            style={{
              aspectRatio: "16 / 9",
              width: "100%",
              borderRadius: "0.375rem",
              objectFit: "cover",
              objectPosition: "center",
            }}
            loading="lazy"
          />
        ))}
      </GalleryImageContainer>
    </GalleryContainer>
  </GalleryWrapper>
);
