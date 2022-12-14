const questions = Social.index("genie", "asked");
if (!questions?.length) {
  return <p>No Results</p>;
}

return (
  <div className="d-flex flex-column gap-3">
    {/*JSON.stringify(questions)*/}
    {questions.map((q) => (
      <div key={q.value}>
        {q.accountId} : {q.value} |{" "}
        {Social.get(`${q.accountId}/experimental/genie/questions/${q.value}`)}
      </div>
    ))}
  </div>
);
