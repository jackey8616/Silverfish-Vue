// src/utiles.ts
export default function () {
  function formatDate(dateOrStr: Date | string, second: boolean) {
    const date = dateOrStr instanceof Date ? dateOrStr : new Date(dateOrStr);
    const m = `0${date.getMonth() + 1}`.slice(-2);
    const d = `0${date.getDate()}`.slice(-2);
    const h = `0${date.getHours()}`.slice(-2);
    const M = `0${date.getMinutes()}`.slice(-2);
    if (second === undefined || second === false) {
      return `${date.getFullYear()}/${m}/${d} ${h}:${M}`;
    }
    const s = `0${date.getSeconds()}`.slice(-2);
    return `${date.getFullYear()}/${m}/${d} ${h}:${M}:${s}`;
  }

  function simpleFormatDate(dateOrStr: Date | string) {
    const date = dateOrStr instanceof Date ? dateOrStr : new Date(dateOrStr);
    const y = date.getFullYear().toString().substr(-2);
    const m = `0${date.getMonth() + 1}`.slice(-2);
    const d = `0${date.getDate()}`.slice(-2);
    return `${y}/${m}/${d}`;
  }

  return { formatDate, simpleFormatDate };
}
