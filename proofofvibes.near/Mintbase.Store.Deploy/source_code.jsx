/**
 * Add error check for contract name
 *
 */
const mainnet = props.mainnet ?? true;
const contract_id = mainnet ? "mintbase1.near" : "mintspace2.testnet";
const func = "create_store";
const owner_id = context.accountId;

const base_uri = "https://arweave.net";
const reference = null;
const reference_hash = null;
const spec = "nft-1.0.0";
const name = props.name ?? null; // or change with state
const symbol_name = props.symbol_name ?? null;
const icon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEXUlEQVRYR8VXW4hVVRj+vrX3OYbFNBl2eSsoa8pkxMJmzpGGoIwMY0wwImuCXmKKkiikKayHQIpAwbdAswskBYqJSlANek7TUOPURGKCWdmFkJnsoZnhzNn/F2vcZ9gez2UfEVoP+2Gv///Xt771X4mUq6enpz2Kogck3S2pk+R1ki736iT/kfQzyW/N7PNsNrtvcHDwTBrTbCbU1dV1cxiGGyWtA3BJM/l4f1rSLjPbPDQ0dKyRTl0AS5YsubStre11AP0AwiYHi+SJmJGFCdmypG3T09MDIyMjk7Vs1ASQy+VuIrkbQEezG3vqJfXGTzHhnFtlZttIuoTuUQC9hULheLW98wDkcrnbARwkeWWzw+P9ewCsB/AYgBkz6yW5lmRfUl/SOMmVhUJhJPn/HAD+5gCKLRzubS0AMO59MTa828z2Oud2VF8gBtGdZGIOQPzmX6ehPWk4iqKOIAg+BnCr/y/pJUmnnHPv1WHw6NTU1B0Vn5gDkM/ntwB4NiXtc2KS9kdR1B+G4aMA/pD0kaQHGwDwILcUi8UNs37jPz7UgiD4PoW318Qn6QSA/STbJc2T9EkjAAB8dCwuFos/zgLI5/M7YydqlYBa8vvMbFcTAJ6FncVisY/5fP4KT10LSaYZyFQAAEyHYXitB+BD6N1mVlvYTwsAZraeuVxuR3XMNjpM0mFJW0n+VUfub0mnSS6S5JxznQBeBpDMkBXV7R7AKEkv1HRJGiLpvX0rgHYzGyB5S5yuZ/VJHioUCv25XO4Vn/0AHDCzD51z35DMViWnUf8EEwC8H6RZj5O8Py5M3pF+D4JghZn9lFDeB+AtAF9U/vmw9CBJ3lt1yIQHYIks1gzEapJPSlodJ53xcrncmclkTiUOOwRgM8n9iX8Pk/S+tqqKAWsZgJmddM6971kzs+f9W5P0VbOyZmZmZjyo5yStcc4djKJoE8kxkvNrAWjlCVZLugHAYefcpJmtIzkAIKii7ldJL5jZkTAMF0t6A8CNNeidaMkJAXjqNwLobvZWafYljbYahhcVAIDtrSaiiwpgNhGlSMVjAI5J8m3Xm3FILapD8UKSd9XwiVriZ1Ox36lXjCRtMLPPwjC8s1QqHRgeHv6tu7v7IefcNYkQG8tkMqPlcnmNrylm9q9z7lMAlzXyg7li5IXqlOOvADwN4EsAPoOdLpVKHdlsdm/SCUku8/UdwIo4NzxF8noALzYAcG45jlmobkjelnTc014xRPI+Sa8BWJ4w7lsyH8qVtUfSHpLv1ANwXkPiBWu0ZEeiKOoLgsAzMd+nXTNb7pz7geTsQBLfuIvkqwBWnu3I9ASAZSSfqQOgdkvmhaubUpKboij6IAiCpSSH/aAB4JEqw9+VSqXeTCZzm6Q/nXNXA/A94rxqAA2b0opwjbb8JADfzy8FcFWdW01K8kwtqFdZU7XlCRCpB5M0GQ9A+sGkYrDF0awejgsbzZLW/rfhtPpKTcbzM5J+uZDx/D8+0FUx/4DhyAAAAABJRU5ErkJggg==";
// Arguments: {
//   "owner_id": "bool.testnet",
//   "metadata": {
//     "spec": "nft-1.0.0",
//     "name": "bos",
//     "symbol": "bos",
//     "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEXUlEQVRYR8VXW4hVVRj+vrX3OYbFNBl2eSsoa8pkxMJmzpGGoIwMY0wwImuCXmKKkiikKayHQIpAwbdAswskBYqJSlANek7TUOPURGKCWdmFkJnsoZnhzNn/F2vcZ9gez2UfEVoP+2Gv///Xt771X4mUq6enpz2Kogck3S2pk+R1ki736iT/kfQzyW/N7PNsNrtvcHDwTBrTbCbU1dV1cxiGGyWtA3BJM/l4f1rSLjPbPDQ0dKyRTl0AS5YsubStre11AP0AwiYHi+SJmJGFCdmypG3T09MDIyMjk7Vs1ASQy+VuIrkbQEezG3vqJfXGTzHhnFtlZttIuoTuUQC9hULheLW98wDkcrnbARwkeWWzw+P9ewCsB/AYgBkz6yW5lmRfUl/SOMmVhUJhJPn/HAD+5gCKLRzubS0AMO59MTa828z2Oud2VF8gBtGdZGIOQPzmX6ehPWk4iqKOIAg+BnCr/y/pJUmnnHPv1WHw6NTU1B0Vn5gDkM/ntwB4NiXtc2KS9kdR1B+G4aMA/pD0kaQHGwDwILcUi8UNs37jPz7UgiD4PoW318Qn6QSA/STbJc2T9EkjAAB8dCwuFos/zgLI5/M7YydqlYBa8vvMbFcTAJ6FncVisY/5fP4KT10LSaYZyFQAAEyHYXitB+BD6N1mVlvYTwsAZraeuVxuR3XMNjpM0mFJW0n+VUfub0mnSS6S5JxznQBeBpDMkBXV7R7AKEkv1HRJGiLpvX0rgHYzGyB5S5yuZ/VJHioUCv25XO4Vn/0AHDCzD51z35DMViWnUf8EEwC8H6RZj5O8Py5M3pF+D4JghZn9lFDeB+AtAF9U/vmw9CBJ3lt1yIQHYIks1gzEapJPSlodJ53xcrncmclkTiUOOwRgM8n9iX8Pk/S+tqqKAWsZgJmddM6971kzs+f9W5P0VbOyZmZmZjyo5yStcc4djKJoE8kxkvNrAWjlCVZLugHAYefcpJmtIzkAIKii7ldJL5jZkTAMF0t6A8CNNeidaMkJAXjqNwLobvZWafYljbYahhcVAIDtrSaiiwpgNhGlSMVjAI5J8m3Xm3FILapD8UKSd9XwiVriZ1Ox36lXjCRtMLPPwjC8s1QqHRgeHv6tu7v7IefcNYkQG8tkMqPlcnmNrylm9q9z7lMAlzXyg7li5IXqlOOvADwN4EsAPoOdLpVKHdlsdm/SCUku8/UdwIo4NzxF8noALzYAcG45jlmobkjelnTc014xRPI+Sa8BWJ4w7lsyH8qVtUfSHpLv1ANwXkPiBWu0ZEeiKOoLgsAzMd+nXTNb7pz7geTsQBLfuIvkqwBWnu3I9ASAZSSfqQOgdkvmhaubUpKboij6IAiCpSSH/aAB4JEqw9+VSqXeTCZzm6Q/nXNXA/A94rxqAA2b0opwjbb8JADfzy8FcFWdW01K8kwtqFdZU7XlCRCpB5M0GQ9A+sGkYrDF0awejgsbzZLW/rfhtPpKTcbzM5J+uZDx/D8+0FUx/4DhyAAAAABJRU5ErkJggg==",
//     "base_uri": "https://arweave.net",
//     "reference": null,
//     "reference_hash": null
//   }
// }

initState({
  name: name,
  symbol_name: symbol_name,
  reference: reference,
  reference_hash: reference_hash,
});

const onChangeName = (name) => {
  State.update({
    name,
  });
};

const onChangeSymbol = (symbol_name) => {
  State.update({
    symbol_name,
  });
};

const deployStore = () => {
  if (!(state.symbol_name && state.name)) {
    console.log("You need a sybol and name to deploy a storefront on mintbase");
    return;
  }
  const gas = 200000000000000; // check if gas is correct
  const deposit = 3500000000000000000000000; // change to 6.5 N
  Near.call([
    {
      contractName: contract_id,
      methodName: func,
      args: {
        owner_id: owner_id,
        metadata: {
          spec: spec,
          name: state.name,
          symbol: state.symbol_name,
          icon,
          icon,
          base_uri: base_uri,
          reference: state.reference,
          reference_hash: state.reference_hash,
        },
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};
return (
  <>
    <div>
      <h1>Deploy Store on Mintbase</h1>
      <div>
        Contract Name*:
        <input type="text" onChange={(e) => onChangeName(e.target.value)} />
      </div>
      <div>
        Symbol* (max 3 letters):
        <input type="text" onChange={(e) => onChangeSymbol(e.target.value)} />
        <div>
          <button onClick={deployStore}>Deploy Store 3.5N</button>
        </div>
      </div>
    </div>
    <Widget src="mintbase.near/widget/PoweredByMintbase" />
  </>
);
