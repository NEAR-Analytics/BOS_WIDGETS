import type { ChildProps } from "./Export.Child";
import Markdown from "marked-react";

export function BWEComponent() {
  return (
    <>
      <Markdown># ≥≈˚∆˚≈≤ </Markdown>
      <Component src="andyh.near/Export.Child" props={{ name: "Child" } as ChildProps} />
    </>
  );
}
