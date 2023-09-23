const Picture = styled.div`
  border-radius: var(--br-xs);
  background-color: blue;
 
  height: 173px;
`;

const ItemDescription = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const PleaseAddYour = styled.div`
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
  color: #fff;
  display: flex;
  justify-content: flex-end;
  background-color: #3838f4;
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
  width: 100%;
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
  background-color: red;
  height: 100%
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width:fit-content
`;

// Use the styled components in the React components
return (
  <Container>
    <ItemComponent>
      <Content>
        <Picture />
        <ItemDescriptionParent>
          <ItemDescription>Item description</ItemDescription>
          <PleaseAddYour>
            Please add your content here. Keep it short and simple. And smile :)
          </PleaseAddYour>
          <ItemComponent1>
            <Tag>
              <TagOrButton>Price</TagOrButton>
            </Tag>
          </ItemComponent1>
        </ItemDescriptionParent>
      </Content>
    </ItemComponent>
  </Container>
);
