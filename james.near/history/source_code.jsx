/*
---props---

props.path: string ("hack.near/widget/community")

props.currentBlockHeight: number

props.prevBlockHeight?: number

props.findUniqueResult(
  lineCountDeleted: number, 
  lineCountInserted: inserted,
  lineCountCurrent: number,
  lineCountPrevious: number,
  allLineCount: number
)?: function

props.showLineNumber?: bool

*/
if (!props.path || !props.currentBlockHeight)
  return "send path and currentBlockHeight in props";

const current = Social.get(`${props.path}`, props.currentBlockHeight);

if (current === null) return "Loading...";

const previous = props.prevBlockHeight
  ? Social.get(`${props.path}`, props.prevBlockHeight)
  : undefined;

if (previous === null) return "Loading...";

return (
  <Widget
    src="james.near/widget/diff"
    props={{ current, previous, ...props }}
  />
);
