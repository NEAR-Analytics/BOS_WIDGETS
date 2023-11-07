let {
  background,
  backgroundSize,
  backgroundOrigin,
  backgroundClip,
  border,
  borderLeft,
  borderRight,
  borderTop,
  borderBottom,
  borderRadius,
  margin,
  padding,
  height,
  width,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  boxSizing,
  outline,
  outlineOffset,
  position,
  top,
  right,
  bottom,
  left,
  zIndex,
  overflow,
  overflowX,
  overflowY,
  overflowWrap,
  float,
  display,
  flexDirection,
  flexWrap,
  flex,
  alignItems,
  justifyContent,
  alignContent,
  order,
  alignSelf,
  gap,
  gridTemplateColumns,
  gridTemplateRows,
  gridColumn,
  gridRow,
  gridArea,
  gridTemplateAreas,
  opacity,
  boxShadow,
} = props;

// Background
background = background ?? "transparency";
backgroundSize = backgroundSize ?? null;
backgroundOrigin = backgroundOrigin ?? null;
backgroundClip = backgroundClip ?? null;

// Border
border = border ?? "none";
borderLeft = borderLeft ?? null;
borderRight = borderRight ?? null;
borderTop = borderTop ?? null;
borderBottom = borderBottom ?? null;
borderRadius = borderRadius ?? "0";

// Margin
margin = margin ?? "none";

// Padding
padding = padding ?? "none";

// Size
height = height ?? "auto";
width = width ?? "fit-content";
maxWidth = maxWidth ?? "auto";
maxHeight = maxHeight ?? "auto";
minWidth = minWidth ?? "auto";
minHeight = minHeight ?? "auto";

// Box Sizing
boxSizing = boxSizing ?? "border-box";

// Outline
outline = outline ?? "none";
outlineOffset = outlineOffset ?? "0";

// Position
position = position ?? "static";
top = top ?? "auto";
right = right ?? "auto";
bottom = bottom ?? "auto";
left = left ?? "auto";

// Z-Index
zIndex = zIndex ?? "0";

// Overflow
overflow = overflow ?? "visible";
overflowX = overflowX ?? "visible";
overflowY = overflowY ?? "visible";
overflowWrap = overflowWrap ?? "normal";

// Float
float = float ?? "none";

// Display
display = display ?? "block";

// Flex
flexDirection = flexDirection ?? "column";
flexWrap = flexWrap ?? "nowrap";
flex = flex ?? "0 1 auto";
alignItems = alignItems ?? "start";
justifyContent = justifyContent ?? "flex-start";
alignContent = alignContent ?? "start";
order = order ?? "initial";
alignSelf = alignSelf ?? "auto";

// Grid
gap = gap ?? "0";
gridTemplateColumns = gridTemplateColumns ?? "auto";
gridTemplateRows = gridTemplateRows ?? "auto";
gridColumn = gridColumn ?? "auto";
gridRow = gridRow ?? "auto";
gridArea = gridArea ?? "auto";
gridTemplateAreas = gridTemplateAreas ?? "none";

// Opacity
opacity = opacity ?? "1.0";

// Box shadow
boxShadow = boxShadow ?? "none";

const Box = styled.div`
    background: ${background};
    background-size: ${backgroundSize};
    background-origin: ${backgroundOrigin};
    background-clip: ${backgroundClip};
    border: ${border};
    border-top: ${borderTop};
    border-bottom: ${borderBottom};
    border-left: ${borderLeft};
    border-right: ${borderRight};
    border-radius: ${borderRadius};
    margin: ${margin};
    padding: ${padding};
    height: ${height};
    width: ${width};
    max-width: ${maxWidth};
    min-width: ${minWidth};
    max-height: ${maxHeight};
    min-height: ${minHeight};
    box-sizing: ${boxSizing};
    outline: ${outline};
    outline-offset: ${outlineOffset};
    position: ${position};
    top: ${top};
    bottom: ${bottom};
    left: ${left};
    right: ${right};  
    z-index: ${zIndex};
    overflow: ${overflow};
    overflow-x: ${overflowX};
    overflow-y: ${overflowY};
    overflow-wrap: ${overflowWrap};
    float: ${float};
    display: ${display};
    flex-direction: ${flexDirection};
    flex-wrap: ${flexWrap};
    flex: ${flex};
    align-items: ${alignItems};
    justify-content: ${justifyContent};
    align-content: ${alignContent};
    order: ${order};
    align-self: ${alignSelf};
    gap: ${gap};
    grid-template-columns: ${gridTemplateColumns};
    grid-template-rows: ${gridTemplateRows};
    grid-column: ${gridColumn};
    grid-row: ${gridRow};
    grid-area: ${gridArea};
    grid-template-areas: ${gridTemplateAreas};
    box-shadow: ${boxShadow};
`;

const children = children;

return <Box {...forwardedProps}>{children}</Box>;
