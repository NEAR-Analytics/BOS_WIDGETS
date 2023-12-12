import Markdown from "marked-react";

export const Child = (props: ChildProps) => {
  return <Markdown>{`#### child ${props.name}`}</Markdown>;
};

export interface ChildProps {
  name: string;
}
