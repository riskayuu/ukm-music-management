import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import FotoKegiatan from "./pages/FotoKegiatan";
import Navbar from "./components/Navbar";
import DetailKegiatan from './pages/DetailKegiatan';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/foto-kegiatan" component={FotoKegiatan} />
        <Route path="/kegiatan/:id" element={<DetailKegiatan />} />
        {/* ...other routes... */}
      </Switch>
    </Router>
  );
}

export default App;
