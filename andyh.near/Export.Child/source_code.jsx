import type XYZ from "wherever";
import Markdown from "marked-react";

export interface ChildProps {
  name: string;
}

export const Child = (props: ChildProps) => {
  return <Markdown>{`#### child ${props.name}`}</Markdown>;
};
