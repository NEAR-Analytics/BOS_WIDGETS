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

                                                         


const Container = ({ children }) => {
  return (
      <Widget
      src={`v1.wireframes.near/widget/Components.Layout.Container`}
      props={children}
    />
  );
};


const data ={children : (<>
  <div className="p-4 d-flex justify-content-center">
      <div className="row d-flex justify-content-center" style={{ paddingTop:"inherit" }}>
          <div className="pt-5 row d-flex justify-content-center">
          <img src="https://wireframes.design/wireframes-logo.png" style={{ height:"100px",width:"90%" }}/>
          </div>
  <h1 className="pt-5 d-flex justify-content-center">Wireframes Bos Component Theme</h1>
      <p className="d-flex justify-content-center">Explore our collection today and unlock the potential of your web design journey with Wireframes.</p>
  
      <div className="pt-5 row d-flex justify-content-center">
  
  </div>

  <Widget
          src="v1.wireframes.near/widget/Components.Button.GlowButton"
          props={{ 
            buttonTitle: "Get Started",
            buttonHref:"/embed/v1.wireframes.near/widget/Pages.ButtonIndex",
            type: "button",
            style:{
              width:"10em",
            },
            inlineStyle:{
              textDecoration:"none"
            }
           }}
        />
  <hr className="mt-5"/>
      <p className="d-flex justify-content-center">Our team have been working on something amazing.</p>
  

  </div>
  
  </div>

  </>)} ;

const navData ={
  navMode:"light",
  logoHref : "https://wireframes.design",
  companyName:"Wireframes",
  navStyle:{
    background:"white",
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
  },
  inlineStyle:{
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      fontFamily:"Exo"
  },
  linksData:[
     ],

};
return(
  <>
   <Widget
      src={`v1.wireframes.near/widget/Components.Navigations.Navbar`}
      props={navData}
    />
    <div className="" style={{ height:"100svh" }}>
  <Widget
      src={`v1.wireframes.near/widget/Components.Layout.Container`}
      props={data}
    />
  </div>
<Widget
      src={`v1.wireframes.near/widget/Components.Navigations.Footer`}
    />

  </>
);
