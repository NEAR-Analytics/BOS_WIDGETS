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

                          
const StyleContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding-right: 2%;
  padding-left: 2%;
  width: 96%; /* Use 100% - (2% + 2%) to account for padding on both sides */
  text-wrap: wrap;
  /* Responsive container */
  @media (min-width: 576px) {
    width: 94%;
  }
  @media (min-width: 768px) {
    width: 92%;
  }
  @media (min-width: 992px) {
    width: 90%;
  }
  @media (min-width: 1200px) {
    width: 88%;
  }
`;

const StyleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  background-color:black;
`;

const Col = styled.div`
  padding: 15px;
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  background-color:gray;
`;



const children = props.children ?? (<h1>Please Enter Children</h1>);
return (
    <StyleContainer>
    { children }
    </StyleContainer>
);
