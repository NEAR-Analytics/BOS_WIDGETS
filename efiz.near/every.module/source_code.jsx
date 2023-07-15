function mergeItems(iIndex, oldItems, newItems, desc) {
  const index = indices[iIndex];
  const items = [
    ...new Set(
      [
        ...newItems.map((item) => ({
          ...item,
          action: index.action,
          key: index.key,
          index: iIndex,
        })),
        ...oldItems,
      ].map((i) => JSON.stringify(i))
    ),
  ].map((i) => JSON.parse(i));
  items.sort((a, b) => a.blockHeight - b.blockHeight);
  if (desc) {
    items.reverse();
  }
  return items;
}

function Grid({ children, numColumns }) {
  const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(${numColumns || 3}, 1fr);

    @media (hover: none) {
      grid-template-columns: repeat(1, 1fr);
    }
  `;
  return <StyledGrid>{children}</StyledGrid>;
}

function normalizePath(path) {
  return path.replace(/\//g, "_");
}

return { mergeItems, Grid, normalizePath };
