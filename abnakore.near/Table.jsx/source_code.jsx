const [checked, setChecked] = useState([1]);

function tuggle(e) {
  // console.log(checked.includes(e.target.id));
  setChecked((prev) =>
    prev.includes(e.target.id)
      ? prev.filter((i) => i !== e.target.id)
      : prev.concat(e.target.id)
  );
  // setChecked(prev => prev.concat([e.target.id]))

  // setChecked(!checked);
}

return (
  <table>
    <thead>
      <tr>
        // {props.select ? <th></th> : null}
        {props.headings.map((head) => (
          <th key={head}>{head}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {props.data.map((cand) => (
        <tr key={cand[0]}>
          {cand.map((d) => (
            <td key={d}>{d}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

// {props.select?
//     <div className="chekbox">
//         <input checked={checked.includes(cand[0])} type="checkbox" id="cbx" className="hidden-xs-up" />
//         <label onClick={tuggle} for="cbx" data-id={cand[0]} id={cand[0]} className="cbx"></label>
//     </div>
// :null}
