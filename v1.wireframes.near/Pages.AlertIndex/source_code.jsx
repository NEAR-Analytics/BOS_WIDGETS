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
          <h1 className="pt-4">Simple Alert</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Alert.AlertDetail.SimpleAlertDetail`}
          />
          <h1 className="pt-5">Outline Alert</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Alert.AlertDetail.OutlineAlertDetail`}
          />
          <h1 className="pt-5">Various States Examples</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Alert.AlertDetail.AlertStatesDetail`}
          />
          <h1 className="pt-5">Alert</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Alert.AlertDetail.AlertDetail`}
          />
        </div>
      </div>
    </>
  ),
};

return (
  <>
    <Widget src={`v1.wireframes.near/widget/Pages.Navigation.Navbar`} />

    <Widget
      src={`v1.wireframes.near/widget/Components.Layout.Container`}
      props={data}
    />
      <Widget
        src={`v1.wireframes.near/widget/Components.Navigations.Footer`}
      />
  </>
);
