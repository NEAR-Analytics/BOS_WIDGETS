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
  headerText: "Frequently Asked Questions",
  subHeaderText:
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

const FAQContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2.5rem;
  width: 100%;
  padding: 5rem 1rem;
  max-width: 96rem;
  margin-inline: auto;

  @media (min-width: ${bp.xl}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FAQContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 1.5rem;

  @media (min-width: ${bp.xl}) {
    text-align: left;
  }
`;

const FAQHeader = styled.h2`
  font-size: 1.875rem; // text-3xl
  color: black;
  font-weight: bold;

  &:not(.light *) {
    color: white;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 2.25rem; // lg:text-4xl
  }
`;
const FAQSubHeader = styled.p`
  font-size: 0.875rem;
  color: #4b5563;

  &:not(.light *) {
    color: #d1d5db;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 1rem;
  }
`;

const FAQIcon = styled.div`
  display: none;
  aspect-ratio: 16 / 9;
  width: 100%;
  max-width: 24rem;
  place-items: center;
  border-radius: 1.5rem;
  background-color: ${({ style }) => style?.accent};

  @media (min-width: ${bp.xl}) {
    display: grid;
  }
`;

const FAQqna = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem; // gap-8
  border-radius: 1.5rem; // rounded-3xl
  background-color: ${({ accent }) => accent + 12};
  padding: 3.5rem; // p-14

  &:not(.light *) {
    background-color: ${({ accent }) => accent + 12};
  }
`;

const FAQquestion = styled.h3`
  font-size: 0.875rem; // text-sm
  color: black;
  font-weight: 600; // font-semibold
  line-height: 1.625;

  &:not(.light *) {
    color: white;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 1rem; // lg:text-base
  }
`;
const FAQanswer = styled.p`
  font-size: 0.75rem; // text-xs
  color: #4b5563; // text-gray-800
  font-weight: 500; // font-medium
  line-height: 1.625;

  &:not(.light *) {
    color: #e5e7eb; // dark:text-gray-200
  }

  @media (min-width: ${bp.lg}) {
    font-size: 0.875rem; // lg:text-sm
    font-weight: 400; // lg:font-normal
  }
`;

return (
  <FAQWrapper id={id} style={style}>
    <FAQContainer>
      <FAQContent>
        <FAQHeader>{props?.headerText}</FAQHeader>
        <FAQSubHeader>{props?.subHeaderText}</FAQSubHeader>
        <FAQIcon style={style}>
          <svg
            style={{ width: "8rem", fill: "white" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z" />
          </svg>
        </FAQIcon>
      </FAQContent>
      <FAQqna accent={style?.accent}>
        {props?.qna?.map((item, index) => (
          <div key={index}>
            <FAQquestion>{item.question}</FAQquestion>
            <FAQanswer>{item.answer}</FAQanswer>
          </div>
        ))}
      </FAQqna>
    </FAQContainer>
  </FAQWrapper>
);
