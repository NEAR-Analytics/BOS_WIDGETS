State.init({
  cMethod: props.cMethod,
  widgetName: props.widgetName || `MagicBuild-widget-form-${Date.now()}`,
  clicked: false,
  export: false,
});
const onSwitchChangeArgExport = (fIndex) => {
  const abiMethod = state.cMethod;
  abiMethod[fIndex].export = !abiMethod[fIndex].export;
  State.update({ cMethod: abiMethod });
  State.update({ clicked: false });
  State.update({ export: false });
};
const onInputChangeWidgetName = ({ target }) => {
  State.update({ widgetName: target.value.replaceAll(" ", "-") });
  State.update({ clicked: false });
  State.update({ export: false });
};

const openModal = () => {
  State.update({ clicked: false });
  State.update({ export: false });
};
const exportForm = () => {
  if (!state.clicked) {
    State.update({ clicked: true });
    const abi = {
      schema_version: "0.3.0",
      address: props.contractAddress,
      metadata: {
        name: "",
        version: "0.1.0",
        authors: [""],
      },
      body: {
        functions: [],
      },
    };

    const abiMethod = state.cMethod;
    abiMethod.forEach((item) => {
      abi.body.functions.push(item);
    });
    const exportListData = Social.get(
      `${context.accountId}/magicbuild/exportList`
    );
    const exporttList = JSON.parse(exportListData) || [];
    const isExist = false;
    exporttList.forEach((item, index) => {
      if (item.widgetName == state.widgetName) {
        exporttList[index].widgetName = state.widgetName;
        isExist = true;
      }
    });
    if (!isExist) {
      exporttList.push({ widgetName: state.widgetName });
    }

    const data = {
      widget: {
        [state.widgetName]: {
          "":
            "const user = context.accountId;\r\nconst props = " +
            JSON.stringify(abi).replaceAll("\\", "") +
            " \r\n\r\nreturn (\r\n  <>\r\n    <Widget src={'magicbuild.near/widget/widget'} props={props} />\r\n  </>\r\n);\r\n",
        },
      },
      widgetList: exporttList,
    };
    Social.set(data, {
      force: true,
      onCommit: () => {
        State.update({ export: true });
      },
      onCancel: () => {},
    });
  }
};
return (
  <>
    <label></label>
    <button
      data-bs-toggle="modal"
      data-bs-target="#export"
      class="btn btn-primary form-control "
      onClick={openModal}
    >
      🔼Export
    </button>
    <div
      class="modal fade"
      id="export"
      tabindex="-2"
      aria-labelledby="exportLabel"
      aria-hidden="true"
    ></div>
  </>
);
