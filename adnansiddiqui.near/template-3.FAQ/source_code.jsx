const style = props.style || {
  flexDirection: "column",
  paddingTop: 0,
  paddingLeft: 0,
  paddingBottom: 0,
  paddingRight: 0,
  marginTop: 0,
  marginLeft: 0,
  marginBottom: 0,
  marginRight: 0,
  accent: "#94cc67",
};
const props = props.props || {
  headerText: "Frequently Asked Questions",
  subHeaderTextarea:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  qna: [
    {
      question: "Do you offer test rides for the bikes?",
      answer:
        "Yes, we offer test rides for all our bikes to ensure you find the perfect fit.",
    },
    {
      question: "What is the warranty period for your products?",
      answer:
        "Our products come with a 1-year warranty from the date of purchase.",
    },
    {
      question: "Can I return a product if I'm not satisfied?",
      answer:
        "Yes, we have a 30-day return policy for all our products. Please refer to our return policy for more details.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping usually takes 3-5 business days within the country. International shipping may take longer.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers.",
    },
  ],
};

const bp = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
};

const FAQWrapper = styled.div`
  background-color: white;
  &:not(.light *) {
    background-color: #080a11;
  }
  padding: ${({ style }) =>
    `${style?.paddingTop || 0}px ${style?.paddingRight || 0}px ${
      style?.paddingBottom || 0
    }px ${style?.paddingLeft || 0}px`};
  margin: ${({ style }) =>
    `${style?.marginTop || 0}px ${style?.marginRight || 0}px ${
      style?.marginBottom || 0
    }px ${style?.marginLeft || 0}px`};
`;

const FAQContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 1.5rem;

  @media (min-width: ${bp.lg}) {
    text-align: left;
  }
`;

const FAQHeader = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  color: black;
  font-weight: 700;

  &:not(.light *) {
    color: white;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 2.25rem;
  }
`;
const FAQSubHeader = styled.p`
  font-size: 0.875rem;
  text-align: center;
  color: #4b5563;

  &:not(.light *) {
    color: #d1d5db;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 1rem;
  }
`;

const FAQItemContainer = styled.div`
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding-bottom: 1rem;

  &:hover {
    color: black;
  }

  &:not(.light *) {
    border-bottom-color: rgba(255, 255, 255, 0.3);
    color: rgba(255, 255, 255, 0.7);

    &:hover {
      color: white;
    }
  }
`;

const FAQItemQuestion = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: black;
  line-height: 1.625;

  &:not(.light *) {
    color: white;
  }
`;
const FAQItemAnswer = styled.p`
  transition-property: all;
  transition-duration: 150ms;
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-top: 0.25rem;
  color: rgb(31 41 55);
  font-weight: 500;
  line-height: 1.625;

  &:not(.light *) {
    color: rgb(255 255 255 / 0.7);
  }

  ${({ expand }) =>
    expand === 1
      ? `
    opacity: 1;
    height: fit-content;
  `
      : `
    opacity: 0;
    height: 0;
    `}
`;

const FAQExpandIconPlus = styled.svg`
  width: 1rem;
  height: 1rem;
  fill: black;
  &:not(.light *) {
    fill: white;
  }

  transform: rotate(180deg);
`;
const FAQExpandIconMinus = styled.svg`
  width: 1rem;
  height: 1rem;
  fill: black;
  &:not(.light *) {
    fill: white;
  }

  transform: rotate(180deg);
`;
function FAQItem({ question, answer }) {
  const [expand, setExpand] = useState(0);

  return (
    <FAQItemContainer onClick={() => setExpand((e) => (e === 0 ? 1 : 0))}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <FAQItemQuestion>{question}</FAQItemQuestion>
        {expand ? (
          <FAQExpandIconMinus
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
          </FAQExpandIconMinus>
        ) : (
          <FAQExpandIconPlus
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </FAQExpandIconPlus>
        )}
      </div>
      <FAQItemAnswer expand={expand}>{answer}</FAQItemAnswer>
    </FAQItemContainer>
  );
}

  return (
    <FAQWrapper id={id} style={style}>
      <div
        style={{
          maxWidth: "96rem",
          marginInline: "auto",
          padding: "5rem 1rem",
          display: "grid",
          gap: "2.5rem",
          gridTemplateColumns: "1fr",
          placeItems: "center",
          width: "100%",
        }}
      >
        <FAQContent>
          <FAQHeader>{props?.headerText}</FAQHeader>
          <FAQSubHeader>{props?.subHeaderTextarea}</FAQSubHeader>
        </FAQContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            borderRadius: "0.125rem",
            width: "100%",
            maxWidth: "80rem",
            paddingBlock: "3.5rem",
          }}
        >
          {props?.qna?.map((item, index) => (
            <FAQItem
              key={index}
              question={item?.question}
              answer={item?.answer}
            />
          ))}
        </div>
      </div>
    </FAQWrapper>
  );


