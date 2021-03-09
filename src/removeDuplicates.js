export function removeDuplicates(arr) {
  let result = [];
  arr.forEach((element) => {
    if (!result.includes(element)) {
      result.push(element);
    }
  });
  return result.sort((a, b) => a - b);
}
