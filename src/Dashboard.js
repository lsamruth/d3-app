import React, { useState, useEffect } from "react";
import { Label, Input } from "reactstrap";
import { Container, Row, Col } from "reactstrap";

import mockData from "./data.json";
import useChart from "./Components/useChart";
import { removeDuplicates } from "./removeDuplicates";

let options = removeDuplicates(mockData.nodes.map((i) => i.group));

function Dashboard() {
  const [data, setData] = useState(mockData);
  const [group, setGroup] = useState(null);
  const chart = useChart(data, group);

  useEffect(() => {
    if (document.getElementById("svg")) {
      document.getElementById("svg").innerHTML = "";
    }
    if (chart) {
      console.log(chart);
      document.getElementById("svg").appendChild(chart);
    }
  });
  useEffect(() => {
    if (document.getElementById("svg")) {
      document.getElementById("svg").innerHTML = "";
    }
    if (chart) {
      console.log(chart);
      document.getElementById("svg").appendChild(chart);
    }
  });

  useEffect(() => {
    if (group) {
      let mock = {};
      mock.nodes = mockData.nodes.filter((i) => i.group >= group);
      mock.links = mockData.nodes.filter((i) => i.value >= group);
      setData(mock);
    }
  }, [group]);

  const handleChange = (event) => {
    const { value } = event.target;
    setGroup(value);
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs="2">
            <Label for="exampleSelect">Select Group</Label>
          </Col>
          <Col xs="3">
            <Input
              type="select"
              onChange={handleChange}
              name="group"
              id="exampleSelect"
            >
              <option>---Select---</option>
              {options.map((i) => (
                <option value={i}>{i}</option>
              ))}
            </Input>
          </Col>
        </Row>

        <div id="svg"></div>
      </Container>
    </div>
  );
}

export default Dashboard;
