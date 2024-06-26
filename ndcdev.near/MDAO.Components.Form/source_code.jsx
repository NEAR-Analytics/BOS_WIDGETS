let { socialKey } = VM.require(`ndcdev.near/widget/MDAO.Config`);
const { form, formEls, setFormEls, handleChange } = props;

const TypeSection = styled.div`
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.3);
  text-align: center;
  margin-right: 100px;
  width: 100%;
  text-transform: uppercase;
  h4 {
    font-weight: 600;
    margin: 0;
  }
`;

const Form = styled.div`
  border-radius: 20px;
  background: white;
  padding: 3rem;

  label {
    font-size: 14px;
    margin-bottom: 5px;
  }

  .form-control.error {
    border: 1px solid red;
  }

  .title {
    b {
      font-weight: 600;
    }
    font-weight: 300;

    a {
      text-decoration: underline;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-beetween;
  gap: 2rem;
  padding-top: 2rem;

  @media screen and (max-width: 786px) {
    flex-direction: column;
    gap: 1rem;
    padding-top: 1rem;
  }
`;

const MobileForm = styled.div`
  @media screen and (max-width: 786px) {
    padding-bottom: 2rem;
  }
`;

const [preview, setPreview] = useState(false);

const PreviewButton = () => (
  <div
    style={{ width: "max-content" }}
    className="btn-primary"
    onClick={() => setPreview(!preview)}
  >
    Preview
    <i className="bi bi-eye" />
  </div>
);

const ProposalButton = () => (
  <CommitButton
    style={{ width: "max-content" }}
    className="btn btn-primary"
    disabled={form[formEls.type].some((el) => el.required && !formEls[el.name])}
    data={{
      index: {
        graph: JSON.stringify({
          key: socialKey,
          value: formEls,
        }),
      },
    }}
  >
    Create proposal
    <i className="bi bi-plus-lg" />
  </CommitButton>
);

return (
  <>
    {preview ? (
      <MobileForm>
        <Widget
          src="ndcdev.near/widget/MDAO.Components.Item"
          props={{
            item: formEls,
            index: 0,
            showMoreDefault: 0,
          }}
        />
        <ButtonContainer>
          <PreviewButton />
          <ProposalButton />
        </ButtonContainer>
      </MobileForm>
    ) : (
      <Form className="d-flex flex-column gap-3">
        <div
          onClick={() => {
            const newFormEl = formEls;
            newFormEl.type =
              formEls.type === "proposal" ? "report" : "proposal";
            setFormEls(newFormEl);
          }}
        >
          <p className="mb-2">Form type</p>
          <div className="d-flex gap-3 align-items-center">
            <Widget src={`ndcdev.near/widget/MDAO.Components.Switch`} />
            <TypeSection>
              <h4>{formEls.type}</h4>
            </TypeSection>
          </div>
        </div>

        {form[formEls.type].map((el) => (
          <div className="form-element">
            <label for={el.name}>
              {el.label}
              {el.min}
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
              <div className="d-flex flex-wrap">
                <Widget
                  src={`ndcdev.near/widget/MDAO.Components.MarkdownEditor`}
                  props={{
                    element: { ...el, value: formEls[el.name] ?? el.value },
                    handleChange,
                  }}
                />
              </div>
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
        <ButtonContainer>
          <PreviewButton />
          <ProposalButton />
        </ButtonContainer>
        <a
          className="d-flex gap-2"
          target="_blank"
          href="https://docs.google.com/document/d/110CqEddPa-99JwM8iCl_kKJxdXLH6IlVePwubO5A55o/edit#heading=h.qya6e5j9ka46"
        >
          <span>Near Digital Collective application form GUIDE</span>
          <i className="bi bi-box-arrow-up-right" />
        </a>
      </Form>
    )}
  </>
);
