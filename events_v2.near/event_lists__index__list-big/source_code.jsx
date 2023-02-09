let event_lists = props.event_lists;
if (!event_lists) {
  return props.__engine.helpers.propIsRequiredMessage('event_lists');
}

const GRID_PAD = props.__engine.Constants.GRID_PAD;
const ListWrapper = styled.div`
  margin-bottom: ${GRID_PAD};
  width: 100%;
`;

return (
  <>
    {event_lists.map((event_list, idx) => {
      return (
        <ListWrapper key={`${idx}-${event_list.event_list_id}`}>
          {props.__engine.renderComponent('index.list_item', { event_list })}
        </ListWrapper>
      );
    })}
  </>
);
