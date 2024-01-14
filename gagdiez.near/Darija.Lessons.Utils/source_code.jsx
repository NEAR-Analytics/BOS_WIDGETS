function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array;
}

const SelectionStyle = styled.div`
  &:hover {
    cursor: pointer;
    background-color: rgb(216 244 255);
  }

  &.selected {
    background-color: rgb(216 244 255);
  }

  &.success {
    background-color: rgb(216 255 216);
  }

  &.danger {
    background-color: rgb(255 216 216);
  }
`;


return {shuffle, SelectionStyle}