const timer = Storage.privateGet("tokensPrice_timer");
const DELAY = 1000 * 60 * 5;

const AccessKey = Storage.get(
  "AccessKey",
  "guessme.near/widget/ZKEVMWarmUp.add-to-quest-card"
);

function getPrice() {
  asyncFetch("https://test-api.dapdap.net/get-token-price-by-dapdap", {
    headers: { Authorization: AccessKey },
  })
    .then((res) => {
      const data = res?.body?.data;
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
