const Table = styled.table`
  width: 100%;
  border-radius: 8px;
  overflow:hidden;
  border:0.1px solid #30C9F3;
  margin: 20px 0;
  border-collapse: separate;
  border-spacing: 0;
`;

const TableHead = styled.thead`
  background-color: #F8FAFC;
`;

const TableRow = styled.tr`

`;

const TableHeader = styled.th`
  padding: 8px;
  font-weight:500;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 8px;
`;

const ActionButton = styled.button`
  color: black;
  padding: 5px 10px;
  padding-bottom:8px;
  background-color:transparent;
  border:1px solid lightgray;
  border-radius: 5px;
  cursor: pointer;
`;

State.init({
  data: [
    { question: "Email", isRequired: true },
    { question: "Full Name", isRequired: false },
    { question: "How did you find out about this event", isRequired: false },
  ],
  isAddCustomFieldModalOpen: false,
  editMode: false,
  editVal: "",
});
console.log(state);
return (
  <>
    <p style={{ fontSize: 20, fontWeight: "500", marginBottom: 0 }}>
      Collect Information
    </p>
    <p style={{ fontSize: 14, color: "#475569" }}>
      Select which information you’d like to capture from attendees, or
      alternatively create your own custom text-input.
    </p>
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Questions</TableHeader>
            <TableHeader>Is Required ?</TableHeader>
            <TableHeader />
          </TableRow>
        </TableHead>
        <tbody style={{ borderRadius: 10 }}>
          {state.data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.question}</TableCell>
              <TableCell>
                <Widget
                  props={{
                    isToggled: item.isRequired,
                    handleToggle: () => {
                      const dataState = [...state.data];
                      dataState[index].isRequired = !item.isRequired;
                      State.update({ data: dataState });
                    },
                  }}
                  src="harrydhillon.near/widget/Keypom.Components.Toggle"
                />
              </TableCell>
              <TableCell>
                <ActionButton
                  onClick={() => {
                    State.update({
                      data: state.data.filter((item, idx) => idx !== index),
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.51069 0.583008H7.48899C7.79649 0.582998 8.06177 0.582989 8.28027 0.600841C8.51089 0.619683 8.74027 0.661284 8.96099 0.773747C9.29027 0.941526 9.55799 1.20924 9.72577 1.53853C9.83823 1.75925 9.87983 1.98862 9.89867 2.21924C9.91467 2.41511 9.91632 2.64857 9.91649 2.91634H12.2498C12.572 2.91634 12.8332 3.17751 12.8332 3.49968C12.8332 3.82184 12.572 4.08301 12.2498 4.08301H11.6665V10.0571C11.6665 10.5267 11.6665 10.9142 11.6407 11.2299C11.6139 11.5578 11.5564 11.8592 11.4122 12.1423C11.1885 12.5814 10.8315 12.9383 10.3925 13.162C10.1094 13.3063 9.80796 13.3638 9.48007 13.3906C9.16437 13.4164 8.77684 13.4164 8.30728 13.4163H5.6924C5.22284 13.4164 4.8353 13.4164 4.51961 13.3906C4.19172 13.3638 3.89031 13.3063 3.60719 13.162C3.16815 12.9383 2.81119 12.5814 2.58749 12.1423C2.44324 11.8592 2.38574 11.5578 2.35895 11.2299C2.33316 10.9142 2.33316 10.5267 2.33317 10.0571L2.33317 4.08301H1.74984C1.42767 4.08301 1.1665 3.82184 1.1665 3.49968C1.1665 3.17751 1.42767 2.91634 1.74984 2.91634H4.08319C4.08335 2.64857 4.085 2.41511 4.101 2.21924C4.11984 1.98862 4.16145 1.75925 4.27391 1.53853C4.44169 1.20924 4.7094 0.941526 5.03869 0.773747C5.25941 0.661284 5.48879 0.619683 5.7194 0.600841C5.9379 0.582989 6.20318 0.582998 6.51069 0.583008ZM3.49984 4.08301V10.033C3.49984 10.5327 3.50029 10.8724 3.52174 11.1349C3.54264 11.3906 3.58051 11.5214 3.627 11.6127C3.73885 11.8322 3.91733 12.0107 4.13685 12.1225C4.22808 12.169 4.35887 12.2069 4.61461 12.2278C4.87716 12.2492 5.21683 12.2497 5.7165 12.2497H8.28317C8.78284 12.2497 9.12251 12.2492 9.38507 12.2278C9.64081 12.2069 9.77159 12.169 9.86283 12.1225C10.0823 12.0107 10.2608 11.8322 10.3727 11.6127C10.4192 11.5214 10.457 11.3906 10.4779 11.1349C10.4994 10.8724 10.4998 10.5327 10.4998 10.033V4.08301H3.49984ZM8.7498 2.91634H5.24988C5.25014 2.64503 5.25192 2.45958 5.26379 2.31425C5.27674 2.15578 5.29872 2.09702 5.31342 2.06818C5.36934 1.95842 5.45858 1.86918 5.56834 1.81326C5.59719 1.79856 5.65594 1.77658 5.81441 1.76363C5.97969 1.75013 6.19685 1.74968 6.53317 1.74968H7.4665C7.80283 1.74968 8.01999 1.75013 8.18527 1.76363C8.34374 1.77658 8.40249 1.79856 8.43133 1.81326C8.54109 1.86918 8.63033 1.95842 8.68626 2.06818C8.70095 2.09702 8.72293 2.15578 8.73588 2.31425C8.74775 2.45958 8.74954 2.64503 8.7498 2.91634Z"
                      fill="#F87171"
                    />
                  </svg>
                </ActionButton>
                <ActionButton
                  onClick={() => {
                    State.update({
                      isAddCustomFieldModalOpen: true,
                      editMode: true,
                      questionToEditIndex: index,
                      editVal: item.question,
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_3966_3337)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.3794 1.04599C11.0904 0.334931 12.2433 0.334932 12.9543 1.04599C13.6654 1.75704 13.6654 2.90989 12.9543 3.62095L7.37604 9.19921C7.3645 9.21076 7.35306 9.22222 7.34171 9.23359C7.17403 9.40158 7.02619 9.5497 6.84795 9.65892C6.69138 9.75487 6.52067 9.82558 6.34211 9.86845C6.13885 9.91724 5.92958 9.91705 5.69222 9.91683C5.67616 9.91681 5.65996 9.9168 5.64363 9.9168H4.66681C4.34465 9.9168 4.08348 9.65563 4.08348 9.33347V8.35667C4.08348 8.34033 4.08347 8.32414 4.08345 8.30807C4.08323 8.07071 4.08304 7.86145 4.13183 7.65819C4.1747 7.47962 4.24541 7.30892 4.34136 7.15234C4.45058 6.97411 4.5987 6.82627 4.76669 6.65859C4.77806 6.64724 4.78952 6.6358 4.80107 6.62425L10.3794 1.04599ZM12.1293 1.87094C11.8739 1.6155 11.4598 1.6155 11.2043 1.87094L5.62603 7.44921C5.40462 7.67062 5.36379 7.71675 5.33611 7.76192C5.30412 7.81412 5.28055 7.87102 5.26626 7.93054C5.2539 7.98206 5.25015 8.04354 5.25015 8.35667V8.75013H5.64363C5.95675 8.75013 6.01824 8.74638 6.06976 8.73401C6.12928 8.71972 6.18618 8.69616 6.23837 8.66417C6.28355 8.63649 6.32967 8.59566 6.55108 8.37425L12.1293 2.79599C12.3848 2.54054 12.3848 2.12639 12.1293 1.87094ZM3.94274 1.75013L6.41683 1.75013C6.739 1.75013 7.00016 2.0113 7.00016 2.33347C7.00016 2.65563 6.739 2.9168 6.41683 2.9168H3.96683C3.46716 2.9168 3.12749 2.91725 2.86494 2.9387C2.60919 2.9596 2.47841 2.99747 2.38717 3.04396C2.16765 3.15581 1.98917 3.33429 1.87732 3.55381C1.83084 3.64504 1.79296 3.77583 1.77207 4.03157C1.75062 4.29412 1.75016 4.63379 1.75016 5.13347V10.0335C1.75016 10.5331 1.75062 10.8728 1.77207 11.1354C1.79296 11.3911 1.83084 11.5219 1.87732 11.6131C1.98917 11.8326 2.16765 12.0111 2.38717 12.123C2.47841 12.1695 2.60919 12.2073 2.86494 12.2282C3.12749 12.2497 3.46716 12.2501 3.96683 12.2501H8.86683C9.3665 12.2501 9.70617 12.2497 9.96872 12.2282C10.2245 12.2073 10.3553 12.1695 10.4465 12.123C10.666 12.0111 10.8445 11.8326 10.9563 11.6131C11.0028 11.5219 11.0407 11.3911 11.0616 11.1354C11.083 10.8728 11.0835 10.5331 11.0835 10.0335V7.58347C11.0835 7.2613 11.3447 7.00013 11.6668 7.00013C11.989 7.00013 12.2502 7.2613 12.2502 7.58347V10.0576C12.2502 10.5271 12.2502 10.9147 12.2244 11.2304C12.1976 11.5583 12.1401 11.8597 11.9958 12.1428C11.7721 12.5818 11.4152 12.9388 10.9761 13.1625C10.693 13.3067 10.3916 13.3642 10.0637 13.391C9.74803 13.4168 9.36049 13.4168 8.89094 13.4168H3.94272C3.47316 13.4168 3.08563 13.4168 2.76993 13.391C2.44204 13.3642 2.14063 13.3067 1.85752 13.1625C1.41847 12.9388 1.06152 12.5818 0.837815 12.1428C0.693562 11.8597 0.636066 11.5583 0.609276 11.2304C0.583483 10.9147 0.583489 10.5271 0.583496 10.0576V5.10937C0.583489 4.63981 0.583483 4.25226 0.609276 3.93657C0.636066 3.60868 0.693562 3.30727 0.837815 3.02415C1.06152 2.58511 1.41847 2.22816 1.85752 2.00445C2.14063 1.8602 2.44204 1.8027 2.76993 1.77591C3.08563 1.75012 3.47317 1.75013 3.94274 1.75013Z"
                        fill="#3E3E3E"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3966_3337">
                        <rect width="14" height="14" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </ActionButton>
                {/* You can add more actions or buttons here */}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <button
        style={{
          backgroundColor: "black",
          borderWidth: 0,
          borderRadius: 5,
          paddingLeft: 15,
          paddingRight: 15,
        }}
        onClick={() => {
          State.update({ isAddCustomFieldModalOpen: true });
        }}
      >
        Add custom field
      </button>
    </div>
    {state.isAddCustomFieldModalOpen && (
      <Widget
        src="harrydhillon.near/widget/Keypom.CollectInfo.AddCustomFieldModal"
        props={{
          isOpen: state.isAddCustomFieldModalOpen,
          editMode: state.editMode,
          editVal: state.editVal,
          onSave: (data) => {
            State.update({ isAddCustomFieldModalOpen: false });
            if (data.fieldVal !== "") {
              if (state.editMode) {
                const dataState = [...state.data];
                dataState[state.questionToEditIndex].question = data.fieldVal;
                State.update({
                  data: dataState,
                  editMode: false,
                  questionToEditIndex: null,
                  editVal: null,
                });
              } else {
                State.update({
                  data: [
                    ...state.data,
                    { question: data.fieldVal, required: false },
                  ],
                });
              }
            }
          },
          onClose: () => {
            State.update({
              isAddCustomFieldModalOpen: false,
              editMode: false,
              questionToEditIndex: null,
              editVal: null,
            });
          },
        }}
      />
    )}
  </>
);
