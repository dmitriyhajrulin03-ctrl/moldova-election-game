'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Game data
const ALL_CANDIDATES = [
    { id: 'grosu', nameUk: 'Ігор Гросу', nameRu: 'Игорь Гросу', party: 'PAS', logoSrc: '/logo/Grosu.png', photoSrc: '/photo/Grosu-photo.png', color: '#FFDD00', baseRating: 25, political_spectrum: 'pro_eu' },
    { id: 'recean', nameUk: 'Дорін Речан', nameRu: 'Дорин Речан', party: 'PAS', logoSrc: '/logo/Recean.png', photoSrc: '/photo/Recean-photo.png', color: '#FFDD00', baseRating: 24, political_spectrum: 'pro_eu' },
    { id: 'dodon', nameUk: 'Ігор Додон', nameRu: 'Игорь Додон', party: 'PSRM', logoSrc: '/logo/Dodon.png', photoSrc: '/photo/Dodon-photo.png', color: '#DF2224', baseRating: 22, political_spectrum: 'pro_ru' },
    { id: 'ceban', nameUk: 'Іон Чебан', nameRu: 'Ион Чебан', party: 'MAN', logoSrc: '/logo/Ceban.png', photoSrc: '/photo/Ceban-photo.png', color: '#009A7D', baseRating: 18, political_spectrum: 'centrist' },
    { id: 'usatii', nameUk: 'Ренато Усатий', nameRu: 'Ренато Усатий', party: 'Partidul Nostru', logoSrc: '/logo/Usatii.png', photoSrc: '/photo/Usatii-photo.png', color: '#2680FA', baseRating: 9, political_spectrum: 'centrist' },
    { id: 'caraman', nameUk: 'Діана Караман', nameRu: 'Диана Караман', party: 'PCRM', logoSrc: '/logo/Caraman.png', photoSrc: '/photo/Caraman-photo.png', color: '#D2222A', baseRating: 6, political_spectrum: 'pro_ru' },
    { id: 'cebotari', nameUk: 'Ольга Чеботарь', nameRu: 'Ольга Чеботарь', party: 'PSRM', logoSrc: '/logo/Cebotari.png', photoSrc: '/photo/Cebotari-photo.png', color: '#DF2224', baseRating: 17, political_spectrum: 'pro_ru' },
    { id: 'plangau', nameUk: 'Діну Плингеу', nameRu: 'Дину Плингеу', party: 'Platforma DA', logoSrc: '/logo/Pliangau.png', photoSrc: '/photo/Pliangau-photo.png', color: '#2290B5', baseRating: 4, political_spectrum: 'pro_eu' },
    { id: 'tarlev', nameUk: 'Василь Тарлєв', nameRu: 'Василий Тарлев', party: 'Viitorul Moldovei', logoSrc: '/logo/Tarlev.png', photoSrc: '/photo/Tarlev-photo.png', color: '#FF8822', baseRating: 3, political_spectrum: 'centrist' },
    { id: 'costiuc', nameUk: 'Василь Костюк', nameRu: 'Василий Костюк', party: 'Democrația Acasă', logoSrc: '/logo/Costiuk.png', photoSrc: '/photo/Costiuk-photo.png', color: '#24247A', baseRating: 2, political_spectrum: 'pro_eu' },
    { id: 'ulianovschi', nameUk: 'Тудор Ульяновський', nameRu: 'Тудор Ульяновский', party: 'PSDE', logoSrc: '/logo/Ulianovschi.png', photoSrc: '/photo/Ulianovschi-photo.png', color: '#004B96', baseRating: 2, political_spectrum: 'pro_eu' }
];

const RIVAL_PAIRS = { 'grosu': 'recean', 'recean': 'grosu', 'dodon': 'cebotari', 'cebotari': 'dodon' };

const MEDIA_OUTLETS = {
    "Europa Liberă": { logoSrc: '/media_logos/Europa-Libera.png' },
    "Moldova 1": { logoSrc: '/media_logos/Moldova-1.png' },
    "Ziarul de Gardă": { logoSrc: '/media_logos/Ziarul-de-Garda.png' },
    "Pro TV": { logoSrc: '/media_logos/Pro-TV.png' },
    "Jurnal TV": { logoSrc: '/media_logos/Jurnal-TV.png' }
};

const DOMESTIC_VOTERS = 1320000;
const DIASPORA_VOTERS = 255000;

const REGIONS = {
    'total': { nameUk: 'Загалом', nameRu: 'Всего' },
    'north': { nameUk: 'Північ', nameRu: 'Север', population_weight: 0.25, preferences: { pro_ru: 1.5, pro_eu: 0.6, centrist: 1.0 } },
    'center': { nameUk: 'Центр', nameRu: 'Центр', population_weight: 0.35, preferences: { pro_ru: 0.7, pro_eu: 1.4, centrist: 1.1 } },
    'south': { nameUk: 'Південь', nameRu: 'Юг', population_weight: 0.15, preferences: { pro_ru: 1.1, pro_eu: 0.9, centrist: 1.2 } },
    'chisinau': { nameUk: 'Кишинів', nameRu: 'Кишинев', population_weight: 0.15, preferences: { pro_ru: 0.5, pro_eu: 1.7, centrist: 1.2 }, is_chisinau: true },
    'gagauzia': { nameUk: 'Гагаузія', nameRu: 'Гагаузия', population_weight: 0.05, preferences: { pro_ru: 2.8, pro_eu: 0.2, centrist: 0.5 } },
    'diaspora': { nameUk: 'Діаспора', nameRu: 'Диаспора', preferences: { pro_ru: 0.1, pro_eu: 3.5, centrist: 0.8 } }
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
        title: 'Президентські вибори 2028',
        selectCandidate: 'Виберіть свого кандидата',
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
        map: '🗺️ Карта Молдови',
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
        loadingDesc: 'Завантаження гри та даних виборців...',
        loadingPercent: 'Завантаження: 50%',
        choose: 'Обрати →',
    },
    ru: {
        title: 'Президентские выборы 2028',
        selectCandidate: 'Выберите своего кандидата',
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
        map: '🗺️ Карта Молдовы',
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
        loadingDesc: 'Загрузка игры и данных избирателей...',
        loadingPercent: 'Загрузка: 50%',
        choose: 'Выбрать →',
    }
};

type GamePhase = 'selection' | 'rival_selection' | 'campaign' | 'round1_results' | 'round2_campaign' | 'round2_results' | 'final_screen';

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

type NewsItem = {
    source: string;
    headline: string;
};

export default function MoldovaElectionGame() {
    const [phase, setPhase] = useState<GamePhase>('selection');
    const [turn, setTurn] = useState(1);
    const [round2Turn, setRound2Turn] = useState(1);
    const [budget, setBudget] = useState(15);
    const [candidates, setCandidates] = useState<CandidateState[]>(
        ALL_CANDIDATES.map(c => ({ ...c, currentRating: c.baseRating }))
    );
    const [activeCandidates, setActiveCandidates] = useState<CandidateState[]>([]);
    const [playerCandidate, setPlayerCandidate] = useState<CandidateState | null>(null);
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

    // Helper functions
    const calculateResults = (participants: CandidateState[], isRound2 = false) => {
        const regionalResults: { [region: string]: any[] } = {};
        
        const getRegionVoters = (regionKey: string): number => {
            if (regionKey === 'diaspora') return DIASPORA_VOTERS;
            const region = REGIONS[regionKey];
            return Math.round(DOMESTIC_VOTERS * (region.population_weight || 0));
        };
        
        const specificRegions = ['north', 'center', 'south', 'chisinau', 'gagauzia', 'diaspora'];
        
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
            if (regionKey === 'chisinau' || regionKey === 'diaspora') {
                const targetProEuPercentage = 
                    regionKey === 'chisinau' 
                        ? (isRound2 ? 53 : 40) 
                        : (isRound2 ? 82 : 62);
                
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
        setPlayerCandidate(newCandidates.find(c => c.id === candidate.id)!);

        let active = [...newCandidates];
        const rivalId = RIVAL_PAIRS[candidate.id as keyof typeof RIVAL_PAIRS];
        if (rivalId) {
            active = active.filter(c => c.id !== rivalId);
        }
        setActiveCandidates(active);

        if (candidate.party === 'PAS') {
            setRivalPartyToChoose('PSRM');
            setCandidatesForRivalChoice(newCandidates.filter(c => c.party === 'PSRM'));
            setPhase('rival_selection');
        } else if (candidate.party === 'PSRM') {
            setRivalPartyToChoose('PAS');
            setCandidatesForRivalChoice(newCandidates.filter(c => c.party === 'PAS'));
            setPhase('rival_selection');
        } else {
            setRivalPartyToChoose('PAS');
            setCandidatesForRivalChoice(newCandidates.filter(c => c.party === 'PAS'));
            setPhase('rival_selection');
        }
    };

    const handleRivalSelection = (rival: CandidateState) => {
        const rivalToRemove = candidatesForRivalChoice.find(r => r.id !== rival.id);
        if (rivalToRemove) {
            setActiveCandidates(prev => prev.filter(c => c.id !== rivalToRemove.id));
        }
        setPhase('campaign');
    };

    const performAction = (action: typeof actions[0]) => {
        if (budget < action.cost && action.cost > 0) return;

        setBudget(prev => prev - action.cost);
        let ratingChange = 0;
        let updatedCandidates = phase === 'round2_campaign' ? [...round2Candidates] : [...activeCandidates];

        switch (action.id) {
            case 'ads': ratingChange = 0.5 + Math.random(); break;
            case 'meeting': ratingChange = 0.3 + Math.random() * 1.5; break;
            case 'debate': ratingChange = Math.random() * 5 - 3; break;
            case 'fundraising': setBudget(prev => prev + Math.round(2 + Math.random() * 2)); return;
            case 'black_pr': {
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
                break;
            }
            case 'reforms': ratingChange = 1.5 + Math.random() * 1.5; break;
        }

        if (playerCandidate && ratingChange !== 0) {
            const playerIdx = updatedCandidates.findIndex(c => c.id === playerCandidate.id);
            if (playerIdx >= 0) {
                updatedCandidates[playerIdx] = {
                    ...updatedCandidates[playerIdx],
                    currentRating: updatedCandidates[playerIdx].currentRating + ratingChange
                };
            }
        }

        if (phase === 'campaign') {
            if (turn >= 10) {
                // Don't auto-transition, user clicks button
                return;
            } else {
                setActiveCandidates(updatedCandidates);
                setTurn(prev => prev + 1);
            }
        } else if (phase === 'round2_campaign') {
            if (round2Turn >= 3) {
                // Don't auto-transition, user clicks button
                return;
            } else {
                setRound2Candidates(updatedCandidates);
                setRound2Turn(prev => prev + 1);
            }
        }

        generateNews();
    };

    const resetGame = () => {
        setPhase('selection');
        setTurn(1);
        setRound2Turn(1);
        setBudget(15);
        setNewsFeed([]);
        const newCandidates = ALL_CANDIDATES.map(c => ({ ...c, currentRating: c.baseRating, isPlayer: false }));
        setCandidates(newCandidates);
        setActiveCandidates([]);
        setPlayerCandidate(null);
        setSelectedRegion('total');
    };

    const handleRound1Results = () => {
        const totalResults = round1Results['total'] || [];
        const winner = totalResults[0];
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
                    <h1 className="text-6xl font-bold text-slate-900 mb-8">{TRANSLATIONS[language].loading}</h1>
                    <img 
                        src="/photo/Coat_of_arms_of_Moldova.png" 
                        alt="Герб Молдови" 
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
                                src="/photo/Coat_of_arms_of_Moldova.png" 
                                alt="Герб Молдови" 
                                className="w-16 h-16 object-contain"
                            />
                        </div>
                        <h1 className="text-6xl font-bold text-slate-900 mb-2 tracking-tight">{TRANSLATIONS[language].title}</h1>
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
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                
                <div className="max-w-6xl mx-auto relative z-10">
                    <Button onClick={resetGame} variant="outline" className="mb-8 border-slate-300 text-slate-700 hover:bg-slate-100">{TRANSLATIONS[language].backToCandidates}</Button>
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-slate-800 mb-3 tracking-tight">{TRANSLATIONS[language].chooseRival}</h1>
                        <p className="text-lg text-slate-600 font-medium">{TRANSLATIONS[language].fromParty} {rivalPartyToChoose}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                        {candidatesForRivalChoice.map(candidate => (
                            <div
                                key={candidate.id}
                                onClick={() => handleRivalSelection(candidate)}
                                className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-3"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-slate-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-40 transition duration-500"></div>
                                    <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-xl border border-slate-100 p-10 backdrop-blur-sm">
                                        <div className="flex items-center gap-8 mb-8">
                                            <img src={candidate.photoSrc} alt={getCandidateName(candidate)} 
                                                 className="w-28 h-28 rounded-full border-4 border-slate-200 object-cover shadow-md" />
                                            <div className="flex-1">
                                                <h3 className="font-bold text-3xl text-slate-900">{getCandidateName(candidate)}</h3>
                                                <p className="text-slate-700 font-bold text-lg mt-2">{candidate.party}</p>
                                                <img src={candidate.logoSrc} alt={candidate.party} className="w-16 h-16 mt-4" />
                                            </div>
                                        </div>
                                        <Button className="w-full bg-slate-700 hover:bg-slate-800 text-white text-lg py-7 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl">{TRANSLATIONS[language].selectRival}</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (phase === 'campaign' || phase === 'round2_campaign') {
        const isRound2 = phase === 'round2_campaign';
        const currentCandidates = isRound2 ? round2Candidates : activeCandidates;
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
                        
                        {playerCandidate && (
                            <div className="flex items-center gap-2 pt-3 border-t border-slate-200 mt-3">
                                <img src={playerCandidate.photoSrc} alt={playerCandidate.name}
                                     className="w-10 h-10 rounded-full border-2 border-slate-200 object-cover shadow-md" />
                                <div>
                                    <p className="font-bold text-sm text-slate-900">{playerCandidate.name}</p>
                                    <p className="text-xs text-slate-600 font-bold">{playerCandidate.party}</p>
                                </div>
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
                                            const results = calculateResults(currentCandidates, isRound2);
                                            if (isRound2) {
                                                setRound2Results(results);
                                                setPhase('round2_results');
                                            } else {
                                                setRound1Results(results);
                                                setPhase('round1_results');
                                            }
                                            setSelectedRegion('total');
                                        }}
                                        className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-bold text-sm w-full"
                                    >
                                        {isRound2 ? TRANSLATIONS[language].proceedToSummary : TRANSLATIONS[language].proceedToResults}
                                    </Button>
                                </div>
                            ) : (
                            <div className="space-y-1.5 overflow-y-auto flex-1">
                                {availableActions.map(action => (
                                    <Button
                                        key={action.id}
                                        onClick={() => performAction(action)}
                                        disabled={budget < action.cost && action.cost > 0}
                                        className={`w-full justify-start text-left h-auto py-1.5 px-2 rounded-lg transition-all duration-300 text-xs ${
                                            budget < action.cost && action.cost > 0
                                                ? 'bg-slate-100 text-slate-400'
                                                : 'bg-slate-700 hover:bg-slate-800 text-white shadow-md hover:shadow-lg'
                                        }`}
                                    >
                                        <div className="flex flex-col items-start gap-0.5 w-full">
                                            <span className="font-bold text-xs">{language === 'uk' ? action.titleUk : action.titleRu}</span>
                                            <span className="text-xs opacity-90 line-clamp-1">{language === 'uk' ? action.descUk : action.descRu}</span>
                                            <span className={`text-xs font-bold ${action.cost > 0 ? 'text-red-300' : 'text-green-300'}`}>
                                                {action.cost > 0 ? `- $${action.cost.toFixed(1)}M` : `+ $${Math.abs(action.cost).toFixed(1)}M`}
                                            </span>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                            )}
                        </div>

                        {/* Ratings Column */}
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-3 backdrop-blur-sm flex flex-col overflow-hidden">
                            <h2 className="text-base font-bold text-slate-900 mb-3 flex-shrink-0">{TRANSLATIONS[language].rating}</h2>
                            <div className="space-y-2 overflow-y-auto flex-1">
                                {(() => {
                                    const allRatings = (calculateResults(currentCandidates)['total'] || []).sort((a, b) => b.percentage - a.percentage);
                                    const maxPercentage = Math.max(...allRatings.map(r => r.percentage), 1);
                                    return allRatings.map(res => (
                                        <div key={res.id} className="text-sm">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center gap-1 flex-1 min-w-0">
                                                    <img src={res.logoSrc} alt={res.party} className="w-3 h-3 object-contain flex-shrink-0" />
                                                    <span className="font-bold text-slate-900 truncate">{getCandidateName(res)}</span>
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
        const buttonText = phase === 'round1_results' ? TRANSLATIONS[language].proceedRound2 : TRANSLATIONS[language].seeSummary;
        
        // Get results for selected region
        const results = allResults[selectedRegion] || allResults['total'] || [];
        const selectedRegionName = Object.entries(REGIONS).find(([k]) => k === selectedRegion)?.[1]?.[language === 'uk' ? 'nameUk' : 'nameRu'] || (language === 'uk' ? 'Загалом' : 'Всего');

        return (
            <div className="min-h-screen bg-white p-4 relative overflow-hidden flex flex-col">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                
                <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col h-full">
                    <div className="text-center mb-4 flex-shrink-0">
                        <h1 className="text-4xl font-bold text-slate-900 mb-1">{title}</h1>
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
                                                    {getCandidateName(topResult)?.split(' ').pop()}: <span className="font-bold">{percentage}%</span>
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
                                        <div key={idx} className="bg-white rounded-lg border border-slate-200 p-3 hover:shadow-md transition-all">
                                            <div className="flex gap-3 items-center">
                                                {/* Logo */}
                                                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-slate-50 rounded border border-slate-200">
                                                    <img 
                                                        src={res.logoSrc} 
                                                        alt={res.party} 
                                                        className="w-10 h-10 object-contain"
                                                    />
                                                </div>
                                                
                                                {/* Name and Stats */}
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-sm text-slate-900 line-clamp-1">{getCandidateName(res)}</p>
                                                    <p className="text-sm text-slate-600 font-semibold">
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
                    <h1 className="text-6xl font-bold text-slate-900 mb-8">{TRANSLATIONS[language].finalResults}</h1>
                    <p className="text-2xl text-slate-700 mb-10 leading-relaxed font-bold">{finalMessage}</p>
                    
                    <div className={`text-5xl font-black mb-12 p-8 rounded-3xl border-4 transition-all duration-500 ${
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
