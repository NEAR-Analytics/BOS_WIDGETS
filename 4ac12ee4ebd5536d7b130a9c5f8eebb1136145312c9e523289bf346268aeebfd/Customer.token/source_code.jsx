const USER = "4ac12ee4ebd5536d7b130a9c5f8eebb1136145312c9e523289bf346268aeebfd";

if (!props.collectionAddress || !props.abi || !props.owner || !props.name)
  return (
    <Widget
      src={`${USER}/widget/Common.error`}
      props={{ message: "Missing data" }}
    />
  );

const tier = props.tier ?? 0;

State.init({
  amount: 0,
  price: 0,
  deadline: 0,
  totalPaid: 0,
  image: "",
});

const iface = new ethers.utils.Interface(props.abi);

const timestampToDateTime = (timestampInSeconds) => {
  const timestampInMillis = timestampInSeconds * 1000;
  const date = new Date(timestampInMillis);
  return date.toLocaleString();
};

const getCollectionName = () => {
  const encodedData = iface.encodeFunctionData("collectionName", []);

  return Ethers.provider()
    .call({
      to: props.collectionAddress,
      data: encodedData,
    })
    .then((n) => {
      const name = iface.decodeFunctionResult("collectionName", n)[0];
      State.update({ name: name });
    });
};

const getCollectionImage = () => {
  try {
    const encodedData = iface.encodeFunctionData("uri", [0]);

    return Ethers.provider()
      .call({
        to: props.collectionAddress,
        data: encodedData,
      })
      .then((url) => {
        const uri = iface.decodeFunctionResult("uri", url);
        const real_uri = uri[0].slice(0, uri[0].length - 1);
        //console.log("url: ", real_uri);
        const metas = fetch(real_uri);
        if (metas.ok) {
          const jsonmeta = JSON.parse(metas.body);
          State.update({ image: jsonmeta["image"] });
        } else {
          console.log(metas);
        }
      });
  } catch (err) {
    console.log(err);
  }
};

const getPrice = () => {
  const encodedData = iface.encodeFunctionData("getTierPrice", [tier]);

  return Ethers.provider()
    .call({
      to: props.collectionAddress,
      data: encodedData,
    })
    .then((p) => {
      const price = iface.decodeFunctionResult("getTierPrice", p);
      const _price = Big(price.toString()).div(Big(10).pow(18)).toString();
      State.update({ price: _price });
    });
};

const getAmount = () => {
  const encodedData = iface.encodeFunctionData("balanceOf", [
    props.owner,
    tier,
  ]);

  return Ethers.provider()
    .call({
      to: props.collectionAddress,
      data: encodedData,
    })
    .then((amt) => {
      const amount = iface.decodeFunctionResult("balanceOf", amt);
      State.update({ amount: amount });
    });
};

const getDeadline = () => {
  const encodedData = iface.encodeFunctionData("getSubscriptionDeadline", [
    tier,
    props.owner,
  ]);

  return Ethers.provider()
    .call({
      to: props.collectionAddress,
      data: encodedData,
    })
    .then((ts) => {
      const dl = iface.decodeFunctionResult("getSubscriptionDeadline", ts);
      const deadline = timestampToDate(Big(dl).toString());
      State.update({ deadline: deadline });
    });
};

const fetchData = () => {
  getCollectionName();
  getCollectionImage();
  getPrice();
  getAmount();
  getDeadline();
};

fetchData();

return (
  <div class="card bg-light mb-3 d-flex w-100">
    <div class="card-header">
      <img src={state.image} class="img-fluid" />
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Amount: {state.amount}</li>
      <li class="list-group-item">Price: {state.price}</li>
      <li class="list-group-item">Next billing: {state.deadline}</li>
      <li class="list-group-item">Total paid: {state.totalPaid}</li>
    </ul>
    <div class="card-body">
      <h5 class="card-title">{props.name}</h5>
    </div>
  </div>
);
