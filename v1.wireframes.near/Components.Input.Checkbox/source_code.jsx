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

const id = props.id ?? "";
const name = props.name ?? "";
const label = props.checkboxTitle ?? "";
const value = props.value ?? "";
const onChange = props.onChange ?? (() => {});
const type = props.type ?? "checkbox";
const required = props.required ?? false;
const isDisable = props.isDisable ?? false;

const iconName = props.iconName ?? "check2";
const iconSize = props.iconSize ?? "20px";
const iconColor = props.iconColor ?? "#fff";

const labelSide = props.labelSide ?? "";

const boxDisplay = props.style.boxDisplay ?? "flex";
const boxJustifyContent = props.style.boxJustifyContent ?? "flex-start";
const boxAlignItems = props.style.boxAlignItems ?? "center";
const boxGap = props.style.boxGap ?? "0.5em";

const checkboxBackground = props.style.checkboxBackground ?? "none";
const checkboxPadding = props.style.checkboxPadding ?? "2px 0px 0px 0px";
const checkboxWidth = props.style.checkboxWidth ?? "1.5em";
const checkboxMinWidth = props.style.checkboxMinWidth ?? "1.5em";
const checkboxMaxWidth = props.style.checkboxMaxWidth ?? "1.5em";
const checkboxHeight = props.style.checkboxHeight ?? "1.5em";
const checkboxDisplay = props.style.checkboxDisplay ?? "flex";
const checkboxJustifyContent = props.style.checkboxJustifyContent ?? "center";
const checkboxAlignItems = props.style.checkboxAlignItems ?? "center";
const checkboxBorder = props.style.checkboxBorder ?? "1px solid #a8acb3";
const checkboxBorderRadius = props.style.checkboxBorderRadius ?? "5px";
const checkboxCheckedBackground =
  props.style.checkboxCheckedBackground ?? "#202024";

const labelFontStyle = props.style.labelFontStyle ?? "normal";
const labelFontWeight = props.style.labelFontWeight ?? "400";
const labelFontSize = props.style.labelFontSize ?? "1em";
const labelLineHeight = props.style.labelLineHeight ?? "1em";
const labelFontColor = props.style.labelFontColor ?? "#202024";
const labelMarginLeft = props.style.labelMarginLeft ?? "3px";

const Box = styled.div`
  display: ${boxDisplay};
  flex-direction: row;
  justify-content: ${boxJustifyContent};
  align-items: ${boxAlignItems};
  gap: ${boxGap};

  button {
    background: ${checkboxBackground};
    padding: ${checkboxBackground};
    width: ${checkboxWidth};
    min-width: ${checkboxMinWidth};
    max-width: ${checkboxMaxWidth};
    height: ${checkboxHeight};
    display: ${checkboxDisplay};
    justify-content: ${checkboxJustifyContent};
    align-items: ${checkboxAlignItems};
    border: ${checkboxBorder};
    border-radius: ${checkboxBorderRadius};
    transition: background 200ms ease-out;

    &[data-state="checked"] {
      background: ${checkboxCheckedBackground};
    }
  }
`;

const Label = styled.label`
  font-style: ${labelFontStyle};
  font-weight: ${labelFontWeight};
  font-size: ${labelFontWeight};
  line-height: ${labelLineHeight};
  color: ${labelFontColor};
  margin-left: ${labelMarginLeft};
`;

return (
  <>
    {labelSide == "start" ? (
      <Box>
        <Label htmlFor={id}>{label}</Label>
        <Checkbox.Root
          id={id}
          name={name}
          type={type}
          checked={value}
          onCheckedChange={onChange}
          required={required}
        >
          <Checkbox.Indicator>
            <Widget
              src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
              props={{
                iconName: iconName,
                iconSize: iconSize,
                iconColor: iconColor,
              }}
            />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </Box>
    ) : (
      <>
        <Box>
          <Checkbox.Root
            name={name}
            type={type}
            checked={value}
            onCheckedChange={onChange}
            id={id}
            required={required}
            disabled={isDisable}
          >
            <Checkbox.Indicator>
              <Widget
                src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
                props={{
                  iconName: iconName,
                  iconSize: iconSize,
                  iconColor: iconColor,
                }}
              />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <Label htmlFor={id}>{label}</Label>
        </Box>
      </>
    )}
  </>
);
