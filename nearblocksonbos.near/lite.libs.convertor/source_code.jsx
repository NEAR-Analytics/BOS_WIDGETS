const YOCTO_PER_NEAR = Big(10).pow(24);
const MS_PER_NS = Big(10).pow(6);
const T_GAS = Big(10).pow(12);
const convertor = () => {
  const yoctoToNear = (value) => {
    const yocto = Big(value);
    return yocto.div(YOCTO_PER_NEAR).toString();
  };
  const yoctoToTgas = (value) => {
    const near = Big(yoctoToNear(value));
    return near.mul(T_GAS).toString();
  };
  const nsToMs = (value) => {
    const ns = Big(value);
    return ns.div(MS_PER_NS).toNumber();
  };
  const nsToDateTime = (value, format) => {
    const date = new Date(nsToMs(value));
    const year = date.getFullYear().toString();
    const year2 = date.getFullYear().toString().slice(2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours();
    const hour12 = (hour % 12 || 12).toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");
    const ampm = hour >= 12 ? "PM" : "AM";
    const replacements = {
      YYYY: year,
      YY: year2,
      MM: month,
      DD: day,
      HH: hour.toString().padStart(2, "0"),
      hh: hour12,
      mm: minute,
      ss: second,
      AA: ampm,
    };
    let formatted = format;
    for (const [token, value] of Object.entries(replacements)) {
      formatted = formatted.replace(token, value);
    }
    return formatted;
  };
  const nsToTimeAgo = (value) => {
    const now = new Date().getTime();
    const diff = now - nsToMs(value);
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;
    const intervals = [
      { value: second, unit: "second" },
      { value: minute, unit: "minute" },
      { value: hour, unit: "hour" },
      { value: day, unit: "day" },
      { value: week, unit: "week" },
      { value: month, unit: "month" },
      { value: year, unit: "year" },
    ];
    for (const interval of intervals) {
      if (diff >= interval.value) {
        const count = Math.floor(diff / interval.value);
        return `${count} ${interval.unit}${count > 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  };
  return { nsToMs, nsToDateTime, nsToTimeAgo, yoctoToNear, yoctoToTgas };
};
return convertor(props);
