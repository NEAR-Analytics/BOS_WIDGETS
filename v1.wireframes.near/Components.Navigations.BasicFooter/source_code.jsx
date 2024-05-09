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
const fontColor = props.fontColor ?? "#fff";
const fontSize = props.fontSize ?? "12px";
const position = props.position ?? "absolute";
const bottom = props.bottom ?? "10px";
const right = props.right ?? "10px";

const Footer = styled.div`
  color: ${fontColor};
  font-size: ${fontSize};
  position: ${position};
  bottom:  ${bottom};
  right: ${right};
`;

const iconProps = props.iconProps ?? {
  iconName: "heart-fill",
  iconColor: "red",
  iconSize: "1em",
};

const linkHref = props.linkHref ?? "https://wireframes.design/";
const linkTitle = props.linkTitle ?? "wireframes.design";

return(
<Footer>
        {" "}
        Made with{" "}
        <Widget
          src="v1.wireframes.near/widget/Components.Icon.BootstrapIcons"
          props={iconProps}
        />
        from{" "}
        <a href={linkTitle} target="_blank">
          {linkTitle}
        </a>
      </Footer>
);