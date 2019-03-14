const data = [
  {
    id: 'state',
    leftText: 'Самочувствие хорошее',
    rightText: 'Самочувствие плохое',
    leftToRight: false,
    tag: 's'
  },
  {
    id: 'feel',
    leftText: 'Чувствую себя сильным',
    rightText: 'Чувствую себя слабым',
    leftToRight: false,
    tag: 's'
  },
  {
    id: 'active',
    leftText: 'Пассивный',
    rightText: 'Активный',
    leftToRight: true,
    tag: 'a'
  },
  {
    id: 'move',
    leftText: 'Малоподвижный',
    rightText: 'Подвижный',
    leftToRight: true,
    tag: 'a'
  },
  {
    id: 'fun',
    leftText: 'Веселый',
    rightText: 'Грустный',
    leftToRight: false,
    tag: 'n'
  },
  {
    id: 'mood',
    leftText: 'Хорошее настроение',
    rightText: 'Плохое настроение',
    leftToRight: false,
    tag: 'n'
  },
  {
    id: 'work',
    leftText: 'Работоспособный',
    rightText: 'Разбитый',
    leftToRight: false,
    tag: 's'
  },
  {
    id: 'power',
    leftText: 'Полный сил',
    rightText: 'Обессиленный',
    leftToRight: false,
    tag: 's'
  },
  {
    id: 'speed',
    leftText: 'Медлительный',
    rightText: 'Быстрый',
    leftToRight: true,
    tag: 'a'
  },
  {
    id: 'act',
    leftText: 'Бездеятельный',
    rightText: 'Деятельный',
    leftToRight: true,
    tag: 'a'
  },
  {
    id: 'happy',
    leftText: 'Счастливый',
    rightText: 'Несчастный',
    leftToRight: false,
    tag: 'n'
  },
  {
    id: 'cheer',
    leftText: 'Жизнерадостный',
    rightText: 'Мрачный',
    leftToRight: false,
    tag: 'n'
  },
  {
    id: 'tense',
    leftText: 'Напряженный',
    rightText: 'Расслабленный',
    leftToRight: false,
    tag: 's'
  },
  {
    id: 'healthy',
    leftText: 'Здоровый',
    rightText: 'Больной',
    leftToRight: false,
    tag: 's'
  },
  {
    id: 'carry',
    leftText: 'Безучастный',
    rightText: 'Увлеченный',
    leftToRight: true,
    tag: 'a'
  },
  {
    id: 'int',
    leftText: 'Равнодушный',
    rightText: 'Заинтересованный',
    leftToRight: true,
    tag: 'a'
  },
  {
    id: 'enth',
    leftText: 'Восторженный',
    rightText: 'Унылый',
    leftToRight: false,
    tag: 'n'
  },
  {
    id: 'joy',
    leftText: 'Радостный',
    rightText: 'Печальный',
    leftToRight: false,
    tag: 'n'
  },
  {
    id: 'otduh',
    leftText: 'Отдохнувший',
    rightText: 'Усталый',
    leftToRight: false,
    tag: 's'
  },
  {
    id: 'fresh',
    leftText: 'Свежий',
    rightText: 'Изнуренный',
    leftToRight: false,
    tag: 's'
  },
  {
    id: 'sleep',
    leftText: 'Сонливый',
    rightText: 'Возбужденный',
    leftToRight: true,
    tag: 'a'
  },
  {
    id: 'do',
    leftText: 'Желание отдохнуть',
    rightText: 'Желание работать',
    leftToRight: true,
    tag: 'a'
  },
  {
    id: 'calm',
    leftText: 'Спокойный',
    rightText: 'Взволнованный',
    leftToRight: false,
    tag: 'n'
  },
  {
    id: 'opt',
    leftText: 'Оптимистичный',
    rightText: 'Пессимистичный',
    leftToRight: false,
    tag: 'n'
  },
  {
    id: 'hardy',
    leftText: 'Выносливый',
    rightText: 'Утомляемый',
    leftToRight: false,
    tag: 's'
  },
  {
    id: 'alive',
    leftText: 'Бодрый',
    rightText: 'Вялый',
    leftToRight: false,
    tag: 's'
  },
  {
    id: 'think',
    leftText: 'Соображать трудно',
    rightText: 'Соображать легко',
    leftToRight: true,
    tag: 'a'
  },
  {
    id: 'attentive',
    leftText: 'Рассеянный',
    rightText: 'Внимательный',
    leftToRight: true,
    tag: 'a'
  },
  {
    id: 'hope',
    leftText: 'Полный надежд',
    rightText: 'Разочарованный',
    leftToRight: false,
    tag: 'n'
  },
  {
    id: 'satisfy',
    leftText: 'Довольный',
    rightText: 'Недовольный',
    leftToRight: false,
    tag: 'n'
  },
];

function getTestValues() {
  return data;
}

function calcResults(obj) {
  let res = 0;
  let s = 0;
  let a = 0;
  let n = 0;
  let tmp;

  Object.keys(obj).forEach(item => {
    let val = _findFlag(item);
    tmp = val.leftToRight ? obj[item] : obj[item]*(-1);
    res += tmp;
    switch (val.tag) {
      case 's': s += tmp; break;
      case 'a': a += tmp; break;
      case 'n': n += tmp; break;
    }
  });

  return {
    points: res,
    diff: {
      s: s,
      a: a,
      n: n
    }
  };
}

function _findFlag(str) {
  for(let i = 0; i < data.length; i++) {
    if (data[i].id === str) {
      return data[i];
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