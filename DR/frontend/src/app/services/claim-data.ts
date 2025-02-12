
export const standardCoverage = [
  'Пожар', 'Мълния', 'Експлозия', 'Имплозия',
  'Буря', 'Пороен дъжд', 'Градушка', 'Наводнение'
];

export const optimalCoverage = [
  'Злоумишлени действия на трети лица', 'Вандализъм',
  'ВиК авария', 'Счупване на стъкла', 'Кражба чрез взлом',
  'Грабеж за движимо имущество'
];

export const maximumCoverage = [
  'Земетресение', 'Удар от ППС (пътно-превозно средство)',
  'Щети вследствие на индиректно попадане на мълния'
];

export const causesOfDamageByClaimType = {
  'Пожар': [
    'Електрическа повреда', 'Късо съединение', 'Неизправни уреди', 'Грешка при готвене', 'Палеж'
  ],
  'Мълния': [
    'Директно попадане на мълния', 'Индиректно попадане на мълния', 'Пренапрежение в електрическата мрежа', 'Повреда на заземителна инсталация'
  ],
  'Експлозия': [
    'Изтичане на газ', 'Дефект в отоплителна система', 'Техническа неизправност', 'Химическа реакция'
  ],
  'Имплозия': [
    'Структурна нестабилност', 'Старост на сграда', 'Дефектни строителни материали', 'Вакуумен ефект в затворено пространство'
  ],
  'Буря': [
    'Силни вятрове', 'Торнадо', 'Ураган', 'Природно бедствие'
  ],
  'Пороен дъжд': [
    'Силни валежи', 'Запушена отводнителна система', 'Преливане на река', 'Наводнение от лош дренаж'
  ],
  'Градушка': [
    'Големи ледени късове', 'Интензивни бури', 'Природно бедствие'
  ],
  'Наводнение': [
    'Преливане на реки', 'Обилни валежи', 'Запушени канали', 'Разрушаване на язовирна стена'
  ],
  'Злоумишлени действия на трети лица': [
    'Кражба', 'Вандализъм', 'Саботаж', 'Умишлено повреждане на имущество'
  ],
  'Вандализъм': [
    'Умишлено повреждане на имущество', 'Графити и драскотини', 'Разрушаване на външни фасади'
  ],
  'ВиК авария': [
    'Спукана тръба', 'Запушена канализация', 'Повреда на бойлер', 'Човешка грешка при ремонт'
  ],
  'Счупване на стъкла': [
    'Кражба с взлом', 'Вандализъм', 'Силен вятър', 'Нещастен случай'
  ],
  'Кражба чрез взлом': [
    'Разбита входна врата', 'Разбит прозорец', 'Отключен обект', 'Насилствено проникване'
  ],
  'Земетресение': [
    'Сеизмична активност', 'Разместване на земни пластове', 'Вибрации от строителни дейности'
  ],
  'Удар от ППС': [
    'Катастрофа с автомобил', 'Излизане от пътното платно', 'Удар от тежкотоварно превозно средство'
  ],
  'Щети вследствие на индиректно попадане на мълния': [
    'Пренапрежение в електрическата мрежа', 'Изгаряне на електроуреди', 'Повреда на системи за сигурност'
  ]
};

export const lossDescriptionsByClaimType = {
  'Пожар': [
    'Цялостно изгоряла кухня',
    'Напълно разрушена дневна стая',
    'Повредени електроуреди от дим',
    'Обгорели мебели и подови настилки',
    'Унищожени лични вещи и документи'
  ],
  'Мълния': [
    'Щети от електрически инсталации',
    'Изгорели проводници',
    'Повредени контакти и предпазители',
    'Изгорели домакински уреди',
    'Разрушена покривна конструкция'
  ],
  'Експлозия': [
    'Разрушена стена',
    'Пукнатини в основата',
    'Счупени прозорци и врати',
    'Унищожена вътрешна изолация',
    'Щети по отоплителни и газови инсталации'
  ],
  'Имплозия': [
    'Срутване на конструкции',
    'Разпад на строителни елементи',
    'Напукани носещи стени',
    'Повредени водопроводни системи',
    'Срутени тавани'
  ],
  'Буря': [
    'Повреден покрив',
    'Откъснати улуци',
    'Счупени клони върху имота',
    'Изкъртени входни врати',
    'Наводнени вътрешни помещения'
  ],
  'Пороен дъжд': [
    'Водни щети по стените',
    'Проникване на вода',
    'Наводнени мазета и складови помещения',
    'Унищожени дървени подове и мебели',
    'Повредени електрически табла'
  ],
  'Градушка': [
    'Счупени прозорци',
    'Повредени покривни материали',
    'Вдлъбнатини по външни метални повърхности',
    'Унищожени соларни панели',
    'Счупени климатични външни тела'
  ],
  'Наводнение': [
    'Вода в мазето',
    'Вода в килимите',
    'Разрушени подови настилки',
    'Изкривени дървени конструкции',
    'Повредени електроуреди'
  ],
  'Злоумишлени действия на трети лица': [
    'Разбити прозорци',
    'Повредени врати',
    'Счупени ключалки',
    'Откраднато оборудване',
    'Вандализирани стени'
  ],
  'Вандализъм': [
    'Разрисувани стени',
    'Повредени входни врати',
    'Счупени огледала и витрини',
    'Повредени електроуреди',
    'Унищожени мебели'
  ],
  'ВиК авария': [
    'Разрушена фасада',
    'Повредени комуникации',
    'Нацепени тръби',
    'Наводнени санитарни помещения',
    'Паднала мазилка'
  ],
  'Счупване на стъкла': [
    'Разбити прозорци',
    'Разбити витрини',
    'Повредени душ-кабини',
    'Счупени стъклени парапети',
    'Напукани огледала'
  ],
  'Кражба чрез взлом': [
    'Откраднати електронни уреди',
    'Откраднати бижута',
    'Липсваща каса със спестявания',
    'Откраднати лични документи',
    'Повредени мебели при проникване'
  ],
  'Земетресение': [
    'Срутена покривна конструкция',
    'Пукнатини в основата',
    'Повредени носещи стени',
    'Счупени стъкла и огледала',
    'Разрушени вътрешни прегради'
  ],
  'Удар от ППС': [
    'Повредени стени',
    'Прокъсани строителни елементи',
    'Разрушена ограда',
    'Счупени входни врати и витрини',
    'Смачкани метални конструкции'
  ],
  'Щети вследствие на индиректно попадане на мълния': [
    'Изгорели електронни устройства',
    'Повредени електроуреди',
    'Прекъснати електрически вериги',
    'Счупени осветителни тела',
    'Прегорели трансформатори и батерии'
  ]
};
