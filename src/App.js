import "./App.css";
import axios from "axios";
import { Table } from "./components/Table";
import { font } from "./font/font";
import { downloadEXCEL } from "./functions/downloadEXCEL";
import { downloadPDF } from "./functions/downloadPDF";

const data = await axios.get("http://localhost:5000/data").then((res) => {
	return res.data;
});

function App() {
	return (
		<>
			<div className="App">
				<Table data={data} />
				<button onClick={() => downloadEXCEL(data)}>엑셀</button>
				<button onClick={() => downloadPDF(font)}>PDF</button>
			</div>
		</>
	);
}

export default App;
