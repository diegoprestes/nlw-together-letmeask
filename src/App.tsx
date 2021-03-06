import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AuthProvider from "./contexts/AuthContext";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";

import "./styles/global.scss";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/admin/rooms/:id" component={AdminRoom} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/" exact component={Home} />
        </Switch>
      </AuthProvider>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
