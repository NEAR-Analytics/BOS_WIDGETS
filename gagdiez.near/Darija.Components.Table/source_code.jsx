if (context.loading) return "Loading ...";

// const keys = ["a", "b", "c"];
// const elements = [{ a: "a1", b: "b1", c: "c1" }, { a: "a2", b: "b2", c: "c2" }];
// const editors = { a: { type: 'text' }, b: { type: "select", options: ['v1', 'v2'] }, c: { type: 'text' } };
// const onUpdate = (newElements) => console.log(newElements);
let { elements, keys, editors, onUpdate } = props;

if(!elements || !keys || !editors) return `Missing parameters ... ${elements} ${keys} ${editors}`;

let empty = {};
for (const k of keys) { empty[k] = editors[k] === 'text' ? '' : editors[k].options[0] }

const [internal, setInternal] = useState(elements)
const [hideInput, setHideInput] = useState(elements.map(() => true));
const [json, setJSON] = useState(false);

const change = (index, field, value) => {
  const newInternal = [...internal];
  newInternal[index][field] = value;
  setInternal(newInternal);
};

const remove = (index) => {
  const newInternal = [...internal];
  newInternal.splice(index, 1);

  const newHideInput = [...hideInput];
  newHideInput.splice(index, 1);

  setInternal(newInternal);
  setHideInput(newHideInput);
  onUpdate(newInternal);
};

const add = () => {
  // check for empty add
  const newInternal = [...internal, empty];
  setInternal(newInternal);
  setHideInput([...hideInput, false]);
};

const commit = () => {
  onUpdate(internal);
  setHideInput(internal.map(() => true));
};

const Select = ({ field, index, selected }) => {
  return <>
    <select class="form-select"
      onChange={(e) => change(index, field, e.target.value)}
    >
      {
        editors[field].options.map(opt => (
          <option value={opt} selected={opt === selected}>
            {opt}
          </option>
        ))
      }
    </select>
  </>
}

const generateEditor = (element, index, field) => {
  if (editors[field]['type'] === 'text') {
    return <input type='text' value={element[field]} onChange={(e) => change(index, field, e.target.value)} />
  }

  if (editors[field]['type'] === 'select') {
    return <Select field={field} index={index} selected={element[field]} />
  }
}

const json2Internal = (e) => {
  const parsed = JSON.parse(e.target.value);
  setInternal(parsed);
  setHideInput(parsed.map(() => true));
  onUpdate(parsed);
}

if(json){
  return <>
    <textarea height="300" onChange={e => json2Internal(e)}>{JSON.stringify(internal, null, 2)}</textarea>
    <button onClick={() => setJSON(!json)}>Close</button>
  </>
} 

return <>
  <table class="table table-hover">
    <thead class="table-light">
      <tr>
        <th scope="col" onClick={() => setJSON(!json)}>#</th>
        {keys.map(k => <th scope="col">{k}</th>)}
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      {
        internal.map((elem, index) =>
          <tr scope="row">
            <th class="col-1">{index + 1}</th>

            {keys.map((k) =>
              <td class="col-auto">
                {hideInput[index] && elem[k]}
                {!hideInput[index] && generateEditor(elem, index, k)}
              </td>
            )}
            <td class="col-2">
              <a className="me-1"
                onClick={() => {
                  setHideInput(
                    hideInput.map((elem, i) => (i === index ? !elem : elem))
                  );
                }}
              >
                {hideInput[index] ? '✏️' : <span onClick={commit}>✅</span>}
              </a>
              <a onClick={() => remove(index)}>🗑️</a>
            </td>
          </tr>
        )
      }
      <button class="btn btn-primary mx-auto my-2" onClick={add}>Add</button>
    </tbody>
  </table>
</>;