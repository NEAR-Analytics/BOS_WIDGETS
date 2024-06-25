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
  headerText: "Contact Us",
  subHeaderTextarea:
    "Feel free to reach out to us for any inquiries or assistance.",
  emailText: "hello@jutsu.ai",
  phoneText: "+1 234 567 890",
  addressText: "123 Main Street, New York, NY 10001",
};

const bp = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
};

const ContactWrapper = styled.div`
  background-color: ${({ style }) => style?.accent};
  padding: ${({ style }) =>
    `${style?.paddingTop || 0}px ${style?.paddingRight || 0}px ${
      style?.paddingBottom || 0
    }px ${style?.paddingLeft || 0}px`};
  margin: ${({ style }) =>
    `${style?.marginTop || 0}px ${style?.marginRight || 0}px ${
      style?.marginBottom || 0
    }px ${style?.marginLeft || 0}px`};
`;

const ContactHeader = styled.div`
  font-size: 1.875rem;
  font-weight: 600;

  color: white;

  @media (min-width: ${bp.md}) {
    font-size: 2.5rem;
  }
`;
const ContactSubHeader = styled.p`
  font-size: 0.875rem;
  color: #d1d5db;
`;

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  align-items: center;
  gap: 3rem;

  @media (min-width: ${bp.md}) {
    gap: 4rem;
  }
`;

const ContactSVG = styled.svg`
  width: 2rem;
  fill: white;
    margin-bottom: 0.5rem;
`;

const ContactTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;

  color: white;
`;

const ContactSubtitle = styled.p`
  font-size: 0.875rem;

  color: #d1d5db;
`;


  return (
    <ContactWrapper id={id} style={style}>
      <div
        style={{
          maxWidth: "96rem",
          marginInline: "auto",
          padding: "5rem 1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            marginBottom: "2rem",
            gap: "1rem",
          }}
        >
          <ContactHeader>{props?.headerText}</ContactHeader>
          <ContactSubHeader>{props?.subHeaderTextarea}</ContactSubHeader>
        </div>
        <ContactContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <ContactSVG
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
            </ContactSVG>
            <ContactTitle>Email</ContactTitle>
            <ContactSubtitle>
              For any service related queries, please contact our email.
            </ContactSubtitle>
            <ContactSubtitle>{props?.emailText}</ContactSubtitle>
          </div>
          <div className="flex flex-col items-start justify-center gap-4">
            <ContactSVG
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
            </ContactSVG>
            <ContactTitle>Phone</ContactTitle>
            <ContactSubtitle>
              For any service related queries, please contact us.
            </ContactSubtitle>
            <ContactSubtitle>{props?.phoneText}</ContactSubtitle>
          </div>
          <div className="flex flex-col items-start justify-center gap-4">
            <ContactSVG
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
            </ContactSVG>
            <ContactTitle>Office</ContactTitle>
            <ContactSubtitle>
              For any service related queries, please come to our office.
            </ContactSubtitle>
            <ContactSubtitle>{props?.addressText}</ContactSubtitle>
          </div>
        </ContactContainer>
      </div>
    </ContactWrapper>
  );

