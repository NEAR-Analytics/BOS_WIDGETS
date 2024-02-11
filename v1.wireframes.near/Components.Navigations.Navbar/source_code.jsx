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

                          
const logoHref = props.logoHref ?? "";
const logoSrc = props.logoSrc ?? "";
const logoAlt = props.logoAlt ?? "Company logo";
const companyName = props.companyName ?? "";
const linksData = props.linksData ?? [];
const navMode = props.navMode ?? "dark";
const navbarClasses = `navbar navbar-expand-xl ${navMode === 'light' ? 'navbar-light' : 'navbar-dark bg-dark'}`;

const navStyle = props.inlineStyle ?? "";
  return (
    <>
     
    <div className={navbarClasses} style={navStyle}>
      <div className="container-fluid">
        <a className="navbar-brand" href={logoHref} >
        {logoSrc && (<img className="mb-3" style={{ width:"50px",
    height:"50px"}} src={logoSrc} alt={logoAlt}/>)  
            }
           <span style={{ fontSize:"1.3em",fontFamily:"sans-serif" }}>{companyName}</span> 
        </a>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {linksData.map((data) => (
              <li className="nav-item">
              <a className="nav-link" href={data.menuHref}>
              {data.menuName}
              </a>
            </li>           
                 ))}

          </ul>
          
        </div> 
      </div>
    </div>
 
    </>
  );