console.log("[NSCOMP:CallbackRenderWidget]");
console.log({ props });
if (typeof props.cb === "function") {
  props.cb();
}
return <div>{props.msg}</div>;
