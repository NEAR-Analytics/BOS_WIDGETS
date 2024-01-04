const { faq, index } = props;

const [info, setInfo] = useState(null);

return (
  <div className="w-100 d-flex justify-content-between align-items-start">
    <div>
      <h4
        role="button"
        className="font"
        onClick={() => setInfo(info === index ? null : index)}
      >
        {faq.question}
      </h4>
      {info === index && <h5 className="mt-2">{faq.answer}</h5>}
    </div>
    <div role="button" onClick={() => setInfo(info === index ? null : index)}>
      {info === index ? (
        <i className="fs-1 bi bi-dash" />
      ) : (
        <i className="fs-1 bi bi-plus" />
      )}
    </div>
  </div>
);
