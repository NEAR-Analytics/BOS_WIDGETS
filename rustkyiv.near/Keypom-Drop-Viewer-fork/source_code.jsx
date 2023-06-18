const user = context.accountId;

if (!user) {
  return "Please Sign In!";
}

State.init({
  numDrops: 0,
  dropId: 0,
  keys: [],
  dropType: "",
  keypom_contract: "v2.keypom.near",
  sortOrder: "id-asc",
});

const sortByUsage = (keys) => {
  if (state.sortOrder === "not-used") {
    return keys.sort(
      (a, b) =>
        a.cur_key_use - a.remaining_uses - (b.cur_key_use - b.remaining_uses) ||
        a.key_id - b.key_id
    );
  } else if (state.sortOrder === "partly-used") {
    return keys.sort(
      (a, b) => a.remaining_uses - b.remaining_uses || a.key_id - b.key_id
    );
  } else if (state.sortOrder === "id-desc") {
    return keys.sort((a, b) => b.key_id - a.key_id);
  } else {
    return keys.sort((a, b) => a.key_id - b.key_id);
  }
};

const keypom_contract = "v2.keypom.near";

let num_drops = Near.view(state.keypom_contract, "get_drop_supply_for_owner", {
  account_id: user,
});

const my_drops = Near.view(state.keypom_contract, "get_drops_for_owner", {
  account_id: user,
  limit: num_drops,
});

const selectedDropIndex =
  my_drops.findIndex((el) => el.drop_id === state.dropId) < 0
    ? 0
    : my_drops.findIndex((el) => el.drop_id === state.dropId);

console.log("my_drops", my_drops);

const keysVec = Near.view(state.keypom_contract, "get_keys_for_drop", {
  drop_id: my_drops[selectedDropIndex].drop_id,
});

const sortedKeys = sortByUsage(keysVec);

let drop_type = "";

if (my_drops[selectedDropIndex].hasOwnProperty("simple")) {
  drop_type = "Simple Drop";
} else if (my_drops[selectedDropIndex].hasOwnProperty("nft")) {
  drop_type = "Non-Fungible Token Drop";
} else if (my_drops[selectedDropIndex].hasOwnProperty("ft")) {
  drop_type = "Fungible Token Drop";
} else if (my_drops[selectedDropIndex].hasOwnProperty("fc")) {
  drop_type = "Function Call Drop";
} else {
  drop_type = "Unknown";
}

State.update({
  numDrops: num_drops,
  dropId: my_drops[selectedDropIndex].drop_id,
  keys: sortedKeys,
  dropType: drop_type,
});

const handleDropChange = (e) => {
  console.log(e.target.value);
  State.update({
    dropId: e.target.value,
  });
};

let type = typeof my_drops[selectedDropIndex];

const tableStyle = {
  display: "table",
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0px",
  fontSize: "16px",
  textAlign: "center",
};
const thStyle = {
  width: "5%",
  textAlign: "center",
  lineHeight: "14px",
};

const changeSortType = (sortType) => {
  State.update({
    sortOrder: sortType,
  });
};

if (!state.keys) {
  return (
    <>
      <div class="container border border-info p-3">
        <h4 class="text-center"> Drops from {user} </h4>
        <div class="text-center">
          <button class="btn btn-primary mt-2" onClick={onPrevClick}>
            Previous
          </button>
          <button class="btn btn-primary mt-2" onClick={onNextClick}>
            Next
          </button>
        </div>
        <h3 class="text-center">Drop ID:</h3>
        <p class="text-center">
          {" "}
          {my_drops[my_drops.length - state.counter].drop_id}{" "}
        </p>
        <h3 class="text-center">Drop Type:</h3>
        <p class="text-center"> {state.dropType} </p>
        <h3 class="text-center">Keys:</h3>
      </div>
    </>
  );
} else {
  return (
    <>
      <div class="container border border-info p-3">
        <h4 class="text-center">Drops from {user}</h4>
        <div class="d-flex flex-column align-items-center">
          <select
            class="form-select"
            style={{
              maxWidth: "20vw",
              fontSize: "16px",
              backgroundColor: "#f7f7f7",
              borderColor: "#ccc",
              borderRadius: "4px",
              padding: "6px",
              cursor: "pointer",
            }}
            value={dropId}
            onChange={handleDropChange}
          >
            {my_drops.map((drop, index) => (
              <option key={index} value={drop.drop_id}>
                {drop.drop_id}
              </option>
            ))}
          </select>
        </div>
        <h3 class="text-center">Drop ID:</h3>
        <p class="text-center">{my_drops[selectedDropIndex].drop_id}</p>
        <h3 class="text-center">Drop Type:</h3>
        <p class="text-center">{state.dropType}</p>
        <h3 class="text-center">Public Keys:</h3>
        <div class="dropdown">
          <button
            class="btn btn-light dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ marginBottom: "16px" }}
          >
            Sort: {state.sortOrder}
          </button>
          <ul class="dropdown-menu px-2 shadow">
            <li
              class="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => changeSortType("id-asc")}
            >
              ID Ascending
            </li>
            <li
              class="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => changeSortType("id-desc")}
            >
              ID Descending
            </li>
            <li
              class="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => changeSortType("not-used")}
            >
              Not Used
            </li>
            <li
              class="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => changeSortType("partly-used")}
            >
              Partly Used
            </li>
          </ul>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Key ID</th>
              <th scope="col">Private Key</th>
              <th scope="col">Remaining Uses</th>
            </tr>
          </thead>
          <tbody>
            {state.keys.map((key) => (
              <tr key={key.key_id}>
                <td>{key.key_id}</td>
                <td>{key.pk}</td>
                <td>
                  {key.remaining_uses ===
                  key.cur_key_use + key.remaining_uses - 1 ? (
                    <span class="text-danger">Not Used</span>
                  ) : key.cur_key_use > 0 ? (
                    <span class="text-warning">Partly Used</span>
                  ) : (
                    <span class="text-success">Used</span>
                  )}
                  {key.remaining_uses}/
                  {key.cur_key_use + key.remaining_uses - 1}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
