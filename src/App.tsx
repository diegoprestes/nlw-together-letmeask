import { BrowserRouter, Route } from "react-router-dom";

import AuthProvider from "./contexts/AuthContext";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import "./styles/global.scss";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Route path="/rooms/new" component={NewRoom} />
        <Route path="/" exact component={Home} />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
