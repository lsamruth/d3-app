import { useState, useEffect } from "react";
import * as d3 from "d3";
import useColor from "./useColor";
import useDrag from "./useDrag";

const width = window.innerWidth;
const height = window.innerHeight;

export default function useChart(dataObj, group) {
  const [data, setData] = useState(dataObj);
  const [svgData, setSvgData] = useState(undefined);
  const color = useColor(group);
  const links = data.links.map((d) => Object.create(d));
  const nodes = data.nodes.map((d) => Object.create(d));
  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3.forceLink(links).id((d) => d.id)
    )
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

  const dragObj = useDrag(simulation);

  useEffect(() => {
    const drag = dragObj;

    const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 5)
      .attr("fill", color)
      .call(drag);

    node.append("title").text((d) => d.id);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });

    // invalidation.then(() => simulation.stop());
    setSvgData(svg.node());
  }, [dataObj]);
  return svgData;
}
