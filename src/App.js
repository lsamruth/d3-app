import React, { Suspense, lazy } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Components/Header';

const Home = lazy(() => import("./Home"));
const Dashboard = lazy(() => import("./Dashboard"));

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
