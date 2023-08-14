const DataStorage = styled.div`
    width: 100%;
    height:100%;
    align-item: start;
    padding: 22vh 120px;
    .tableStyle{
        text-align: center;
    }
`;

const OverlayTable = styled.div`
    background: rgba(255, 255, 255, 0.13);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(17.4px);
    -webkit-backdrop-filter: blur(17.4px);
    border: 1px solid rgba(255, 255, 255, 0.3);
`;

State.init({
  modalOn: false,
});

const turnOffModal = (e) => {
  State.update({
    modalOn: false,
  });
};

const props = {
  ...props,
  turnOffModal: turnOffModal,
  modalState: state.modalOn,
};

return (
  <DataStorage className="bg-black">
    <Widget props={props} src="tvh050423.near/widget/UploadFileModal" />
    <button
      className="btn btn-light rounded-pill text-primary mb-3 px-4"
      onClick={() => {
        State.update({ modalOn: true });
        console.log(state);
      }}
    >
      Upload
    </button>
    <OverlayTable className="p-3">
      <table className="table tableStyle text-white">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">No.</th>
            <th scope="col">File Name</th>
            <th scope="col">Total Size</th>
            <th scope="col">Create by</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <th scope="row">1</th>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>Jacob</td>
            <th scope="row">2</th>
            <td>Thornton</td>
            <td>@fat</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>Larry the Bird</td>
            <th scope="row">3</th>
            <td>@twitter</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table>
    </OverlayTable>
  </DataStorage>
);
