import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/login.component";
import Welcome from "./routes/welcome.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />}>
        <Route index element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
