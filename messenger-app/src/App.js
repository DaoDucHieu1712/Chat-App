import { AuthProvider } from "./contexts/auth-context";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/box/:boxId" element={<Home></Home>}></Route>
          <Route path="/" element={<SignIn></SignIn>}></Route>
          <Route path="*" element={<>Oop ! 404 </>}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
