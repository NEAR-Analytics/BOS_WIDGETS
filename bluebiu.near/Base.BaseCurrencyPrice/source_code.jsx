let timer = null;
const DELAY = 1000 * 60 * 5;

function getPrice() {
  asyncFetch("https://mainnet-indexer.ref-finance.com/list-base-token-price")
    .then((res) => {
      const data = JSON.parse(res.body);
      data.native = data.aurora;
      delete data.aurora;
      Storage.privateSet("tokensPrice", data);
      clearTimeout(timer);
      timer = setTimeout(getPrice, DELAY);
    })
    .catch((err) => {
      clearTimeout(timer);
      timer = setTimeout(getPrice, DELAY);
    });
}

getPrice();

return "";
