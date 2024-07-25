import React from "react";
import TodoWrapper from "./components/TodoWrapper";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
	<>
		<TodoWrapper />
		<ToastContainer />
	</>
);

export default App;
