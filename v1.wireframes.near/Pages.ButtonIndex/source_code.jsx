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
           
        <h1 className="pt-4">Simple Buttons</h1>
    <Widget src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.SimpleBtnDetail`}/>  
  <h1 className="pt-4">Glow Buttons</h1>  
    <Widget src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.GlowBtnDetail`}/>
  <h1 className="pt-4">Outline Buttons</h1>  
    <Widget src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.OutlineBtnDetail`}/> 
  <h1 className="pt-4">Fade Buttons</h1>  
    <Widget src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.FadeBtnDetail`}/>
  <h1 className="pt-4">Gradient Buttons</h1>  
   <Widget src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.GradientBtnDetail`}/>
  <h1 className="pt-4">Buttons with icon and label</h1>
   <Widget src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.IconAndLabelBtnDetail`}/> 
   
  <h1 className="pt-4">Icon Buttons</h1>
   <Widget src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.IconBtnDetail`}/> 
   <h1 className="pt-4">Group Buttons</h1>
   <Widget src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.GroupBtnDetail`}/> 
   <h1 className="pt-4">Link Buttons</h1>
   <Widget src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.LinkBtnDetail`}/> 
   <h1 className="pt-4">Badge Buttons</h1>
   <Widget src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.BadgeBtnDetail`}/> 
   <h1 className="pt-4">Badge Icons</h1>
   <Widget src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.BadgeIconBtnDetail`}/>
   <h1 className="pt-4">Floating Buttons</h1>
   <Widget src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.FloatingBtnDetail`}/> 
   <h1 className="pt-4">Floating Buttons with Size</h1>
   <Widget src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.FloatingBtnWithSizeDetail`}/> 
   <h1 className="pt-4">Loading Buttons</h1>
   <Widget src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.LoadingBtnDetail`}/> 
    

    </div>    
    </div>

    </>)} ;

return(
    <>
     <Widget src={`v1.wireframes.near/widget/Pages.Navigation.Navbar`}/>
    <Widget
        src={`v1.wireframes.near/widget/Components.Layout.Container`}
        props={data}
      />
<Widget
        src={`v1.wireframes.near/widget/Components.Navigations.Footer`}
      />

    </>
);
