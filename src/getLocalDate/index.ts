import getTs from '../getTs';

export function getLocalDate(ts: number = getTs()) {
  const date = new Date(ts);
  const tz = date.getTimezoneOffset();
  const dateMap = {
    year: date.getFullYear() + '',
    month: date.getMonth() + 1 + '',
    day: date.getDate() + '',
    hour: date.getHours() + '',
    minute: date.getMinutes() + '',
    second: date.getSeconds() + '',
    timezone: Math.abs(tz) / 60 + ''
  };
  for (const k in dateMap) {
    if (Object.prototype.hasOwnProperty.call(dateMap, k)) {
      const item = dateMap[k as keyof typeof dateMap];
      if (item.length <= 1) {
        dateMap[k as keyof typeof dateMap] = `0${item}`;
      }
    }
  }

  return `${dateMap.month}/${dateMap.day}/${dateMap.year} ${dateMap.hour}:${dateMap.minute}:${dateMap.second} GMT${tz > 0 ? '-' : '+'}${dateMap.timezone}00`;
}

export default getLocalDate;
