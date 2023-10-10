import React from "react";
import axios from "axios";
import { Table } from "../../components/Table";
import { File } from "./Files.styles";
import { Button } from "../../components/Button.styels";
import { font } from "../../font/font";
import { downloadEXCEL } from "../../functions/downloadEXCEL";
import { downloadPDF } from "../../functions/downloadPDF";

const data = await axios.get("http://localhost:5000/data").then((res) => {
	return res.data;
});

export const Files = () => {
	return (
		<File>
			<Table data={data} />
			<Button onClick={() => downloadEXCEL(data)}>엑셀</Button>
			<Button onClick={() => downloadPDF(font)}>PDF</Button>
		</File>
	);
};
