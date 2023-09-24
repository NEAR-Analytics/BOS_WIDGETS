const Picture = styled.div`
  border-radius: var(--br-xs);
  height: 173px;
  overflow: hidden; // Prevents the image from overflowing its container
  
  img {
    width: 100%; // Make the image stretch or shrink to fit the width of the container
    height: 100%; // Make the image stretch or shrink to fit the height of the container
    object-fit: cover; // Cover the entire content box, potentially cutting off the image
    object-position: center; // Center the image within its container
  }
`;

const ItemTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const ItemDescription = styled.div`
  font-family: var(--font-roboto-slab);
  color: #666;
  width: 256px;
`;

const TagOrButton = styled.div`
  flex: 1;
`;

const ItemComponent1 = styled.div`
  display: flex;
  justify-content: flex-end;
  align-self: stretch;
  background-color: var(--color-white);
  align-items: flex-start;
  text-align: center;
  color: var(--color-white);
`;

const Tag = styled.div`
  color: #000;
  display: flex;
  justify-content: flex-end;
  width: 72px;
  padding: var(--padding-5xs) 0;
`;

const ItemDescriptionParent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ItemComponent = styled.div`
  border-radius: var(--br-xs);
  padding: 24px;
  box-sizing: border-box;
  text-align: left;
  font-size: var(--font-size-sm);
  color: #000;
  font-family: var(--font-inter);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Container = styled.div`
  background-color: #f2f2f2;
  height: 100%;
  display: flex;
  width:fit-content;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border-width:solid;
  border-size: 2;
`;
const AddToCartButton = styled.button`
  margin-top: 16px;
  padding: 12px 24px;
  background-color: #3838f4; // or any desired color
  color: #fff;
  border: none;
  border-radius: var(--br-xs);
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2727d4; // a slightly darker shade for hover effect
  }
`;

State.init({
  selectedItems: [],
});
const handleAddToCart = props.handleAddToCart || (() => {});
// const handleAddToCart = (title) => {
//   console.log("This is the title: ", title);
//   // check if already selected
//   if (state.selectedElements.includes(title)) {
//     // if already selected, remove check
//     const updatedItems = state.selectedElements.filter(
//       (elementId) => elementId !== title
//     );
//     // update in local storage so it can be picked up by the cart
//     Storage.set("cart-items", JSON.stringify(updatedElements));
//     // update in state, so there is a smooth experience
//     State.update({
//       selectedElements: updatedItems,
//     });
//   } else {
//     // not selected, so add to array
//     const updatedElements = [...state.selectedElements, title];
//     // update in local storage so it can be picked up by the cart
//     Storage.set("cart-items", JSON.stringify(updatedElements));
//     // update in state, so there is a smooth experience
//     State.update({
//       selectedElements: updatedElements,
//     });
//   }
// };

State.init({
  selectedItems: [],
});

return (
  <Container>
    <ItemComponent>
      <Content>
        <Picture>
          <img src={props.item.image} />
        </Picture>
        <ItemDescriptionParent>
          <ItemTitle>{props.item.title}</ItemTitle>
          <ItemDescription>{props.item.description}</ItemDescription>
          <ItemComponent1>
            <Tag>
              <TagOrButton>{props.item.price}</TagOrButton>
            </Tag>
          </ItemComponent1>
          <AddToCartButton onClick={() => handleAddToCart(props.item.title)}>
            Add to Cart
          </AddToCartButton>
        </ItemDescriptionParent>
      </Content>
    </ItemComponent>
  </Container>
);
