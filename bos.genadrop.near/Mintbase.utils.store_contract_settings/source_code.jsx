const GAS = "200000000000000";
function saveBasicSettings(data, storeName) {
  if (!storeName) return;
  return asyncFetch(
    `https://www.mintbase.xyz/api/firestore/store/${storeName}`,
    {
      method: "POST",
      headers: {
        "mb-api-key": "anon",
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          displayName: data?.displayName,
          description: data?.description,
          contract: storeName,
        },
      }),
    }
  ).then((result) => {
    return result;
  });
}
function transferStoreOwnership(contractName, newOwner) {
  const deposit = 1;
  try {
    return Near.call([
      {
        contractName,
        args: {
          new_owner: newOwner,
          keep_old_minters: true,
        },
        methodName: "transfer_store_ownership",
        deposit,
        gas: GAS,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}
function addAndRemoveMinters(contractName, type, minters) {
  const deposit = 1;
  try {
    return Near.call([
      {
        contractName,
        args: {
          grant: type === "grant" ? minters : undefined,
          revoke: type === "revoke" ? minters : undefined,
        },
        methodName: "batch_change_minters",
        deposit,
        gas: GAS,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}
return { saveBasicSettings, transferStoreOwnership, addAndRemoveMinters };
