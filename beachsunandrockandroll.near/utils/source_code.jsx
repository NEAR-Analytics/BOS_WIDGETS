const getNormalDate = (value) =>
  new Date(parseInt(value.toString() + "000")).toLocaleString();

const ppdContract = "0x4D8354Eda3c1Cd9D85E44C63535468Ec3EaF876C";

const ppdAbi = fetch(
  "https://raw.githubusercontent.com/gonzalobarria/testpub/master/abis/abitest.json"
);

const studyType = ["Fingers", "Rhythm", "Memorization", "Dynamics"];
const focusType = ["Study", "Practice"];

return { getNormalDate, ppdContract, ppdAbi, studyType, focusType };
