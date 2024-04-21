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
const hrefColor = props.hrefColor ?? "#fff";
const hrefTextDecoration = props.hrefTextDecoration ?? "none";
const meWidth = props.meWidth ?? "400px";
const meMargin = props.meMargin ?? "90px auto";
const meLatterSpacing = props.meLatterSpacing ?? "3px";
const meTextAlign = props.meTextAlign ?? "center";
const meFontWeight = props.meFontWeight ?? "200";
const meSpanFontWeight = props.meSpanFontWeight ?? "bold";
const socialHeight = props.socialHeight ?? "100vh";
const socialDisplay = props.socialDisplay ?? "grid";
const socialAlignItems = props.socialAlignItems ?? "center";
const socialUlPadding = props.socialUlPadding ?? "20px";
const socialUlTransform = props.socialUlTransform ?? "translate(-270px, 0)";
const socialUlLiDisplay = props.socialUlLiDisplay ?? "block";
const socialUlLiMargin = props.socialUlLiMargin ?? "5px";
const socialUlLiBackground = props.socialUlLiBackground ?? "rgba(0, 0, 0, 0.36)";
const socialUlLiWidth = props.socialUlLiWidth ?? "300px";
const socialUlLiTextAlign = props.socialUlLiTextAlign ?? "right";
const socialUlLiPadding = props.socialUlLiPadding ?? "10px";
const socialUlLiBorderRadius = props.socialUlLiBorderRadius ?? "0 30px 30px 0";
const socialUlLiTransition = props.socialUlLiTransition ?? "all 1s";
const socialUlLiHoverTransform = props.socialUlLiHoverTransform ?? "translate(110px, 0)";
const socialUlLiHoverBackground = props.socialUlLiHoverBackground ?? "rgba(255, 255, 255, 0.4)";
const socialUlLiHoverColor = props.socialUlLiHoverColor ?? "#000";
const socialUlLiHoverIcolor = props.socialUlLiHoverIcolor ?? "#fff";
const socialUlLiHoverIbackground = props.socialUlLiHoverIbackground ?? "rgba(0, 0, 0, 0.36)";
const socialUlLiHoverItransform = props.socialUlLiHoverItransform ?? "rotate(360deg)";
const socialUlLiHoverItransition = props.socialUlLiHoverItransition ?? "all 1s";
const socialUlLiImarginLeft = props.socialUlLiImarginLeft ?? "10px";
const socialUlLiIColor = props.socialUlLiIColor ?? "#000";

const socialUlLiIBackground = props.socialUlLiIBackground ?? "#fff";
const socialUlLiIPadding = props.socialUlLiIPadding ?? "10px";
const socialUlLiIBorderRadius = props.socialUlLiIBorderRadius ?? "50%";

const socialUlLiItransform = props.socialUlLiItransform ?? "rotate(0deg)";
const socialUlLiIWidth = props.socialUlLiIWidth ?? "20px";
const socialUlLiIHeight = props.socialUlLiIHeight ?? "20px";
const socialUlLiIFontSize = props.socialUlLiIFontSize ?? "20px";

const FloatingDiv = styled.div`
a {
  color: ${hrefColor};
  text-decoration: ${hrefTextDecoration};
}
.me {
  width: ${meWidth};
  margin: ${meMargin};
}
.me p,
.me h1 {
  letter-spacing: ${meLatterSpacing};
  text-align: ${meTextAlign};
}
.me p {
  font-weight: ${meFontWeight};
}
.me span {
  font-weight: ${meSpanFontWeight};
}
.social {
  height: ${socialHeight};
  display: ${socialDisplay};
  align-items: ${socialAlignItems};
}
.social ul {
  padding: ${socialUlPadding};
  transform: ${socialUlTransform};
}
.social ul li {
  display: ${socialUlLiDisplay};
  margin: ${socialUlLiMargin};
  background: ${socialUlLiBackground};
  width: ${socialUlLiWidth};
  text-align: ${socialUlLiTextAlign};
  padding: ${socialUlLiPadding};
  border-radius: ${socialUlLiBorderRadius};
  transition: ${socialUlLiTransition};
}
.social ul li:hover {
  transform: ${socialUlLiHoverTransform};
  background: ${socialUlLiHoverBackground};
}
.social ul li:hover a {
  color: ${socialUlLiHoverColor};
}
.social ul li:hover i {
  color: ${socialUlLiHoverIcolor};
  background: ${socialUlLiHoverIbackground};
  transform: ${socialUlLiHoverItransform};
  transition: ${socialUlLiHoverItransition};
}
.social ul li i {
  margin-left: ${socialUlLiImarginLeft};
  color: ${socialUlLiIColor};
  background: ${socialUlLiIBackground};
  padding: ${socialUlLiIPadding};
  border-radius: ${socialUlLiIBorderRadius};
  width: ${socialUlLiIWidth};
  height: ${socialUlLiIHeight};
  font-size: ${socialUlLiIFontSize};
  background: ${socialUlLiIBackground};
  transform: ${socialUlLiItransform};
}
`;

const linkHref = props.linkHref ?? "";
const linkTitle = props.linkTitle ?? "";
const iconName = props.iconName ?? "";
const iconColor = props.iconColor ?? "";
const iconSize = props.iconSize ?? "";
const socialLinks = props.socialLinks ?? [];



return(<>
  <div style={{ position:"absolute" ,zIndex:5000 }}>
<FloatingDiv>
<div class="social">
  
 
  <ul>
  {socialLinks?.map((link, index) => (
            <li key={index}>
              <a href={link.linkHref}>{link.linkTitle}
              <Widget
                src="v1.wireframes.near/widget/Components.Icon.BootstrapIcons"
                props={{
                  iconName: link.iconName,
                  iconColor: link.iconColor,
                  iconSize: link.iconSize,
                }}
              />
              </a>
            </li>
          ))}   
      </ul>
</div>
</FloatingDiv>
</div>
</>);
