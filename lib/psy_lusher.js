const COLORS = [
  {
    id: 0,
    name: 'GRAY',
    hex: '#d2d0d2'
  },
  {
    id: 1,
    name: 'DARK_BLUE',
    hex: '#01008c'
  },
  {
    id: 2,
    name: 'BLUE_GREEN',
    hex: '#006000'
  },
  {
    id: 3,
    name: 'LIGHT_YELLOW',
    hex: '#c89100'
  },
  {
    id: 4,
    name: 'YELLOW_RED',
    hex: '#eb0011'
  },
  {
    id: 5,
    name: 'MANGETA',
    hex: '#c3237b'
  },
  {
    id: 6,
    name: 'BROWN',
    hex: '#ab471e'
  },
  {
    id: 7,
    name: 'BLACK',
    hex: '#000'
  }
];

function getColors() {
  return COLORS;
}

function calcAnxiety(oneArr, twoArr) {
  let res = 0;
  let lastN = 3;
  let firstN = 4;
  let n = oneArr.length;

  for (let i = 0; i < lastN; i++) {
    let ind = oneArr.findIndex(item => item.id == twoArr[n - lastN + i].id);
    if (ind !== -1 && ind < firstN) {
      res += i + 1;
    }
  }

  for (let i = 0; i < lastN; i++) {
    let ind = oneArr.findIndex(item => item.id == twoArr[i].id);
    if (ind !== -1 && ind >= n - firstN) {
      res += lastN - i;
    }
  }

  return {
    percent: Math.round(res*100/12),
    val: res
  };
}

function calcConflict(oneArr, twoArr) {
  return {
    percent: null,
    val: null
  };
}

function calcPerformance(oneArr, twoArr) {
  let res = 0;
  let n = oneArr.length;
  let firstN = 4;

  for (let i = 1; i < firstN; i++) {
    let ind = twoArr.findIndex(item => item.id == oneArr[i].id);
    
    res += n - ind;
  }

  return {
    percent: Math.round((res-6)*100/(21-6)),
    val: res
  };
}

function calcFatigue(oneArr, twoArr) {
  let ind;
  let res = 0;
  let n = oneArr.length;

  ind = twoArr.findIndex(item => item.id == oneArr[5].id);
  res += n - ind;

  ind = twoArr.findIndex(item => item.id == oneArr[7].id);
  res += n - ind;

  return {
    percent: Math.round((res-3)*100/(15-3)),
    val: res
  };
}

module.exports = {
  getColors,
  calcAnxiety,
  calcConflict,
  calcPerformance,
  calcFatigue
};