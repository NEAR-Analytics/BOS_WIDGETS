import Markdown from "marked-react";

export const X = (props) => {
  return <Markdown>{`#### child ${props.name}`}</Markdown>;
};
