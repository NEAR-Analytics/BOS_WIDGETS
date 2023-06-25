// const queryGPT3 = () => {
//   const res = fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "{Content-Type": "application/json",
//       "Authorization": "Bearer " + state.apiKey,
//     },
//     body: {
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: state.question }],
//       temperature: 0.0,
//     },
//   });
// console.log(res);
//   const data = res.json();
// console.log("data", data);
//   const a = data.choices[0].message.content;
//   const attestationRequest = { question: state.question, answer: a };
//   State.update({ answer: a, attestationRequestCID: ethers.utils.sha256(ethers.utils.toUtf8Bytes(JSON.stringify(attestationRequest))) });
// }

const queryGPT3 = () => {
  fetchGPTResponse().then((res) => {
console.log(res);
//     const data = res.body;
// console.log("data", data);
//     const a = data.choices[0].message.content;
//     const attestationRequest = { question: state.question, answer: a };
//     State.update({ answer: a, attestationRequestCID: ethers.utils.sha256(ethers.utils.toUtf8Bytes(JSON.stringify(attestationRequest))) });
});
};

const fetchGPTResponse = () => {
  return asyncFetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.apiKey,
    },
    body: {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: state.question }],
      temperature: 0.0,
    },
  });
};

console.log("KEY", state.apiKey);
console.log("quesion", state.question);
return (<div>
  <input type="password" placeholder="LLM API KEY" onChange={(e) => State.update({ apiKey: e.target.value })} />
  <textarea
    onChange={(e) => State.update({ question: e.target.value })}
    placeholder="Enter your query"
    rows="10"
    cols="50"></textarea>
  <button onClick={queryGPT3}>Query GPT-3.5</button>
  <div>{state.answer}</div>
  <div>{state.attestationRequestCID}</div>
</div>);