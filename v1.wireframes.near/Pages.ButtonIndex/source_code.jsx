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


const data = {
  children: (
    <>
      <div className="p-4 d-flex justify-content-center">
        <div
          className="row d-flex justify-content-center"
          style={{ paddingTop: "8%" }}
        >
          <h1 className="pt-4">Simple Buttons</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.SimpleBtnDetail`}
          />
          <h1 className="pt-5">Glow Buttons</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.GlowBtnDetail`}
          />
          <h1 className="pt-5">Outline Buttons</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.OutlineBtnDetail`}
          />
          <h1 className="pt-5">Fade Buttons</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.FadeBtnDetail`}
          />
          <h1 className="pt-5">Gradient Buttons</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.GradientBtnDetail`}
          />
          <h1 className="pt-5">Buttons with icon and label</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.IconAndLabelBtnDetail`}
          />

          <h1 className="pt-5">Icon Buttons</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.IconBtnDetail`}
          />
          <h1 className="pt-5">Group Buttons</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.GroupBtnDetail`}
          />
          <h1 className="pt-5">Link Buttons</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.LinkBtnDetail`}
          />
          <h1 className="pt-5">Badge Buttons</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.BadgeBtnDetail`}
          />
          <h1 className="pt-5">Badge Icons</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.BadgeIconBtnDetail`}
          />
          <h1 className="pt-5">Floating Buttons</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.FloatingBtnDetail`}
          />
          <h1 className="pt-5">Floating Buttons with Size</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.FloatingBtnWithSizeDetail`}
          />
          <h1 className="pt-5">Loading Buttons</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Button.ButtonDetail.LoadingBtnDetail`}
          />
        </div>
      </div>
    </>
  ),
};

return (
  <>
    <Widget src={`v1.wireframes.near/widget/Pages.Navigation.Navbar`} />
    <div className="row">
      <Widget
        src={`v1.wireframes.near/widget/Components.Layout.Container`}
        props={data}
      />
    </div>
    <div className="row">
      <Widget src={`v1.wireframes.near/widget/Components.Navigations.Footer`} />
    </div>
  </>
);
