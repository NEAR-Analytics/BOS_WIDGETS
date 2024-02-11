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

  const start = {
    buttonTitle: "GET STARTED",
    style: {
        width:"auto"
    },
    onClick: () => {},
    type: "button",
  };

  const why = {
    buttonTitle: "WHY WIREFRAMES",
    style: {
        width:"auto"
    },
    onClick: () => {},
    type: "button",
  };

  const gitHub = {
    buttonTitle: "GITHUB",
    style: {
        width:"auto"
    },
    onClick: () => {},
    type: "button",
  };

  const data ={children : (<>
    <div className="p-4 d-flex justify-content-center">
        <div className="row d-flex justify-content-center">
            <div className="pt-5 row d-flex justify-content-center">
            <img src="https://firebasestorage.googleapis.com/v0/b/kaliba-testing-web.appspot.com/o/wireframes-high-resolution-logo-transparent.png?alt=media&token=00bec9dc-6d8f-433b-aae6-7cf5d97f3a7b" style={{ height:"100px",width:"90%" }}/>
            </div>
    <h1 className="pt-5 d-flex justify-content-center">Wireframes Bos Component Theme</h1>
        <p className="d-flex justify-content-center">Explore our collection today and unlock the potential of your web design journey with Wireframes.</p>
    
        <div className="pt-5 row d-flex justify-content-center">
    
    </div>
    <hr/>
    <h2 className="pt-5 d-flex justify-content-center">We are comming soon</h2>
        <p className="d-flex justify-content-center">Our team have been working on something amazing.</p>
    

    </div>
    
    </div>

    </>)} ;

const navData ={
    navMode:"light",
    logoHref : "#",
    companyName:"Wireframes",
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
