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
return (
  <div className="btn-group" role="group">
    {props.map((data, index) => (
      <Widget
        src="v1.wireframes.near/widget/Components.Button.SimpleButton"
        props={{
          ...data,
          inlineStyle: {
            ...data.inlineStyle,
            borderRadius: "0px",
            ...(index === 0 && {
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
            }),
            ...(index === props.length - 1 && {
              borderTopRightRadius: "5px",
              borderBottomRightRadius: "5px",
            }),
          },
        }}
      />
    ))}
  </div>
);
