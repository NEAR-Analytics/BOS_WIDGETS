State.init({
  accountId: "v2.ref-finance.near",
  data: [],
});

const QUERYAPI_ENDPOINT = `https://near-queryapi.dev.api.pagoda.co/v1/graphql`;

const query = `query MyQuery {
    nearpavel_near_bitmap_v1_actions_index(
      where: {receiver_id: {_eq: "${state.accountId}"}}
    ) {
      block_date
      receiver_id
      bitmap
      first_block_height
    }
  }`;
function fetchGraphQL(operationsDoc, operationName, variables) {
  return asyncFetch(QUERYAPI_ENDPOINT, {
    method: "POST",
    headers: { "x-hasura-role": `nearpavel_near` },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });
}

fetchGraphQL(query, "MyQuery", {}).then((result) => {
  if (result.status === 200) {
    if (result.body.data) {
      const data = result.body.data.nearpavel_near_bitmap_v1_actions_index;
      State.update({ data });
      console.log(data);
    }
  }
});

function bitmapToString(buffer) {
  return buffer.reduce((r, b) => r + b.toString(2).padStart(8, "0"), "");
}

// bit packing: converts array of indexes to a bitmap packed into Uint8Array
// example: [0,1,6] -> "11000010" -> [194]
function indexArrayToBitmap(arr) {
  const lastItem = arr[arr.length - 1];
  return arr.reduce((bytes, bit) => {
    bytes[Math.floor(bit / 8)] |= 1 << (7 - (bit % 8));
    return bytes;
  }, new Uint8Array(Math.floor(lastItem / 8) + 2));
}

// example: [0,1,6] -> "11000010"
function indexArrayToBitmapString(arr) {
  return bitmapToString(indexArrayToBitmap(arr));
}

// example: "0101" -> [1,3]
function bitmapStringToIndexArray(strBits) {
  const result = [];
  for (let i = 0; i < strBits.length; i++) {
    if (strBits[i] === "1") {
      result.push(i);
    }
  }
  return result;
}

function strBitmapToBitmap(strBits) {
  const bytes = new Uint8Array(Math.ceil(strBits.length / 8));
  for (let bit = 0; bit < strBits.length; bit++) {
    if (strBits[bit] === "1") {
      bytes[Math.floor(bit / 8)] |= 1 << (7 - (bit % 8));
    }
  }
  return bytes;
}

// returns first number x and corresponding coded string length of the first occurrence of
// Elias gamma coding. E.g. for "0101" returns {x:2,len:3}
function decodeEliasGammaFirstEntry(strBits) {
  if (strBits === "") return { x: 0, len: 0 };
  const N = strBits.indexOf("1");
  if (N < 0) {
    return { x: 0, len: strBits.length };
  }
  const remainder = strBits.slice(N + 1, 2 * N + 1);
  return { x: Math.pow(2, N) + (parseInt(remainder, 2) || 0), len: 2 * N + 1 };
}

function decompressBitmapString(compressedStrBit) {
  let target = compressedStrBit[0];
  let result = "";
  let remainder = compressedStrBit.slice(1);
  while (remainder.length) {
    const { x, len } = decodeEliasGammaFirstEntry(remainder);
    result += target.repeat(x);
    target = target === "0" ? "1" : "0";
    remainder = remainder.slice(len);
    if (len === 0) break; // we won't find any Elias gamma here, exiting
  }
  return result;
}

function decompressBase64(compressedBase64) {
  if (!compressedBase64 || compressedBase64 === "") {
    return new Uint8Array(0);
  }
  const bitmap = bitmapToString(Buffer.from(compressedBase64, "base64"));
  return decompressBitmapString(bitmap);
}

function indexArrayFromCompressedBase64(compressedBase64) {
  const decompressedBase64 = decompressBase64(compressedBase64);
  return bitmapStringToIndexArray(decompressedBase64);
}

const renderData = (a) => {
  if (a.length === 0) {
    return <div>no blocks found</div>;
  }
  return (
    <div key={a.block_date}>
      <strong>{a.block_date}</strong>:{" "}
      {indexArrayFromCompressedBase64(a.bitmap)
        .map((idx) => a.first_block_height + idx)
        .join(", ")}
    </div>
  );
};

const renderedData = state.data.map(renderData);

return (
  <>
    <h2>QueryAPI Bitmap Indexer</h2>
    <a href="https://near.org/dev-queryapi.dataplatform.near/widget/QueryApi.App?selectedIndexerPath=nearpavel.near/bitmap_v1">
      Read source code
    </a>
    <Widget
      src="near/widget/DIG.Input"
      props={{
        placeholder: "Account Id",
        onInput: (e) => State.update({ accountId: e.target.value }),
        value: state.accountId,
      }}
    />
    {state.accountId && state.data.length === 0 && (
      <div>No blocks found in QueryAPI Bitmap Index</div>
    )}
    {state.data.length > 0 && <div>{renderedData}</div>}
  </>
);
