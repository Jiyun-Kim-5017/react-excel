import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadPDF = (font) => {
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
