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
          <h1 className="pt-4">Inputs with Label</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Input.InputDetail.InputWithLabelDetail`}
          />
          <h1 className="pt-5">Inputs with Sizes</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Input.InputDetail.InputWithSizeDetail`}
          />
          <h1 className="pt-5">Input Password</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Input.InputDetail.PasswordInputFieldDetail`}
          />
          <h1 className="pt-5">Input with Icon</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Input.InputDetail.InputFieldWithIconDetail`}
          />
          <h1 className="pt-5">Custom file input</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Input.InputDetail.FileUploadInputDetail`}
          />
          <h1 className="pt-5">Input Search</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Input.InputDetail.InputSearchDetail`}
          />
          <h1 className="pt-5">Custom Select</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Input.InputDetail.SelectInputDetail`}
          />
          <h1 className="pt-5">Checkbox</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Input.InputDetail.CheckboxDetail`}
          />
          <h1 className="pt-5">Toggle</h1>
          <Widget
            src={`v1.wireframes.near/widget/Components.Input.InputDetail.ToggleDetail`}
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
