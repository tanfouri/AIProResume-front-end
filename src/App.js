import  { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import Home from "./components/Cv/Home";
import Resume from "./components/Cv/Resume";

import Lettre from "./components/Lettre/Lettre";

function App() {
	const user = localStorage.getItem("token");
	
	const [result, setResult] = useState({});

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/password-reset/:id/:token" element={<PasswordReset />} />
			{user &&<Route path='/home' element={<Home setResult={setResult} />} />}
			{user &&<Route path='/home/resume' element={<Resume result={result} />} />}
			{user && <Route path='/lettre' element={<Lettre/>} />}
		</Routes>
	);
}

export default App;
