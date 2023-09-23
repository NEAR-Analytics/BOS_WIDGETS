const featuredProjects = [
  "marmajgaming.near",
  "research-collective.near",
  "bac-inc.near",
];

const dummyItem = [
  {
    image: "https://via.placeholder.com/150", // Placeholder image URL.
    description: "A beautiful blue t-shirt made of 100% cotton.",
    price: "$29.99",
  },
  {
    image: "https://via.placeholder.com/150?text=Red+Shirt", // Placeholder image URL with custom text.
    description: "A vibrant red shirt suitable for all occasions.",
    price: "$19.99",
  },
  {
    image: "https://via.placeholder.com/150?text=Green+Hat", // Placeholder image URL with custom text.
    description: "A stylish green hat to complete your outfit.",
    price: "$15.99",
  },
  {
    image: "https://via.placeholder.com/150?text=Black+Shoes", // Placeholder image URL with custom text.
    description: "Comfortable black shoes that fit any style.",
    price: "$49.99",
  },
];

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto); 
  gap: 2em;
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
return (
  <div>
    <heading>Featured Projects</heading>
    <Container>
      {dummyItem.map((item) => (
        <Widget
          src={`joelblenman21.near/widget/ItemComponent`}
          props={{
            item,
          }}
        />
      ))}
    </Container>
  </div>
);
