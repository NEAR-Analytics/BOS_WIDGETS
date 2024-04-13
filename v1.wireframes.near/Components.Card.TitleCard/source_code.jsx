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
const cardHeader = props.cardHeader;
const cardBody = props.cardBody;
const cardStyle = props.cardStyle;
const cardHeaderStyle = props.cardHeaderStyle;

const cardBodyStyle = props.cardBodyStyle;
return (
  <>
    <div className="card" style={cardStyle}>
      {cardHeader && (
        <div className="card-header" style={cardHeaderStyle}>
          {cardHeader}
        </div>
      )}
      <div className="card-body" style={cardBodyStyle}>
        {cardBody}
      </div>
    </div>
  </>
);
