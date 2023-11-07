let direction = props.direction ?? "row";
let listStyle = props.listStyle ?? "none";
let spacing = props.spacing ?? "0";
let width = props.width ?? "auto";
let height = props.height ?? "auto";
let background = props.background ?? null;
let alignItems = props.alignItems ?? "start";
let justifyContent = props.justifyContent ?? "flex-start";
let listContent = props.listContent ?? null;
let children = props.children ?? null;

const List = styled.ul`
    width: ${width};
    heigh: ${height};
    list-style: ${listStyle};
    display: flex;
    flex-direction: ${direction};
    background: ${background};
    gap: ${spacing};
    align-items: ${alignItems};
    justify-content: ${justifyContent};
`;
if (children) return <List>{children}</List>;
else
  return listContent.map((text, key) => (
    <Widget
      key={key}
      src="flashui.near/widget/ListItems"
      props={{ children: text }}
    />
  ));
