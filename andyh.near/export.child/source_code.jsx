import Markdown from "marked-react";

export interface ChildProps {
  name: string;
}

export const BWEComponent = (props: ChildProps) => {
  return <Markdown>{`#### child ${props.name}`}</Markdown>;
};
