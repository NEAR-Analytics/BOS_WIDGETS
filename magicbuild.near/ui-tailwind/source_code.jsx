const content = (
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    I am an example button
  </button>
);

return (
  <Widget
    src="magicbuild.near/widget/tailwind"
    props={{
      children: content,
    }}
  />
);
