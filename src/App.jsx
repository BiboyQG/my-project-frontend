import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/login.component";
import Welcome from "./routes/welcome.component";
import Navbarr from "./component/navbar.component";
import Home from "./component/home.component";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Welcome />}>
        <Route index element={<Login />} />
      </Route>
      <Route path="/" element={<Navbarr />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
