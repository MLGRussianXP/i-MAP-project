function create_num_td () {
	var input_contrainer = document.createElement("td");
	var input = document.createElement("input");
	input.setAttribute("type", "number");
	input.setAttribute("min", "0");
	input.required = true;
	input_contrainer.appendChild(input);
	return input_contrainer;
}


function add_line (id) {
	let table = document.getElementById(id);

	// number
	let number_value = table.lastChild.firstChild.innerHTML;
	if (number_value == "№") {
		number_value = 1;
	}
	else {
		number_value = parseInt(number_value) + 1;
	}

	if (number_value > 50) {
		alert("Максимум может быть 50 строк!");
	}
	else {
		let number = document.createElement("th");
		number.setAttribute('scope', 'row');
		number.innerHTML = number_value;

		// name_input
		let name_input_contrainer = document.createElement("td");
		let name_input = document.createElement("input");
		name_input.setAttribute("type", "text");
		name_input.setAttribute("name", "name_imap");
		name_input.setAttribute("size", "20");
		name_input.required = true;
		name_input_contrainer.appendChild(name_input);

		// revenue_input
		let revenue_input = create_num_td();

		// switch support input
		let support_container = document.createElement("td");
		// label
		let label_switch = document.createElement("label");
		label_switch.className = "switch";
		// input
		let switch_input = document.createElement("input");
		switch_input.setAttribute("type", "checkbox");
		// span
		let span_switch = document.createElement("span");
		span_switch.className = "slider round";
		// build
		label_switch.appendChild(switch_input);
		label_switch.appendChild(span_switch);
		support_container.appendChild(label_switch);

		// 3 parameter input
		let parameter_3 = create_num_td();

		// 4 parameter input
		let parameter_4 = create_num_td();

		// build
		let tr = document.createElement("tr");
		tr.appendChild(number);
		tr.appendChild(name_input_contrainer);
		tr.appendChild(revenue_input);
		tr.appendChild(support_container);
		tr.appendChild(parameter_3);
		tr.appendChild(parameter_4);
		table.appendChild(tr);
	}
}


function del_line(id) {
	let table = document.getElementById(id);
	if (table.childElementCount > 2) {
		table.lastChild.remove();
	}
	else {
		alert("Должна остаться хотя бы одна строка!");
	}
}


function add_block(i) {
	let box_div = document.getElementsByClassName("box")[0];
	let before_paste_element = document.getElementById("total-button");

	//block
	let block = document.createElement("div");
	block.id = `${i}b`;
	block.className = "block";
	box_div.insertBefore(block, before_paste_element)

	// form
	let form = document.createElement("form");
	form.id = `form_block${i}`;
	form.setAttribute('onsubmit', `callback_one_block(${i}); return false;`);
	block.appendChild(form);

	// big num
	let big_number_div = document.createElement("div");
	big_number_div.className = "big-number";
	big_number_div.innerHTML = i + 1;
	form.appendChild(big_number_div);
	form.appendChild(document.createElement("br"));

	// block title and br
	let input_block_name = document.createElement("input");
	input_block_name.setAttribute("type", "text");
	input_block_name.setAttribute("name", "blockname_imap");
	input_block_name.setAttribute("value", `Блок №${i + 1}`);
	input_block_name.setAttribute("maxlength", "100");
	input_block_name.className = "blockname_input";
	input_block_name.required = true;
	form.appendChild(input_block_name);

	// table
	let table = document.createElement("table");
	table.className = "table";
	table.id = `table${i + 1}`
	form.appendChild(table);

	// № th
	let s_number = document.createElement("th");
	s_number.innerHTML = "№";
	// Фамилия Имя th
	let name_surname = document.createElement("th");
	name_surname.innerHTML = "Фамилия Имя";
	// Объём выручки th
	let volume_of_revenue = document.createElement("th");
	volume_of_revenue.innerHTML = "<input type='text' value='Выручка' class='th_title' required maxlength='30'>";
	// Поддержка th
	let support = document.createElement("th");
	support.innerHTML = "<input type='text' value='Поддержка' class='th_title' required maxlength='30'>";
	// 3 параметр th
	let third_parameter = document.createElement("th");
	third_parameter.innerHTML = "<input type='text' value='3 параметр' class='th_title' required maxlength='30'>";
	// 4 параметр th
	let fourth_parameter = document.createElement("th");
	fourth_parameter.innerHTML = "<input type='text' value='4 параметр' class='th_title' required maxlength='30'>";

	// line tr
	let tr = document.createElement("tr")
	tr.appendChild(s_number);
	tr.appendChild(name_surname);
	tr.appendChild(volume_of_revenue);
	tr.appendChild(support);
	tr.appendChild(third_parameter);
	tr.appendChild(fourth_parameter);

	table.appendChild(tr);

	for (let j = 1; j < 16; j++) {
		add_line(`table${i + 1}`)
	}

	// add line button
	let add_line_button = document.createElement("button");
	add_line_button.innerHTML = "Добавить строку";
	add_line_button.setAttribute("onclick", `add_line("table${i + 1}")`);
	add_line_button.setAttribute("type", "button")
	add_line_button.setAttribute("class", "button")
	add_line_button.setAttribute("id", `button-add${i + 1}`)
	form.appendChild(add_line_button);

	// del line button
	let del_line_button = document.createElement("button");
	del_line_button.innerHTML = "Удалить строку";
	del_line_button.setAttribute("onclick", `del_line("table${i + 1}")`);
	del_line_button.setAttribute("type", "button")
	del_line_button.setAttribute("class", "button")
	del_line_button.setAttribute("id", `button-del${i + 1}`)
	form.appendChild(del_line_button);

	// total button
	let br = document.createElement("br");
	form.appendChild(br);

	let total_input = document.createElement("input");
	total_input.type = "submit";
	total_input.value = "Итого";
	total_input.className = "button";
	total_input.id = `calculate${i}`;
	form.appendChild(total_input);

	// excel export button
	let br_exp = document.createElement("br");
	form.appendChild(br_exp);

	let excel_export = document.createElement("button");
	excel_export.innerHTML = "Экспорт в Excel";
	excel_export.setAttribute("onclick", `excel_export_block(${i}); return false;`);
	excel_export.setAttribute("type", "button");
	excel_export.setAttribute("class", "button");
	excel_export.setAttribute("id", `button_export_b${i + 1}`);
	form.appendChild(excel_export);
}


function add_new_block() {
	let blocks_len = document.getElementsByClassName("block").length;
	if (blocks_len >= 20) {
		return alert("Максимум может быть 20 блоков!");
	}
	add_block(blocks_len);
}


function del_block() {
	let blocks_len = document.getElementsByClassName("block").length;
	if (blocks_len <= 1) {
		return alert("Должен остаться хотя бы один блок!");
	}
	document.getElementById(`${blocks_len - 1}b`).remove();
}


function onload() {
	for (let i = 0; i < 6; i++) {
		add_block(i);
	}

	var date = new Date();
	let date_input = document.getElementById('date-add-month-table');
	date_input.valueAsDate = date;
}


function get_table_block_data_for_export(block_idx) {
	let trs = document.getElementById(`table${parseInt(block_idx) + 1}`).getElementsByTagName('tr');
	let table_data = [];

	// first line
	let first_line = [];
	let first_tr = trs[0].getElementsByTagName('th');
	for (var i = 0; i < first_tr.length; i++) {
		if (i > 1) {
			first_line.push(first_tr[i].children[0].value);
		}
		else {
			first_line.push(first_tr[i].innerHTML);
		}
	}
	table_data.push(first_line);

	// other lines
	for (var i = 1; i < trs.length; i++) {
		let cells = trs[i].getElementsByTagName('td');
		let current_line = [i];

		let name_input = cells[0].getElementsByTagName('input')[0].value;
		if (name_input == "") {
			return false
		}
		current_line.push(name_input);

		for (var j = 1; j < cells.length; j++) {
			if (j == 2) {
				let cur_input = cells[j].getElementsByClassName('switch')[0].getElementsByTagName('input')[0];
				current_line.push(cur_input.checked ? '+' : '-');
			} 
			else {
				let cur_input = cells[j].getElementsByTagName('input')[0].valueAsNumber;
				if (cur_input == NaN) {
					return false
				}
				current_line.push(cur_input);
			}
		}
		table_data.push(current_line);
	}


	// result table
	let result_table = [];
	let result_ths = document.getElementById(`result-table${block_idx + 1}`).getElementsByTagName('th');
	for (var i = 0; i < result_ths.length; i++) {
		result_table.push(result_ths[i].innerHTML);
	}
	table_data.push(result_table);

	return table_data
}


function excel_export_block(block_idx) {
	document.getElementById(`calculate${block_idx}`).click();
	table_data = get_table_block_data_for_export(block_idx);
	if (table_data) {
		// export
		let workbook = XLSX.utils.book_new(),
			worksheet = XLSX.utils.aoa_to_sheet(table_data);
		workbook.SheetNames.push("First");
		workbook.Sheets["First"] = worksheet;

		let block_name = document.getElementById(`form_block${block_idx}`).getElementsByClassName("blockname_input")[0].value;
		XLSX.writeFile(workbook, `Block '${block_name}'.xlsx`);
	}
	return false;
}


function excel_export_all_blocks() {
	document.getElementById('calculate').click();

	let blocks_amount = document.getElementsByClassName("block").length;
	let sheets = [];
	for (var i = 0; i < blocks_amount; i++) {
		sheets.push(get_table_block_data_for_export(i));
	}
	if (false in sheets) {
		return false
	}
	// export
	let workbook = XLSX.utils.book_new()
	for (var i = 0; i < sheets.length; i++) {
		worksheet = XLSX.utils.aoa_to_sheet(sheets[i]);
		let block_name = document.getElementById(`form_block${i}`).getElementsByClassName("blockname_input")[0].value;
		workbook.SheetNames.push(`Block ${i + 1} - ${block_name}`);
		workbook.Sheets[`Block ${i + 1} - ${block_name}`] = worksheet;
	}


	XLSX.writeFile(workbook, `${document.getElementById('date-add-month-table').value}.xlsx`);
}
