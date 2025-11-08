'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Game data
type CandidateBase = {
    id: string;
    nameUk: string;
    nameRu: string;
    party: string;
    logoSrc: string;
    photoSrc: string;
    color: string;
    baseRating: number;
    political_spectrum: 'pro_eu' | 'pro_ru' | 'centrist';
};

type PartyBase = {
    id: string;
    nameUk: string;
    nameRu: string;
    shortNameUk: string;
    shortNameRu: string;
    logoSrc: string;
    color: string;
    baseRating: number;
    political_spectrum: 'pro_eu' | 'pro_ru' | 'centrist';
};

const ALL_CANDIDATES: CandidateBase[] = [
    { id: 'yushchenko', nameUk: 'Віктор Ющенко', nameRu: 'Виктор Ющенко', party: 'Самовисування', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Viktor_Yushchenko_cropped.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Viktor_Yushchenko_cropped.jpg', color: '#F97316', baseRating: 39.9, political_spectrum: 'pro_eu' },
    { id: 'yanukovych', nameUk: 'Віктор Янукович', nameRu: 'Виктор Янукович', party: 'Партія регіонів', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Viktor_Yanukovych_%282010-11-22%29.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Viktor_Yanukovych_%282010-11-22%29.jpg', color: '#1D4ED8', baseRating: 39.26, political_spectrum: 'pro_ru' },
    { id: 'moroz', nameUk: 'Олександр Мороз', nameRu: 'Александр Мороз', party: 'Соціалістична партія України', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Oleksandr_Moroz_2005.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Oleksandr_Moroz_2005.jpg', color: '#16A34A', baseRating: 5.82, political_spectrum: 'centrist' },
    { id: 'symonenko', nameUk: 'Петро Симоненко', nameRu: 'Пётр Симоненко', party: 'Комуністична партія України', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Petro_Symonenko_2009.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Petro_Symonenko_2009.jpg', color: '#DC2626', baseRating: 4.97, political_spectrum: 'pro_ru' },
    { id: 'vitrenko', nameUk: 'Наталія Вітренко', nameRu: 'Наталия Витренко', party: 'Прогресивна соціалістична партія України', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nataliya_Vitrenko_2012-11-23.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nataliya_Vitrenko_2012-11-23.jpg', color: '#991B1B', baseRating: 1.53, political_spectrum: 'pro_ru' },
    { id: 'kinakh', nameUk: 'Анатолій Кінах', nameRu: 'Анатолий Кинах', party: 'Партія промисловців і підприємців', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Anatoliy_Kinakh_2020.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Anatoliy_Kinakh_2020.jpg', color: '#0EA5E9', baseRating: 0.93, political_spectrum: 'centrist' },
    { id: 'yakovenko', nameUk: 'Олександр Яковенко', nameRu: 'Александр Яковенко', party: 'Комуністична партія робітників і селян', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Oleksandr_Yakovenko_politician.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Oleksandr_Yakovenko_politician.jpg', color: '#B91C1C', baseRating: 0.78, political_spectrum: 'pro_ru' },
    { id: 'omelchenko', nameUk: 'Олександр Омельченко', nameRu: 'Александр Омельченко', party: 'Партія «Єдність»', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Oleksandr_Omelchenko_-_2004.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Oleksandr_Omelchenko_-_2004.jpg', color: '#0284C7', baseRating: 0.48, political_spectrum: 'centrist' },
    { id: 'chernovetskyi', nameUk: 'Леонід Черновецький', nameRu: 'Леонид Черновецкий', party: 'Самовисування', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Leonid_Chernovetskyi_%282009-09-22%29.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Leonid_Chernovetskyi_%282009-09-22%29.jpg', color: '#0D9488', baseRating: 0.46, political_spectrum: 'centrist' },
    { id: 'korchynskyi', nameUk: 'Дмитро Корчинський', nameRu: 'Дмитрий Корчинский', party: 'Самовисування', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Dmytro_Korchynskyi_2012.JPG', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Dmytro_Korchynskyi_2012.JPG', color: '#7C3AED', baseRating: 0.17, political_spectrum: 'pro_ru' },
    { id: 'chornovil', nameUk: 'Андрій Чорновіл', nameRu: 'Андрей Черновол', party: 'Самовисування', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Andriy_Chornovil_2002.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Andriy_Chornovil_2002.jpg', color: '#FACC15', baseRating: 0.12, political_spectrum: 'pro_eu' },
    { id: 'hrabar', nameUk: 'Микола Грабар', nameRu: 'Николай Грабарь', party: 'Самовисування', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Mykola_Hrabar.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Mykola_Hrabar.jpg', color: '#4B5563', baseRating: 0.07, political_spectrum: 'centrist' },
    { id: 'brodskyi', nameUk: 'Михайло Бродський', nameRu: 'Михаил Бродский', party: 'Самовисування', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Mykhailo_Brodskyy.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Mykhailo_Brodskyy.jpg', color: '#22C55E', baseRating: 0.05, political_spectrum: 'pro_eu' },
    { id: 'zbitnev', nameUk: 'Юрій Збітнєв', nameRu: 'Юрий Збитнев', party: 'Партія «Нова сила»', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Yuriy_Zbitnev.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Yuriy_Zbitnev.jpg', color: '#2563EB', baseRating: 0.05, political_spectrum: 'pro_eu' },
    { id: 'komissarenko', nameUk: 'Сергій Комісаренко', nameRu: 'Сергей Комиссаренко', party: 'Самовисування', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Serhiy_Komisarenko_2017.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Serhiy_Komisarenko_2017.jpg', color: '#14B8A6', baseRating: 0.04, political_spectrum: 'pro_eu' },
    { id: 'volha', nameUk: 'Василь Волга', nameRu: 'Василий Волга', party: 'Партія «Громадський контроль»', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Vasyl_Volha_2010.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Vasyl_Volha_2010.jpg', color: '#EA580C', baseRating: 0.04, political_spectrum: 'pro_ru' },
    { id: 'boiko', nameUk: 'Богдан Бойко', nameRu: 'Богдан Бойко', party: 'Рух українських патріотів', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Bohdan_Boyko_%282012%29.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Bohdan_Boyko_%282012%29.jpg', color: '#16A34A', baseRating: 0.04, political_spectrum: 'centrist' },
    { id: 'rzhavskyi', nameUk: 'Олександр Ржавський', nameRu: 'Александр Ржавский', party: 'Партія «Єдина родина»', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Oleksandr_Rzhavskyi.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Oleksandr_Rzhavskyi.jpg', color: '#C026D3', baseRating: 0.03, political_spectrum: 'pro_ru' },
    { id: 'rohozhynskyi', nameUk: 'Микола Рогожинський', nameRu: 'Николай Рогожинский', party: 'Самовисування', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Mykola_Rohozhynskyi.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Mykola_Rohozhynskyi.jpg', color: '#9333EA', baseRating: 0.03, political_spectrum: 'pro_ru' },
    { id: 'kryvobokov', nameUk: 'Владислав Кривобоков', nameRu: 'Владислав Кривобоков', party: 'Народна партія вкладників соцзахисту', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Vladyslav_Kryvobokov.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Vladyslav_Kryvobokov.jpg', color: '#0F766E', baseRating: 0.03, political_spectrum: 'centrist' },
    { id: 'bazilyuk', nameUk: 'Олександр Базилюк', nameRu: 'Александр Базилюк', party: "Слов'янська партія України", logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Oleksandr_Bazilyuk.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Oleksandr_Bazilyuk.jpg', color: '#FB7185', baseRating: 0.03, political_spectrum: 'pro_ru' },
    { id: 'dushyn', nameUk: 'Ігор Душин', nameRu: 'Игорь Душин', party: 'Ліберально-демократична партія України', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Ihor_Dushyn.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Ihor_Dushyn.jpg', color: '#0E7490', baseRating: 0.03, political_spectrum: 'centrist' },
    { id: 'kozak', nameUk: 'Роман Козак', nameRu: 'Роман Козак', party: 'Організація українських націоналістів', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Roman_Kozak.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Roman_Kozak.jpg', color: '#F97316', baseRating: 0.02, political_spectrum: 'pro_eu' },
    { id: 'nechyporuk', nameUk: 'Володимир Нечипорук', nameRu: 'Владимир Нечипорук', party: 'Самовисування', logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Volodymyr_Nechyporuk.jpg', photoSrc: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Volodymyr_Nechyporuk.jpg', color: '#94A3B8', baseRating: 0.02, political_spectrum: 'centrist' }
];

const ALL_PARTIES: PartyBase[] = [];

const RIVAL_PAIRS = { yushchenko: 'yanukovych', yanukovych: 'yushchenko' };

const MEDIA_OUTLETS = {
    '5 канал': { logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/5_kanal_logo.svg/160px-5_kanal_logo.svg.png' },
    'ICTV': { logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/ICTV_logo.svg/160px-ICTV_logo.svg.png' },
    '1+1': { logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/1plus1_logo.svg/160px-1plus1_logo.svg.png' },
    'Inter': { logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Inter_logo.svg/160px-Inter_logo.svg.png' },
    'Україна': { logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Media_Group_Ukraine_logo.svg/160px-Media_Group_Ukraine_logo.svg.png' }
};

const DOMESTIC_VOTERS = 27535184;
const DIASPORA_VOTERS = 500000;

const REGIONS = {
    total: { nameUk: 'Загалом', nameRu: 'Всего' },
    west: { nameUk: 'Захід', nameRu: 'Запад', population_weight: 0.2, preferences: { pro_ru: 0.5, pro_eu: 1.9, centrist: 1.1 } },
    center: { nameUk: 'Центр', nameRu: 'Центр', population_weight: 0.18, preferences: { pro_ru: 0.7, pro_eu: 1.5, centrist: 1.1 } },
    east: { nameUk: 'Схід', nameRu: 'Восток', population_weight: 0.22, preferences: { pro_ru: 1.9, pro_eu: 0.5, centrist: 1.0 } },
    south: { nameUk: 'Південь', nameRu: 'Юг', population_weight: 0.15, preferences: { pro_ru: 1.4, pro_eu: 0.9, centrist: 1.0 } },
    kyiv: { nameUk: 'Київ', nameRu: 'Киев', population_weight: 0.08, preferences: { pro_ru: 0.5, pro_eu: 1.8, centrist: 1.2 }, specialProEu: { round1: 48, round2: 60 } },
    donbas: { nameUk: 'Донбас', nameRu: 'Донбасс', population_weight: 0.1, preferences: { pro_ru: 2.3, pro_eu: 0.4, centrist: 0.9 } },
    crimea: { nameUk: 'Крим', nameRu: 'Крым', population_weight: 0.07, preferences: { pro_ru: 2.1, pro_eu: 0.5, centrist: 0.8 } },
    diaspora: { nameUk: 'Діаспора', nameRu: 'Диаспора', preferences: { pro_ru: 0.2, pro_eu: 3.2, centrist: 0.8 }, specialProEu: { round1: 70, round2: 82 } }
};

const actions = [
    { id: 'ads', titleUk: 'ТВ-реклама', titleRu: 'ТВ-реклама', descUk: 'Стабільне зростання. (+0.5-1.5%)', descRu: 'Стабильный рост. (+0.5-1.5%)', cost: 2.5 },
    { id: 'meeting', titleUk: 'Зустріч з виборцями', titleRu: 'Встреча с избирателями', descUk: 'Дешево та ефективно. (+0.3-1.8%)', descRu: 'Дешево и эффективно. (+0.3-1.8%)', cost: 1.2 },
    { id: 'debate', titleUk: 'Взяти участь у дебатах', titleRu: 'Участие в дебатах', descUk: 'Ризик/нагорода. (+2% до -3%)', descRu: 'Риск/награда. (+2% до -3%)', cost: 1.0 },
    { id: 'fundraising', titleUk: 'Збір коштів', titleRu: 'Сбор средств', descUk: 'Отримати гроші. (+2-4M)', descRu: 'Получить деньги. (+2-4M)', cost: 0 },
    { id: 'black_pr', titleUk: 'Чорний піар', titleRu: 'Чёрный пиар', descUk: 'Атакувати лідера. (-1-2.5% йому)', descRu: 'Атаковать лидера. (-1-2.5% ему)', cost: 3.5 },
    { id: 'reforms', titleUk: 'Обіцянка реформ', titleRu: 'Обещание реформ', descUk: 'Дорога, але потужна. (+1.5-3%)', descRu: 'Дорого, но мощно. (+1.5-3%)', cost: 4.0 }
];

const TRANSLATIONS = {
    uk: {
        title: 'Президентські вибори 2004',
        parliamentTitle: 'Парламентські вибори (недоступно)',
        selectGameMode: 'Виберіть режим гри',
        presidential: 'Президентські вибори',
        parliamentary: 'Парламентські вибори',
        selectCandidate: 'Виберіть свого кандидата',
        selectParty: 'Виберіть свою партію',
        chooseRival: 'Виберіть суперника',
        fromParty: 'від партії',
        selectRival: 'Обрати суперника',
        campaign: '🎯 КАМПАНІЯ',
        round2: '🏆 ДРУГИЙ ТУР',
        turn: 'Хід',
        budget: 'USD',
        back: '← Назад',
        backToCandidates: '← Назад до вибору кандидатів',
        actions: '⚡ Дії',
        campaignEnded: 'Кампанія завершена!',
        proceedToResults: 'Перейти до результатів першого туру',
        proceedToSummary: 'Перейти до підсумків',
        rating: '📊 Рейтинг',
        news: '📰 Новини',
        map: '🗺️ Карта України',
        results: 'Результати',
        round1Results: '📋 Результати Першого Туру',
        round2Results: '🏆 Результати Другого Туру',
        clickRegion: 'Клікніть на регіон для переглядута результатів',
        proceedRound2: 'Перейти до другого туру',
        seeSummary: 'Побачити підсумки',
        finalResults: '🏁 РЕЗУЛЬТАТИ',
        victory: '🎉🎉🎉 ПЕРЕМОГА! 🎉🎉🎉',
        defeat: '😢 Цього разу не пощастило 😢',
        playAgain: '🎮 Грати знову 🎮',
        notAdvanced: 'Ви не пройшли до другого туру.',
        proEu: 'Проєвропейський',
        proRu: 'Проросійський',
        centrist: 'Центрист',
        rating_label: 'Рейтинг',
        votes: 'голосів',
        loading: 'Завантаження...',
        loadingDesc: 'Завантаження даних президентських виборів України 2004...',
        loadingPercent: 'Завантаження: 50%',
        choose: 'Обрати →',
    },
    ru: {
        title: 'Президентские выборы 2004',
        parliamentTitle: 'Парламентские выборы (недоступно)',
        selectGameMode: 'Выберите режим игры',
        presidential: 'Президентские выборы',
        parliamentary: 'Парламентские выборы',
        selectCandidate: 'Выберите своего кандидата',
        selectParty: 'Выберите свою партию',
        chooseRival: 'Выберите соперника',
        fromParty: 'от партии',
        selectRival: 'Выбрать соперника',
        campaign: '🎯 КАМПАНИЯ',
        round2: '🏆 ВТОРОЙ ТУР',
        turn: 'Ход',
        budget: 'USD',
        back: '← Назад',
        backToCandidates: '← Назад к выбору кандидатов',
        actions: '⚡ Действия',
        campaignEnded: 'Кампания завершена!',
        proceedToResults: 'Перейти к результатам первого тура',
        proceedToSummary: 'Перейти к итогам',
        rating: '📊 Рейтинг',
        news: '📰 Новости',
        map: '🗺️ Карта Украины',
        results: 'Результаты',
        round1Results: '📋 Результаты Первого Тура',
        round2Results: '🏆 Результаты Второго Тура',
        clickRegion: 'Нажмите на регион для просмотра результатов',
        proceedRound2: 'Перейти ко второму туру',
        seeSummary: 'Посмотреть итоги',
        finalResults: '🏁 РЕЗУЛЬТАТЫ',
        victory: '🎉🎉🎉 ПОБЕДА! 🎉🎉🎉',
        defeat: '😢 На этот раз не повезло 😢',
        playAgain: '🎮 Играть снова 🎮',
        notAdvanced: 'Вы не прошли во второй тур.',
        proEu: 'Проевропейский',
        proRu: 'Пророссийский',
        centrist: 'Центрист',
        rating_label: 'Рейтинг',
        votes: 'голосов',
        loading: 'Загрузка...',
        loadingDesc: 'Загрузка данных президентских выборов Украины 2004...',
        loadingPercent: 'Загрузка: 50%',
        choose: 'Выбрать →',
    }
};

type GamePhase = 'mode_selection' | 'selection' | 'party_selection' | 'rival_selection' | 'campaign' | 'parliament_campaign' | 'round1_results' | 'round2_campaign' | 'round2_results' | 'final_screen';

type GameMode = 'presidential' | 'parliamentary';

type CandidateState = {
    id: string;
    nameUk: string;
    nameRu: string;
    party: string;
    logoSrc: string;
    photoSrc: string;
    color: string;
    baseRating: number;
    political_spectrum: 'pro_eu' | 'pro_ru' | 'centrist';
    currentRating: number;
    isPlayer?: boolean;
};

type PartyState = {
    id: string;
    nameUk: string;
    nameRu: string;
    shortNameUk: string;
    shortNameRu: string;
    logoSrc: string;
    color: string;
    baseRating: number;
    political_spectrum: 'pro_eu' | 'pro_ru' | 'centrist';
    currentRating: number;
    isPlayer?: boolean;
};

type NewsItem = {
    source: string;
    headline: string;
};

export default function Ukraine2004ElectionGame() {
    const [phase, setPhase] = useState<GamePhase>('mode_selection');
    const [gameMode, setGameMode] = useState<GameMode>('presidential');
    const [turn, setTurn] = useState(1);
    const [round2Turn, setRound2Turn] = useState(1);
    const [budget, setBudget] = useState(15);
    const [candidates, setCandidates] = useState<CandidateState[]>(
        ALL_CANDIDATES.map(c => ({ ...c, currentRating: c.baseRating }))
    );
    const [parties, setParties] = useState<PartyState[]>(
        ALL_PARTIES.map(p => ({ ...p, currentRating: p.baseRating }))
    );
    const [activeCandidates, setActiveCandidates] = useState<CandidateState[]>([]);
    const [activeParties, setActiveParties] = useState<PartyState[]>([]);
    const [playerCandidate, setPlayerCandidate] = useState<CandidateState | null>(null);
    const [playerParty, setPlayerParty] = useState<PartyState | null>(null);
    const [newsFeed, setNewsFeed] = useState<NewsItem[]>([]);
    const [selectedRegion, setSelectedRegion] = useState('total');
    const [round1Results, setRound1Results] = useState<any[]>([]);
    const [round2Candidates, setRound2Candidates] = useState<CandidateState[]>([]);
    const [round2Results, setRound2Results] = useState<any[]>([]);
    const [finalMessage, setFinalMessage] = useState('');
    const [isWinner, setIsWinnerState] = useState(false);
    const [finalNews, setFinalNews] = useState<NewsItem | null>(null);
    const [rivalPartyToChoose, setRivalPartyToChoose] = useState('');
    const [candidatesForRivalChoice, setCandidatesForRivalChoice] = useState<CandidateState[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [language, setLanguage] = useState('uk'); // Default to 'uk'
    const [fundraisingUses, setFundraisingUses] = useState(0); // Лічильник використань "Збір коштів" за хід

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200); // 1.2 seconds
        return () => clearTimeout(timer);
    }, []);

    // Helper function to get candidate name based on language
    const getCandidateName = (candidate: CandidateState): string => {
        return language === 'uk' ? candidate.nameUk : candidate.nameRu;
    };

    // Helper function to get party name based on language
    const getPartyName = (party: PartyState): string => {
        return language === 'uk' ? party.nameUk : party.nameRu;
    };

    const getPartyShortName = (party: PartyState): string => {
        return language === 'uk' ? party.shortNameUk : party.shortNameRu;
    };

    // Helper function to get name from result (works with both candidates and parties)
    const getNameFromResult = (result: any): string => {
        if (result.nameUk && result.nameRu) {
            return language === 'uk' ? result.nameUk : result.nameRu;
        }
        // Fallback to party name if structure is different
        return result.party || result.name || 'Unknown';
    };

    // Helper functions
    const calculateResults = (participants: CandidateState[], isRound2 = false) => {
        const regionalResults: { [region: string]: any[] } = {};
        
        const getRegionVoters = (regionKey: string): number => {
            if (regionKey === 'diaspora') return DIASPORA_VOTERS;
            const region = REGIONS[regionKey];
            return Math.round(DOMESTIC_VOTERS * (region.population_weight || 0));
        };
        
        const specificRegions = ['west', 'center', 'east', 'south', 'kyiv', 'donbas', 'crimea', 'diaspora'];
        
        // Calculate results for each specific region
        specificRegions.forEach(regionKey => {
            const region = REGIONS[regionKey];
            let regionCandidates = [...participants];
            
            // Apply regional preferences (not for diaspora)
            if (regionKey !== 'diaspora') {
                const regionPrefs = region.preferences || {};
                regionCandidates = regionCandidates.map(c => ({
                    ...c,
                    currentRating: c.currentRating * (regionPrefs[c.political_spectrum] || 1.0)
                }));
            }
            
            const regionVoters = getRegionVoters(regionKey);
            
            // Special statistics for Chisinau and diaspora
            if (regionKey === 'kyiv' || regionKey === 'diaspora') {
                const targetProEuPercentage = 
                    regionKey === 'kyiv' 
                        ? (isRound2 ? 60 : 48) 
                        : (isRound2 ? 82 : 70);
                
                const proEuCandidates = regionCandidates.filter(c => c.political_spectrum === 'pro_eu');
                const otherCandidates = regionCandidates.filter(c => c.political_spectrum !== 'pro_eu');
                
                const proEuVotes = Math.round((targetProEuPercentage / 100) * regionVoters);
                const otherVotes = regionVoters - proEuVotes;
                
                const proEuTotalRating = proEuCandidates.reduce((sum, c) => sum + c.currentRating, 0);
                const otherTotalRating = otherCandidates.reduce((sum, c) => sum + c.currentRating, 0);
                
                const regionResults = [];
                
                // Distribute pro-EU votes
                proEuCandidates.forEach(c => {
                    regionResults.push({
                        ...c,
                        percentage: (proEuVotes / regionVoters) * (c.currentRating / Math.max(proEuTotalRating, 0.01)) * 100,
                        votes: proEuTotalRating > 0 ? Math.round((c.currentRating / proEuTotalRating) * proEuVotes) : 0
                    });
                });
                
                // Distribute other votes
                otherCandidates.forEach(c => {
                    regionResults.push({
                        ...c,
                        percentage: (otherVotes / regionVoters) * (c.currentRating / Math.max(otherTotalRating, 0.01)) * 100,
                        votes: otherTotalRating > 0 ? Math.round((c.currentRating / otherTotalRating) * otherVotes) : 0
                    });
                });
                
                regionalResults[regionKey] = regionResults.sort((a, b) => b.votes - a.votes);
            } else {
                // Normal calculation for other regions
            const regionTotalRating = regionCandidates.reduce((sum, c) => sum + c.currentRating, 0);
                
            const regionResults = regionCandidates
                .map(c => ({
                    ...c,
                    percentage: regionTotalRating > 0 ? (c.currentRating / regionTotalRating) * 100 : 0,
                        votes: regionTotalRating > 0 ? Math.round((c.currentRating / regionTotalRating) * regionVoters) : 0
                }))
                    .sort((a, b) => b.votes - a.votes);
            
            regionalResults[regionKey] = regionResults;
            }
        });
        
        // Calculate 'total' by summing votes from all specific regions
        const totalAllVoters = DOMESTIC_VOTERS + DIASPORA_VOTERS;
        const candidateMap = new Map();
        
        participants.forEach(c => {
            candidateMap.set(c.id, { ...c, votes: 0 });
        });
        
        specificRegions.forEach(regionKey => {
            regionalResults[regionKey].forEach(res => {
                const candidate = candidateMap.get(res.id);
                if (candidate) {
                    candidate.votes += res.votes;
                }
            });
        });
        
        const totalResults = Array.from(candidateMap.values())
            .map(c => ({
                ...c,
                percentage: (c.votes / totalAllVoters) * 100
            }))
            .sort((a, b) => b.percentage - a.percentage);
        
        regionalResults['total'] = totalResults;
        
        return regionalResults;
    };

    const calculatePartyResults = (participants: PartyState[]) => {
        const regionalResults: { [region: string]: any[] } = {};
        
        const getRegionVoters = (regionKey: string): number => {
            if (regionKey === 'diaspora') return DIASPORA_VOTERS;
            const region = REGIONS[regionKey];
            return Math.round(DOMESTIC_VOTERS * (region.population_weight || 0));
        };
        
        const specificRegions = ['west', 'center', 'east', 'south', 'kyiv', 'donbas', 'crimea', 'diaspora'];
        
        // Calculate results for each specific region
        specificRegions.forEach(regionKey => {
            const region = REGIONS[regionKey];
            let regionParties = [...participants];
            
            // Apply regional preferences (not for diaspora)
            if (regionKey !== 'diaspora') {
                const regionPrefs = region.preferences || {};
                regionParties = regionParties.map(p => ({
                    ...p,
                    currentRating: p.currentRating * (regionPrefs[p.political_spectrum] || 1.0)
                }));
            }
            
            const regionVoters = getRegionVoters(regionKey);
            
            // Special statistics for Chisinau and diaspora
            if (regionKey === 'kyiv' || regionKey === 'diaspora') {
                const targetProEuPercentage = regionKey === 'kyiv' ? 55 : 70;
                
                const proEuParties = regionParties.filter(p => p.political_spectrum === 'pro_eu');
                const otherParties = regionParties.filter(p => p.political_spectrum !== 'pro_eu');
                
                const proEuVotes = Math.round((targetProEuPercentage / 100) * regionVoters);
                const otherVotes = regionVoters - proEuVotes;
                
                const proEuTotalRating = proEuParties.reduce((sum, p) => sum + p.currentRating, 0);
                const otherTotalRating = otherParties.reduce((sum, p) => sum + p.currentRating, 0);
                
                const regionResults = [];
                
                // Distribute pro-EU votes
                proEuParties.forEach(p => {
                    regionResults.push({
                        id: p.id,
                        nameUk: p.nameUk,
                        nameRu: p.nameRu,
                        party: p.nameUk,
                        logoSrc: p.logoSrc,
                        color: p.color,
                        percentage: (proEuVotes / regionVoters) * (p.currentRating / Math.max(proEuTotalRating, 0.01)) * 100,
                        votes: proEuTotalRating > 0 ? Math.round((p.currentRating / proEuTotalRating) * proEuVotes) : 0
                    });
                });
                
                // Distribute other votes
                otherParties.forEach(p => {
                    regionResults.push({
                        id: p.id,
                        nameUk: p.nameUk,
                        nameRu: p.nameRu,
                        party: p.nameUk,
                        logoSrc: p.logoSrc,
                        color: p.color,
                        percentage: (otherVotes / regionVoters) * (p.currentRating / Math.max(otherTotalRating, 0.01)) * 100,
                        votes: otherTotalRating > 0 ? Math.round((p.currentRating / otherTotalRating) * otherVotes) : 0
                    });
                });
                
                regionalResults[regionKey] = regionResults.sort((a, b) => b.votes - a.votes);
            } else {
                // Normal calculation for other regions
                const regionTotalRating = regionParties.reduce((sum, p) => sum + p.currentRating, 0);
                
                const regionResults = regionParties
                    .map(p => ({
                        id: p.id,
                        nameUk: p.nameUk,
                        nameRu: p.nameRu,
                        party: p.nameUk,
                        logoSrc: p.logoSrc,
                        color: p.color,
                        percentage: regionTotalRating > 0 ? (p.currentRating / regionTotalRating) * 100 : 0,
                        votes: regionTotalRating > 0 ? Math.round((p.currentRating / regionTotalRating) * regionVoters) : 0
                    }))
                    .sort((a, b) => b.votes - a.votes);
            
                regionalResults[regionKey] = regionResults;
            }
        });
        
        // Calculate 'total' by summing votes from all specific regions
        const totalAllVoters = DOMESTIC_VOTERS + DIASPORA_VOTERS;
        const partyMap = new Map();
        
        participants.forEach(p => {
            partyMap.set(p.id, { id: p.id, nameUk: p.nameUk, nameRu: p.nameRu, party: p.nameUk, logoSrc: p.logoSrc, color: p.color, votes: 0 });
        });
        
        specificRegions.forEach(regionKey => {
            regionalResults[regionKey].forEach(res => {
                const party = partyMap.get(res.id);
                if (party) {
                    party.votes += res.votes;
                }
            });
        });
        
        const totalResults = Array.from(partyMap.values())
            .map(p => ({
                ...p,
                percentage: (p.votes / totalAllVoters) * 100
            }))
            .sort((a, b) => b.percentage - a.percentage);
        
        regionalResults['total'] = totalResults;
        
        return regionalResults;
    };

    const generateNews = () => {
        const newsSources = Object.keys(MEDIA_OUTLETS);
        const usedSources = new Set<string>();
        const news: NewsItem[] = [];
        const currentCandidates = phase === 'round2_campaign' ? round2Candidates : activeCandidates;

        for (let i = 0; i < 3; i++) {
            let availableSources = newsSources.filter(s => !usedSources.has(s));
            if (availableSources.length === 0) availableSources = newsSources;
            const source = availableSources[Math.floor(Math.random() * availableSources.length)];
            usedSources.add(source);

            const newsTemplates = [
                { type: "negative", text: "{CANDIDATE} звинувачують у непрозорих закупівлях." },
                { type: "positive", text: "Економічна програма {CANDIDATE} отримала схвальні відгуки." },
                { type: "scandal", text: "Розслідування виявило зв'язки кампанії {CANDIDATE} з сумнівними бізнесменами." },
                { type: "neutral", text: "{CANDIDATE} провів зустріч з аграріями." },
                { type: "player_negative", text: "Ваші опоненти критикують Ваші популістські заяви." }
            ];

            const template = newsTemplates[Math.floor(Math.random() * newsTemplates.length)];
            let target, headline;

            if (template.type === 'player_negative' && currentCandidates.find(c => c.isPlayer)) {
                target = currentCandidates.find(c => c.isPlayer);
                headline = template.text;
            } else {
                const opponents = currentCandidates.filter(c => !c.isPlayer);
                if (opponents.length === 0) continue;
                target = opponents[Math.floor(Math.random() * opponents.length)];
                headline = template.text.replace('{CANDIDATE}', getCandidateName(target));
            }

            let effect = 0;
            switch (template.type) {
                case 'negative': effect = -(1 + Math.random()); break;
                case 'positive': effect = 1 + Math.random(); break;
                case 'scandal': effect = -(2 + Math.random() * 2); break;
                case 'player_negative': effect = -(1 + Math.random()); break;
            }

            if (target) {
                target.currentRating += effect;
                if (target.currentRating < 1) target.currentRating = 1;
            }

            news.unshift({ source, headline });
        }

        setNewsFeed(prev => [...news, ...prev].slice(0, 10));
    };

    const generateFinalNews = (winner: CandidateState): NewsItem => {
        const source = Object.keys(MEDIA_OUTLETS)[Math.floor(Math.random() * Object.keys(MEDIA_OUTLETS).length)];
        const templates = [
            `{WINNER_NAME} здобуває впевнену перемогу на президентських виборах.`,
            `Аналітики коментують перемогу {WINNER_NAME} як початок нової ери.`,
            `Виборці обрали: {WINNER_NAME} стає наступним президентом.`
        ];
        const headline = templates[Math.floor(Math.random() * templates.length)].replace('{WINNER_NAME}', getCandidateName(winner));
        return { source, headline };
    };

    const selectCandidate = (candidate: CandidateState) => {
        const newCandidates = candidates.map(c => ({ ...c, isPlayer: c.id === candidate.id }));
        setCandidates(newCandidates);
        const player = newCandidates.find(c => c.id === candidate.id)!;
        setPlayerCandidate(player);

        const active = [...newCandidates];
        setActiveCandidates(active);

        const rivalMapping = RIVAL_PAIRS[candidate.id as keyof typeof RIVAL_PAIRS];
        let rivals: CandidateState[];

        if (rivalMapping) {
            const rivalIds = Array.isArray(rivalMapping) ? rivalMapping : [rivalMapping];
            rivals = active.filter(c => rivalIds.includes(c.id));
        } else {
            rivals = active
                .filter(c => c.id !== candidate.id)
                .sort((a, b) => b.baseRating - a.baseRating)
                .slice(0, 3);
        }

        if (rivals.length === 0) {
            rivals = active.filter(c => c.id !== candidate.id).slice(0, 3);
        }

        setCandidatesForRivalChoice(rivals);
        setRivalPartyToChoose(language === 'uk' ? 'Ключовий опонент' : 'Ключевой оппонент');
        setFundraisingUses(0);
        setPhase('rival_selection');
    };

    const handleRivalSelection = (rival: CandidateState) => {
        setFundraisingUses(0);
        setPhase('campaign');
    };

    const performAction = (action: typeof actions[0]) => {
        if (budget < action.cost && action.cost > 0) return;
        
        // Перевірка ліміту для "Збір коштів" (максимум 2 рази за хід)
        if (action.id === 'fundraising' && fundraisingUses >= 2) return;

        setBudget(prev => prev - action.cost);
        let ratingChange = 0;
        const isParliament = phase === 'parliament_campaign';
        let updatedCandidates = phase === 'round2_campaign' ? [...round2Candidates] : [...activeCandidates];
        let updatedParties = isParliament ? [...activeParties] : [];

        switch (action.id) {
            case 'ads': ratingChange = 0.5 + Math.random(); break;
            case 'meeting': ratingChange = 0.3 + Math.random() * 1.5; break;
            case 'debate': ratingChange = Math.random() * 5 - 3; break;
            case 'fundraising': 
                setBudget(prev => prev + Math.round(2 + Math.random() * 2));
                setFundraisingUses(prev => prev + 1);
                return;
            case 'black_pr': {
                if (isParliament) {
                    const opponents = updatedParties
                        .filter(p => !p.isPlayer)
                        .sort((a, b) => b.currentRating - a.currentRating);
                    if (opponents.length > 0) {
                        const targetIdx = updatedParties.findIndex(p => p.id === opponents[0].id);
                        if (targetIdx >= 0) {
                            updatedParties[targetIdx] = {
                                ...updatedParties[targetIdx],
                                currentRating: Math.max(1, updatedParties[targetIdx].currentRating - (0.8 + Math.random() * 1.8))
                            };
                        }
                    }
                } else {
                    const opponents = updatedCandidates
                        .filter(c => !c.isPlayer)
                        .sort((a, b) => b.currentRating - a.currentRating);
                    if (opponents.length > 0) {
                        const targetIdx = updatedCandidates.findIndex(c => c.id === opponents[0].id);
                        if (targetIdx >= 0) {
                            updatedCandidates[targetIdx] = {
                                ...updatedCandidates[targetIdx],
                                currentRating: Math.max(1, updatedCandidates[targetIdx].currentRating - (0.8 + Math.random() * 1.8))
                            };
                        }
                    }
                }
                break;
            }
            case 'reforms': ratingChange = 1.5 + Math.random() * 1.5; break;
        }

        if (ratingChange !== 0) {
            if (isParliament && playerParty) {
                const playerIdx = updatedParties.findIndex(p => p.id === playerParty.id);
                if (playerIdx >= 0) {
                    updatedParties[playerIdx] = {
                        ...updatedParties[playerIdx],
                        currentRating: updatedParties[playerIdx].currentRating + ratingChange
                    };
                }
            } else if (playerCandidate) {
                const playerIdx = updatedCandidates.findIndex(c => c.id === playerCandidate.id);
                if (playerIdx >= 0) {
                    updatedCandidates[playerIdx] = {
                        ...updatedCandidates[playerIdx],
                        currentRating: updatedCandidates[playerIdx].currentRating + ratingChange
                    };
                }
            }
        }

        if (isParliament) {
            if (turn >= 10) {
                return;
            } else {
                setActiveParties(updatedParties);
                setTurn(prev => prev + 1);
                setFundraisingUses(0); // Скидаємо лічильник при переході до наступного ходу
            }
        } else if (phase === 'campaign') {
            if (turn >= 10) {
                // Don't auto-transition, user clicks button
                return;
            } else {
                setActiveCandidates(updatedCandidates);
                setTurn(prev => prev + 1);
                setFundraisingUses(0); // Скидаємо лічильник при переході до наступного ходу
            }
        } else if (phase === 'round2_campaign') {
            if (round2Turn >= 3) {
                // Don't auto-transition, user clicks button
                return;
            } else {
                setRound2Candidates(updatedCandidates);
                setRound2Turn(prev => prev + 1);
                setFundraisingUses(0); // Скидаємо лічильник при переході до наступного ходу
            }
        }

        generateNews();
    };

    const resetGame = () => {
        setPhase('mode_selection');
        setGameMode('presidential');
        setTurn(1);
        setRound2Turn(1);
        setBudget(15);
        setNewsFeed([]);
        setFundraisingUses(0); // Скидаємо лічильник при скиданні гри
        const newCandidates = ALL_CANDIDATES.map(c => ({ ...c, currentRating: c.baseRating, isPlayer: false }));
        const newParties = ALL_PARTIES.map(p => ({ ...p, currentRating: p.baseRating, isPlayer: false }));
        setCandidates(newCandidates);
        setParties(newParties);
        setActiveCandidates([]);
        setActiveParties([]);
        setPlayerCandidate(null);
        setPlayerParty(null);
        setSelectedRegion('total');
    };

    const handleRound1Results = () => {
        const totalResults = round1Results['total'] || [];
        const winner = totalResults[0];
        
        // Parliamentary mode - no second round
        if (gameMode === 'parliamentary') {
            const winnerParty = totalResults[0];
            if (winnerParty) {
                const isPlayerWinner = winnerParty.id === playerParty?.id;
                setFinalMessage(
                    isPlayerWinner 
                        ? `${getPartyName(winnerParty as any)} перемагає на парламентських виборах з результатом ${winnerParty.percentage.toFixed(2)}%!`
                        : `${getPartyName(winnerParty as any)} перемагає на парламентських виборах. Ваша партія: ${winnerParty.percentage.toFixed(2)}%`
                );
                setIsWinnerState(isPlayerWinner);
                setFinalNews({ source: '5 канал', headline: `${winnerParty.party} виграє парламентські вибори` });
                setPhase('final_screen');
            }
            return;
        }
        
        // Presidential mode
        if (winner && winner.percentage > 50) {
            setFinalMessage(`${getCandidateName(winner)} перемагає у першому турі з результатом ${winner.percentage.toFixed(2)}%!`);
            setIsWinnerState(winner.id === playerCandidate?.id);
            setFinalNews(generateFinalNews(winner));
            setPhase('final_screen');
        } else {
            const [c1_res, c2_res] = totalResults;
            const playerIsFinalist = c1_res && c2_res && (c1_res.id === playerCandidate?.id || c2_res.id === playerCandidate?.id);
            if (playerIsFinalist) {
                setRound2Candidates([
                    activeCandidates.find(c => c.id === c1_res.id)!,
                    activeCandidates.find(c => c.id === c2_res.id)!
                ]);
                setRound2Turn(1);
                setFundraisingUses(0); // Скидаємо лічильник при початку другого туру
                setPhase('round2_campaign');
            } else {
                setFinalMessage(TRANSLATIONS[language].notAdvanced);
                setIsWinnerState(false);
                setPhase('final_screen');
            }
        }
    };

    const handleRound2Results = () => {
        const totalResults = round2Results['total'] || [];
        const winner = totalResults[0];
        setFinalMessage(`${getCandidateName(winner)} перемагає у президентських виборах з результатом ${winner.percentage.toFixed(2)}%!`);
        setIsWinnerState(winner.id === playerCandidate?.id);
        setFinalNews(generateFinalNews(winner));
        setPhase('final_screen');
    };

    // Render different phases
    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                
                <div className="relative z-10 bg-white rounded-3xl shadow-lg border border-slate-100 p-16 text-center max-w-2xl w-full backdrop-blur-sm">
                    <h1 className="text-3xl md:text-6xl font-bold text-slate-900 mb-8">{TRANSLATIONS[language].loading}</h1>
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Lesser_Coat_of_Arms_of_Ukraine.svg" 
                        alt={language === 'uk' ? 'Герб України' : 'Герб Украины'} 
                        className="w-48 h-48 object-contain mx-auto mb-10"
                    />
                    <p className="text-slate-700 text-base">{TRANSLATIONS[language].loadingDesc}</p>
                    <div className="mt-8">
                        <Progress value={50} className="w-full h-2 mb-4" />
                        <p className="text-xs text-slate-600">{TRANSLATIONS[language].loadingPercent}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Game mode selection screen
    if (phase === 'mode_selection') {
        return (
            <div className="min-h-screen bg-white p-6 relative">
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="flex justify-end mb-6 gap-2">
                        <button 
                            onClick={() => setLanguage('uk')}
                            className={`px-4 py-2 rounded-lg font-bold transition-all ${language === 'uk' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-900 hover:bg-slate-300'}`}
                        >
                            UA
                        </button>
                        <button 
                            onClick={() => setLanguage('ru')}
                            className={`px-4 py-2 rounded-lg font-bold transition-all ${language === 'ru' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-900 hover:bg-slate-300'}`}
                        >
                            RU
                        </button>
                    </div>
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Lesser_Coat_of_Arms_of_Ukraine.svg" 
                                alt={language === 'uk' ? 'Герб України' : 'Герб Украины'} 
                                className="w-20 h-20 object-contain"
                            />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">{language === 'uk' ? 'Обери сценарій' : 'Выберите сценарий'}</h1>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {/* Presidential Elections */}
                        <button
                            onClick={() => {
                                setGameMode('presidential');
                                setPhase('selection');
                            }}
                            className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-3"
                        >
                            <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl border-2 border-slate-200 overflow-hidden transition-all duration-300 p-8 h-full">
                                <div className="flex flex-col items-center text-center gap-4">
                                    <div className="text-6xl mb-2">🟧</div>
                                    <h2 className="text-2xl font-black text-slate-900">{language === 'uk' ? 'Президентські вибори' : 'Президентские выборы'}</h2>
                                    <p className="text-slate-600 font-medium">2004</p>
                                    <div className="mt-4">
                                        <p className="text-sm text-slate-500 mb-3">{language === 'uk' ? 'Відчуйте атмосферу помаранчевої революції й повторного голосування.' : 'Проживите события оранжевой революции и повторного голосования.'}</p>
                                        <Button className="bg-slate-700 hover:bg-slate-800 text-white w-full py-3 rounded-xl font-bold">{TRANSLATIONS[language].choose}</Button>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Party selection screen for parliamentary elections
    if (phase === 'party_selection') {
        return (
            <div className="min-h-screen bg-white p-6 flex items-center justify-center">
                <Card className="p-8 max-w-lg text-center space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">{language === 'uk' ? 'Парламентська кампанія недоступна' : 'Парламентская кампания недоступна'}</h2>
                    <p className="text-slate-600">{language === 'uk' ? 'У цьому сценарії доступні лише президентські вибори 2004 року.' : 'В этом сценарии доступны только президентские выборы 2004 года.'}</p>
                    <Button onClick={resetGame} className="bg-slate-700 hover:bg-slate-800 text-white">{TRANSLATIONS[language].back}</Button>
                </Card>
            </div>
        );
    }

    if (phase === 'selection') {
        // Sort candidates by rating (descending)
        const sortedCandidates = [...candidates].sort((a, b) => b.baseRating - a.baseRating);
        const maxRating = Math.max(...sortedCandidates.map(c => c.baseRating));
        
        return (
            <div className="min-h-screen bg-white p-6 relative">
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex justify-end mb-6 gap-2">
                        <button 
                            onClick={() => setLanguage('uk')}
                            className={`px-4 py-2 rounded-lg font-bold transition-all ${language === 'uk' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-900 hover:bg-slate-300'}`}
                        >
                            UA
                        </button>
                        <button 
                            onClick={() => setLanguage('ru')}
                            className={`px-4 py-2 rounded-lg font-bold transition-all ${language === 'ru' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-900 hover:bg-slate-300'}`}
                        >
                            RU
                        </button>
                    </div>
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Lesser_Coat_of_Arms_of_Ukraine.svg" 
                                alt={language === 'uk' ? 'Герб України' : 'Герб Украины'} 
                                className="w-16 h-16 object-contain"
                            />
                        </div>
                        <h1 className="text-3xl md:text-6xl font-bold text-slate-900 mb-2 tracking-tight">{TRANSLATIONS[language].title}</h1>
                        <p className="text-xl text-slate-600 font-medium">{TRANSLATIONS[language].selectCandidate}</p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedCandidates.map(candidate => (
                            <div
                                key={candidate.id}
                                onClick={() => selectCandidate(candidate)}
                                className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
                            >
                                {/* Main card - Vertical */}
                                <div className="relative bg-white rounded-3xl shadow-md hover:shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300 flex flex-col h-full">
                                    {/* Top - Photo with gradient background */}
                                    <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden flex items-center justify-center">
                                        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `linear-gradient(135deg, ${candidate.color}20 0%, ${candidate.color}05 100%)` }}></div>
                                                <img 
                                                    src={candidate.photoSrc} 
                                                    alt={candidate.name} 
                                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg relative z-10"
                                                />
                                    </div>
                                    
                                    {/* Middle - Content */}
                                    <div className="flex-1 p-5 flex flex-col justify-between">
                                        {/* Top section */}
                                        <div>
                                            <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-all text-center mb-2 leading-tight">
                                                {getCandidateName(candidate)}
                                            </h3>
                                            <div className="flex items-center justify-center gap-2 mb-3">
                                                <img 
                                                    src={candidate.logoSrc} 
                                                    alt={candidate.party} 
                                                    className="w-5 h-5 object-contain"
                                                />
                                                <p className="text-xs text-slate-600 font-semibold">{candidate.party}</p>
                                            </div>
                                        </div>
                                        
                                        {/* Bottom section */}
                                        <div className="space-y-3 pt-3 border-t border-slate-100">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <p className="text-xs text-slate-600 font-medium">
                                                    {
                                                        candidate.political_spectrum === 'pro_eu' ? TRANSLATIONS[language].proEu :
                                                        candidate.political_spectrum === 'pro_ru' ? TRANSLATIONS[language].proRu :
                                                        TRANSLATIONS[language].centrist
                                                    }
                                                </p>
                                                <div className="text-center">
                                                    <p className="text-xs text-slate-600 font-bold">{TRANSLATIONS[language].rating_label}</p>
                                                    <p className="text-2xl font-black text-slate-900">{candidate.baseRating}%</p>
                                                </div>
                                            </div>
                                            
                                            {/* Progress bar */}
                                            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                                <div 
                                                    className="h-full transition-all duration-500 rounded-full"
                                                    style={{ 
                                                        width: `${(candidate.baseRating / maxRating) * 100}%`,
                                                        backgroundColor: candidate.color || '#64748b'
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Button */}
                                    <div className="px-5 pb-5">
                                        <button className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                                            {TRANSLATIONS[language].choose}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (phase === 'rival_selection') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50 p-4 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                
                <div className="max-w-6xl mx-auto relative z-10">
                    <Button onClick={resetGame} variant="outline" className="mb-6 md:mb-8 border-slate-300 text-slate-700 hover:bg-slate-100">{TRANSLATIONS[language].backToCandidates}</Button>
                    <div className="text-center mb-8 md:mb-12">
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-3 tracking-tight">{TRANSLATIONS[language].chooseRival}</h1>
                        <p className="text-sm md:text-lg text-slate-600 font-medium">{rivalPartyToChoose}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 max-w-5xl mx-auto">
                        {candidatesForRivalChoice.map(candidate => (
                            <div
                                key={candidate.id}
                                onClick={() => handleRivalSelection(candidate)}
                                className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-3"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-slate-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-40 transition duration-500"></div>
                                    <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-xl border border-slate-100 p-4 md:p-10 backdrop-blur-sm">
                                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-4 md:mb-8">
                                            <img src={candidate.photoSrc} alt={getCandidateName(candidate)} 
                                                 className="w-20 md:w-28 h-20 md:h-28 rounded-full border-4 border-slate-200 object-cover shadow-md flex-shrink-0" />
                                            <div className="flex-1 text-center md:text-left">
                                                <h3 className="font-bold text-xl md:text-3xl text-slate-900">{getCandidateName(candidate)}</h3>
                                                <p className="text-slate-700 font-bold text-sm md:text-lg mt-2">{candidate.party}</p>
                                                <img src={candidate.logoSrc} alt={candidate.party} className="w-10 md:w-16 h-10 md:h-16 mt-2 md:mt-4 mx-auto md:mx-0" />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-slate-700 hover:bg-slate-800 text-white text-sm md:text-lg py-4 md:py-7 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl">{TRANSLATIONS[language].selectRival}</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (phase === 'campaign' || phase === 'round2_campaign' || phase === 'parliament_campaign') {
        const isRound2 = phase === 'round2_campaign';
        const isParliament = phase === 'parliament_campaign';
        const currentCandidates = isRound2 ? round2Candidates : activeCandidates;
        const currentParties = isParliament ? activeParties : [];
        const currentParticipants = isParliament ? activeParties : activeCandidates;
        const currentTurn = isRound2 ? round2Turn : turn;
        const maxTurns = isRound2 ? 3 : 10;
        const availableActions = actions.filter(a => !a.availability || a.availability.includes(playerCandidate?.political_spectrum || 'pro_eu'));

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50 p-3 relative overflow-hidden flex flex-col">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                
                <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col h-full">
                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4 mb-3 backdrop-blur-sm flex-shrink-0">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">
                                    {isRound2 ? TRANSLATIONS[language].round2 : TRANSLATIONS[language].campaign}
                                </h1>
                                <div className="flex gap-6 mt-2 text-sm">
                                    <p className="text-slate-700 font-bold">{TRANSLATIONS[language].turn} {currentTurn}/{maxTurns}</p>
                                    <p className="font-bold text-slate-900">💰 ${budget.toFixed(1)}M {TRANSLATIONS[language].budget}</p>
                                </div>
                            </div>
                            {turn === 1 && !isRound2 && (
                                <Button onClick={resetGame} variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100">{TRANSLATIONS[language].back}</Button>
                            )}
                        </div>
                        
                        {(playerCandidate || playerParty) && (
                            <div className="flex items-center gap-2 pt-3 border-t border-slate-200 mt-3">
                                {isParliament && playerParty ? (
                                    <>
                                        <img src={playerParty.logoSrc} alt={getPartyName(playerParty)}
                                             className="w-10 h-10 border-2 border-slate-200 object-contain shadow-md" />
                                        <div>
                                            <p className="font-bold text-sm text-slate-900">{getPartyName(playerParty)}</p>
                                            <p className="text-xs text-slate-600 font-bold">{getPartyShortName(playerParty)}</p>
                                        </div>
                                    </>
                                ) : playerCandidate ? (
                                    <>
                                        <img src={playerCandidate.photoSrc} alt={getCandidateName(playerCandidate)}
                                             className="w-10 h-10 rounded-full border-2 border-slate-200 object-cover shadow-md" />
                                        <div>
                                            <p className="font-bold text-sm text-slate-900">{getCandidateName(playerCandidate)}</p>
                                            <p className="text-xs text-slate-600 font-bold">{playerCandidate.party}</p>
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        )}
                    </div>

                    {/* Three Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 overflow-hidden">
                        {/* Actions Column */}
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-3 backdrop-blur-sm flex flex-col overflow-hidden">
                            <h2 className="text-base font-bold text-slate-900 mb-3 flex-shrink-0">{TRANSLATIONS[language].actions}</h2>
                            {currentTurn >= maxTurns ? (
                                <div className="flex flex-col items-center justify-center h-full gap-3">
                                    <p className="text-slate-600 font-bold text-center text-sm">{TRANSLATIONS[language].campaignEnded}</p>
                                    <Button 
                                        onClick={() => {
                                            if (isParliament) {
                                                const results = calculatePartyResults(activeParties);
                                                setRound1Results(results);
                                                setPhase('round1_results');
                                            } else {
                                                const results = calculateResults(currentCandidates, isRound2);
                                                if (isRound2) {
                                                    setRound2Results(results);
                                                    setPhase('round2_results');
                                                } else {
                                                    setRound1Results(results);
                                                    setPhase('round1_results');
                                                }
                                            }
                                            setSelectedRegion('total');
                                        }}
                                        className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-bold text-sm w-full"
                                    >
                                        {isParliament ? TRANSLATIONS[language].proceedToSummary : (isRound2 ? TRANSLATIONS[language].proceedToSummary : TRANSLATIONS[language].proceedToResults)}
                                    </Button>
                                </div>
                            ) : (
                            <div className="space-y-1.5 overflow-y-auto flex-1">
                                {availableActions.map(action => {
                                    const isFundraisingLimited = action.id === 'fundraising' && fundraisingUses >= 2;
                                    const isDisabled = (budget < action.cost && action.cost > 0) || isFundraisingLimited;
                                    return (
                                        <Button
                                            key={action.id}
                                            onClick={() => performAction(action)}
                                            disabled={isDisabled}
                                            className={`w-full justify-start text-left h-auto py-1.5 px-2 rounded-lg transition-all duration-300 text-xs ${
                                                isDisabled
                                                    ? 'bg-slate-100 text-slate-400'
                                                    : 'bg-slate-700 hover:bg-slate-800 text-white shadow-md hover:shadow-lg'
                                            }`}
                                        >
                                            <div className="flex flex-col items-start gap-0.5 w-full">
                                                <span className="font-bold text-xs">{language === 'uk' ? action.titleUk : action.titleRu}</span>
                                                <span className="text-xs opacity-90 line-clamp-1">
                                                    {language === 'uk' ? action.descUk : action.descRu}
                                                    {action.id === 'fundraising' && (
                                                        <span className="ml-1 text-xs opacity-75">
                                                            ({fundraisingUses}/2)
                                                        </span>
                                                    )}
                                                </span>
                                                <span className={`text-xs font-bold ${action.cost > 0 ? 'text-red-300' : 'text-green-300'}`}>
                                                    {action.cost > 0 ? `- $${action.cost.toFixed(1)}M` : `+ $${Math.abs(action.cost).toFixed(1)}M`}
                                                </span>
                                            </div>
                                        </Button>
                                    );
                                })}
                            </div>
                            )}
                        </div>

                        {/* Ratings Column */}
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-3 backdrop-blur-sm flex flex-col overflow-hidden">
                            <h2 className="text-base font-bold text-slate-900 mb-3 flex-shrink-0">{TRANSLATIONS[language].rating}</h2>
                            <div className="space-y-2 overflow-y-auto flex-1">
                                {(() => {
                                    const allRatings = isParliament 
                                        ? (calculatePartyResults(activeParties)['total'] || []).sort((a, b) => b.percentage - a.percentage)
                                        : (calculateResults(currentCandidates)['total'] || []).sort((a, b) => b.percentage - a.percentage);
                                    const maxPercentage = Math.max(...allRatings.map(r => r.percentage), 1);
                                    return allRatings.map(res => (
                                        <div key={res.id} className="text-sm">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center gap-1 flex-1 min-w-0">
                                                    <img src={res.logoSrc} alt={res.party} className="w-3 h-3 object-contain flex-shrink-0" />
                                                    <span className="font-bold text-slate-900 truncate">{getNameFromResult(res)}</span>
                                                </div>
                                                <span className="font-black text-slate-900 ml-1 flex-shrink-0 text-sm">{res.percentage.toFixed(1)}%</span>
                                            </div>
                                            <div className="h-2 bg-slate-100 rounded overflow-hidden">
                                                <div 
                                                    className="h-full transition-all duration-500 rounded"
                                                    style={{ 
                                                        width: `${(res.percentage / maxPercentage) * 100}%`,
                                                        backgroundColor: res.color || '#64748b'
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    ));
                                })()}
                            </div>
                        </div>

                        {/* News Column */}
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-3 backdrop-blur-sm flex flex-col overflow-hidden">
                            <h2 className="text-base font-bold text-slate-900 mb-3 flex-shrink-0">{TRANSLATIONS[language].news}</h2>
                            <div className="space-y-1.5 overflow-y-auto flex-1">
                                {newsFeed.slice(0, 4).map((news, idx) => (
                                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded p-1.5 text-sm">
                                        <div className="flex items-center gap-1 mb-0.5">
                                            <div className="w-4 h-4 rounded border border-slate-300 p-0.5 flex items-center justify-center bg-white flex-shrink-0">
                                                {MEDIA_OUTLETS[news.source as keyof typeof MEDIA_OUTLETS] && (
                                                    <img src={MEDIA_OUTLETS[news.source as keyof typeof MEDIA_OUTLETS].logoSrc} alt={news.source} className="w-full h-full object-contain" />
                                                )}
                                            </div>
                                            <p className="font-bold text-slate-900 truncate text-sm">{news.source}</p>
                                        </div>
                                        <p className="text-slate-700 line-clamp-2 text-sm">{news.headline}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (phase === 'round1_results' || phase === 'round2_results') {
        const allResults = phase === 'round1_results' ? round1Results : round2Results;
        const title = phase === 'round1_results' ? TRANSLATIONS[language].round1Results : TRANSLATIONS[language].round2Results;
        // For parliamentary mode, show "Show results" instead of "Proceed to second round"
        const buttonText = gameMode === 'parliamentary' && phase === 'round1_results' 
            ? TRANSLATIONS[language].seeSummary 
            : (phase === 'round1_results' ? TRANSLATIONS[language].proceedRound2 : TRANSLATIONS[language].seeSummary);
        
        // Get results for selected region
        const results = allResults[selectedRegion] || allResults['total'] || [];
        const selectedRegionName = Object.entries(REGIONS).find(([k]) => k === selectedRegion)?.[1]?.[language === 'uk' ? 'nameUk' : 'nameRu'] || (language === 'uk' ? 'Загалом' : 'Всего');

        return (
            <div className="min-h-screen bg-white p-4 relative overflow-hidden flex flex-col">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                
                <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col h-full">
                    <div className="text-center mb-4 flex-shrink-0">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">{title}</h1>
                        <p className="text-sm text-slate-600">{TRANSLATIONS[language].clickRegion}</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-1 overflow-hidden">
                        {/* Map */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4 h-full flex flex-col overflow-hidden">
                                <h2 className="text-sm font-bold text-slate-900 mb-3 flex-shrink-0">{TRANSLATIONS[language].map}</h2>
                                
                                {/* Clickable map regions */}
                                <div className="grid grid-cols-2 gap-2 flex-1 overflow-y-auto">
                                    {Object.entries(REGIONS).map(([key, region]) => {
                                        const regionResults = allResults[key] || [];
                                        const topResult = regionResults[0];
                                        const percentage = topResult?.percentage.toFixed(1) || '0';
                                        
                                        return (
                                            <button
                                                key={key}
                                                onClick={() => setSelectedRegion(key)}
                                                className={`p-2 rounded-lg transition-all duration-300 border-2 transform hover:scale-105 text-xs ${
                                                    selectedRegion === key
                                                        ? 'bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600 text-white shadow-lg'
                                                        : 'bg-white border-slate-200 text-slate-900 hover:border-slate-400 shadow-sm hover:shadow-md'
                                                }`}
                                            >
                                                <div className="font-bold text-xs truncate">{language === 'uk' ? region.nameUk : region.nameRu}</div>
                                                <div className={`text-xs mt-0.5 ${selectedRegion === key ? 'text-slate-200' : 'text-slate-600'}`}>
                                                    {getNameFromResult(topResult)?.split(' ').pop() || 'N/A'}: <span className="font-bold">{percentage}%</span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Results Panel - Full width */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4 h-full flex flex-col overflow-hidden">
                                <h2 className="text-sm font-bold text-slate-900 mb-3 flex-shrink-0">{selectedRegionName}</h2>
                                <p className="text-xs text-slate-600 mb-3 flex-shrink-0 font-semibold">{TRANSLATIONS[language].results}</p>
                                
                                <div className="grid grid-cols-2 gap-2 overflow-y-auto flex-1">
                                    {results.map((res, idx) => (
                                        <div key={idx} className="bg-white rounded-lg border border-slate-200 p-2 md:p-3 hover:shadow-md transition-all">
                                            <div className="flex gap-2 md:gap-3 items-start">
                                                {/* Logo */}
                                                <div className="w-10 md:w-12 h-10 md:h-12 flex-shrink-0 flex items-center justify-center bg-slate-50 rounded border border-slate-200">
                                                    <img 
                                                        src={res.logoSrc} 
                                                        alt={res.party} 
                                                        className="w-8 md:w-10 h-8 md:h-10 object-contain"
                                                    />
                                                </div>
                                                
                                                {/* Name and Stats */}
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-xs md:text-sm text-slate-900 break-words">{getNameFromResult(res)}</p>
                                                    <p className="text-xs md:text-sm text-slate-600 font-semibold">
                                                        <span className="font-black text-slate-900">{res.percentage.toFixed(2)}%</span> ({res.votes.toLocaleString('uk-UA')})
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Button */}
                    <div className="text-center mt-3 flex-shrink-0">
                        <Button size="lg" onClick={phase === 'round1_results' ? handleRound1Results : handleRound2Results}
                                className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-4 text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-bold">
                            {buttonText}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (phase === 'final_screen') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50 flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                
                <div className="relative z-10 bg-white rounded-3xl shadow-lg border border-slate-100 p-16 text-center max-w-2xl w-full backdrop-blur-sm">
                    <h1 className="text-3xl md:text-6xl font-bold text-slate-900 mb-8">{TRANSLATIONS[language].finalResults}</h1>
                    <p className="text-lg md:text-2xl text-slate-700 mb-10 leading-relaxed font-bold">{finalMessage}</p>
                    
                    <div className={`text-3xl md:text-5xl font-black mb-12 p-8 rounded-3xl border-4 transition-all duration-500 ${
                        isWinner 
                            ? 'bg-green-50 text-green-700 border-green-300' 
                            : 'bg-slate-100 text-slate-700 border-slate-300'
                    }`}>
                        {isWinner ? TRANSLATIONS[language].victory : TRANSLATIONS[language].defeat}
                    </div>

                    {finalNews && (
                        <div className="bg-slate-50 border-2 border-slate-300 rounded-3xl p-8 mb-10 backdrop-blur-sm">
                            <p className="font-black text-lg text-slate-900 mb-3">[{finalNews.source}]</p>
                            <p className="text-slate-800 text-base font-bold">{finalNews.headline}</p>
                        </div>
                    )}

                    <Button size="lg" onClick={resetGame} className="w-full bg-slate-700 hover:bg-slate-800 text-white py-10 text-2xl rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 font-bold">{TRANSLATIONS[language].playAgain}</Button>
                </div>
            </div>
        );
    }

    return null;
}
