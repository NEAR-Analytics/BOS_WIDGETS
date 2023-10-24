const Button0001 = styled.button`
  width: 80%;
  height: 40px;
  all: unset;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.6em 2em;
  border: mediumspringgreen solid 0.15em;
  border-radius: 0.25em;
  color: mediumspringgreen;
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: border 300ms, color 300ms;
  user-select: none;

  p {
    z-index: 1;
  }

  &:hover {
    color: #212121;
  }

  &:active {
    border-color: teal;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 9em;
    aspect-ratio: 1;
    background: mediumspringgreen;
    opacity: 50%;
    border-radius: 50%;
    transition: transform 500ms, background 300ms;
  }

  &::before {
    left: 0;
    transform: translateX(-8em);
  }

  &::after {
    right: 0;
    transform: translateX(8em);
  }

  &:hover::before {
    transform: translateX(-1em);
  }

  &:hover::after {
    transform: translateX(1em);
  }

  &:active::before,
  &:active::after {
    background: teal;
  }
`;

const props = {
  copyBtn:
    "const Button0001 = styled.button`" +
    `width: 80%;
  height: 40px;
  all: unset;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.6em 2em;
  border: mediumspringgreen solid 0.15em;
  border-radius: 0.25em;
  color: mediumspringgreen;
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: border 300ms, color 300ms;
  user-select: none;

  p {
    z-index: 1;
  }

  &:hover {
    color: #212121;
  }

  &:active {
    border-color: teal;
  }

  &::before,
  &::after` +
    `\n{ content: "";` +
    `position: absolute;
    width: 9em;
    aspect-ratio: 1;
    background: mediumspringgreen;
    opacity: 50%;
    border-radius: 50%;
    transition: transform 500ms, background 300ms;
  }

  &::before {
    left: 0;
    transform: translateX(-8em);
  }

  &::after {
    right: 0;
    transform: translateX(8em);
  }

  &:hover::before {
    transform: translateX(-1em);
  }

  &:hover::after {
    transform: translateX(1em);
  }

  &:active::before,
  &:active::after {
    background: teal;
  }` +
    "`;" +
    `\n return(
    <Button0001>Button 0001</Button0001>
)`,
  component: <Button0001>Button0001</Button0001>,
  detailLink: "https://near.org/marketplacebos.near/widget/Detail.Button0001",
};

return (
  <>
    <Widget src="marketplacebos.near/widget/CardMain.CardMini" props={props} />
  </>
);
