props.__layout.change('container', {
  title: 'My events',
});

return props.__engine.renderComponent('index.list_container', {
  forAccountId: props.__engine.accountId,
});
