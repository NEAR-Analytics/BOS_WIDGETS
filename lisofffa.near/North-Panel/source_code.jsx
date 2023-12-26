const NorthPanel = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;
  width: 192px;
  height: 30px;
  border-radius: 0px 0px 10px 10px;
  background: #3d7fff;
  padding: 4px 10px;
`;
const ItemBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TextBlock = styled.span`
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 150px;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 149%;
`;
return (
  <NorthPanel>
    <ItemBlock>
      <TextBlock>Ac lacinia duis vulputate lectus-v3</TextBlock>
    </ItemBlock>
  </NorthPanel>
);
