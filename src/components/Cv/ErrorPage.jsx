import React from "react";
import './styles.css';
import { Link } from "react-router-dom";

const ErrorPage = () => {
	return (
		<div className='app'>
			<h3>
				You've not provided your details. Kindly head back to the{" "}
				<Link to='/home'>home page</Link>.
			</h3>
		</div>
	);
};

export default ErrorPage;