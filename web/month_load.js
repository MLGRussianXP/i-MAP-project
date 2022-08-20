async function change_table(date) { // Data in divs
	let data = await eel.return_month_table(date)();

	let container = document.getElementById("month-box");
	container.innerHTML = "";

	// all bloks tables and data
	let trs_result = [];
	for (var i = 0; i < data.length; i++) {
		// div and table base
		let div = document.createElement("div");
		div.className = "block";
		let table = document.createElement("table");
		table.className = "table";
		table.id = `ex-table${i}`;

		// big num
		let big_number_div = document.createElement("div");
		big_number_div.className = "big-number";
		big_number_div.innerHTML = i + 1;
		div.appendChild(big_number_div);
		div.appendChild(document.createElement("br"));

		div.appendChild(table);

		// export button
		let excel_export = document.createElement("button");
		excel_export.innerHTML = "Экспорт в Excel";
		excel_export.setAttribute("onclick", `excel_export_block_month(${i}); return false;`);
		excel_export.setAttribute("type", "button");
		excel_export.setAttribute("class", "button");
		div.appendChild(excel_export);

		// table data
		//first ths
		let th_day = document.createElement("th");
		th_day.innerHTML = "День";
		let th_block = document.createElement("th");
		th_block.innerHTML = "Блок и параметры";
		th_block.setAttribute("colspan", "4");
		let first_tr = document.createElement("tr");
		first_tr.appendChild(th_day);
		first_tr.appendChild(th_block);
		table.appendChild(first_tr);

		for (var day = 0; day < data[i].length; day++) {
			let day_tr = document.createElement("tr");
			table.appendChild(day_tr);

			// day
			let th_day_regular = document.createElement("th");
			th_day_regular.innerHTML = day + 1;
			day_tr.appendChild(th_day_regular);

			// block name
			var block_name_td = document.createElement("td");
			block_name_td.setAttribute("colspan", "4");

			// tds
			if (data[i][day].length) {
				// unpacking
				let [block_name, parameters] = data[i][day];

				block_name_td = document.createElement("th");
				block_name_td.className = "month-th";
				block_name_td.setAttribute("colspan", "4");
				th_day_regular.setAttribute("rowspan", "3");
				block_name_td.innerHTML = block_name;

				// par names
				parameters_names = document.createElement("tr");
				for (var par in parameters) {
					var par_td = document.createElement("td");
					par_td.innerHTML = parameters[par][0];
					parameters_names.appendChild(par_td);
				}
				table.appendChild(parameters_names);

				// par values
				parameters_values = document.createElement("tr");
				parameters_values.className = "par_values";
				for (var par in parameters) {
					var par_td = document.createElement("td");
					par_td.innerHTML = parameters[par][1];
					parameters_values.appendChild(par_td);
				}
				table.appendChild(parameters_values);
			}
			day_tr.appendChild(block_name_td);
		}

		// total
		let total_tr = document.createElement("tr");
		let total_title_th = document.createElement("th");
		total_title_th.innerHTML = "Итого";
		total_tr.appendChild(total_title_th);
		for (var par_idx = 0; par_idx < 4; par_idx++) {
			let par_td = document.createElement("td");
			total_tr.appendChild(par_td);
			column = get_column_data(table.getElementsByClassName("par_values"), par_idx);
			let total_par = 0;
		    column.forEach(td => {
		      total_par += parseInt(td.innerHTML);
		    });
		    par_td.innerHTML = total_par;
		}
		table.appendChild(total_tr);

		// connect
		container.appendChild(div);
	}

	if (container.innerHTML == "") {
		let h1 = document.createElement("h1");
		h1.innerHTML = "За этот период данных нет.";
		container.appendChild(h1);
	}
	else {
		let excel_export = document.createElement("button");
		excel_export.innerHTML = "Экспорт в Excel";
		excel_export.setAttribute("onclick", `excel_export_month(); return false;`);
		excel_export.setAttribute("type", "button");
		excel_export.setAttribute("class", "button");
		container.appendChild(excel_export);
	}

	return false;
}


function get_column_data(trs, column_idx) {
  let column = [];
  for (let m = 0; m < trs.length; m++) {
    column.push(trs[m].getElementsByTagName('td')[column_idx]);
  }
  return column;
}


async function month_load() { // Main / Design
	// Date
	Date.prototype.daysInMonth = function() {
		return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
	};
	let date_block = document.getElementById('date-for-month-table');
	date_block.valueAsDate = new Date();

	// Divs
	await change_table(date_block.value);

	return false;
}


function excel_export_block_month(block_idx, fn, dl) {
    var elt = document.getElementById(`ex-table${block_idx}`);
   	var wb = XLSX.utils.table_to_book(elt, {sheet: "sheet1"});
   	return dl ?
     XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'base64'}):
     XLSX.writeFile(wb, fn || (`Month Block ${block_idx + 1}.xlsx`));
}


function excel_export_month(fn, dl) {
	let tables = document.getElementsByClassName("table");
	let wb = XLSX.utils.book_new();
	for (var i = 0; i < tables.length; i++) {
		let ws = XLSX.utils.table_to_sheet(document.getElementById(`ex-table${i}`));
		XLSX.utils.book_append_sheet(wb, ws, `Table ${i + 1}`)
	}

	let date_block = document.getElementById('date-for-month-table');
	XLSX.writeFile(wb, fn || (`${date_block.value}.xlsx`));
}