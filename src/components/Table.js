import React from "react";

export const Table = ({ data }) => {
	return (
		<table id="dataTable">
			<thead>
				<tr>
					<th>국교부 수신일</th>
					<th>시도 수신일</th>
					<th>등록일시</th>
					<th>행정동코드</th>
					<th>차번호</th>
					<th>주민번호</th>
				</tr>
			</thead>
			<tbody>
				{data.map((item, idx) => {
					return (
						<tr key={idx}>
							{Object.values(item).map((data, idx) => {
								return <td key={data + idx}>{data}</td>;
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
