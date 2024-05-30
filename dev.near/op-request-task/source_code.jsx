const {
  apiUrl,
  sessionId,
  problemId,
  annotations,
  pendingRequest,
  setPendingRequest,
  onRequest,
} = props;

if (typeof onRequest !== "function") {
  onRequest = (data) => console.log("onRequest", data);
}

if (typeof setPendingRequest !== "function") {
  setPendingRequest = (data) => console.log("setPendingRequest", data);
}

const requestTask = () => {
  if (!pendingRequest) {
    setPendingRequest(true);
    asyncFetch(`${apiUrl}/request_annotation/`, {
      method: "POST",
      body: JSON.stringify({
        account_id: context.accountId,
        session_id: sessionId,
        problem_id: problemId,
      }),
    }).then((res) => {
      if (res.ok) {
        onRequest(res.body);
      }
      console.log("request_annotation resp", res.ok, res.body);
      setPendingRequest(false);
    });
  }
};

return (
  <div
    class="h-100 d-flex justify-content-center align-items-center"
    align="center"
    style={{ minHeight: "400px" }}
  >
    <div>
      {(annotations ?? []).length == 0 && <p>No pending projects found.</p>}
      <button onClick={() => requestTask()}>Create new project</button>
    </div>
  </div>
);
