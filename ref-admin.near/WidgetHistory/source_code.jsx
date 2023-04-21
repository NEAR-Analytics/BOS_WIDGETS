/*
---props---

props.widgetPath?: string,

*/
const Container = styled.div`
    background: #15272B;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
    border-radius: 16px;
    
    .title{
        color:#fff;
    }
`;

const initWidgetPath = props.widgetPath;

State.init({
  widgetPath: initWidgetPath,
});

return (
  <Container>
    <h1 class="title text-center">Widget History</h1>

    <div class="input-group mb-3">
      <input
        class="form-control"
        placeholder={initWidgetPath}
        defaultValue={state.widgetPath || initWidgetPath}
        onBlur={(e) => {
          State.update({
            widgetPath: e.target.value,
          });
        }}
      />
    </div>

    <Widget
      src={`ref-admin.near/widget/WidgetHistory.History`}
      props={{
        widgetPath: state.widgetPath,
      }}
    />
  </Container>
);
