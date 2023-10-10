import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Files } from "../src/pages/Files/Files";
import { Home } from "../src/pages/Home/Home";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="" element={<Home />} />
					<Route path="/files" element={<Files />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
