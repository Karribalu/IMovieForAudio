export const getMinutes = (time) => {
  let minutes = Math.floor(time / 60);
  if (minutes < 10) {
    return "0" + minutes;
  }
  return minutes;
};
export const getSeconds = (time) => {
  let seconds = Math.ceil(time - getMinutes(time) * 60);
  if (seconds < 10) {
    return "0" + seconds;
  }
  return seconds;
};
