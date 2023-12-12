import Markdown from "marked-react";

export const X = (props: { name: string }) => {
  return <Markdown>{`#### child ${props.name}`}</Markdown>;
};
