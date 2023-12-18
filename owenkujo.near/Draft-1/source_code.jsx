const product = {
  title: "TRASH Lv1",
  text: "This is what you get from the smallest amount of trash",
  link: "#",
  price: "1",
  img: "https://i.seadn.io/s/raw/files/e898f240d7cf54204025cce17ba0f7d2.jpg?auto=format&dpr=1&w=384",
};

const product1 = {
  title: "TRASH Lv2",
  text: "This is what you get from the small amount of trash",
  link: "#",
  price: "2",
  img: "https://i.seadn.io/s/raw/files/05bc798c5a1197ccf1cb5896c473713b.jpg?auto=format&dpr=1&w=384",
};

const product2 = {
  title: "TRASH Lv3",
  text: "This is what you get from the medium amount of trash",
  link: "#",
  price: "3",
  img: "https://i.seadn.io/s/raw/files/eb44841141e6e6b99b4a6ab2ac9de7b8.jpg?auto=format&dpr=1&w=384",
};

const product3 = {
  title: "TRASH Lv4",
  text: "This is what you get from the big amount of trash",
  link: "#",
  price: "4",
  img: "https://i.seadn.io/s/raw/files/e69a423705321d3115cb884e27167e62.jpg?auto=format&dpr=1&w=384",
};

const products = [product, product1, product2, product3];

return (
  <>
    <div class="row">
      {products.map((product) => (
        <>
          <div class="col-6">
            <Widget
              src="dev-support.near/widget/Commerce.Product.Preview"
              props={{ ...product }}
            />
          </div>
        </>
      ))}
    </div>
  </>
);
