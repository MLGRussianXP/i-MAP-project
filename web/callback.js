function get_column_data(trs, column_idx) {
  let column = [];
  for (let m = 1; m < trs.length; m++) {
    column.push(trs[m].getElementsByTagName('td')[column_idx].getElementsByTagName('input')[0]);
  }
  return column;
}


async function callback_one_block(i) {
  let block = document.getElementById(`form_block${i}`);

  var table = document.getElementById(`result-table${i + 1}`);
    if (table == null) {
      var table = document.createElement('table');
      table.className = "result-table";
      table.id = `result-table${i + 1}`;
      let tr = document.createElement('tr');
      for (let j = 6; j > 0; j--) {
        let th = document.createElement('th');
        tr.appendChild(th);
      }
      table.appendChild(tr);
      block.insertBefore(table, document.getElementById(`button-add${i + 1}`))
    }

    let main_table = document.getElementById(`table${i + 1}`);
    let ths = table.getElementsByTagName('th');

    ths[0].innerHTML = "Итого";
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

  return false;
}


async function callback() {
  let blocks_amount = document.getElementsByClassName("block").length;
  for (var i = blocks_amount - 1; i >= 0; i--) {
    let button = document.getElementById(`calculate${i}`);
    button.click();
  }
  return false;
}


async function add_data_to_table() {
  let is_ready = confirm("Вы действительно хотите добавить данные в месячную таблицу?\nУже имеющиеся данные за этот день перезапишутся.");
  if (is_ready == true) {
    let blocks = document.getElementsByClassName("block");
    document.getElementById('calculate').click();

    let blocks_data = [];
    for (var i = 1; i < blocks.length + 1; i++) {
      let ths = document.getElementById(`table${i}`).getElementsByTagName("tr")[0].getElementsByTagName("th");
      let first_ths = [];
      for (var k = 2; k < ths.length; k++) {
        first_ths.push(ths[k].getElementsByTagName("input")[0].value)
      }

      var ex_table = document.getElementById(`result-table${i}`);
      let ex_tr = ex_table.getElementsByTagName('tr')[0].getElementsByTagName('th');
      let values = [];
      for (var j = 2; j < ex_tr.length; j++) {
        values.push([first_ths[j - 2], ex_tr[j].innerHTML]);
      }
      blocks_data.push([document.getElementsByClassName("blockname_input")[i - 1].value, values]);
    }
    
    let date_block = document.getElementById('date-add-month-table');

    status = await eel.add_data_to_table(blocks_data, date_block.value)();
    if (status == "true") {
      return alert("Операция выполнена успешно");
    }
    alert("Возникла ошибка при выполнении операции");
  }

  return false;
}
