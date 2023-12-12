import Markdown from "marked-react";

export const Child = (props: ChildProps) => {
  return <Markdown>{`#### child ${props.name}`}</Markdown>;
};

interface ChildProps {
  name: string;
}
