import { Container } from "reactstrap";
import { Button } from "reactstrap";
function Home(props) {
  return (
    <Container>
      <h1>Welcome to D3 app</h1>
      <Button onClick={() => props.history.push("/dashboard")} color="info">
        Go to dashbaord
      </Button>{" "}
    </Container>
  );
}

export default Home;

