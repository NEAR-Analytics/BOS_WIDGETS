import Markdown from "marked-react";

export function X() {
  return (
    <>
      <Markdown># ¶x!</Markdown>
      <Component src="andyh.near/export.child" props={{ name: "grun" }} />
    </>
  );
}
