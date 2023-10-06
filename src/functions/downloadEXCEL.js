import ExcelJS from "exceljs";

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

export const downloadEXCEL = async (rows) => {
	try {
		// workbook 생성
		const workbook = new ExcelJS.Workbook();
		// sheet 생성
		const sheet = workbook.addWorksheet("EXCEL", {
			views: [{ state: "frozen", ySplit: 1 }], //첫 행 고정
		});

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
			anchor.download = "EXCEL.xlsx";
			anchor.click();
			window.URL.revokeObjectURL(url);
		});
	} catch (error) {
		console.log(error);
	}
};
