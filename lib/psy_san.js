const data = [
  {
    id: 'state',
    leftText: 'Самочувствие хорошее',
    rightText: 'Самочувствие плохое',
    leftToRight: false
  },
  {
    id: 'feel',
    leftText: 'Чувствую себя сильным',
    rightText: 'Чувствую себя слабым',
    leftToRight: false
  },
  {
    id: 'active',
    leftText: 'Пассивный',
    rightText: 'Активный',
    leftToRight: true
  },
  {
    id: 'move',
    leftText: 'Малоподвижный',
    rightText: 'Подвижный',
    leftToRight: true
  },
  {
    id: 'fun',
    leftText: 'Веселый',
    rightText: 'Грустный',
    leftToRight: false
  },
  {
    id: 'mood',
    leftText: 'Хорошее настроение',
    rightText: 'Плохое настроение',
    leftToRight: false
  },
  {
    id: 'work',
    leftText: 'Работоспособный',
    rightText: 'Разбитый',
    leftToRight: false
  },
  {
    id: 'power',
    leftText: 'Полный сил',
    rightText: 'Обессиленный',
    leftToRight: false
  },
  {
    id: 'speed',
    leftText: 'Медлительный',
    rightText: 'Быстрый',
    leftToRight: true
  },
  {
    id: 'act',
    leftText: 'Бездеятельный',
    rightText: 'Деятельный',
    leftToRight: true
  },
  {
    id: 'happy',
    leftText: 'Счастливый',
    rightText: 'Несчастный',
    leftToRight: false
  },
  {
    id: 'cheer',
    leftText: 'Жизнерадостный',
    rightText: 'Мрачный',
    leftToRight: false
  },
  {
    id: 'tense',
    leftText: 'Напряженный',
    rightText: 'Расслабленный',
    leftToRight: false
  },
  {
    id: 'healthy',
    leftText: 'Здоровый',
    rightText: 'Больной',
    leftToRight: false
  },
  {
    id: 'carry',
    leftText: 'Безучастный',
    rightText: 'Увлеченный',
    leftToRight: true
  },
  {
    id: 'int',
    leftText: 'Равнодушный',
    rightText: 'Заинтересованный',
    leftToRight: true
  },
  {
    id: 'enth',
    leftText: 'Восторженный',
    rightText: 'Унылый',
    leftToRight: false
  },
  {
    id: 'joy',
    leftText: 'Радостный',
    rightText: 'Печальный',
    leftToRight: false
  },
  {
    id: 'otduh',
    leftText: 'Отдохнувший',
    rightText: 'Усталый',
    leftToRight: false
  },
  {
    id: 'fresh',
    leftText: 'Свежий',
    rightText: 'Изнуренный',
    leftToRight: false
  },
  {
    id: 'sleep',
    leftText: 'Сонливый',
    rightText: 'Возбужденный',
    leftToRight: true
  },
  {
    id: 'do',
    leftText: 'Желание отдохнуть',
    rightText: 'Желание работать',
    leftToRight: true
  },
  {
    id: 'calm',
    leftText: 'Спокойный',
    rightText: 'Взволнованный',
    leftToRight: false
  },
  {
    id: 'opt',
    leftText: 'Оптимистичный',
    rightText: 'Пессимистичный',
    leftToRight: false
  },
  {
    id: 'hardy',
    leftText: 'Выносливый',
    rightText: 'Утомляемый',
    leftToRight: false
  },
  {
    id: 'alive',
    leftText: 'Бодрый',
    rightText: 'Вялый',
    leftToRight: false
  },
  {
    id: 'think',
    leftText: 'Соображать трудно',
    rightText: 'Соображать легко',
    leftToRight: true
  },
  {
    id: 'attentive',
    leftText: 'Рассеянный',
    rightText: 'Внимательный',
    leftToRight: true
  },
  {
    id: 'hope',
    leftText: 'Полный надежд',
    rightText: 'Разочарованный',
    leftToRight: false
  },
  {
    id: 'satisfy',
    leftText: 'Довольный',
    rightText: 'Недовольный',
    leftToRight: false
  },
];

function getTestValues() {
  return data;
}

function calcResults(obj) {
  let res = 0;

  Object.keys(obj).forEach(item => {
    let flag = _findFlag(item);
    res += flag ? obj[item] : obj[item]*(-1);
  });

  return res;
}

function _findFlag(str) {
  for(let i = 0; i < data.length; i++) {
    if (data[i].id === str) {
      return data[i].leftToRight;
    }
  }
}

function checkResult(val) {
  if (val > 50)
    return 'Высокая оценка состояния';

  if (val > 30)
    return 'Средняя оценка состояния';

  return 'Низкая оценка состояния';
}

module.exports = {
  getTestValues,
  calcResults,
  checkResult
};