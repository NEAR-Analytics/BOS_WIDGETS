let { app, provider, assets, content, form } = VM.require(
  `rubycop.near/widget/mdao.config`,
);

assets = assets.home;
content = content.home;
form = form.createProposal;

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

const [formEls, setFormEls] = useState({});

const handleFileChange = (el, e) => {};

const handleChange = (el, e) => {
  setFormEls({ [el.name]: e.target.value });
};

console.log(formEls);

return (
  <Container>
    <div className="text-center mb-3">
      <h3>{form.title}</h3>
      <p>{form.desc}</p>

      {form.elements.map((el) => (
        <div className="form-element">
          <label for={el.name}>{el.label}</label>
          {el.type === "file" ? (
            <Widget
              src={`${provider}/widget/${app}.components.FileUploader`}
              props={{ state: setFormEls }}
            />
          ) : (
            <input
              type={el.type}
              name={el.name}
              value={el.value}
              onChange={(e) => handleChange(el, e)}
            />
          )}
        </div>
      ))}
    </div>
  </Container>
);
