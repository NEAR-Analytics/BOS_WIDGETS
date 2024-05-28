const { value } = props;
const digits = props.digits || 4;

if (isNaN(Number(value))) return "-";
if (Big(value).eq(0)) return 0;

return Big(value).toFixed(digits, 0);
