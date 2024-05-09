const progress = Near.view(props.evaluator_contract, "get_progress", { account_id: "evaluator.near" });
const lessons = ["Deploy Hello Near", "Deploy Guestbook", "Handle Complex Input", "Cross Contract Calls - Basic"];

function Item({ lesson, isPassed }) {
  return (
    <div class={"col rounded p-4 border " + (isPassed ? "bg-success" : "bg-primary")} >
      <h5>{lesson}</h5>

      <div class="text-center">
        {isPassed ? <i class="bi bi-check-circle-fill"></i> : <a href="#" class="rounded bg-dark p-1 text-light">Go to Lessson</a>}
      </div>
    </div >
  );
}


console.log(progress)
return <>
  <h1>Progress</h1>
  <div class="row">
    {progress.map((p, i) => {
      return <Item lesson={lessons[i]} isPassed={p} />
    })}
  </div>
</>
