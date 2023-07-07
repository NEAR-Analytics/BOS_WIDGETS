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

return { mergeItems };
