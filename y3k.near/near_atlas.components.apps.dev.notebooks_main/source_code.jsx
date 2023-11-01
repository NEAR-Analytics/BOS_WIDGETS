const contract = "y3k.near";
const questions = Near.view(contract, "get_all_questions", {});

console.log(questions[0][1]);

return (
  <div className="container">
    {questions[0].map((question) =>
      question &&
      question.content &&
      question.description &&
      question.asker_id &&
      question.category &&
      question.answers &&
      question.timestamp ? (
        <div
          key={question.id}
          className="bg-gray-900 rounded-lg p-6 m-4 shadow-lg max-w-lg"
        >
          <h2 className="text-2xl mb-2 text-white">{question.content}</h2>

          <p className="text-gray-400 truncate ...">{question.description}</p>
          <button className="text-blue-500 hover:underline mt-2">
            Read more
          </button>

          <div className="mt-4 flex justify-between">
            <div>
              <span className="text-gray-500">
                Asked by: {question.asker_id}
              </span>
              <br />
              <span className="text-gray-500">
                Category: {question.category}
              </span>
            </div>
            <div>
              <span className="text-gray-500">
                Answers: {question.answers.length}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <span className="text-sm text-gray-600">
              {new Date(question.timestamp / 1000000).toLocaleString()}
            </span>
          </div>
        </div>
      ) : null
    )}
  </div>
);
