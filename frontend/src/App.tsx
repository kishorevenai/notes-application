import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllNotes from "./Pages/Notes/AllNotes";
import { PrefetchNotes } from "./Pages/Notes/PrefetchNotes";
import Layout from "./Layout/Layout";
import EditNote from "./Pages/Notes/EditNote";
import Signin from "./Pages/Signup/Signin";
import Signup from "./Pages/Login/Signup";
import PersistLogin from "./middleware/PersistLogin";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Signin />}></Route>
        <Route path="/Sign up" element={<Signup />}></Route>
        <Route element={<PersistLogin />}>
          <Route path="/Notes" element={<AllNotes />}></Route>
          <Route path="note/:id" element={<EditNote />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
