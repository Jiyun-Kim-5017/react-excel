import "./App.css";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
// const ExcelJS = require("exceljs");

const list = [
	{
		CNM: "KMHB5516BPW069503",
		car: "캐스퍼",
		date: "2023-05-01",
	},
	{
		CNM: "KMHB5516BPW123403",
		car: "아반떼",
		date: "2023-05-17",
	},
	{
		CNM: "HKMB5516BPW069503",
		car: "제네시스",
		date: "2023-05-28",
	},
	{
		CNM: "NNNB5516BPW069503",
		car: "볼보",
		date: "2023-06-12",
	},
];

// TH
const headers = ["차대번호", "차종", "날짜"];
// TH width, 단위는 엑셀의 너비 기준
const headerWidths = [30, 16, 18];

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

function App() {
	const downloadList = async (rows) => {
		try {
			//console.log(rows);

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

			// 각 Data cell에 데이터 삽입 및 스타일 지정
			rows.forEach(({ CNM, car, date }) => {
				const rowDatas = [CNM, car, date];
				const appendRow = sheet.addRow(rowDatas);

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
			const fileData = await workbook.xlsx.writeBuffer(); //writeBuffer는 프로미스를 반환하므로 async-await을 사용해야 한다.
			const blob = new Blob([fileData], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});
			saveAs(blob, `엑셀`);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="App">
			<button
				onClick={() => downloadList(list)}
				style={{
					padding: "4px 8px",
					background: "#0f8107",
					fontSize: "1.5em",
					color: "#fff",
					border: 0,
					cursor: "pointer",
				}}>
				엑셀
			</button>
		</div>
	);
}

export default App;
