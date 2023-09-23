const Picture = styled.div`
  position: relative;
  border-radius: var(--br-xs);
  background-color: #dedede;
  width: 256px;
  height: 173px;
  overflow: hidden;
  flex-shrink: 0;
`;

const ItemDescription = styled.div`
  align-self: stretch;
  position: relative;
  font-size: 16px;
  font-weight: 500;
`;

const PleaseAddYour = styled.div`
  position: relative;
  font-family: var(--font-roboto-slab);
  color: #666;
  display: flex;
  align-items: center;
  width: 256px;
`;

const TagOrButton = styled.div`
  flex: 1;
  position: relative;
`;

const ItemComponent1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-self: stretch;
  border-radius: var(--br-xs);
  background-color: var(--color-white);
  overflow: hidden;
  align-items: flex-start;
  text-align: center;
  color: var(--color-white);
`;

const Tag = styled.div`
  color:"#fff"
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  border-radius: 5px;
  background-color: #3838f4;
  width: 72px;
  align-items: flex-end;
  padding: var(--padding-5xs) 0;
  box-sizing: border-box;
`;

const ItemDescriptionParent = styled.div`
  flex-direction: column;
  gap: 4px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Content = styled.div`
  flex-direction: column;
  gap: 24px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ItemComponent = styled.div`
  position: relative;
  border-radius: var(--br-xs);
  background-color: "#;
  width: 100%;
  overflow: hidden;
  flex-direction: row;
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
  height: 100%;
  width:100%;
  background-color: "red;
`;
// Now you can use these styled components in your React components
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
