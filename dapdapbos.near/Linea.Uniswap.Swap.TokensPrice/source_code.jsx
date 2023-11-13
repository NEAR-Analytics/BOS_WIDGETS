const timer = Storage.privateGet("tokensPrice_timer");
const DELAY = 1000 * 60 * 5;

function getPrice() {
  asyncFetch("https://api.dapdap.net/get-token-price-by-dapdap")
    .then((res) => {
      const data = res?.body?.data;
      if (data.WETH && !data.ETH) {
        data.ETH = data.WETH;
      }
      Storage.set("tokensPrice", data || {});
      setTimeout(getPrice, DELAY);
    })
    .catch((err) => {
      setTimeout(getPrice, DELAY);
    });
}

if (!Storage.privateGet("tokensPrice_timer")) {
  getPrice();
  Storage.privateSet("tokensPrice_timer", 1);
}
