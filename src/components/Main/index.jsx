import styles from "./styles.module.css";
import { Link } from "react-router-dom";
const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>IAPROresume</h1>
				<Link to="/home"><h1>CV</h1></Link>

				<Link to="/lettre"><h1>Lettre</h1></Link>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
	);
};

export default Main;
