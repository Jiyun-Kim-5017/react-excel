import styled from "styled-components";

export const File = styled.div`
	.container {
		height: 200px;
		width: fit-content;
		overflow: auto;
	}

	.container::-webkit-scrollbar {
		width: 10px;
	}

	.container::-webkit-scrollbar-thumb {
		border-radius: 8px;
		background-color: #cacaca;
	}

	.container::-webkit-scrollbar-track {
		background-color: #f3f3f3;
		border-radius: 8px;
		box-shadow: inset 0px 0px 5px white;
	}

	thead th {
		border-bottom: none !important;
		position: sticky;
		top: 0;
	}

	#dataTable {
		border-collapse: collapse;
		border-spacing: 0;
		border: hidden;
		box-shadow: 0 0 0 1px #e6e6e6;
	}

	td,
	th {
		padding: 5px;
		border: 1.5px solid #e6e6e6;
	}

	th {
		background-color: #f0f4f9;
	}

	thead {
		border-bottom: none !important;
		position: sticky;
		top: 0;
	}

	tbody tr:first-child td {
		border-top: none !important;
	}
`;
