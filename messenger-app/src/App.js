import { AuthProvider } from "./contexts/auth-context";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
          <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
          <Route path="/" element={<>Chat rooms</>}></Route>
          <Route path="*" element={<>Oop ! 404 </>}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
