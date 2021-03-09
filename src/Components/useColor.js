import * as d3 from "d3";
export default function useColor(group) {
  const scale = d3.scaleOrdinal(d3.schemeCategory10);
  return (d) => {
    if (group) {
      return scale(d.group > group);
    }
    return scale(d.group);
  };
}
