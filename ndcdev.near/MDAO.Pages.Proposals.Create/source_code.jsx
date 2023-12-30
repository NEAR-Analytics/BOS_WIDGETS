let { assets, content } = VM.require(`/ndcdev.near/widget/MDAO.Config`);

assets = assets.home;
content = content.home;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: max-content;
  overflow: hidden;

  h3 {
    font-size: 2rem;
    font-weight: 400;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 300;
  }
`;

const FormWrapper = styled.div`
  width: 75%;
  padding: 3rem;

  @media screen and (max-width: 786px) {
    width: 100%;
    padding: 1rem;
  }

  label {
    font-size: 14px;
    margin-bottom: 5px;
  }

  .form-control.error {
    border: 1px solid red;
  }
`;

const form = {
  report: [
    {
      name: "project_name",
      label: "Project Name",
      value: "",
      type: "text",
      required: true,
    },
    {
      name: "contact",
      label: "Main contact (near.social or Telegram)",
      value: "",
      type: "text",
      required: true,
    },
    {
      name: "metric:audience",
      label:
        "Audience Metric: how many people did your project reach during this funding period?",
      value: "",
      type: "number",
      required: true,
    },
    {
      name: "metric:growth",
      label:
        "Growth Metric: how does this month's audience reach compare to previous periods (provide a %)",
      value: "",
      type: "number",
      required: true,
    },
    {
      name: "metric:average_engagement_rate",
      label:
        "Average Engagement Rate: what is the average engagement rate on your project's primary platform (choose one)? Use the formula (Total Likes, Shares & Comments / Total Followers) X 100 = AER %",
      value: "",
      type: "number",
      required: true,
    },
    {
      name: "performance_statement:answer_1",
      label:
        "Performance Statement: What is the biggest win (most improved part of project) during this funding period vs. the previous one (if applicable)?",
      value: "",
      type: "textarea",
      required: true,
    },
    {
      name: "performance_statement:answer_2",
      label:
        "Performance statement: What is the biggest challenge your project is facing? What did not improve during this funding period?",
      value: "",
      type: "textarea",
      required: true,
    },
    {
      name: "attachments",
      label: "Include any attachment(s)",
      value: "",
      type: "file",
    },
  ],
  proposal: [
    {
      name: "project_name",
      label: "Project Name",
      value: "",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      value: "# Title\n## Description",
      type: "textarea",
      required: true,
    },
    {
      name: "requested_amount",
      label: "Requested Amount (NEAR)",
      value: "",
      type: "number",
      required: true,
    },
    {
      name: "tag",
      label: "Tags",
      value: "",
      type: "tag",
    },
  ],
};

const [formEls, setFormEls] = useState({
  accountId: context.accountId,
  type: "proposal",
});

const [errors, setErrors] = useState({});

const handleChange = (el, value) => {
  const newFormEl = formEls;
  const newFormElErrors = errors;
  newFormEl[el.name] = value;
  newFormElErrors[el.name] = value.length < 1;

  setErrors(newFormElErrors);
  setFormEls(newFormEl);
};

const ProposalButton = () => (
  <CommitButton
    disabled={form[formEls.type].some(
      (el) =>
        el.required &&
        (errors[el.name] === true || errors[el.name] === undefined)
    )}
    data={{
      index: {
        graph: JSON.stringify({
          key: "ndc.mdao",
          value: formEls,
        }),
      },
    }}
  >
    Create proposal
  </CommitButton>
);

return (
  <Container>
    <div className="d-flex justify-content-center">
      <FormWrapper className="my-5 d-flex flex-column gap-3">
        <div className="d-flex flex-column align-items-center">
          <h3>Marketing DAO Report Form</h3>
          <div className="text-center">
            <p>
              <b>Please use this form to report key performance metrics.</b>
            </p>
            <p>
              Questions? Reach out via{" "}
              <a href="https://t.me/ndc_marketing">Telegram</a> or email: <br />
              <a href="mailto:marketingdao@proton.me">marketingdao@proton.me</a>
              🙂
            </p>
          </div>
        </div>

        <div
          onClick={() => {
            const newFormEl = formEls;
            newFormEl.type =
              formEls.type === "proposal" ? "report" : "proposal";
            setFormEls(newFormEl);
          }}
        >
          <label>Form type: {formEls.type}</label>
          <Widget src={`ndcdev.near/widget/MDAO.Components.Switch`} />
        </div>

        {form[formEls.type].map((el) => (
          <div className="form-element">
            <label for={el.name}>
              {el.label}
              {el.required && "*"}
            </label>
            {el.type === "file" ? (
              <Widget
                src={`ndcdev.near/widget/MDAO.Components.FileUploader`}
                props={{
                  onChange: (fileUrl) => handleChange(el, fileUrl),
                }}
              />
            ) : el.type === "textarea" ? (
              <Widget
                src={`ndcdev.near/widget/MDAO.Components.MarkdownEditor`}
                props={{ element: el, handleChange }}
              />
            ) : el.type === "tag" ? (
              <Widget
                src={"sayalot.near/widget/TagsEditor"}
                props={{
                  label: "Tags",
                  placeholder: "Enter tags",
                  setTagsObject: (tags) => handleChange(el, Object.keys(tags)),
                }}
              />
            ) : (
              <input
                class={`form-control ${error[el.name] && "error"}`}
                type={el.type}
                name={el.name}
                value={formEls[el.name] ?? ""}
                onChange={(e) => handleChange(el, e.target.value)}
              />
            )}
          </div>
        ))}
        <ProposalButton />
      </FormWrapper>
    </div>
  </Container>
);
