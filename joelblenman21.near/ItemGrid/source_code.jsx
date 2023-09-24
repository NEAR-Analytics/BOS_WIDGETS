const dummyItem = [
  {
    title: "Blue T-Shirt",
    image: "https://via.placeholder.com/150",
    description: "A beautiful blue t-shirt made of 100% cotton.",
    price: "$29.99",
  },
  {
    title: "Red Shirt",
    image: "https://via.placeholder.com/150?text=Red+Shirt",
    description: "A vibrant red shirt suitable for all occasions.",
    price: "$19.99",
  },
  {
    title: "Green Hat",
    image: "https://via.placeholder.com/150?text=Green+Hat",
    description: "A stylish green hat to complete your outfit.",
    price: "$15.99",
  },
  {
    title: "Black Shoes",
    image: "https://via.placeholder.com/150?text=Black+Shoes",
    description: "Comfortable black shoes that fit any style.",
    price: "$49.99",
  },
];

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, auto); 
  
  padding: 0;
  width: 100%;

  & > h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    color: #101828;
  }
`;

const heading = styled.h1`
 
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    color: #101828;
  
`;

State.init({
  selectedElements: [],
});

const items = JSON.parse(
  Storage.get("cart-items", "joelblenman21.near/widget/ItemComponent") || "null"
);

const handleAddToCart = (title) => {
  console.log("This is the title: ", title);
  // check if already selected
  if (state.selectedElements.includes(title)) {
    // if already selected, remove check
    const updatedItems = state.selectedElements.filter(
      (elementId) => elementId !== title
    );
    // update in local storage so it can be picked up by the cart
    // Storage.set("cart-items", JSON.stringify(updatedElements));
    // update in state, so there is a smooth experience
    State.update({
      selectedElements: updatedItems,
    });
  } else {
    // not selected, so add to array
    const updatedElements = [...state.selectedElements, title];
    // update in local storage so it can be picked up by the cart
    // Storage.set("cart-items", JSON.stringify(updatedElements));
    // update in state, so there is a smooth experience
    State.update({
      selectedElements: updatedElements,
    });
  }
};

return (
  <div>
    <p>Cart: {state.selectedElements}</p>
    <heading>Featured Items</heading>
    <Container>
      {dummyItem.map((item) => (
        <Widget
          src={`joelblenman21.near/widget/ItemComponent`}
          props={{
            item,
            handleAddToCart,
          }}
        />
      ))}
    </Container>
  </div>
);
