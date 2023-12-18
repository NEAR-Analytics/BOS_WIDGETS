const iframe = document.createElement("iframe");

// 设置 iframe 的 src 属性为目标网页地址
iframe.src = "https://zksync.satori.finance";

// 把 iframe 插入到页面中
document.body.appendChild(iframe);

iframe.onload = function () {
  console.log("iframe ok");
};
