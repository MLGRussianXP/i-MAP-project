function get_column_data(trs, column_idx) {
  let column = [];
  for (let m = 1; m < trs.length; m++) {
    column.push(trs[m].getElementsByTagName('td')[column_idx].getElementsByTagName('input')[0]);
  }
  return column;
}


async function callback() {
  var blocks = document.getElementsByClassName("block");
  for (var i = 0; i < blocks.length; i++) {
    let block = blocks[i];

    var table = document.getElementById(`result-table${i + 1}`);
    if (table == null) {
      var table = document.createElement('table');
      table.className = "result-table";
      table.id = `result-table${i + 1}`;
      let tr = document.createElement('tr');
      for (var j = 6; j > 0; j--) {
        let th = document.createElement('th');
        tr.appendChild(th);
      }
      table.appendChild(tr);
      block.insertBefore(table, document.getElementById(`button-add${i + 1}`))
    }

    let main_table = document.getElementById(`table${i + 1}`);
    let ths = table.getElementsByTagName('th');

    // Выручка
    let revenue_column = get_column_data(main_table.getElementsByTagName('tr'), 1);
    let total_revenue = 0;
    revenue_column.forEach(input => {
      total_revenue += input.valueAsNumber
    });
    ths[2].innerHTML = total_revenue;


    // Поддержка
    let support_column = get_column_data(main_table.getElementsByTagName('tr'), 2);
    let total_support = 0;
    for (var s = 0; s < support_column.length; s++) {
      if (support_column[s].checked == true) {
        total_support += 1;
      }
    }
    ths[3].innerHTML = total_support;

    // 3 параметр
    let third_column = get_column_data(main_table.getElementsByTagName('tr'), 3);
    let total_third = 0;
    third_column.forEach(input => {
      total_third += input.valueAsNumber
    });
    ths[4].innerHTML = total_third;

    // 4 параметр
    let fourth_column = get_column_data(main_table.getElementsByTagName('tr'), 4);
    let total_fourth = 0;
    fourth_column.forEach(input => {
      total_fourth += input.valueAsNumber
    });
    ths[5].innerHTML = total_fourth;
  }
  return false;
}