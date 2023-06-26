console.log("loading!");

const content = props.content;
// const content = JSON.parse(
//   `{"type":"md","text":"NEAR Regional Community DAO Council Member Self Nomination Process:n1. I'm Jerome Frank (Jeromemrys), \\n"}`
// );

const raw = !!props.raw;
console.log({ raw, content });

return content ? (
  <>
    {content.text &&
      (raw ? (
        <pre style={{ whiteSpace: "pre-wrap" }}>{content.text}</pre>
      ) : (
        <span>{content.text}</span>
      ))}
    {content.image &&
      (raw ? (
        <div>
          <pre>{/*JSON.stringify(content.image, undefined, 2)*/}hey</pre>
        </div>
      ) : (
        <div className="w-100 rounded-3 text-center">
          another one
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: content.image,
              className: "img-fluid rounded-3",
              style: { maxHeight: "100vh" },
            }}
          />
        </div>
      ))}
  </>
) : (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);
