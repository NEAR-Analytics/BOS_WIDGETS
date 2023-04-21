const ownerId = "contribut3.near";

const STEP_1 = "step1";
const STEP_2 = "step2";
const propsData = {
  step1: {
    nextButtonText: "Publish request",
    nextButtonIcon: "bi-send",
    progress: 100
  },
  step2: {
    nextButtonText: "Publish request",
    nextButtonIcon: "bi-send",
    progress: 100
  }
};

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  row-gap: 16px;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  background: #FFFFFF;
  border: 1px solid #ECEEF0;
  border-radius: 50px;
  padding: 8px 16px;
  gap: 8px;
  align-items: center;
`;

const NextButton = styled.button`
  color: #FFFFFF;
  background: #161615;
  border-radius: 50px;
  padding: 8px 16px;
  gap: 8px;
  align-items: center;
`;

const FormContainer = styled.div`
  justify-content: center;
  align-items: flex-start;
  padding: 32px 0px 24px;
  gap: 36px;
`;

State.init({
  step: STEP_1
});

const renderStepOne = () => {
  return (
    <Widget
      src={`${ownerId}/widget/CreateServiceRequest_Step1`}
      props={{}}
    />
  );
};

const renderStepTwo = () => {
  return (
    <Widget
      src={`${ownerId}/widget/CreateServiceRequest_Step2`}
      props={{}}
    />

  );
};
const renderForm = {
  step1: renderStepOne(),
  step2: renderStepTwo(),
}[state.step];


const onNextStepClick = () => {
  //   if (state.step == STEP_1) {
  //     State.update({ step: STEP_2, ...propsData.step2 })
  //   } else {
  //     // Call Publish request
  //   }
}

const onPublishRequestClick = () => {
  // Call Publish request
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 3em;
  padding-bottom: 3em;
`;

const Header = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 2em;
  line-height: 1.4em;
  text-align: center;
  color: #000000;
`;

const SubHeader = styled.h2`
  font-style: normal;
  font-weight: 400;
  font-size: 0.95em;
  line-height: 1.25em;
  text-align: center;
  color: #101828;
`;

const ProgressBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: .375em;
  width: 100%;
  height: .5em;
  padding: 0;
  margin: 0;

  div {
    flex-grow: 1;
    height: 100%;
    width: 50%;
    background: #00ec97;
  }

  &.half {
    div:last-child {
      background: #eceef0;
    }
  }
`;

return (
  <Container>
    {/*<ProgressBar className={state.step === "step1" ? "half" : ""}><div /><div /></ProgressBar>*/}
    <div>
      <Header>Create new contribution request</Header>
      <SubHeader>
        Use this form to post your business needs and match with reputable contributors and service providers with ease
      </SubHeader>
    </div>

    <FormContainer>
      {renderForm}
    </FormContainer>
    <Footer>
      <CancelButton>Cancel</CancelButton>
      <Widget src={`${ownerId}/widget/Buttons.Green`} props={{text: <>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.87464 10.1251L15.7496 2.25013M7.97033 10.3712L9.94141 15.4397C10.1151 15.8862 10.2019 16.1094 10.327 16.1746C10.4354 16.2311 10.5646 16.2312 10.6731 16.1748C10.7983 16.1098 10.8854 15.8866 11.0596 15.4403L16.0023 2.77453C16.1595 2.37164 16.2381 2.1702 16.1951 2.04148C16.1578 1.92969 16.0701 1.84197 15.9583 1.80462C15.8296 1.76162 15.6281 1.84023 15.2252 1.99746L2.55943 6.94021C2.11313 7.11438 1.88997 7.20146 1.82494 7.32664C1.76857 7.43516 1.76864 7.56434 1.82515 7.67279C1.89033 7.7979 2.11358 7.88472 2.56009 8.05836L7.62859 10.0294C7.71923 10.0647 7.76455 10.0823 7.80271 10.1095C7.83653 10.1337 7.86611 10.1632 7.89024 10.1971C7.91746 10.2352 7.93508 10.2805 7.97033 10.3712Z" stroke="#11181C" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
Publish request
      </>,
        onClick: () => {
          Near.call(
            ownerId,
            "add_request",
            {
              request: {
                project_id: AccountId,
                title: String,
                description: String,
                open: bool,
                request_type: RequestType,
                payment_type: PaymentType,
                tags: HashSet<String>,
                source: PaymentSource,
                #[serde(with = "crate::dec_serde::u64_dec_format")]
                deadline: Timestamp,
                budget: u128,
              }
            }
          )
        }
      }} />
      <NextButton onClick={onPublishRequestClick}>
        <i class={`bi ${propsData[state.step].nextButtonIcon}`}></i>{propsData[state.step].nextButtonText}
      </NextButton>
    </Footer>
  </Container>
);
