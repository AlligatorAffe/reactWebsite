import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./tailwind.css"; // Uppdatera sökvägen till din Tailwind CSS-fil

import Blog from "./Pages/blog";
import About from "./Pages/about";
import Login from "./Pages/login";

import NoPage from "./Pages/noPage";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import CreateAccount from "./Pages/createAccount";
import ForgotPassword from "./Pages/forgotPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogpost" element={<Blog />} />
          <Route path="pages/about" element={<About />} />
          <Route path="pages/login" element={<Login />} />
          <Route path="pages/create-account" element={<CreateAccount />} />
          <Route path="pages/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<NoPage />} />
          {/* Lägg till fler rutter efter behov */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

/*
return (
  <>
    <Header title="Mitt project i landvetter"></Header>
    <div className="pb-60">
      <h1 className=" text-fuchsia-700">HEJ FRÅN FRAMSIDAN</h1>
    </div>
    <div className="card">
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </div>
  </>
);
}

*/
