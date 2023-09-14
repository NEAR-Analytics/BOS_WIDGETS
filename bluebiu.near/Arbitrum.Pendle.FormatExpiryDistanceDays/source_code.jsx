if (!props.date) return "-";

const date = new Date(props.date).getTime();
const currentDate = new Date().getTime();

const days = (date - currentDate) / (1000 * 60 * 60 * 24);

return `${Math.trunc(days)} days`;
