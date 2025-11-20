import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import News from "../pages/News";
import PrivateRouter from "./PrivateRouter";
import Login from '../pages/Login';

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/" element={<PrivateRouter />}>
                <Route path="" element={<News />}/>
            </Route>

            <Route path="/login" element={<Login/>}/>

        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;