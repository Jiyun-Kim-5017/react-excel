import "./App.css";
import ExcelJS from "exceljs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import { Table } from "./Table";
import { font } from "./font";

const data = await axios.get("http://localhost:5000/data").then((res) => {
	return res.data;
});

// TH
const headers = [
	"국교부 수신일",
	"시도 수신일",
	"등록일시",
	"행정동코드",
	"차번호",
	"주민번호",
];
// TH width, 단위는 엑셀의 너비 기준
const headerWidths = [16, 16, 16, 16, 16, 16];

const styleHeaderCell = (cell) => {
	cell.fill = {
		type: "pattern",
		pattern: "solid",
		fgColor: { argb: "ffebebeb" },
	};
	cell.border = {
		bottom: { style: "thin", color: { argb: "-100000f" } },
		right: { style: "thin", color: { argb: "-100000f" } },
	};
	cell.font = {
		name: "Arial",
		size: 12,
		bold: true,
		color: { argb: "ff252525" },
	};
	cell.alignment = {
		vertical: "middle",
		horizontal: "center",
		wrapText: true,
	};
};

const styleDataCell = (cell) => {
	cell.fill = {
		type: "pattern",
		pattern: "solid",
		fgColor: { argb: "ffffffff" },
	};
	cell.border = {
		bottom: { style: "thin", color: { argb: "-100000f" } },
		right: { style: "thin", color: { argb: "-100000f" } },
	};
	cell.font = {
		name: "Arial",
		size: 10,
		color: { argb: "ff252525" },
	};
	cell.alignment = {
		vertical: "middle",
		horizontal: "center",
		wrapText: true,
	};
};

const downloadList = async (rows) => {
	try {
		// workbook 생성
		const workbook = new ExcelJS.Workbook();
		// sheet 생성
		const sheet = workbook.addWorksheet("엑셀");

		// 상단 헤더(TH) 추가
		const headerRow = sheet.addRow(headers);
		// 헤더의 높이값 지정
		headerRow.height = 30.75;
		// 각 헤더 cell에 스타일 지정
		headerRow.eachCell((cell, colNum) => {
			styleHeaderCell(cell);
			sheet.getColumn(colNum).width = headerWidths[colNum - 1];
		});
		console.log(rows);
		// 각 Data cell에 데이터 삽입 및 스타일 지정
		rows.forEach((data) => {
			const appendRow = sheet.addRow(Object.values(data));

			appendRow.eachCell((cell, colNum) => {
				styleDataCell(cell, colNum);
				if (colNum === 1) {
					cell.font = {
						color: { argb: "ff1890ff" },
					};
				}
				// if (colNum === 3) {
				// 	cell.numFmt = "0,000";
				// }
			});
		});

		// 파일 생성
		workbook.xlsx.writeBuffer().then((data) => {
			const blob = new Blob([data], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});
			const url = window.URL.createObjectURL(blob);
			const anchor = document.createElement("a");
			anchor.href = url;
			anchor.download = `엑셀.xlsx`;
			anchor.click();
			window.URL.revokeObjectURL(url);
		});
	} catch (error) {
		console.log(error);
	}
};

const downloadPDF = (font) => {
	console.log(font);
	const doc = new jsPDF("p", "mm", "a4");

	doc.addFileToVFS("malgun.ttf", font);
	doc.addFont("malgun.ttf", "malgun", "normal");
	doc.setFont("malgun");

	doc.line(15, 19, 195, 19);

	autoTable(doc, {
		theme: "plain",
		margin: { top: 30 },
		styles: { font: "malgun" },
		headStyles: {
			halign: "center",
			valign: "middle",
			fillColor: [234, 234, 234],
			lineColor: [200, 200, 200],
			lineWidth: 0.1,
		},
		bodyStyles: {
			lineColor: [200, 200, 200],
			lineWidth: 0.1,
		},
		html: "#dataTable",
	});

	doc.save("table.pdf");
};

function App() {
	return (
		<>
			<div className="App">
				<Table data={data} />
				<button onClick={() => downloadList(data)}>엑셀</button>
				<button onClick={() => downloadPDF(font)}>PDF</button>
			</div>
		</>
	);
}

export default App;
