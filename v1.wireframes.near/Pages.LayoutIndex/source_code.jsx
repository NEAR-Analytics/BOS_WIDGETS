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
          style={{ paddingTop: "8%",width:"85vw" }}
        >
          <h1 className="pt-4">Container</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Layout.LayoutDetail.ContainerDetail`}
          />
          <h1 className="pt-5">Container Fluid</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Layout.LayoutDetail.ContainerFluidDetail`}
          />

          <h1 className="pt-5">Container Full</h1>

          <Widget
            src={`v1.wireframes.near/widget/Components.Layout.LayoutDetail.ContainerFullDetail`}
          />
        </div>
      </div>
    </>
  ),
};

return (
  <>
    <Widget
      src={`v1.wireframes.near/widget/Pages.Navigation.Navbar`}
      props={{
        activeLink: "Buttons",
      }}
    />
    <div className="row">
      <Widget
        src={`v1.wireframes.near/widget/Components.Layout.Container`}
        props={data}
      />
    </div>
    <div className="row">
      <Widget
        src={`v1.wireframes.near/widget/Components.Navigations.Footer`}
      />
    </div>
  </>
);
