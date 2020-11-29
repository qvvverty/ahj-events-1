export default function randomNumber(max, min = 0) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
