function create_num_td () {
	var input_contrainer = document.createElement("td");
	var input = document.createElement("input");
	input.setAttribute("type", "number");
	input.setAttribute("min", "0");
	// input.required = true;        ////////////////////////////////// required
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
	let number = document.createElement("th");
	number.setAttribute('scope', 'row');
	number.innerHTML = number_value;

	// name_input
	let name_input_contrainer = document.createElement("td");
	let name_input = document.createElement("input");
	name_input.setAttribute("type", "text");
	name_input.setAttribute("name", "name_imap");
	name_input.setAttribute("size", "20");
	// name_input.required = true;             ////////////////////////////////// required
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


function del_line (id) {
	let table = document.getElementById(id);
	if (table.childElementCount > 2) {
		table.lastChild.remove();
	}
	else {
		alert("Должна остаться хотя бы одна строка!");
	}
}


function onload() {
	var blocks = document.getElementsByClassName("block");
	for (let i = 0; i < blocks.length; i++) {
		let block = blocks[i];

		// table
		let table = document.createElement("table");
		table.className = "table";
		table.id = `table${i + 1}`
		block.appendChild(table);

		// № th
		let s_number = document.createElement("th");
		s_number.innerHTML = "№";
		// Фамилия Имя th
		let name_surname = document.createElement("th");
		name_surname.innerHTML = "Фамилия Имя";
		// Объём выручки th
		let volume_of_revenue = document.createElement("th");
		volume_of_revenue.innerHTML = "Объём выручки";
		// Поддержка th
		let support = document.createElement("th");
		support.innerHTML = "Поддержка";
		// 3 параметр th
		let third_parameter = document.createElement("th");
		third_parameter.innerHTML = "3 параметр";
		// 4 параметр th
		let fourth_parameter = document.createElement("th");
		fourth_parameter.innerHTML = "4 параметр";

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
		block.appendChild(add_line_button);

		// del line button
		let del_line_button = document.createElement("button");
		del_line_button.innerHTML = "Удалить строку";
		del_line_button.setAttribute("onclick", `del_line("table${i + 1}")`);
		del_line_button.setAttribute("type", "button")
		del_line_button.setAttribute("class", "button")
		del_line_button.setAttribute("id", `button-del${i + 1}`)
		block.appendChild(del_line_button);
	}

	var date = new Date();
	let date_input = document.getElementById('date-add-month-table');
	date_input.valueAsDate = date;
}