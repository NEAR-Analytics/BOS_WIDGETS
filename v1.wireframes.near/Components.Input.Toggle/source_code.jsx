/* -------------------------------------------------------------------------- */
/*
 __        ___           __                               
 \ \      / (_)_ __ ___ / _|_ __ __ _ _ __ ___   ___  ___ 
  \ \ /\ / /| | '__/ _ \ |_| '__/ _` | '_ ` _ \ / _ \/ __|
   \ V  V / | | | |  __/  _| | | (_| | | | | | |  __/\__ \
    \_/\_/  |_|_|  \___|_| |_|  \__,_|_| |_| |_|\___||___/

  =========================================================
  * Wireframes - v1.0.0
  =========================================================
  * Product Page: https://wireframes.design
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

                                                                                 */

/* -------------------------------------------------------------------------- */

const label = props.toggleTitle ?? "Title";
const labelSide = props.labelSide ?? "start";
const isDisable = props.isDisable ?? false;
const required = props.required ?? false;

const labelFontWeight = props.style.labelFontWeight;
const labelFontSize = props.style.labelFontSize;
const labelMarginLeft = props.style.labelMarginLeft;
const labelMarginRight = props.style.labelMarginRight;
const labelLineHeight = props.style.labelLineHeight;
const labelFontColor = props.style.labelFontColor;

const display = props.style.display;
const justifyContent = props.style.justifyContent;
const alignItems = props.style.alignItems;
const width = props.style.width;
const borderWidth = props.style.borderWidth;
const backgroundColor = props.style.backgroundColor;

const switchWidth = props.style.switchWidth;
const switchHeight = props.style.switchHeight;
const switchPadding = props.style.switchPadding;
const switchPosition = props.style.switchPosition;
const switchBoxShadow = props.style.switchBoxShadow;
const switchBorderWidth = props.style.switchBorderWidth;
const switchBorderRadius = props.style.switchBorderRadius;
const switchBackgroundColor = props.style.switchBackgroundColor;

const thumbWidth = props.style.thumbWidth;
const thumbHeight = props.style.thumbHeight;
const thumbDisplay = props.style.thumbDisplay;
const thumbBoxShadow = props.style.thumbBoxShadow;
const thumbBorderWidth = props.style.thumbBorderWidth;
const thumbBorderRadius = props.style.thumbBorderRadius;
const thumbBackgroundColor = props.style.thumbBackgroundColor;

const Box = styled.div`
  display: ${(props) => props.display || "flex"};
  flex-direction: row;
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  align-items: ${(props) => props.alignItems || "center"};
  gap: 0.5em;
  width: ${(props) => props.width || "fit-content"};
  border-width: ${(props) => props.borderWidth || "0px"};

  .switch[data-state="checked"] {
    border-width: 0px;
    background-color: ${(props) => props.backgroundColor || "#49a3fd"};
  }

  .switch {
    width: ${(props) => props.switchWidth || "50px"};
    height: ${(props) => props.switchHeight || "25px"};
    border-width: ${(props) => props.switchBorderWidth || "0px"};
    padding: ${(props) => props.switchPadding || "0px"};
    background-color: ${(props) => props.switchBackgroundColor || "gray"};
    border-radius: ${(props) => props.switchBorderRadius || "9999px"};
    position: ${(props) => props.switchPosition || "relative"};
    box-shadow: ${(props) =>
      props.switchBoxShadow || "0 2px 10px var(--blackA7)"};
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .thumb {
    display: ${(props) => props.thumbDisplay || "block"};
    width: ${(props) => props.thumbWidth || "21px"};
    height: ${(props) => props.thumbHeight || "21px"};
    transform: scale(1.5);
    border-width: ${(props) => props.thumbBorderWidth || "0px"};
    background-color: ${(props) => props.thumbBackgroundColor || "#fff"};
    border-radius: ${(props) => props.thumbBorderRadius || "9999px"};
    box-shadow: ${(props) =>
      props.thumbBoxShadow || "0 2px 2px var(--blackA7)"};
    transition: transform 100ms;
    transform: translateX(2px);
    will-change: transform;
  }
  .thumb[data-state="checked"] {
    transform: translateX(28px);
  }
`;

const Label = styled.label`
  font-style: normal;
  font-weight: ${(props) => props.labelFontWeight || "400"};
  font-size: ${(props) => props.labelFontSize || "16px"};
  margin-left: ${(props) => props.labelMarginLeft || "10px"};
  margin-right: ${(props) => props.labelMarginRight || "10px"};
  line-height: ${(props) => props.labelLineHeight || "1em"};
  color: ${(props) => props.labelFontColor || "gray"};
`;

return (
  <Box
    width={width}
    display={display}
    alignItems={alignItems}
    borderWidth={borderWidth}
    justifyContent={justifyContent}
    backgroundColor={backgroundColor}
    switchWidth={switchWidth}
    switchHeight={switchHeight}
    switchPadding={switchPadding}
    switchPosition={switchPosition}
    switchBoxShadow={switchBoxShadow}
    switchBorderWidth={switchBorderWidth}
    switchBorderRadius={switchBorderRadius}
    switchBackgroundColor={switchBackgroundColor}
    thumbWidth={thumbWidth}
    thumbHeight={thumbHeight}
    thumbDisplay={thumbDisplay}
    thumbBoxShadow={thumbBoxShadow}
    thumbBorderWidth={thumbBorderWidth}
    thumbBorderRadius={thumbBorderRadius}
    thumbBackgroundColor={thumbBackgroundColor}
  >
    {labelSide == "end" ? (
      <>
        <Switch.Root
          checked={props.value}
          onCheckedChange={props.onChange}
          id={props.id}
          className="switch"
          isDisable={isDisable}
          required={required}
        >
          <Switch.Thumb className="thumb" />
        </Switch.Root>
        <Label
          labelFontSize={labelFontSize}
          labelFontColor={labelFontColor}
          labelLineHeight={labelLineHeight}
          labelFontWeight={labelFontWeight}
          labelMarginLeft={labelMarginLeft}
          labelMarginRight={labelMarginRight}
        >
          {label}
        </Label>
      </>
    ) : (
      <>
        <Label
          labelFontSize={labelFontSize}
          labelFontColor={labelFontColor}
          labelLineHeight={labelLineHeight}
          labelFontWeight={labelFontWeight}
          labelMarginLeft={labelMarginLeft}
          labelMarginRight={labelMarginRight}
        >
          {label}
        </Label>
        <Switch.Root
          checked={props.value}
          onCheckedChange={props.onChange}
          id={props.id}
          className="switch"
          isDisable={isDisable}
          required={required}
        >
          <Switch.Thumb className="thumb" />
        </Switch.Root>
      </>
    )}
  </Box>
);
