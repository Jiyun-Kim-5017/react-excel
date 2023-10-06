import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadPDF = (font) => {
	const doc = new jsPDF("p", "mm", "a4");

	doc.addFileToVFS("malgun.ttf", font);
	doc.addFont("malgun.ttf", "malgun", "normal");
	doc.setFont("malgun");

	doc.line(15, 19, 195, 19);

	const addFooters = (doc) => {
		const pageCount = doc.internal.getNumberOfPages();
		doc.setFontSize(8);
		for (var i = 1; i <= pageCount; i++) {
			doc.setPage(i);
			doc.text(
				`${i} / ${pageCount}`,
				doc.internal.pageSize.width / 2, //가로 위치
				287, //세로 위치
				{
					align: "center",
				}
			);
		}
	};

	autoTable(doc, {
		theme: "plain",
		startY: 30,
		margin: { bottom: 30 },
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

	addFooters(doc);
	doc.save("PDF.pdf");
};
