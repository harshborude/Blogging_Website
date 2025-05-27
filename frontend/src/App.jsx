import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { Toaster } from "react-hot-toast";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";
import Home from "./pages/home.page" // Import the new component
export const UserContext = createContext({});



    

const App = () => {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");
    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <>
        <Toaster position="top-center" reverseOrder={false} />
       

<Routes>
  <Route path="/" element={<Navbar />}>
    {/* If logged in, show Home; otherwise redirect */}
    <Route index element={userAuth?.access_token ? <Home /> : <Navigate to="/signin" />} />
    <Route path="signin" element={<UserAuthForm key="signin" type="sign in" />} />
    <Route path="signup" element={<UserAuthForm key="signup" type="sign up" />} />
  </Route>
</Routes>
      </>
    </UserContext.Provider>
  );
};

export default App;
