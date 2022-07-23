async function callback() {
    const formElements = document.querySelectorAll(
      '#form input[type="number"]'
    );

    let values = [];
    formElements.forEach(input => {
      values.push(input.value);
    });

    let data = await eel.get_statistics(values)();
    document.getElementsByClassName('main-output')[0].innerHTML = data[0];
    if (!data[2]) {
        let blocks_outputs = document.getElementsByClassName('result-stats');
        let idx = 0;
        for (let output of blocks_outputs) {
          let block = data[1][idx];
          output.innerHTML = 'Ср. ариф. "Оценка": ' + block[0].toString() + '<br>Ср. ариф. "Честность": ' + block[1].toString();
          idx += 1;
        }
    }
    return false;
}