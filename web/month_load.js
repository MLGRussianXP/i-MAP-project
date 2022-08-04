function get_today_day() {
	var date_today = new Date();
	return `${date_today.getFullYear()}-${date_today.getMonth() + 1}-${date_today.getDate()}`;
}


async function change_table(date) { // Data in table
	var date_today = new Date();

	var table = document.getElementById('month-table');
	for (var i = table.getElementsByTagName('tr').length - 1; i >= 2; i--) {
		table.lastElementChild.remove();
	}

	let data = await eel.return_month_table(date)();
	let trs_result = [];
	for (var i = 0; i < data.length; i++) {
		let cur_day_data = data[i];
		let num_tr = document.createElement('tr');
		var th = document.createElement('th');
		th.className = 'ser-num';
		th.innerHTML = cur_day_data[0];
		th.setAttribute('scope', 'row');
		num_tr.appendChild(th);

		for (var j = 1; j < cur_day_data.length; j++) {
			var td = document.createElement('td');
			td.innerHTML = cur_day_data[j];
			num_tr.appendChild(td);
		}
		table.appendChild(num_tr);
		trs_result.push(num_tr);
	}

	let result_tr = document.createElement('tr');
	let result_title = document.createElement('th');
	result_title.innerHTML = "Итог";
	console.log(trs_result);
	result_tr.appendChild(result_title);
	for (var i = 0; i < 24; i++) {
		let column = [];
		for (let m = 0; m < trs_result.length; m++) {
		    column.push(trs_result[m].getElementsByTagName('td')[i].innerHTML);
		}

		let exit_sum = 0;
		for (var j = 0; j < column.length; j++) {
			if (column[j] != "") {
				exit_sum += parseInt(column[j]);
			}
		}

		let this_th = document.createElement('th');
		this_th.innerHTML = exit_sum;
		result_tr.appendChild(this_th);
	}
	table.appendChild(result_tr);


	return false;
}


async function month_load() { // Main / Design
	// Date
	Date.prototype.daysInMonth = function() {
		return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
	};
	let date_block = document.getElementById('date-for-month-table');
	date_block.valueAsDate = new Date();

	// Table
	var table = document.getElementById('month-table');

	let number_tr = document.createElement('tr');
	number_tr.appendChild(document.createElement('th'));
	for (var i = 1; i < 7; i++) {
		let div_big_number = document.createElement('div');
		div_big_number.className = 'big-number';
		div_big_number.innerHTML = i;
		var th = document.createElement('th');
		th.setAttribute('scope', 'col');
		th.setAttribute('colspan', '4');
		th.id = "th-bold";
		th.appendChild(div_big_number);
		number_tr.appendChild(th);
	}
	table.appendChild(number_tr);

	let parameters_tr = document.createElement('tr');
	let day_tr = document.createElement('th');
	day_tr.innerHTML = "День"
	parameters_tr.appendChild(day_tr);
	for (var i = 1; i < 7; i++) {
		var th = document.createElement('th');
		th.innerHTML = 'Объём выручки';
		th.className = 'small-th';
		parameters_tr.appendChild(th);

		var th = document.createElement('th');
		th.innerHTML = 'Поддержка';
		th.className = 'small-th';
		parameters_tr.appendChild(th);

		var th = document.createElement('th');
		th.innerHTML = '3 параметр';
		th.className = 'small-th';
		parameters_tr.appendChild(th);

		var th = document.createElement('th');
		th.innerHTML = '4 параметр';
		th.className = 'small-th';
		parameters_tr.appendChild(th);
	}
	table.appendChild(parameters_tr);

	await change_table(date_block.value);

	return false;
}