import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
export class Cities {
 cities = [
    {
        "name": "Айтос",
        "region": "Бургас",
        "population": 22500,
      "risk": 1.2
    },
    {
        "name": "Аксаково",
        "region": "Варна",
        "population": 8206,
      "risk": 1.0
    },
    {
        "name": "Алфатар",
        "region": "Силистра",
        "population": 1608,
      "risk": 0.8
    },
    {
        "name": "Антоново",
        "region": "Търговище",
        "population": 1437,
      "risk": 0.8
    },
    {
        "name": "Априлци",
        "region": "Ловеч",
        "population": 2867,
      "risk": 0.8
    },
    {
        "name": "Ардино",
        "region": "Кърджали",
        "population": 3973,
      "risk": 0.8
    },
    {
        "name": "Асеновград",
        "region": "Пловдив",
        "population": 52896,
      "risk": 1.2
    },
    {
        "name": "Ахелой",
        "region": "Бургас",
        "population": 2109,
      "risk": 1.2
    },
    {
        "name": "Ахтопол",
        "region": "Бургас",
        "population": 1436,
      "risk": 1.2
    },
    {
        "name": "Балчик",
        "region": "Добрич",
        "population": 12726,
      "risk": 0.8
    },
    {
        "name": "Банкя",
        "region": "София град",
        "population": 11662,
        "risk": 1.2
    },
    {
        "name": "Банско",
        "region": "Благоевград",
        "population": 8170,
      "risk": 0.8
    },
    {
        "name": "Баня",
        "region": "Пловдив",
        "population": 3329,
      "risk": 1.2
    },
    {
        "name": "Батак",
        "region": "Пазарджик",
        "population": 3266,
      "risk": 0.8
    },
    {
        "name": "Батановци",
        "region": "Перник",
        "population": 2230,
        "risk": 1.2
    },
    {
        "name": "Белене",
        "region": "Плевен",
        "population": 8318,
      "risk": 1.0
    },
    {
        "name": "Белица",
        "region": "Благоевград",
        "population": 3184,
      "risk": 0.8
    },
    {
        "name": "Белово",
        "region": "Пазарджик",
        "population": 3876,
      "risk": 0.8
    },
    {
        "name": "Белоградчик",
        "region": "Видин",
        "population": 5452,
      "risk": 0.8
    },
    {
        "name": "Белослав",
        "region": "Варна",
        "population": 8129,
      "risk": 1.0
    },
    {
        "name": "Берковица",
        "region": "Монтана",
        "population": 13708,
      "risk": 0.8
    },
    {
        "name": "Благоевград",
        "region": "Благоевград",
        "population": 75397,
      "risk": 0.8
    },
    {
        "name": "Бобов дол",
        "region": "Кюстендил",
        "population": 6040,
      "risk": 0.8
    },
    {
        "name": "Бобошево",
        "region": "Кюстендил",
        "population": 1330,
      "risk": 0.8
    },
    {
        "name": "Божурище",
        "region": "Софийска",
        "population": 5420,
      "risk": 1.2
    },
    {
        "name": "Бойчиновци",
        "region": "Монтана",
        "population": 1487,
      "risk": 0.8
    },
    {
        "name": "Болярово",
        "region": "Ямбол",
        "population": 1245,
      "risk": 0.8
    },
    {
        "name": "Борово",
        "region": "Русе",
        "population": 2252,
      "risk": 0.8
    },
    {
        "name": "Ботевград",
        "region": "Софийска",
        "population": 21407,
      "risk": 1.2
    },
    {
        "name": "Брацигово",
        "region": "Пазарджик",
        "population": 4262,
      "risk": 0.8
    },
    {
        "name": "Брегово",
        "region": "Видин",
        "population": 2572,
      "risk": 0.8
    },
    {
        "name": "Брезник",
        "region": "Перник",
        "population": 4092,
        "risk": 1.2
    },
    {
        "name": "Брезово",
        "region": "Пловдив",
        "population": 1894,
      "risk": 1.2
    },
    {
        "name": "Брусарци",
        "region": "Монтана",
        "population": 1188,
      "risk": 0.8
    },
    {
        "name": "Бургас",
        "region": "Бургас",
        "population": 206722,
      "risk": 1.2
    },
    {
        "name": "Бухово",
        "region": "София град",
        "population": 2913,
        "risk": 1.2
    },
    {
        "name": "Българово",
        "region": "Бургас",
        "population": 2001,
      "risk": 1.2
    },
    {
        "name": "Бяла",
        "region": "Варна",
        "population": 2263,
      "risk": 1.0
    },
    {
        "name": "Бяла",
        "region": "Русе",
        "population": 8921,
      "risk": 0.8
    },
    {
        "name": "Бяла Слатина",
        "region": "Враца",
        "population": 12627,
      "risk": 1.0
    },
    {
        "name": "Бяла Черква",
        "region": "Велико Търново",
        "population": 2606,
      "risk": 1.0
    },
    {
        "name": "Варна",
        "region": "Варна",
        "population": 348136,
      "risk": 0.8
    },
    {
        "name": "Велики Преслав",
        "region": "Шумен",
        "population": 8937,
      "risk": 0.8
    },
    {
        "name": "Велико Търново",
        "region": "Велико Търново",
        "population": 71156,
      "risk": 1.0
    },
    {
        "name": "Велинград",
        "region": "Пазарджик",
        "population": 24800,
      "risk": 0.8
    },
    {
        "name": "Ветово",
        "region": "Русе",
        "population": 4831,
      "risk": 0.8
    },
    {
        "name": "Ветрен",
        "region": "Пазарджик",
        "population": 3152,
      "risk": 0.8
    },
    {
        "name": "Видин",
        "region": "Видин",
        "population": 51699,
      "risk": 0.8
    },
    {
        "name": "Враца",
        "region": "Враца",
        "population": 62000,
      "risk": 1.0
    },
    {
        "name": "Вълчедръм",
        "region": "Монтана",
        "population": 3568,
      "risk": 0.8
    },
    {
        "name": "Вълчи дол",
        "region": "Варна",
        "population": 3425,
      "risk": 0.8
    },
    {
        "name": "Върбица",
        "region": "Шумен",
        "population": 3595,
      "risk": 0.8
    },
    {
        "name": "Вършец",
        "region": "Монтана",
        "population": 6251,
      "risk": 0.8
    },
    {
        "name": "Габрово",
        "region": "Габрово",
        "population": 60364,
      "risk": 1.0
    },
    {
        "name": "Генерал Тошево",
        "region": "Добрич",
        "population": 6963,
      "risk": 0.8
    },
    {
        "name": "Главиница",
        "region": "Силистра",
        "population": 1881,
      "risk": 0.8
    },
    {
        "name": "Глоджево",
        "region": "Русе",
        "population": 3506,
      "risk": 0.8
    },
    {
        "name": "Годеч",
        "region": "Софийска",
        "population": 4332,
      "risk": 1.2
    },
    {
        "name": "Горна Оряховица",
        "region": "Велико Търново",
        "population": 33156,
      "risk": 1.0
    },
    {
        "name": "Гоце Делчев",
        "region": "Благоевград",
        "population": 20358,
      "risk": 0.8
    },
    {
        "name": "Грамада",
        "region": "Видин",
        "population": 1481,
      "risk": 0.8
    },
    {
        "name": "Гулянци",
        "region": "Плевен",
        "population": 3424,
      "risk": 1.0
    },
    {
        "name": "Гурково",
        "region": "Стара Загора",
        "population": 2996,
      "risk": 0.8
    },
    {
        "name": "Гълъбово",
        "region": "Стара Загора",
        "population": 8675,
      "risk": 0.8
    },
    {
        "name": "Две могили",
        "region": "Русе",
        "population": 4252,
      "risk": 0.8
    },
    {
        "name": "Дебелец",
        "region": "Велико Търново",
        "population": 3919,
      "risk": 1.0
    },
    {
        "name": "Девин",
        "region": "Смолян",
        "population": 6587,
        "risk": 1.2
    },
    {
        "name": "Девня",
        "region": "Варна",
        "population": 9259,
      "risk": 1.0
    },
    {
        "name": "Джебел",
        "region": "Кърджали",
        "population": 3200,
      "risk": 0.8
    },
    {
        "name": "Димитровград",
        "region": "Хасково",
        "population": 39934,
      "risk": 0.8
    },
    {
        "name": "Димово",
        "region": "Видин",
        "population": 1193,
      "risk": 0.8
    },
    {
        "name": "Добринище",
        "region": "Благоевград",
        "population": 2668,
      "risk": 0.8
    },
    {
        "name": "Добрич",
        "region": "Добрич",
        "population": 96881,
      "risk": 0.8
    },
    {
        "name": "Долна баня",
        "region": "Софийска",
        "population": 4793,
      "risk": 1.2
    },
    {
        "name": "Долна Митрополия",
        "region": "Плевен",
        "population": 3417,
      "risk": 1.0
    },
    {
        "name": "Долна Оряховица",
        "region": "Велико Търново",
        "population": 2884,
      "risk": 1.0
    },
    {
        "name": "Долни Дъбник",
        "region": "Плевен",
        "population": 4520,
      "risk": 1.0
    },
    {
        "name": "Долни чифлик",
        "region": "Варна",
        "population": 7056,
      "risk": 1.0
    },
    {
        "name": "Доспат",
        "region": "Смолян",
        "population": 2343,
        "risk": 1.2
    },
    {
        "name": "Драгоман",
        "region": "Софийска",
        "population": 3300,
      "risk": 1.2
    },
    {
        "name": "Дряново",
        "region": "Габрово",
        "population": 8028,
      "risk": 1.0
    },
    {
        "name": "Дулово",
        "region": "Силистра",
        "population": 7063,
      "risk": 0.8
    },
    {
        "name": "Дунавци",
        "region": "Видин",
        "population": 2597,
      "risk": 0.8
    },
    {
        "name": "Дупница",
        "region": "Кюстендил",
        "population": 37416,
      "risk": 0.8
    },
    {
        "name": "Дългопол",
        "region": "Варна",
        "population": 4847,
      "risk": 1.0
    },
    {
        "name": "Елена",
        "region": "Велико Търново",
        "population": 5693,
      "risk": 1.0
    },
    {
        "name": "Елин Пелин",
        "region": "Софийска",
        "population": 7278,
      "risk": 1.2
    },
    {
        "name": "Елхово",
        "region": "Ямбол",
        "population": 10492,
      "risk": 0.8
    },
    {
        "name": "Етрополе",
        "region": "Софийска",
        "population": 10951,
      "risk": 1.2
    },
    {
        "name": "Завет",
        "region": "Разград",
        "population": 3250,
      "risk": 0.8
    },
    {
        "name": "Земен",
        "region": "Перник",
        "population": 1749,
        "risk": 1.2
    },
    {
        "name": "Златарица",
        "region": "Велико Търново",
        "population": 2723,
      "risk": 1.0
    },
    {
        "name": "Златица",
        "region": "Софийска",
        "population": 5018,
      "risk": 1.2
    },
    {
        "name": "Златоград",
        "region": "Смолян",
        "population": 7220,
        "risk": 1.2
    },
    {
        "name": "Ивайловград",
        "region": "Хасково",
        "population": 3685,
      "risk": 0.8
    },
    {
        "name": "Игнатиево",
        "region": "Варна",
        "population": 4288,
      "risk": 1.0
    },
    {
        "name": "Искър",
        "region": "Плевен",
        "population": 3462,
      "risk": 1.0
    },
    {
        "name": "Исперих",
        "region": "Разград",
        "population": 9080,
      "risk": 0.8
    },
    {
        "name": "Ихтиман",
        "region": "Софийска",
        "population": 13591,
      "risk": 1.2
    },
    {
        "name": "Каблешково",
        "region": "Бургас",
        "population": 2898,
      "risk": 1.2
    },
    {
        "name": "Каварна",
        "region": "Добрич",
        "population": 11832,
      "risk": 0.8
    },
    {
        "name": "Казанлък",
        "region": "Стара Загора",
        "population": 50850,
      "risk": 0.8
    },
    {
        "name": "Калофер",
        "region": "Пловдив",
        "population": 2921,
      "risk": 1.2
    },
    {
        "name": "Камено",
        "region": "Бургас",
        "population": 5334,
      "risk": 1.2
    },
    {
        "name": "Каолиново",
        "region": "Шумен",
        "population": 1790,
      "risk": 0.8
    },
    {
        "name": "Карлово",
        "region": "Пловдив",
        "population": 24288,
      "risk": 1.2
    },
    {
        "name": "Карнобат",
        "region": "Бургас",
        "population": 18301,
      "risk": 1.2
    },
    {
        "name": "Каспичан",
        "region": "Шумен",
        "population": 3186,
      "risk": 0.8
    },
    {
        "name": "Кермен",
        "region": "Сливен",
        "population": 1738,
      "risk": 0.8
    },
    {
        "name": "Килифарево",
        "region": "Велико Търново",
        "population": 2365,
      "risk": 1.0
    },
    {
        "name": "Китен",
        "region": "Бургас",
        "population": 1131,
      "risk": 1.2
    },
    {
        "name": "Клисура",
        "region": "Пловдив",
        "population": 1093,
      "risk": 1.2
    },
    {
        "name": "Кнежа",
        "region": "Плевен",
        "population": 11060,
      "risk": 1.0
    },
    {
        "name": "Козлодуй",
        "region": "Враца",
        "population": 13677,
      "risk": 1.0
    },
    {
        "name": "Койнаре",
        "region": "Плевен",
        "population": 4541,
      "risk": 1.0
    },
    {
        "name": "Копривщица",
        "region": "Софийска",
        "population": 2348,
      "risk": 1.2
    },
    {
        "name": "Костандово",
        "region": "Пазарджик",
        "population": 4299,
      "risk": 0.8
    },
    {
        "name": "Костенец",
        "region": "Софийска",
        "population": 6633,
      "risk": 1.2
    },
    {
        "name": "Костинброд",
        "region": "Софийска",
        "population": 11849,
      "risk": 1.2
    },
    {
        "name": "Котел",
        "region": "Сливен",
        "population": 5880,
      "risk": 0.8
    },
    {
        "name": "Кочериново",
        "region": "Кюстендил",
        "population": 2288,
      "risk": 0.8
    },
    {
        "name": "Кресна",
        "region": "Благоевград",
        "population": 3656,
      "risk": 0.8
    },
    {
        "name": "Криводол",
        "region": "Враца",
        "population": 3259,
      "risk": 1.0
    },
    {
        "name": "Кричим",
        "region": "Пловдив",
        "population": 8605,
      "risk": 1.2
    },
    {
        "name": "Крумовград",
        "region": "Кърджали",
        "population": 4943,
      "risk": 0.8
    },
    {
        "name": "Крън",
        "region": "Стара Загора",
        "population": 3382,
      "risk": 0.8
    },
    {
        "name": "Кубрат",
        "region": "Разград",
        "population": 7750,
      "risk": 0.8
    },
    {
        "name": "Куклен",
        "region": "Пловдив",
        "population": 5999,
      "risk": 1.2
    },
    {
        "name": "Кула",
        "region": "Видин",
        "population": 3222,
      "risk": 0.8
    },
    {
        "name": "Кърджали",
        "region": "Кърджали",
        "population": 49326,
      "risk": 0.8
    },
    {
        "name": "Кюстендил",
        "region": "Кюстендил",
        "population": 48135,
      "risk": 0.8
    },
    {
        "name": "Левски",
        "region": "Плевен",
        "population": 10922,
      "risk": 1.0
    },
    {
        "name": "Летница",
        "region": "Ловеч",
        "population": 3483,
      "risk": 0.8
    },
    {
        "name": "Ловеч",
        "region": "Ловеч",
        "population": 37568,
      "risk": 0.8
    },
    {
        "name": "Лозница",
        "region": "Разград",
        "population": 2297,
      "risk": 0.8
    },
    {
        "name": "Лом",
        "region": "Монтана",
        "population": 24522,
      "risk": 0.8
    },
    {
        "name": "Луковит",
        "region": "Ловеч",
        "population": 9583,
      "risk": 0.8
    },
    {
        "name": "Лъки",
        "region": "Пловдив",
        "population": 2402,
      "risk": 1.2
    },
    {
        "name": "Любимец",
        "region": "Хасково",
        "population": 7681,
      "risk": 0.8
    },
    {
        "name": "Лясковец",
        "region": "Велико Търново",
        "population": 8629,
      "risk": 1.0
    },
    {
        "name": "Мадан",
        "region": "Смолян",
        "population": 6578,
        "risk": 1.2
    },
    {
        "name": "Маджарово",
        "region": "Хасково",
        "population": 724,
      "risk": 0.8
    },
    {
        "name": "Малко Търново",
        "region": "Бургас",
        "population": 2397,
      "risk": 1.2
    },
    {
        "name": "Мартен",
        "region": "Русе",
        "population": 3704,
      "risk": 0.8
    },
    {
        "name": "Мездра",
        "region": "Враца",
        "population": 10927,
      "risk": 1.0
    },
    {
        "name": "Мелник",
        "region": "Благоевград",
        "population": 334,
      "risk": 0.8
    },
    {
        "name": "Меричлери",
        "region": "Хасково",
        "population": 1812,
      "risk": 0.8
    },
    {
        "name": "Мизия",
        "region": "Враца",
        "population": 3282,
      "risk": 1.0
    },
    {
        "name": "Момин проход",
        "region": "Софийска",
        "population": 1611,
      "risk": 1.2
    },
    {
        "name": "Момчилград",
        "region": "Кърджали",
        "population": 8317,
      "risk": 0.8
    },
    {
        "name": "Монтана",
        "region": "Монтана",
        "population": 45191,
      "risk": 0.8
    },
    {
        "name": "Мъглиж",
        "region": "Стара Загора",
        "population": 3479,
      "risk": 0.8
    },
    {
        "name": "Неделино",
        "region": "Смолян",
        "population": 4273,
        "risk": 1.2
    },
    {
        "name": "Несебър",
        "region": "Бургас",
        "population": 13710,
      "risk": 1.2
    },
    {
        "name": "Николаево",
        "region": "Стара Загора",
        "population": 3147,
      "risk": 0.8
    },
    {
        "name": "Никопол",
        "region": "Плевен",
        "population": 3907,
      "risk": 1.0
    },
    {
        "name": "Нова Загора",
        "region": "Сливен",
        "population": 24074,
      "risk": 0.8
    },
    {
        "name": "Нови Искър",
        "region": "София град",
        "population": 14005,
        "risk": 1.2
    },
    {
        "name": "Нови пазар",
        "region": "Шумен",
        "population": 13652,
      "risk": 0.8
    },
    {
        "name": "Обзор",
        "region": "Бургас",
        "population": 2480,
      "risk": 1.2
    },
    {
        "name": "Омуртаг",
        "region": "Търговище",
        "population": 9195,
      "risk": 0.8
    },
    {
        "name": "Опака",
        "region": "Търговище",
        "population": 2776,
      "risk": 0.8
    },
    {
        "name": "Оряхово",
        "region": "Враца",
        "population": 5562,
      "risk": 1.0
    },
    {
        "name": "Павел баня",
        "region": "Стара Загора",
        "population": 2843,
      "risk": 0.8
    },
    {
        "name": "Павликени",
        "region": "Велико Търново",
        "population": 10952,
      "risk": 1.0
    },
    {
        "name": "Пазарджик",
        "region": "Пазарджик",
        "population": 77103,
      "risk": 0.8
    },
    {
        "name": "Панагюрище",
        "region": "Пазарджик",
        "population": 17929,
      "risk": 0.8
    },
    {
        "name": "Перник",
        "region": "Перник",
        "population": 79044,
        "risk": 1.2
    },
    {
        "name": "Перущица",
        "region": "Пловдив",
        "population": 5139,
      "risk": 1.2
    },
    {
        "name": "Петрич",
        "region": "Благоевград",
        "population": 31141,
      "risk": 0.8
    },
    {
        "name": "Пещера",
        "region": "Пазарджик",
        "population": 20467,
      "risk": 0.8
    },
    {
        "name": "Пирдоп",
        "region": "Софийска",
        "population": 7536,
      "risk": 1.2
    },
    {
        "name": "Плачковци",
        "region": "Габрово",
        "population": 1811,
      "risk": 1.0
    },
    {
        "name": "Плевен",
        "region": "Плевен",
        "population": 112840,
      "risk": 1.0
    },
    {
        "name": "Плиска",
        "region": "Шумен",
        "population": 1014,
      "risk": 0.8
    },
    {
        "name": "Пловдив",
        "region": "Пловдив",
        "population": 368853,
      "risk": 1.2
    },
    {
        "name": "Полски Тръмбеш",
        "region": "Велико Търново",
        "population": 4586,
      "risk": 1.0
    },
    {
        "name": "Поморие",
        "region": "Бургас",
        "population": 14003,
      "risk": 1.2
    },
    {
        "name": "Попово",
        "region": "Търговище",
        "population": 16047,
      "risk": 0.8
    },
    {
        "name": "Пордим",
        "region": "Плевен",
        "population": 2111,
      "risk": 1.0
    },
    {
        "name": "Правец",
        "region": "Софийска",
        "population": 4321,
      "risk": 1.2
    },
    {
        "name": "Приморско",
        "region": "Бургас",
        "population": 3546,
      "risk": 1.2
    },
    {
        "name": "Провадия",
        "region": "Варна",
        "population": 13145,
      "risk": 1.0
    },
    {
        "name": "Първомай",
        "region": "Пловдив",
        "population": 14091,
      "risk": 1.2
    },
    {
        "name": "Раднево",
        "region": "Стара Загора",
        "population": 13329,
      "risk": 0.8
    },
    {
        "name": "Радомир",
        "region": "Перник",
        "population": 14342,
        "risk": 1.2
    },
    {
        "name": "Разград",
        "region": "Разград",
        "population": 35177,
      "risk": 0.8
    },
    {
        "name": "Разлог",
        "region": "Благоевград",
        "population": 12820,
      "risk": 0.8
    },
    {
        "name": "Ракитово",
        "region": "Пазарджик",
        "population": 8648,
      "risk": 0.8
    },
    {
        "name": "Раковски",
        "region": "Пловдив",
        "population": 15586,
      "risk": 1.2
    },
    {
        "name": "Рила",
        "region": "Кюстендил",
        "population": 2783,
      "risk": 0.8
    },
    {
        "name": "Роман",
        "region": "Враца",
        "population": 3013,
      "risk": 1.0
    },
    {
        "name": "Рудозем",
        "region": "Смолян",
        "population": 3625,
        "risk": 1.2
    },
    {
        "name": "Русе",
        "region": "Русе",
        "population": 160511,
      "risk": 0.8
    },
    {
        "name": "Садово",
        "region": "Пловдив",
        "population": 2407,
      "risk": 1.2
    },
    {
        "name": "Самоков",
        "region": "Софийска",
        "population": 27348,
      "risk": 1.2
    },
    {
        "name": "Сандански",
        "region": "Благоевград",
        "population": 28342,
      "risk": 0.8
    },
    {
        "name": "Сапарева баня",
        "region": "Кюстендил",
        "population": 4128,
      "risk": 0.8
    },
    {
        "name": "Свети Влас",
        "region": "Бургас",
        "population": 4092,
      "risk": 1.2
    },
    {
        "name": "Свиленград",
        "region": "Хасково",
        "population": 18802,
      "risk": 0.8
    },
    {
        "name": "Свищов",
        "region": "Велико Търново",
        "population": 32132,
      "risk": 1.0
    },
    {
        "name": "Своге",
        "region": "Софийска",
        "population": 8084,
      "risk": 1.2
    },
    {
        "name": "Севлиево",
        "region": "Габрово",
        "population": 24558,
      "risk": 1.0
    },
    {
        "name": "Сеново",
        "region": "Русе",
        "population": 1449
    },
    {
        "name": "Септември",
        "region": "Пазарджик",
        "population": 8504,
      "risk": 0.8
    },
    {
        "name": "Силистра",
        "region": "Силистра",
        "population": 38364,
      "risk": 0.8
    },
    {
        "name": "Симеоновград",
        "region": "Хасково",
        "population": 6988,
      "risk": 0.8
    },
    {
        "name": "Симитли",
        "region": "Благоевград",
        "population": 7199,
      "risk": 0.8
    },
    {
        "name": "Славяново",
        "region": "Плевен",
        "population": 4351,
      "risk": 1.0
    },
    {
        "name": "Сливен",
        "region": "Сливен",
        "population": 96598,
      "risk": 0.8
    },
    {
        "name": "Сливница",
        "region": "Софийска",
        "population": 7268,
      "risk": 1.2
    },
    {
        "name": "Сливо поле",
        "region": "Русе",
        "population": 3322,
      "risk": 0.8
    },
    {
        "name": "Смолян",
        "region": "Смолян",
        "population": 30785,
        "risk": 1.2
    },
    {
        "name": "Смядово",
        "region": "Шумен",
        "population": 4049,
      "risk": 0.8
    },
    {
        "name": "Созопол",
        "region": "Бургас",
        "population": 5236,
      "risk": 1.2
    },
    {
        "name": "Сопот",
        "region": "Пловдив",
        "population": 9125,
      "risk": 1.2
    },
    {
        "name": "София",
        "region": "София град",
        "population": 1281148,
        "risk": 1.2
    },
    {
        "name": "Средец",
        "region": "Бургас",
        "population": 9161,
      "risk": 1.2
    },
    {
        "name": "Стамболийски",
        "region": "Пловдив",
        "population": 11662,
      "risk": 1.2
    },
    {
        "name": "Стара Загора",
        "region": "Стара Загора",
        "population": 149439,
      "risk": 0.8
    },
    {
        "name": "Стражица",
        "region": "Велико Търново",
        "population": 5323,
      "risk": 1.0
    },
    {
        "name": "Стралджа",
        "region": "Ямбол",
        "population": 6349,
      "risk": 0.8
    },
    {
        "name": "Стрелча",
        "region": "Пазарджик",
        "population": 4226,
      "risk": 0.8
    },
    {
        "name": "Суворово",
        "region": "Варна",
        "population": 5054,
      "risk": 1.0
    },
    {
        "name": "Сунгурларе",
        "region": "Бургас",
        "population": 3292,
      "risk": 1.2
    },
    {
        "name": "Сухиндол",
        "region": "Велико Търново",
        "population": 1996,
      "risk": 1.0
    },
    {
        "name": "Съединение",
        "region": "Пловдив",
        "population": 5788,
      "risk": 1.2
    },
    {
        "name": "Сърница",
        "region": "Пазарджик",
        "population": 3590,
      "risk": 0.8
    },
    {
        "name": "Твърдица",
        "region": "Сливен",
        "population": 6082,
      "risk": 0.8
    },
    {
        "name": "Тервел",
        "region": "Добрич",
        "population": 6764,
      "risk": 0.8
    },
    {
        "name": "Тетевен",
        "region": "Ловеч",
        "population": 10185,
      "risk": 0.8
    },
    {
        "name": "Тополовград",
        "region": "Хасково",
        "population": 5474,
      "risk": 0.8
    },
    {
        "name": "Троян",
        "region": "Ловеч",
        "population": 22179,
      "risk": 0.8
    },
    {
        "name": "Трън",
        "region": "Перник",
        "population": 2552,
        "risk": 1.2
    },
    {
        "name": "Тръстеник",
        "region": "Плевен",
        "population": 4536,
      "risk": 1.0
    },
    {
        "name": "Трявна",
        "region": "Габрово",
        "population": 9621,
      "risk": 1.0
    },
    {
        "name": "Тутракан",
        "region": "Силистра",
        "population": 9567,
      "risk": 0.8
    },
    {
        "name": "Търговище",
        "region": "Търговище",
        "population": 39836,
      "risk": 0.8
    },
    {
        "name": "Угърчин",
        "region": "Ловеч",
        "population": 2731,
      "risk": 0.8
    },
    {
        "name": "Хаджидимово",
        "region": "Благоевград",
        "population": 2702,
      "risk": 0.8
    },
    {
        "name": "Харманли",
        "region": "Хасково",
        "population": 19617,
      "risk": 0.8
    },
    {
        "name": "Хасково",
        "region": "Хасково",
        "population": 77365,
      "risk": 0.8
    },
    {
        "name": "Хисаря",
        "region": "Пловдив",
        "population": 7264,
      "risk": 1.2
    },
    {
        "name": "Цар Калоян",
        "region": "Разград",
        "population": 3742,
      "risk": 0.8
    },
    {
        "name": "Царево",
        "region": "Бургас",
        "population": 6268,
      "risk": 1.2
    },
    {
        "name": "Чепеларе",
        "region": "Смолян",
        "population": 5332,
        "risk": 1.2
    },
    {
        "name": "Червен бряг",
        "region": "Плевен",
        "population": 13958,
      "risk": 1.0
    },
    {
        "name": "Черноморец",
        "region": "Бургас",
        "population": 2186,
      "risk": 1.2
    },
    {
        "name": "Чипровци",
        "region": "Монтана",
        "population": 1835,
      "risk": 0.8
    },
    {
        "name": "Чирпан",
        "region": "Стара Загора",
        "population": 16517,
      "risk": 0.8
    },
    {
        "name": "Шабла",
        "region": "Добрич",
        "population": 3488,
      "risk": 0.8
    },
    {
        "name": "Шивачево",
        "region": "Сливен",
        "population": 3833,
      "risk": 0.8
    },
    {
        "name": "Шипка",
        "region": "Стара Загора",
        "population": 1355,
      "risk": 0.8
    },
    {
        "name": "Шумен",
        "region": "Шумен",
        "population": 89365,
      "risk": 0.8
    },
    {
        "name": "Ябланица",
        "region": "Ловеч",
        "population": 2799,
      "risk": 0.8
    },
    {
        "name": "Якоруда",
        "region": "Благоевград",
        "population": 5512,
      "risk": 0.8
    },
    {
        "name": "Ямбол",
        "region": "Ямбол",
        "population": 77150,
      "risk": 0.8
    }
]
}
