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
	}
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
		th.appendChild(div_big_number);
		number_tr.appendChild(th);
	}
	table.appendChild(number_tr);

	let parameters_tr = document.createElement('tr');
	parameters_tr.appendChild(document.createElement('th'));
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