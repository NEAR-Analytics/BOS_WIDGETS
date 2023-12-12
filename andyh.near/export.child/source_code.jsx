import Markdown from "marked-react";

interface ChildProps {
  name: string;
}

export const X = (props: ChildProps) => {
  return <Markdown>{`#### child ${props.name}`}</Markdown>;
};
