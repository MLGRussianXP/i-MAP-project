import eel

eel.init('web')


def idx_to_name_of_cell(answer):
    helpful = {
        0: 'Оценка',
        1: 'Честность'
    }
    if answer[0] == '' and answer[1] == '':
        return f'"{helpful[0]}" и "{helpful[1]}"'
    if answer[0] == '':
        return f'"{helpful[0]}"'
    return f'"{helpful[1]}"'


@eel.expose
def get_statistics(data):
    formatted_data = []
    for block in range(0, 201, 40):
        temp = data[block:block + 40]
        formatted_data.append(list(map(lambda x: (x[0], x[1]), zip(temp[::2], temp[1::2]))))

    general_arithmetic_mean_answers = 0
    general_arithmetic_mean_truth = 0
    total_arithmetic_mean_of_each_block = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
    output = ""
    not_filled = False
    for block_idx, block in enumerate(formatted_data):
        for answer_idx, answer in enumerate(block):
            if '' in answer:
                if not not_filled:
                    not_filled = not not_filled
                    output = f'<h1 class="output-title">Недостаточно входных данных!</h1><br>' \
                             f'<span class="not-filled-line">Не заполнена ячейка' \
                             f' <span class="not-filled-cell">{idx_to_name_of_cell(answer)}<' \
                             f'/span> в ' \
                             f'вопросе <span class="not-filled-question">№{answer_idx + 1}</span>' \
                             f' в ' \
                             f'блоке <span class="not-filled-block">№{block_idx + 1}</span>' \
                             f'</span><br>'
                else:
                    output += f'<span class="not-filled-line">Не заполнена ячейка' \
                              f' <span class="not-filled-cell">{idx_to_name_of_cell(answer)}' \
                              f'</span> в ' \
                              f'вопросе <span class="not-filled-question">' \
                              f'№{answer_idx + 1}</span> в ' \
                              f'блоке <span class="not-filled-block">№{block_idx + 1}' \
                              f'</span></span><br>'
            else:
                if not not_filled:
                    answer = tuple(map(lambda x: int(x), answer))
                    general_arithmetic_mean_answers += answer[0]
                    general_arithmetic_mean_truth += answer[1]
                    total_arithmetic_mean_of_each_block[block_idx][0] += answer[0]
                    total_arithmetic_mean_of_each_block[block_idx][1] += answer[1]

    if not not_filled:
        general_arithmetic_mean_answers = round(general_arithmetic_mean_answers / 120, 2)
        general_arithmetic_mean_truth = round(general_arithmetic_mean_truth / 120, 2)
        total_arithmetic_mean_of_each_block = list(
            map(
                lambda x: [
                    round(x[0] / 20, 2), round(x[1] / 20, 2)
                ], total_arithmetic_mean_of_each_block
            )
        )
        output = f'<span class="u-grade">Общее среднее арифметическое ячеек "Оценка":' \
                 f' {general_arithmetic_mean_answers}' \
                 f' ({general_arithmetic_mean_answers * 10}%)</span><br>' \
                 f'<span class="u-truth">Общее среднее арифметическое ячеек "Честность":' \
                 f' {general_arithmetic_mean_truth}' \
                 f' ({general_arithmetic_mean_truth * 20}%)</span><br>'
        return output, total_arithmetic_mean_of_each_block, False
    return output, None, True


eel.start("main.html", mode="chrome-app")
