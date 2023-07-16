const FormsectionAffiliation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  width: 100%;
  height: auto;
  flex: none;

  flex-grow: 0;
  @media only screen and (max-width: 480px) {
  }
`;
const H2 = styled.h1`
  height: 14px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  display: flex;
  align-items: center;
  color: #000000;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin-top: 25px;
`;
const AffiliationBody = styled.div`
  width: 100;
  margin-top: 16px;
`;
const Separator = styled.div`
  width: 100%;
  height: 2px;
  background-color: #d0d6d966;
  border: solid 0px transparent;
`;
const Section = styled.div`
  margin-bottom: 5px;
`;

const getCurrDate = () => {
  let year = new Date().getFullYear().toString();

  let month = new Date().getMonth();
  month = month < 10 ? "0" + (month + 1) : month + 1;

  let day = new Date().getDate();
  day = day < 10 ? "0" + day.toString() : day.toString();

  return year + "-" + month + "-" + day;
};

let currDate = getCurrDate();

const {
  affiliations,
  addFields,
  removeField,
  handleAFFCompanyName,
  handleAFFStartdate,
  handleAFFEnddate,
  handleAFFRole,
} = props;
// State

return (
  <FormsectionAffiliation>
    <div className="d-flex justify-content-between">
      <H2>{"Afiliations"}</H2>
      <Widget
        src={"rubycop.near/widget/NDC.StyledComponents"}
        props={{
          Button: {
            size: "sm",
            text: "Add More Affiliations",
            icon: <i className="bi bi-lg-plus" />,
            handleClick: addFields,
          },
        }}
      />
    </div>

    <AffiliationBody>
      {affiliations.map((form, index) => {
        return (
          <div className="bg-white rounded p-4">
            <div className=" col-sm-12 gap-1">
              <Widget
                src={"rubycop.near/widget/NDC.StyledComponents"}
                props={{
                  Input: {
                    label: "Organization Name",
                    placeholder: "Company Name",
                    value: form.company_name,
                    handleChange: (event) =>
                      handleAFFCompanyName({ index, event }),
                  },
                }}
              />
              <div className="d-flex">
                <Section className="w-100">
                  <Widget
                    src={"rubycop.near/widget/NDC.StyledComponents"}
                    props={{
                      Input: {
                        type: "date",
                        label: "Start date",
                        min: getCurrDate(),
                        value: form.start_date ?? getCurrDate(),
                        handleChange: (event) =>
                          handleAFFStartdate({ index, event }),
                      },
                    }}
                  />
                </Section>
                <div className="px-2" />
                <Section className="w-100">
                  <Widget
                    src={"rubycop.near/widget/NDC.StyledComponents"}
                    props={{
                      Input: {
                        type: "date",
                        label: "End date",
                        min: getCurrDate(),
                        value: form.end_date ?? getCurrDate(),
                        handleChange: (event) =>
                          handleAFFEnddate({ index, event }),
                      },
                    }}
                  />
                </Section>
              </div>

              <Section>
                <Widget
                  src={"rubycop.near/widget/NDC.StyledComponents"}
                  props={{
                    TextArea: {
                      label: "Role Description",
                      placeholder:
                        "Please describe your role at the organization",
                      value: form.role,
                      limit: 2000,
                      handleChange: (event) => handleAFFRole({ index, event }),
                    },
                  }}
                />
              </Section>

              <div className="flex justify-content-end my-2">
                <Widget
                  src={"rubycop.near/widget/NDC.StyledComponents"}
                  props={{
                    Button: {
                      size: "sm",
                      className: "danger",
                      text: "Delete Affiliation",
                      icon: <i className="bi bi-trash" />,
                      handleClick: () => removeField(index),
                    },
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </AffiliationBody>
  </FormsectionAffiliation>
);
