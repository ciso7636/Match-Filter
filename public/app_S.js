'use strict';

let allMatchesStatistics, allLinks;

// Data structure
let match = {
    matchId: '',
    matchTime: '',
    league: '',
    homeTeam: '',
    awayTeam: '',
}

let positionInTable = {
    home: '',
    away: '',
    all: NaN,
}

let cleanSheets = {
    cleanSheetsHome_Home: NaN,
    cleanSheetsAway_Away: NaN,
}

let scoredAndConcededGolas = {
    homeTeamScored: NaN,
    homeTeamScored_home: NaN,
    homeTeamConceded: NaN,
    homeTeamConceded_home: NaN,
    awayTeamScored: NaN,
    awayTeamScored_away: NaN,
    awayTeamConceded: NaN,
    awayTeamConceded_away: NaN,
}

let last_4_AllMatches = {
    toCountHomeMatchesReslult: {
        scoredGoals: NaN,
        scoredGoalsAverage: NaN,
        concededGoals: NaN,
        concededGoalsAverage: NaN,
        matchResults: [
            {another: NaN, current: NaN},
            {another: NaN, current: NaN},
            {another: NaN, current: NaN},
            {another: NaN, current: NaN},
        ],
        results: ['', '', '', ''],
    },
    toCountAwayMatchesReslult: {
        scoredGoals: NaN,
        scoredGoalsAverage: NaN,
        concededGoals: NaN,
        concededGoalsAverage: NaN,
        matchResults: [
            {another: NaN, current: NaN},
            {another: NaN, current: NaN},
            {another: NaN, current: NaN},
            {another: NaN, current: NaN},
        ],
        results: ['', '', '', ''],
    },
}

let last_4_MatchesCurrentPosition = {
    toCountHomeMatchesReslult: {
        scoredGoals: NaN,
        scoredGoalsAverage: NaN,
        concededGoals: NaN,
        concededGoalsAverage: NaN,
        matchResults: [
            {another: NaN, current: NaN},
            {another: NaN, current: NaN},
            {another: NaN, current: NaN},
            {another: NaN, current: NaN},
        ],
        results: ['', '', '', ''],
    },
    toCountAwayMatchesReslult: {
        scoredGoals: NaN,
        scoredGoalsAverage: NaN,
        concededGoals: NaN,
        concededGoalsAverage: NaN,
        matchResults: [
            {another: NaN, current: NaN},
            {another: NaN, current: NaN},
            {another: NaN, current: NaN},
            {another: NaN, current: NaN},
        ],
        results: ['', '', '', ''],
    },
}

let weekProfit = {
    testingPrediction: {zisk: 0, vyherneZapasy: 0, pocetZapasov: 0, percentualnaUspesnost:''},
    over15GoalPrediction: {zisk: 0, vyherneZapasy: 0, pocetZapasov: 0, percentualnaUspesnost:''},
    over35GoalPrediction: {zisk: 0, vyherneZapasy: 0, pocetZapasov: 0, percentualnaUspesnost:''},
    under35GoalPrediction: {zisk: 0, vyherneZapasy: 0, pocetZapasov: 0, percentualnaUspesnost:''},
    under15GoalPrediction: {zisk: 0, vyherneZapasy: 0, pocetZapasov: 0, percentualnaUspesnost:''},
    homeTeamWinPrediction: {zisk: 0, vyherneZapasy: 0, pocetZapasov: 0, percentualnaUspesnost:''},
    awayTeamWinPrediction_x2: {zisk: 0, vyherneZapasy: 0, pocetZapasov: 0, percentualnaUspesnost:''},
    awayTeamWinPrediction_2: {zisk: 0, vyherneZapasy: 0, pocetZapasov: 0, percentualnaUspesnost:''},
    filteredMatches: 0,
    totalProfit: 0,
}

let colors = {
    BgRed: "\x1b[31m%s\x1b[0m",
    BgGreen: "\x1b[32m%s\x1b[0m",
    BgYellow:  "\x1b[33m%s\x1b[0m",
}

let hightScore = {
    index: 0,
    yuvalfra_Average_koeficient: 2,
    average14_koeficient: 1.4,
    average23_koeficient: 1.25,
    average14_4last_koeficient: 1.3,
    average23_4last_koeficient: 1.2,
    johnHaighs_Under25_koeficient: 33,
    johnHaighs_Under25_koeficient_under: 67,
    vincent_Scale_koeficient: 1.5,
    vincent_Scale_koeficient_under: 2.5
}

/* 
    Init APP
*/ 
$(function(){
    if ($('#index').length) {
        $('h1.header').text(`Load stats`).show();
    } else {
        allLinks = document.querySelectorAll('#btable .trow8 td:last-child > a:first-child'); 
        //allLinks = document.querySelectorAll('tbody .table-main__tt a');
        allMatchesStatistics = getDataFromLocalStorage(allLinks.length) || [];   
    
        if (allMatchesStatistics.length > 0) {
            $('.load-button').show().text(`Reload ${allLinks.length} matches`).removeClass('loading');
            $('h1.header').text("Data is ready").show();
            $('.row-buttons').show();
        } else {
            $('.load-button').show().text('Load matches').removeClass('loading');
            $('h1.header').text(`Cick to load ${allLinks.length} matches`).show();
        }  
    }
})

/* 
    Bind EventListeners
*/ 
$('html').on('click', '.load-button', function() {
    $('h1.header').text('...loading data').show();
    $('.load-button').addClass('loading');
    $('.row-buttons').hide();

    showProgressBar(allLinks.length);

    loadMatchesData(allLinks).then(function (allMatchesData) {
        $('.load-button').text(`Reload ${allLinks.length} matches`).removeClass('loading');
        $('h1.header').text('Data saved');
        $('.row-buttons').show();

        setDataToLocalStorage(allLinks.length, JSON.stringify(allMatchesData));

        allMatchesStatistics = allMatchesData;
    })
});

$('html').on('click', '.getWeekStats .button', function() {
    handleGetWeekStats('.getWeekStats input', '.getWeekStats select', '.getWeekStats .button');
});

$('html').on('keypress', '.getWeekStats input', function(e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        handleGetWeekStats('.getWeekStats input', '.getWeekStats select', '.getWeekStats .button')
    }
});

$('html').on('click', '.resultsMatchesToLocalStorage', function() {
    const localStorageKey = $('.nameOfMatch').val();
    setResultsMatchesToLocalStorage(allLinks, localStorageKey);
});

$('html').on('click', '.testingPrediction', function() {
    testingPrediction(allMatchesStatistics);
});

$('html').on('click', '.overGoalPrediction', function() {
    overGoalPrediction(allMatchesStatistics);
});

$('html').on('click', '.underGoalPrediction', function() {
    underGoalPrediction(allMatchesStatistics);
});

$('html').on('click', '.homeTeamWinPrediction', function() {
    homeTeamWinPrediction(allMatchesStatistics);
});

$('html').on('click', '.awayTeamWinPrediction', function() {
    awayTeamWinPrediction(allMatchesStatistics);
});


/* 
    Handle Functions
*/ 
function testingPrediction(allMatchesStatistics, writeToConsole){
    let count = 0;
    let winPridiction = 0;
    let win25 = 0;
    let win35 = 0;
    for (let stats of allMatchesStatistics) {

        if (stats instanceof Object === false) continue;

        //if (isEuropeLeague(stats.Liga) && stats.CasZapasu > 20) continue;

        if (stats.Domaci.posledne_4_ZapasyDoma.streleneGolyPriemer - stats.Domaci.streleneGoly_Doma < 1.06) {
            continue;
        }

        if (writeToConsole !== false) returnDataToConsoleLog(stats, 'overUnder');

        count++;
        winPridiction += (stats.výsledok.over_1_5 === true || stats.výsledok.over_1_5 === true) ? 1 : 0;
        win25 += stats.výsledok.over_2_5 === true ? 1 : 0;
        win35 += (stats.výsledok.gólyDomáci + stats.výsledok.gólyHostia) > 3 === true ? 1 : 0;
    }
    if (count > 0) {
        if (writeToConsole !== false) {
            console.log(`Počet zápasov: ${count}, Výherných: ${winPridiction}, Úspešnosť: ${(winPridiction / count).toFixed(2) * 100}%, Min. zisk: ${calculateProfit(count, winPridiction, 3, 2, 100)}€`);
            console.log(`Over_2.5:      ${win25}, Úspešnosť: ${(win25 / count).toFixed(2) * 100}%, Min. zisk: ${calculateProfit(count, win25, 2, 2, 100)}€`);
            console.log(`Over_3.5:      ${win35}, Úspešnosť: ${(win35 / count).toFixed(2) * 100}%`);
        }
        
        weekProfit.testingPrediction.zisk = calculateProfit(count, winPridiction, 3, 2, 100);        
        weekProfit.testingPrediction.vyherneZapasy = winPridiction;        
        weekProfit.testingPrediction.pocetZapasov = count;        
        weekProfit.testingPrediction.percentualnaUspesnost = `${(winPridiction / count).toFixed(2) * 100}%`;
        weekProfit.filteredMatches += count;
    } else {
        console.log(`Nenašli sa žiadne zápasy!`);
    }
}

function overGoalPrediction(allMatchesStatistics, writeToConsole){
    let count = 0;
    let winPridiction = 0;
    let win25 = 0;
    let win35 = 0;
    let win45 = 0;
    for (let stats of allMatchesStatistics) {

        if (stats instanceof Object === false) continue;

        if (isEuropeLeague(stats.Liga) && stats.CasZapasu > 20) continue;

        if (stats.Domaci.streleneGoly_Doma < 1.8) {
            continue;
        }

        switch (true) {
            case stats.Domaci.cisteKontoDoma >= 35 || stats.Hostia.cisteKontoVonku >= 32:
            case stats.Hostia.cisteKontoVonku >= 40 && Math.abs(stats.Hostia.cisteKontoVonku - stats.Domaci.cisteKontoDoma) < 15:
            case stats.Hostia.cisteKontoVonku >= 45 && Math.abs(stats.Hostia.cisteKontoVonku - stats.Domaci.cisteKontoDoma) < 20:
            case stats.Hostia.cisteKontoVonku >= 50 && Math.abs(stats.Hostia.cisteKontoVonku - stats.Domaci.cisteKontoDoma) < 25:
                continue;
        }

        switch (true) {
            case stats.priemer_StrelenéGólyDomáci_InkasovaneGólyHostia < 1.4:
            case stats.priemer_StrelenéGólyHostia_InkasovaneGólyDomáci < 1.25:
                continue;
        }

        switch (true) {
            case stats.priemer_posledne4Zapasy_StrelenéGólyDomáci_InkasovaneGólyHostia < 1.3:
            case stats.priemer_posledne4Zapasy_StrelenéGólyHostia_InkasovaneGólyDomáci < 1.2:
                continue;
        }

        switch (true) {
            case stats.filterDataBy_Yuvalfra < 2:
            case stats.filterDataBy_JohnHaighsTable > 33:
            case stats.filterDataBy_Vincent < 1.5:
                continue;
        }

        if (writeToConsole !== false) returnDataToConsoleLog(stats, 'overUnder');

        count++;
        winPridiction += (stats.výsledok.over_1_5 === true || stats.výsledok.over_1_5 === true) ? 1 : 0;
        win25 += stats.výsledok.over_2_5 === true ? 1 : 0;
        win35 += (stats.výsledok.gólyDomáci + stats.výsledok.gólyHostia) > 3 === true ? 1 : 0;
        win45 += (stats.výsledok.gólyDomáci + stats.výsledok.gólyHostia) > 4 === true ? 1 : 0;
    }
    if (count > 0) {
        if (writeToConsole !== false) {
            console.log(`Počet zápasov: ${count}, Výherných: ${winPridiction}, Úspešnosť: ${(winPridiction / count).toFixed(2) * 100}%, Min. zisk: ${calculateProfit(count, winPridiction, 3, 2, 100)}€`);
            console.log(`Over_2.5:      ${win25}, Úspešnosť: ${(win25 / count).toFixed(2) * 100}%, Min. zisk: ${calculateProfit(count, win25, 2, 2.7, 100)}€`);
            console.log(`Over_3.5:      ${win35}, Úspešnosť: ${(win35 / count).toFixed(2) * 100}%, Min. zisk: ${calculateProfit(count, win35, 1, 2.75, 100)}€`);
            console.log(`Over_4.5:      ${win45}, Úspešnosť: ${(win45 / count).toFixed(2) * 100}%, Min. zisk: ${calculateProfit(count, win45, 1, 5.2, 100)}€`);
        }
                
        weekProfit.over15GoalPrediction.zisk = calculateProfit(count, winPridiction, 3, 2, 100);        
        weekProfit.over15GoalPrediction.vyherneZapasy = winPridiction;        
        weekProfit.over15GoalPrediction.pocetZapasov = count;        
        weekProfit.over15GoalPrediction.percentualnaUspesnost = `${(winPridiction / count).toFixed(2) * 100}%`;
        
        weekProfit.over35GoalPrediction.zisk = calculateProfit(count, win35, 1, 2.75, 100);        
        weekProfit.over35GoalPrediction.vyherneZapasy = win35;        
        weekProfit.over35GoalPrediction.pocetZapasov = count;        
        weekProfit.over35GoalPrediction.percentualnaUspesnost = `${(win35 / count).toFixed(2) * 100}%`;
        weekProfit.filteredMatches += count;
    } else {
        console.log(`Nenašli sa žiadne zápasy!`);
    }
}

function underGoalPrediction(allMatchesStatistics, writeToConsole){
    let count = 0;
    let winPridiction = 0;
    let win25 = 0;
    let win15 = 0;
    let win05 = 0;
    for (let stats of allMatchesStatistics) {

        if (stats instanceof Object === false) continue;

        if (isEuropeLeague(stats.Liga) && stats.CasZapasu < 21) continue;

        switch (true) {
            case stats.Domaci.cisteKontoDoma <= 30 || stats.Hostia.cisteKontoVonku <= 30:
            case Math.abs(stats.Domaci.cisteKontoDoma - stats.Hostia.cisteKontoVonku) > 40:
                continue;
        }

        if (Math.abs(stats.Domaci.posledne_4_Zapasy.streleneGolyPriemer - stats.Domaci.streleneGoly_Doma) < 0.3 &&
            stats.priemer_posledne4Zapasy_StrelenéGólyDomáci_InkasovaneGólyHostia < 1.3
        ) {
            continue;
        }

        switch (true) {
            case stats.filterDataBy_Yuvalfra > 1.9:
            case stats.filterDataBy_JohnHaighsTable < 68:
            case stats.filterDataBy_Vincent > 1:
                continue;
        }

        if (writeToConsole !== false) returnDataToConsoleLog(stats, 'overUnder')

        count++;
        winPridiction += (stats.výsledok.under_3_5 === true || stats.výsledok.under_3_5 === true) ? 1 : 0;
        win25 += stats.výsledok.under_2_5 === true ? 1 : 0;
        win15 += (stats.výsledok.gólyDomáci + stats.výsledok.gólyHostia) < 2 === true ? 1 : 0;
        win05 += (stats.výsledok.gólyDomáci + stats.výsledok.gólyHostia) < 1 === true ? 1 : 0;
    }
    if (count > 0) {
        if (writeToConsole !== false) {
            console.log(`Počet zápasov: ${count}, Výherných: ${winPridiction}, Úspešnosť: ${(winPridiction / count).toFixed(2) * 100}%, Min. zisk: ${calculateProfit(count, winPridiction, 3, 2, 100)}€`);
            console.log(`Under_2.5:     ${win25}, Úspešnosť: ${(win25 / count).toFixed(2) * 100}%, Min. zisk: ${calculateProfit(count, win25, 2, 2.7, 100)}€`);
            console.log(`Under_1.5:     ${win15}, Úspešnosť: ${(win15 / count).toFixed(2) * 100}%, Min. zisk: ${calculateProfit(count, win15, 1, 2.8, 100)}€`);
            console.log(`Under_0.5:     ${win05}, Úspešnosť: ${(win05 / count).toFixed(2) * 100}%, Min. zisk: ${calculateProfit(count, win05, 1, 8, 100)}€`);
        }
        
        weekProfit.under35GoalPrediction.zisk = calculateProfit(count, winPridiction, 3, 2, 100);        
        weekProfit.under35GoalPrediction.vyherneZapasy = winPridiction;        
        weekProfit.under35GoalPrediction.pocetZapasov = count;        
        weekProfit.under35GoalPrediction.percentualnaUspesnost = `${(winPridiction / count).toFixed(2) * 100}%`;
        
        weekProfit.under15GoalPrediction.zisk = calculateProfit(count, win15, 1, 2.8, 100);        
        weekProfit.under15GoalPrediction.vyherneZapasy = win15;        
        weekProfit.under15GoalPrediction.pocetZapasov = count;        
        weekProfit.under15GoalPrediction.percentualnaUspesnost = `${(win15 / count).toFixed(2) * 100}%`;
        weekProfit.filteredMatches += count;
    } else {
        console.log(`Nenašli sa žiadne zápasy!`);
    }
}

function homeTeamWinPrediction(allMatchesStatistics, writeToConsole){
    let count = 0;
    let winPridiction = 0;
    let win = 0;
    for (let stats of allMatchesStatistics) {

        if (stats instanceof Object === false) continue;

        switch (true) {
            case stats.homeTeamFavorits === false:
            case stats.awayTeamFavorits === true:
                continue;
        }

        // if (stats.Domaci.cisteKontoDoma < 10 && Math.abs(stats.Domaci.cisteKontoDoma - stats.Hostia.cisteKontoVonku) < 10) {
        //     continue;
        // }

        // if (stats.priemer_posledne4Zapasy_StrelenéGólyDomáci_InkasovaneGólyHostia < hightScore.average14_4last_koeficient) {
        //     continue;
        // }

        //93%
        if (stats.Hostia.posledne_4_ZapasyVonku.streleneGolyPriemer > stats.Hostia.streleneGoly_Vonku) {
            continue;
        }

        // if (stats.Hostia.posledne_4_ZapasyVonku.inkasovaneGolyPriemer < stats.Hostia.inkasovaneGoly_Vonku) {
        //     continue;
        // }

        if (writeToConsole !== false) returnDataToConsoleLog(stats, 'homeAwayWin');

        count++;
        winPridiction += (stats.výsledok.vyhral === 'domaci' || stats.výsledok.vyhral === 'remiza') ? 1 : 0;
        win += stats.výsledok.vyhral === 'domaci' ? 1 : 0;
    }
    if (count > 0) {
        if (writeToConsole !== false) {
            console.log(`Počet zápasov: ${count}, Výherných: ${winPridiction}, Úspešnosť: ${(winPridiction / count).toFixed(2) * 100}%, Min. zisk: ${calculateProfit(count, winPridiction, 3, 2, 100)}€`);
            console.log(`Presné tipy:   ${win}, Úspešnosť: ${(win / count).toFixed(2) * 100}%`);
        }
        
        weekProfit.homeTeamWinPrediction.zisk = calculateProfit(count, winPridiction, 3, 2, 100);        
        weekProfit.homeTeamWinPrediction.vyherneZapasy = winPridiction;        
        weekProfit.homeTeamWinPrediction.pocetZapasov = count;        
        weekProfit.homeTeamWinPrediction.percentualnaUspesnost = `${(winPridiction / count).toFixed(2) * 100}%`;
        weekProfit.filteredMatches += count;
    } else {
        console.log(`Nenašli sa žiadne zápasy!`);
    }
}

function awayTeamWinPrediction(allMatchesStatistics, writeToConsole){
    let count = 0;
    let winPridiction = 0;
    let win = 0;
    let draw = 0;
    for (let stats of allMatchesStatistics) {

        if (stats instanceof Object === false) continue;

        switch (true) {
            case stats.homeTeamFavorits === true:
            case stats.awayTeamFavorits === false:
                continue;
        }

        if (stats.Domaci.cisteKontoDoma > 30) {
            continue;
        }
        
        if (stats.Hostia.posledne_4_Zapasy.streleneGolyPriemer < stats.Hostia.streleneGoly_Vonku) {
            const checkForm = Math.abs(stats.Hostia.streleneGoly_Vonku * 100 - stats.Hostia.posledne_4_Zapasy.streleneGolyPriemer * 100) / stats.Hostia.streleneGoly_Vonku;
            if (checkForm >= 15) {
                continue;
            }
        }

        if (stats.priemer_posledne4Zapasy_StrelenéGólyHostia_InkasovaneGólyDomáci < hightScore.average23_4last_koeficient) {
            continue;
        }

        if (writeToConsole !== false) returnDataToConsoleLog(stats, 'homeAwayWin');
        

        count++;
        winPridiction += (stats.výsledok.vyhral === 'host' || stats.výsledok.vyhral === 'remiza') ? 1 : 0;
        win += stats.výsledok.vyhral === 'host' ? 1 : 0;
        draw += stats.výsledok.vyhral === 'remiza' ? 1 : 0;
    }
    if (count > 0) {
        if (writeToConsole !== false) {
            console.log(`Počet zápasov: ${count}, Výherných: ${winPridiction}, Úspešnosť: ${(winPridiction / count).toFixed(2) * 100}%, Min. zisk: ${calculateProfit(count, winPridiction, 3, 2, 100)}€`);
            console.log(`Presné tipy:   ${win}, Úspešnosť: ${(win / count).toFixed(2) * 100}%,               Min. zisk: ${calculateProfit(count, win, 2, 3.25, 100)}€`);
            console.log(`Remízy:        ${draw}, Úspešnosť: ${(draw / count).toFixed(2) * 100}%,                Min. zisk: ${calculateProfit(count, draw, 1, 3.1, 100)}€`);
        }

        weekProfit.awayTeamWinPrediction_x2.zisk = calculateProfit(count, winPridiction, 3, 2, 100);        
        weekProfit.awayTeamWinPrediction_x2.vyherneZapasy = winPridiction;        
        weekProfit.awayTeamWinPrediction_x2.pocetZapasov = count;        
        weekProfit.awayTeamWinPrediction_x2.percentualnaUspesnost = `${(winPridiction / count).toFixed(2) * 100}%`;
        
        weekProfit.awayTeamWinPrediction_2.zisk = calculateProfit(count, win, 2, 3.25, 100);        
        weekProfit.awayTeamWinPrediction_2.vyherneZapasy = win;        
        weekProfit.awayTeamWinPrediction_2.pocetZapasov = count;        
        weekProfit.awayTeamWinPrediction_2.percentualnaUspesnost = `${(win / count).toFixed(2) * 100}%`;
        weekProfit.filteredMatches += count;
    } else {
        console.log(`Nenašli sa žiadne zápasy!`);
    }
}

function handleGetWeekStats(input, select, button){
    const name = $(input).val();
    const selector = $(select).val();
    $(button).addClass('loading');

    getWeekStats(name, selector).then(function (weekStats) {
        $(button).removeClass('loading');
        if (weekStats) {
            allMatchesStatistics = weekStats;
            weekProfit.totalProfit = 0;
            weekProfit.filteredMatches = 0;
            testingPrediction(allMatchesStatistics, false);
            overGoalPrediction(allMatchesStatistics, false);
            underGoalPrediction(allMatchesStatistics, false);
            homeTeamWinPrediction(allMatchesStatistics, false);
            awayTeamWinPrediction(allMatchesStatistics, false);

            selector === 'weeks/week'
                ? $('h1.header').text('Week' + name + ' has been loaded')
                : $('h1.header').text('Month' + name + ' has been loaded')

            $('.row-buttons').show();
            $(input).val('');

            weekProfit.totalProfit = (
                + weekProfit.testingPrediction.zisk
                + weekProfit.over15GoalPrediction.zisk
                + weekProfit.under35GoalPrediction.zisk
                //+ weekProfit.homeTeamWinPrediction.zisk
                //+ weekProfit.awayTeamWinPrediction_x2.zisk
                + weekProfit.over35GoalPrediction.zisk
                //+ weekProfit.under15GoalPrediction.zisk
                //+ weekProfit.awayTeamWinPrediction_2.zisk
            )
            console.log(`over 1.5 test: ${weekProfit.testingPrediction.percentualnaUspesnost}, ${weekProfit.testingPrediction.vyherneZapasy} z ${weekProfit.testingPrediction.pocetZapasov}, ${weekProfit.testingPrediction.zisk}€`);
            console.log(`over 1.5:      ${weekProfit.over15GoalPrediction.percentualnaUspesnost}, ${weekProfit.over15GoalPrediction.vyherneZapasy} z ${weekProfit.over15GoalPrediction.pocetZapasov}, ${weekProfit.over15GoalPrediction.zisk}€`);
            console.log(`under 3.5:     ${weekProfit.under35GoalPrediction.percentualnaUspesnost}, ${weekProfit.under35GoalPrediction.vyherneZapasy} z ${weekProfit.under35GoalPrediction.pocetZapasov}, ${weekProfit.under35GoalPrediction.zisk}€`);
            console.log(`over 3.5:      ${weekProfit.over35GoalPrediction.percentualnaUspesnost}, ${weekProfit.over35GoalPrediction.vyherneZapasy} z ${weekProfit.over35GoalPrediction.pocetZapasov}, ${weekProfit.over35GoalPrediction.zisk}€`);
            console.log(`%cCelkový profit: %c ${weekProfit.totalProfit}€`, "font-weight: bold", "font-weight: normal");
            console.log(`.   .   .   .   .   .   .   .   .   .   .`);
            console.log(`1x:            ${weekProfit.homeTeamWinPrediction.percentualnaUspesnost}, ${weekProfit.homeTeamWinPrediction.vyherneZapasy} z ${weekProfit.homeTeamWinPrediction.pocetZapasov}, ${weekProfit.homeTeamWinPrediction.zisk}€`);
            console.log(`x2:            ${weekProfit.awayTeamWinPrediction_x2.percentualnaUspesnost}, ${weekProfit.awayTeamWinPrediction_x2.vyherneZapasy} z ${weekProfit.awayTeamWinPrediction_x2.pocetZapasov}, ${weekProfit.awayTeamWinPrediction_x2.zisk}€`);
            console.log(`under 1.5:     ${weekProfit.under15GoalPrediction.percentualnaUspesnost}, ${weekProfit.under15GoalPrediction.vyherneZapasy} z ${weekProfit.under15GoalPrediction.pocetZapasov}, ${weekProfit.under15GoalPrediction.zisk}€`);
            console.log(`2:             ${weekProfit.awayTeamWinPrediction_2.percentualnaUspesnost}, ${weekProfit.awayTeamWinPrediction_2.vyherneZapasy} z ${weekProfit.awayTeamWinPrediction_2.pocetZapasov}, ${weekProfit.awayTeamWinPrediction_2.zisk}€`);
            console.log(`%cPočet zápasov: %c  ${weekProfit.filteredMatches} z ${allMatchesStatistics.length}`, "font-weight: bold", "font-weight: normal");            
            console.log(`- - - - - - - - - - - - - - - - - - - - -`);
        } else {
            alert('Week not found.');
        }
    });
}


/* 
    Data Functions
*/ 
function setResultsMatchesToLocalStorage(allLinks, localStorageKey){
    const matchesStats = getDataFromLocalStorage(localStorageKey); 

    if (matchesStats === null) {
        alert('Key not found');
        return false;
    }

    let rowMatch;
    let statsWithResults = [];
    for (let i = 0; i < allLinks.length; i++) {
        rowMatch = $(allLinks[i]).closest('tr');
        statsWithResults.push(createNewMatchStatsWithResultMatch(matchesStats, rowMatch));
    }

    setDataToLocalStorage(localStorageKey, JSON.stringify(statsWithResults));
}

function createNewMatchStatsWithResultMatch(matchesStats, rowMatch){
    const result = rowMatch.find('b').parent().find('b').parent().text().trim();
    const homeTeamGoal = parseFloat(result.split('-')[0]);
    const awayTeamGoal = parseFloat(result.split('-')[1]);
    const teamName = getNameOfTeams(null, rowMatch);

    const resultsMatchesStats = {
        id: teamName.matchId,
        matchId: teamName.matchId,
        homeTeam: teamName.homeTeam,
        awayTeam: teamName.awayTeam,
        homeTeamGoal: homeTeamGoal,
        awayTeamGoal: awayTeamGoal,
        over_1_5: (homeTeamGoal + awayTeamGoal) > 1.5 ? true : false,
        over_2_5: (homeTeamGoal + awayTeamGoal) > 2.5 ? true : false,
        under_2_5: (homeTeamGoal + awayTeamGoal) < 2.5 ? true : false,
        under_3_5: (homeTeamGoal + awayTeamGoal) < 3.5 ? true : false,
    }

    let vyhral = '';
    if (resultsMatchesStats.homeTeamGoal > resultsMatchesStats.awayTeamGoal) {
        vyhral = 'domaci';
    } else if (resultsMatchesStats.homeTeamGoal === resultsMatchesStats.awayTeamGoal) {
        vyhral = 'remiza';
    } else if (resultsMatchesStats.homeTeamGoal < resultsMatchesStats.awayTeamGoal) {
        vyhral = 'host';
    }
    
    const match = matchesStats.filter((match) => {
        if (match === null) {
            return false;
        }; 
        return match.id === resultsMatchesStats.id;
    })[0];

    return (
        match !== undefined 
            ? (
                Object.assign(match, {výsledok: {
                    skóre: result,
                    gólyDomáci: resultsMatchesStats.homeTeamGoal, 
                    gólyHostia: resultsMatchesStats.awayTeamGoal,
                    vyhral: vyhral,
                    over_1_5: resultsMatchesStats.over_1_5,
                    over_2_5: resultsMatchesStats.over_2_5,
                    under_2_5: resultsMatchesStats.under_2_5,
                    under_3_5: resultsMatchesStats.under_3_5,
                }})
            )
            : null
    )
}

function loadMatchesData(allLinks) {
    return new Promise(function (resolvelLoadMatchesData) {
        let allMatchesData = []
        
        for (let i = 0, p = Promise.resolve(); i < allLinks.length; i++) {
            p = p.then(_ => new Promise(resolveLoop =>
                getAllMatchData(allLinks[i]).then(function (stats) {
                    allMatchesData.push(stats);

                    resolveLoop();
                    moveProgressBar(i + 1, 100/allLinks.length, allLinks.length);

                    if(allLinks.length - 1 === i) {
                        resolvelLoadMatchesData(allMatchesData);
                    }
                }).catch(function (err) {
                    console.log(err);
                    if (err.status === 404) {
                        console.log(err);
                    }
                })
            ));
        };
    });
}

const getWeekStats = (name, selector) => {
    let url = document.location.href.split('/');
    url.splice(url.length - 2, 2);
    let newUrl = url.join('/');

    return new Promise(function (resolve, reject) {
        getData('GET', newUrl + '/data/'+ selector + name +'.json', 'json').then(function (stats) {
                resolve(stats); 
            }).catch(function (err) {
                console.log(err);
                resolve();
                if (err.status === 404) {
                    console.log(err);
                }
            });
        });
}

function getAllMatchData(matchLink) {
    const rowMatch = $(matchLink).closest('tr');

    return new Promise(function (resolve, reject) {

        const statsHref = matchLink.getAttribute("href");
        const decodeStatsHref = decodeURI(statsHref);

        if (statsHref != null) {
            getData('GET', 'https://www.soccerstats.com/' + decodeStatsHref).then(function (html) {
            //getData('GET', 'https://www.betexplorer.com/' + decodeStatsHref).then(function (html) {
                
                top.soccerUrl = html.URL;

                if (true) {
                    match = getNameOfTeams(html.URL, rowMatch);
                    //match = getNameOfTeams_betexplorer(html);
                    positionInTable = getPositionInTable(html);
                    //positionInTable = getPositionInTable_betexplorer(html, match.homeTeam, match.awayTeam);
                    cleanSheets = getCleanScheets(html.querySelectorAll('.trow3 td'));
                    scoredAndConcededGolas = getScoredAndConcededGolas(html.querySelectorAll('.trow2 td'));
    
                    const lastMatchesTables = $(html).contents().find('.six.columns table tr td span a').closest('table').prev()
                    const lastAllMatchesTable_Rows = $(lastMatchesTables[0]).find('tr');
                    const lastMatchesCurrentPositionTable_Rows = $(lastMatchesTables[1]).find('tr');
                    last_4_AllMatches = hasTableSufficientNumberOfRows(lastAllMatchesTable_Rows) ? countResultsOfMatchesBothTeams(lastAllMatchesTable_Rows, 4) : null;
                    last_4_MatchesCurrentPosition = hasTableSufficientNumberOfRows(lastMatchesCurrentPositionTable_Rows) ? countResultsOfMatchesBothTeams(lastMatchesCurrentPositionTable_Rows, 4) : null;
                }

                const filterDataBy_Yuvalfra = yuvalfra_Strategy(
                    scoredAndConcededGolas.homeTeamScored_home,
                    scoredAndConcededGolas.awayTeamScored_away,
                    scoredAndConcededGolas.homeTeamConceded_home,
                    scoredAndConcededGolas.awayTeamConceded_away,
                );
                const filterDataBy_JohnHaighsTable = johnHaighsTable_Strategy(
                    scoredAndConcededGolas.homeTeamScored_home,
                    scoredAndConcededGolas.awayTeamScored_away,
                );
                const filterDataBy_Vincent = vincent_Strategy(
                    last_4_AllMatches.toCountHomeMatchesReslult.matchResults,
                    last_4_AllMatches.toCountAwayMatchesReslult.matchResults,
                );
                const homeTeamFavorits = homeTeamFavorits_Filter(
                    scoredAndConcededGolas.homeTeamScored_home,
                    scoredAndConcededGolas.awayTeamScored_away,
                    scoredAndConcededGolas.homeTeamConceded_home,
                    scoredAndConcededGolas.awayTeamConceded_away,
                );
                const awayTeamFavorits = awayTeamFavorits_Filter(
                    scoredAndConcededGolas.homeTeamScored_home,
                    scoredAndConcededGolas.awayTeamScored_away,
                    scoredAndConcededGolas.homeTeamConceded_home,
                    scoredAndConcededGolas.awayTeamConceded_away,
                );

                resolve({
                    id: match.matchId,
                    výsledok: {
                        skóre: 'bez výsledku',
                        gólyDomáci: NaN,
                        gólyHostia: NaN,
                        vyhral: '',
                        over_1_5: null,
                        over_2_5: null,
                        under_2_5: null,
                        under_3_5: null,
                    },
                    filterDataBy_Yuvalfra: filterDataBy_Yuvalfra,
                    filterDataBy_JohnHaighsTable: filterDataBy_JohnHaighsTable,
                    filterDataBy_Vincent: filterDataBy_Vincent,
                    homeTeamFavorits: homeTeamFavorits,
                    awayTeamFavorits: awayTeamFavorits,
                    priemer_StrelenéGólyDomáci_InkasovaneGólyHostia: parseFloat(((scoredAndConcededGolas.homeTeamScored_home + scoredAndConcededGolas.awayTeamConceded_away) / 2).toFixed(2)),
                    priemer_posledne4Zapasy_StrelenéGólyDomáci_InkasovaneGólyHostia: parseFloat(((last_4_MatchesCurrentPosition.toCountHomeMatchesReslult.scoredGoalsAverage + last_4_MatchesCurrentPosition.toCountAwayMatchesReslult.concededGoalsAverage) / 2).toFixed(2)),
                    priemer_StrelenéGólyHostia_InkasovaneGólyDomáci: parseFloat(((scoredAndConcededGolas.awayTeamScored_away + scoredAndConcededGolas.homeTeamConceded_home) / 2).toFixed(2)),                                        
                    priemer_posledne4Zapasy_StrelenéGólyHostia_InkasovaneGólyDomáci: parseFloat(((last_4_MatchesCurrentPosition.toCountAwayMatchesReslult.scoredGoalsAverage + last_4_MatchesCurrentPosition.toCountHomeMatchesReslult.concededGoalsAverage) / 2).toFixed(2)),                    
                    CasZapasu: match.matchTime,
                    Liga: match.league,
                    Domaci: {
                        nazovTimu: match.homeTeam,
                        streleneGoly: scoredAndConcededGolas.homeTeamScored,
                        streleneGoly_Doma: scoredAndConcededGolas.homeTeamScored_home,
                        inkasovaneGoly: scoredAndConcededGolas.homeTeamConceded,
                        inkasovaneGoly_Doma: scoredAndConcededGolas.homeTeamConceded_home,
                        cisteKontoDoma: cleanSheets.cleanSheetsHome_Home,
                        pozicia: positionInTable.home,
                        pocetBodov: null,
                        pocetTimov: positionInTable.all,
                        posledne_4_Zapasy: last_4_AllMatches && {
                            streleneGoly: last_4_AllMatches.toCountHomeMatchesReslult.scoredGoals,
                            streleneGolyPriemer: last_4_AllMatches.toCountHomeMatchesReslult.scoredGoalsAverage,
                            inkasovaneGoly: last_4_AllMatches.toCountHomeMatchesReslult.concededGoals,
                            inkasovaneGolyPriemer: last_4_AllMatches.toCountHomeMatchesReslult.concededGoalsAverage,
                            konečnýStav: last_4_AllMatches.toCountHomeMatchesReslult.matchResults,
                            výsledkyZápasov: last_4_AllMatches.toCountHomeMatchesReslult.results,

                        },
                        posledne_4_ZapasyDoma: last_4_MatchesCurrentPosition && {
                            streleneGoly: last_4_MatchesCurrentPosition.toCountHomeMatchesReslult.scoredGoals,
                            streleneGolyPriemer: last_4_MatchesCurrentPosition.toCountHomeMatchesReslult.scoredGoalsAverage,
                            inkasovaneGoly: last_4_MatchesCurrentPosition.toCountHomeMatchesReslult.concededGoals,
                            inkasovaneGolyPriemer: last_4_MatchesCurrentPosition.toCountHomeMatchesReslult.concededGoalsAverage,
                            konečnýStav: last_4_MatchesCurrentPosition.toCountHomeMatchesReslult.matchResults,
                            výsledkyZápasov: last_4_MatchesCurrentPosition.toCountHomeMatchesReslult.results,
                        },
                    },
                    Hostia: {
                        nazovTimu: match.awayTeam,
                        streleneGoly: scoredAndConcededGolas.awayTeamScored,
                        streleneGoly_Vonku: scoredAndConcededGolas.awayTeamScored_away,
                        inkasovaneGoly: scoredAndConcededGolas.awayTeamConceded,
                        inkasovaneGoly_Vonku: scoredAndConcededGolas.awayTeamConceded_away,
                        cisteKontoVonku: cleanSheets.cleanSheetsAway_Away,
                        pozicia: positionInTable.away,
                        pocetBodov: null,
                        pocetTimov: positionInTable.all,
                        posledne_4_Zapasy: last_4_AllMatches && {
                            streleneGoly: last_4_AllMatches.toCountAwayMatchesReslult.scoredGoals,
                            streleneGolyPriemer: last_4_AllMatches.toCountAwayMatchesReslult.scoredGoalsAverage,
                            inkasovaneGoly: last_4_AllMatches.toCountAwayMatchesReslult.concededGoals,
                            inkasovaneGolyPriemer: last_4_AllMatches.toCountAwayMatchesReslult.concededGoalsAverage,
                            konečnýStav: last_4_AllMatches.toCountAwayMatchesReslult.matchResults,
                            výsledkyZápasov: last_4_AllMatches.toCountAwayMatchesReslult.results,
                        },
                        posledne_4_ZapasyVonku: last_4_MatchesCurrentPosition && {
                            streleneGoly: last_4_MatchesCurrentPosition.toCountAwayMatchesReslult.scoredGoals,
                            streleneGolyPriemer: last_4_MatchesCurrentPosition.toCountAwayMatchesReslult.scoredGoalsAverage,
                            inkasovaneGoly: last_4_MatchesCurrentPosition.toCountAwayMatchesReslult.concededGoals,
                            inkasovaneGolyPriemer: last_4_MatchesCurrentPosition.toCountAwayMatchesReslult.concededGoalsAverage,
                            konečnýStav: last_4_MatchesCurrentPosition.toCountAwayMatchesReslult.matchResults,
                            výsledkyZápasov: last_4_MatchesCurrentPosition.toCountAwayMatchesReslult.results,
                        },
                    }
                }); 
            }).catch(function (err) {
                console.log(err);
                resolve();
                if (err.status === 404) {
                    console.log(top.soccerUrl);
                }
            });
        }  
    })
}

const getNameOfTeams = (url, rowMatch) => {
    rowMatch.find('td').children().parent().addClass('a');

    let homeTeam, awayTeam, matchTime;
    let league = url !== null ? decodeURI(url).split('?')[1].split('=')[1].split('&')[0] : '';

    if (rowMatch.find('td:not(".a")').length === 4) {
        rowMatch.find('td:not(".a")').first().addClass('a');
        rowMatch.find('td:not(".a")').last().addClass('a');
        matchTime = rowMatch.find('td:not(".a")').first().next().text().trim()
        homeTeam = rowMatch.find('td:not(".a")').first().text();
        awayTeam = rowMatch.find('td:not(".a")').last().text();
    } else if (rowMatch.find('td:not(".a")').length === 2) {
        matchTime = rowMatch.find('td:not(".a")').first().next().text().trim()
        homeTeam = rowMatch.find('td:not(".a")').first().text();
        awayTeam = rowMatch.find('td:not(".a")').last().text();
    }

    if (matchTime !== undefined) {
        let hour = parseInt(matchTime.split(':')[0]);
        let minute = parseInt(matchTime.split(':')[1]);
        let newHour = minute > 30 ? hour + 1 : hour;
        matchTime = newHour;
    }

    return{
        matchId: homeTeam.trim() + awayTeam.trim(),
        matchTime: matchTime,
        league: league,
        homeTeam: homeTeam.trim(),
        awayTeam: awayTeam.trim(),
    }
}

const getNameOfTeams_betexplorer = (html) => {
    const league = html.querySelector('h1 a').href.split('soccer')[1];
    const homeTeam = html.querySelectorAll('h2.list-details__item__title')[0].textContent
    const awayTeam = html.querySelectorAll('h2.list-details__item__title')[1].textContent

    return{
        matchId: homeTeam.trim() + awayTeam.trim(),
        league: league,
        homeTeam: homeTeam.trim(),
        awayTeam: awayTeam.trim(),
    }
}

function getPositionInTable (html){
    var homeTablePosition = '?';
    var awayTablePosition = '?';
    var home = $($(html).find('.trow7')[1])
    var away = $($(html).find('.trow5')[1])
    var table = home.parent();
    var numOfTeam = table.children();

    numOfTeam.each(function(i, elm){
        if(elm.className === 'trow7'){
            homeTablePosition = i - 1
        }
        if(elm.className === 'trow5'){
            awayTablePosition = i - 1
        }
    });

    return {
        home: homeTablePosition,
        away: awayTablePosition,
        all: numOfTeam.length - 2,
    }
}

const getPositionInTable_betexplorer = (html, homeTeam, awayTeam) => {
    var homeTablePosition = '?';
    var awayTablePosition = '?';
    const numOfTeam = html.querySelectorAll('.team_name_span');
    
    numOfTeam.each(function(i, elm){
        if(elm.textContent === homeTeam){
            homeTablePosition = i - 1
        }
        if(elm.className === awayTeam){
            awayTablePosition = i - 1
        }
    });

    return {
        home: homeTablePosition,
        away: awayTablePosition,
        all: numOfTeam.length - 2,
    }
}

const getCleanScheets = (tableCells) => {
    for (var i = 0; i < tableCells.length; i++) {
        if (tableCells[i].innerText.indexOf("Clean sheets") != -1) {
            return {
                cleanSheetsHome_Home: parseFloat(tableCells[i].previousSibling.previousSibling.innerText),
                cleanSheetsAway_Away: parseFloat(tableCells[i].nextSibling.nextSibling.innerText),
            }
        } 
    }
    return null;
}

const getScoredAndConcededGolas = (tableCells) => {
    for (var i = 0; i < tableCells.length; i++) {
        if (tableCells[i].innerText.indexOf("Scored+conc. per match") != -1) {
            var scoredConc = tableCells[i];
            var goalsScored_TR = $(scoredConc).closest('tr').prev().prev().prev();
            var goalsConceded_TR = $(scoredConc).closest('tr').prev();

            return{
                homeTeamScored: parseFloat(goalsScored_TR.find('td:first-child').next().text()),
                homeTeamScored_home: parseFloat(goalsScored_TR.find('td:first-child b').text()),
                homeTeamConceded: parseFloat(goalsConceded_TR.find('td:first-child').next().text()),
                homeTeamConceded_home: parseFloat(goalsConceded_TR.find('td:first-child b').text()),
                awayTeamScored: parseFloat(goalsScored_TR.find('td:last-child').prev().text()),
                awayTeamScored_away: parseFloat(goalsScored_TR.find('td:last-child b').text()),
                awayTeamConceded: parseFloat(goalsConceded_TR.find('td:last-child').prev().text()),
                awayTeamConceded_away: parseFloat(goalsConceded_TR.find('td:last-child b').text()),
            }
        }
    }
    return null;
}


/* 
    Prediction Functions
*/ 
function vincent_Strategy(homeTeamMatchesResult, awayTeamMatchesResult) {
    let calculate = 0;
    const numberOfMatches = homeTeamMatchesResult.length <= awayTeamMatchesResult.length ? homeTeamMatchesResult.length : awayTeamMatchesResult.length;

    if (homeTeamMatchesResult.length < 2 || awayTeamMatchesResult.length < 2) {
        return 'malo zapasov k vytvoreniu statistiky'
    }

    var resultsTable = {
        "0:0": [-0.5, -0.75],
        "1:0": [-0.5, -0.75],
        "0:1": [-0.5, -0.75],
        "1:1": [0.75, -0.5],
        "2:0": [-0.5, -0.75],
        "0:2": [-0.5, -0.75],
        "2:1": [0.5, 0.75],
        "1:2": [0.5, 0.75],
        "2:2": [0.5, 0.75],
        "0:3": [0.5, -0.75],
        "3:0": [0.5, -0.75],
        "3:1": [0.5, 0.75],
        "3:2": [0.5, 0.75],
        "1:3": [0.5, 0.75],
        "2:3": [0.5, 0.75],
        "3:3": [0.5, 0.75],
        "4:0": [0.5, -0.75],
        "4:1": [0.5, 0.75],
        "4:2": [0.5, 0.75],
        "4:3": [0.5, 0.75],
        "0:4": [0.5, -0.75],
        "1:4": [0.5, 0.75],
        "2:4": [0.5, 0.75],
        "3:4": [0.5, 0.75],
        "4:4": [0.5, 0.75],
        "5:0": [0.5, -0.75],
        "5:1": [0.5, 0.75],
        "5:2": [0.5, 0.75],
        "5:3": [0.5, 0.75],
        "5:4": [0.5, 0.75],
        "0:5": [0.5, -0.75],
        "1:5": [0.5, 0.75],
        "2:5": [0.5, 0.75],
        "3:5": [0.5, 0.75],
        "4:5": [0.5, 0.75],
        "5:5": [0.5, 0.75],
        "6:0": [0.5, -0.75],
        "6:1": [0.5, 0.75],
        "6:2": [0.5, 0.75],
        "6:3": [0.5, 0.75],
        "6:4": [0.5, 0.75],
        "6:5": [0.5, 0.75],
        "0:6": [0.5, -0.75],
        "1:6": [0.5, 0.75],
        "2:6": [0.5, 0.75],
        "3:6": [0.5, 0.75],
        "4:6": [0.5, 0.75],
        "5:6": [0.5, 0.75],
        "6:6": [0.5, 0.75],
        "7:0": [0.5, -0.75],
        "7:1": [0.5, 0.75],
        "7:2": [0.5, 0.75],
        "7:3": [0.5, 0.75],
        "0:7": [0.5, -0.75],
        "1:7": [0.5, -0.75],
        "2:7": [0.5, -0.75],
        "8:0": [0.5, -0.75],
        "8:1": [0.5, 0.75],
        "8:2": [0.5, 0.75],
        "8:3": [0.5, 0.75],
        "0:8": [0.5, -0.75],
        "1:8": [0.5, 0.75],
        "2:8": [0.5, 0.75],
        "9:0": [0.5, -0.75],
        "9:1": [0.5, 0.75],
        "9:2": [0.5, 0.75],
        "9:3": [0.5, 0.75],
        "0:9": [0.5, -0.75],
        "1:9": [0.5, 0.75],
        "2:9": [0.5, 0.75],
        "10:0": [0.5, -0.75],
        "10:1": [0.5, 0.75],
        "10:2": [0.5, 0.75],
        "10:3": [0.5, 0.75],
        "0:10": [0.5, -0.75],
        "1:10": [0.5, 0.75],
        "2:10": [0.5, 0.75]
        // last 5 matches
    };

    for (var i = 0; i < numberOfMatches; i++) {
        var team1_scored_Home = homeTeamMatchesResult[i].current;
        var team2_scored_Away = homeTeamMatchesResult[i].another;

        var team3_scored_Home = awayTeamMatchesResult[i].current;
        var team4_scored_Away = awayTeamMatchesResult[i].another;

        var matchResult_HomeTeam = '' + team1_scored_Home + ':' + team2_scored_Away + '';
        var matchResult_AwayTeam = '' + team3_scored_Home + ':' + team4_scored_Away + '';

        calculate += resultsTable[matchResult_HomeTeam][0] + resultsTable[matchResult_HomeTeam][1] + resultsTable[matchResult_AwayTeam][0] + resultsTable[matchResult_AwayTeam][1];
    }

    return calculate;
}

function yuvalfra_Strategy(homeGF, awayGF, homeConc, awayConc) {
    var higthHomeGF_awayConc = homeGF >= awayConc ? homeGF : awayConc;
    var higthAwayGF_homeConc = awayGF >= homeConc ? awayGF : homeConc;
    var minHomeGF_awayConc = homeGF <= awayConc ? homeGF : awayConc;
    var minAwayGF_homeConc = awayGF <= homeConc ? awayGF : homeConc;

    var higthAmount = higthHomeGF_awayConc + higthAwayGF_homeConc;
    var minAmount = minHomeGF_awayConc + minAwayGF_homeConc;

    return parseFloat(parseFloat((higthAmount + minAmount) / 2).toFixed(2));
}

function johnHaighsTable_Strategy(homeGF, awayGF) {
    var homeTable = switchTable(homeGF);
    var awayTable = switchTable(awayGF);

    if (homeTable == null || awayTable == null) {
        return null;
    }

    var result0_0 = homeTable[0] * awayTable[0];
    var result1_0 = homeTable[1] * awayTable[0];
    var result0_1 = homeTable[0] * awayTable[1];
    var result1_1 = homeTable[1] * awayTable[1];
    var result2_0 = homeTable[2] * awayTable[0];
    var result0_2 = homeTable[0] * awayTable[2];

    return (result0_0 + result1_0 + result0_1 + result1_1 + result2_0 + result0_2) / 100;
}

function homeTeamFavorits_Filter(homeTeam_homeGF, awayTeam_awayGF, homeTeam_homeConc, awayTeam_awayConc) {
	if (
		homeTeam_homeGF - homeTeam_homeConc > 1 &&
		homeTeam_homeConc < 1 &&
		homeTeam_homeConc - awayTeam_awayGF < 1 &&
		(awayTeam_awayGF <= 1 && awayTeam_awayConc >= 1.2)
	) {
		return true;
	}
	return false;
}

function awayTeamFavorits_Filter(homeTeam_homeGF, awayTeam_awayGF, homeTeam_homeConc, awayTeam_awayConc) {
	if (
		awayTeam_awayConc < 1.1 &&
		awayTeam_awayConc - homeTeam_homeGF < 1 &&
		(homeTeam_homeGF <= 1 && homeTeam_homeConc >= 1.2)
	) {
		return true;
	}
	return false;
}


/* 
    Hellper Functions
*/ 
const isEuropeLeague = (league) => {
    let result;
    const europeLeagues = [
        'england',
        'france',
    ];

    for (var i = 0; i < europeLeagues.length; i++) {
        if (league.indexOf(europeLeagues[i]) === -1) {
            result = false;
        } else {
            result = true;
            break;
        }
    }

    return result;
}

const calculateProfit = (count, win, numMatchesOnTicket, course, bet) => {
    let numTickets, lossMatches;

    if (count / numMatchesOnTicket < 2) {
        numTickets = Math.ceil(count / numMatchesOnTicket); 
        lossMatches = (count - win);
    } else if (Math.round(count / numMatchesOnTicket) > (count / numMatchesOnTicket)) {
        numTickets = Math.ceil(count / numMatchesOnTicket);
        lossMatches = (count - win);
    } else if  (Math.round(count / numMatchesOnTicket) < (count / numMatchesOnTicket)) {
        numTickets = Math.floor(count / numMatchesOnTicket);
        lossMatches = ((numTickets * numMatchesOnTicket) - win) < 0 ? 0 : ((numTickets * numMatchesOnTicket) - win);
    } else {
        numTickets = count / numMatchesOnTicket; 
        lossMatches = count - win;
    }

    const numWinTickets = numTickets - lossMatches;
    const deposit = numTickets * bet;
    const profit = (numWinTickets * course) * bet;

    return profit > 0 ? Math.round(profit - deposit) : - deposit;
}

const countResultsOfMatchesBothTeams = (matches, count) => {
    let resultOfCountingHomeTeamMatches = {
        scoredGoals: 0,
        scoredGoalsAverage: 0,
        concededGoals: 0,
        concededGoalsAverage: 0,
        matchResults: [], 
        results: [],
    }
    let resultOfCountingAwayTeamMatches = {
        scoredGoals: 0,
        concededGoals: 0,
        matchResults: [], 
        results: [],
    }

    if(matches.length >= count){
        for (var i = 0; i < count; i++) {
            let result = resultOfMatchesBothTeams(matches, i);
            
            resultOfCountingHomeTeamMatches.scoredGoals += result.homeTeamMatch.currentTeam_score;
            resultOfCountingHomeTeamMatches.concededGoals += result.homeTeamMatch.anotherTeam_score;
            resultOfCountingHomeTeamMatches.matchResults.push(result.homeTeamMatch.matches);
            resultOfCountingHomeTeamMatches.results.push(result.homeTeamMatch.result);

            resultOfCountingAwayTeamMatches.scoredGoals += result.awayTeamMatch.currentTeam_score;
            resultOfCountingAwayTeamMatches.concededGoals += result.awayTeamMatch.anotherTeam_score;
            resultOfCountingAwayTeamMatches.matchResults.push(result.awayTeamMatch.matches);
            resultOfCountingAwayTeamMatches.results.push(result.awayTeamMatch.result);
        }  

        resultOfCountingHomeTeamMatches.scoredGoalsAverage = resultOfCountingHomeTeamMatches.scoredGoals / count;
        resultOfCountingHomeTeamMatches.concededGoalsAverage = resultOfCountingHomeTeamMatches.concededGoals / count;
        resultOfCountingAwayTeamMatches.scoredGoalsAverage = resultOfCountingAwayTeamMatches.scoredGoals / count;
        resultOfCountingAwayTeamMatches.concededGoalsAverage = resultOfCountingAwayTeamMatches.concededGoals / count;

        return {
            toCountHomeMatchesReslult: resultOfCountingHomeTeamMatches ? resultOfCountingHomeTeamMatches : {},
            toCountAwayMatchesReslult: resultOfCountingAwayTeamMatches ? resultOfCountingAwayTeamMatches : {},
        }
    } 
    return null
}

const resultOfMatchesBothTeams = (matches, order) => {
    const positionInMacthHomeTeam =
             matches[order].querySelectorAll('td')[1].innerHTML.split('-')[0].includes('<b>') 
                ? (
                    {current: 0, another: 1}
                )
                : {current: 1, another: 0}
    
    const positionInMacthAwayTeam = 
            matches[order].querySelectorAll('td')[5].innerHTML.split('-')[0].includes('<b>') 
                ? (
                    {current: 0, another: 1}
                )
                : {current: 1, another: 0}

    const result_HomeTeamMatch = matches[order].querySelectorAll('td')[2].querySelector('b').innerText;
    const result_AwayTeamMatch = matches[order].querySelectorAll('td')[4].querySelector('b').innerText;
    const homeTeamMatchCurrentTeam_score = parseFloat(result_HomeTeamMatch.split('-')[positionInMacthHomeTeam.current]);
    const homeTeamMatchAnotherTeam_score = parseFloat(result_HomeTeamMatch.split('-')[positionInMacthHomeTeam.another]);
    const awayTeamMatchCurrentTeam_score = parseFloat(result_AwayTeamMatch.split('-')[positionInMacthAwayTeam.current]);
    const awayTeamMatchAnotherTeam_score = parseFloat(result_AwayTeamMatch.split('-')[positionInMacthAwayTeam.another]);

    return{
        homeTeamMatch: {
            currentTeam_score: homeTeamMatchCurrentTeam_score,
            anotherTeam_score: homeTeamMatchAnotherTeam_score,
            matches: {
                current: homeTeamMatchCurrentTeam_score,
                another: homeTeamMatchAnotherTeam_score,
            },
            result: homeTeamMatchCurrentTeam_score > homeTeamMatchAnotherTeam_score
                    ? (
                        'výhra'
                    ) : homeTeamMatchCurrentTeam_score === homeTeamMatchAnotherTeam_score
                    ? (
                        'remíza'
                    )
                    : 'prehra'
        },
        awayTeamMatch: {
            currentTeam_score: awayTeamMatchCurrentTeam_score,
            anotherTeam_score: awayTeamMatchAnotherTeam_score,
            matches: {
                current: awayTeamMatchCurrentTeam_score,
                another: awayTeamMatchAnotherTeam_score,
            },
            result: awayTeamMatchCurrentTeam_score > awayTeamMatchAnotherTeam_score
                    ? (
                        'výhra'
                    ) : awayTeamMatchCurrentTeam_score === awayTeamMatchAnotherTeam_score
                    ? (
                        'remíza'
                    )
                    : 'prehra'
        },
    }
}

function calculateAverageGoals(last4MatchesTable_TR, totalScored_Home, totalConceded_Away, totalConceded_Home, totalScored_Away) {

    var scored_Home_4_match = 0;
    var conceded_Away_4_match = 0;
    var conceded_Home_4_match = 0;
    var scored_Away_4_match = 0;

    for (var i = 0; i < last4MatchesTable_TR.length; i++) {
        var goal_Scored_Home = parseFloat(last4MatchesTable_TR[i].querySelectorAll('td')[2].querySelector('b').innerText.split('-')[0]);
        var goal_Conceded_Away = parseFloat(last4MatchesTable_TR[i].querySelectorAll('td')[4].querySelector('b').innerText.split('-')[0]);
        var goal_Conceded_Home = parseFloat(last4MatchesTable_TR[i].querySelectorAll('td')[2].querySelector('b').innerText.split('-')[1]);
        var goal_Scored_Away = parseFloat(last4MatchesTable_TR[i].querySelectorAll('td')[4].querySelector('b').innerText.split('-')[1]);

        scored_Home_4_match += goal_Scored_Home;
        conceded_Away_4_match += goal_Conceded_Away;
        conceded_Home_4_match += goal_Conceded_Home;
        scored_Away_4_match += goal_Scored_Away;
    }

    var averageCount_Scored_Home = (scored_Home_4_match / last4MatchesTable_TR.length + totalScored_Home) / 2;
    var averageCount_Conceded_Away = (conceded_Away_4_match / last4MatchesTable_TR.length + totalConceded_Away) / 2;
    var averageCount_Conceded_Home = (conceded_Home_4_match / last4MatchesTable_TR.length + totalConceded_Home) / 2;
    var averageCount_Scored_Away = (scored_Away_4_match / last4MatchesTable_TR.length + totalScored_Away) / 2;

    return {
        averageScored_Home: averageCount_Scored_Home,
        averageConceded_Away: averageCount_Conceded_Away,
        averageConceded_Home: averageCount_Conceded_Home,
        averageScored_Away: averageCount_Scored_Away,
        averageScored_Home_4_match: scored_Home_4_match / last4MatchesTable_TR.length,
        averageConceded_Away_4_match: conceded_Away_4_match / last4MatchesTable_TR.length,
        averageConceded_Home_4_match: conceded_Home_4_match / last4MatchesTable_TR.length,
        averageScored_Away_4_match: scored_Away_4_match / last4MatchesTable_TR.length,
        averageTotalScored_Home: totalScored_Home,
        averageTotalConceded_Away: totalConceded_Away,
        averageTotalConceded_Home: totalConceded_Home,
        averageTotalScored_Away: totalScored_Away
    };
}

function switchTable(GF) {

    var table = {
        avarage_08: [45, 36, 14, 4, 1],
        avarage_12: [30, 36, 22, 9, 3],
        avarage_16: [20, 32, 26, 14, 8],
        avarage_2: [14, 27, 27, 18, 14]
    };

    switch (true) {
        case GF < 1.2:
            return table.avarage_08;
            break;
        case GF < 1.6:
            return table.avarage_12;
            break;
        case GF < 2:
            return table.avarage_16;
            break;
        case GF >= 2:
            return table.avarage_2;
            break;
        default:
    }
}

function hasTableSufficientNumberOfRows(rows) {
    if (rows.length >= 4 && rows.last().find('td').length === 7) {
        if (rows.last().find('td:nth-child(2)').text() !== " ") {
            return true;
        }
        return false;
    } 
    return false;
}

const consoleConditionHighlighting = (props, conditions = [], text, bold, percent) => {
    if(conditions[0]){
        console.log(text + (Array.isArray(props) ? props[0] + ' / '+ props[1] : props) + (percent ? percent : ''), `${bold === true ? 'font-weight: bold' : 'font-weight: normal'}; background: green; color: white; display: block;`)
    } else if (conditions[1]) {
        console.log(text + (Array.isArray(props) ? props[0] + ' / '+ props[1] : props) + (percent ? percent : ''), `${bold === true ? 'font-weight: bold' : 'font-weight: normal'}; background: yellow; color: black; display: block;`)
    } else {
        console.log(text + (Array.isArray(props) ? props[0] + ' / '+ props[1] : props) + (percent ? percent : ''), `${bold === true ? 'font-weight: bold' : 'font-weight: normal'}; background: red; color: white; display: block;`)
    }
}

const returnDataToConsoleLog = (matchStats, type) => {
    const predictionType = {
        vysledokZapasuNastrielaneGoly: {min: 2},
        domaciCisteKontoDoma: {min: 25, max: 40},
        hostiaCisteKontoVonku: {min: 25, max: 40},
        domaciStreleneGolyDoma: {min: 1.2, max: 1.5},
        hostiaStreleneGolyVonku: {min: 1.1, max: 1.35},
        filterDataBy_Vincent: {max: 2},
        filterDataBy_Yuvalfra: {max: 2.2},
        filterDataBy_johnHaighsTable: {min: 47, max: 60},
    }

    console.log('Liga:            ' + matchStats.Liga);
    console.log('Začiatok zápasu: ' + matchStats.CasZapasu);
    console.log('Zápas:           ' + matchStats.Domaci.nazovTimu + ' vs ' + matchStats.Hostia.nazovTimu);
    console.log('Domáci tím pozícia v tabuľke:    ' + matchStats.Domaci.pozicia + ' / ' + matchStats.Domaci.pocetTimov)
    console.log('Hosťujúci tím pozícia v tabuľke: ' + matchStats.Hostia.pozicia + ' / ' + matchStats.Hostia.pocetTimov)
    console.log('Domáci tím favorit               ' + matchStats.homeTeamFavorits);
    console.log('Hosťujúci tím favorit            ' + matchStats.awayTeamFavorits);

    consoleConditionHighlighting(
        matchStats.Domaci.cisteKontoDoma,
        [matchStats.Domaci.cisteKontoDoma <= predictionType.domaciCisteKontoDoma.min, matchStats.Domaci.cisteKontoDoma > predictionType.domaciCisteKontoDoma.min && matchStats.Domaci.cisteKontoDoma < predictionType.domaciCisteKontoDoma.max],
        "%c Čisté konto domáci tím doma:          ",
        false,
        "%",
    );
    consoleConditionHighlighting(
        matchStats.Hostia.cisteKontoVonku,
        [matchStats.Domaci.cisteKontoDoma <= predictionType.hostiaCisteKontoVonku.min, matchStats.Domaci.cisteKontoDoma > predictionType.hostiaCisteKontoVonku.min && matchStats.Domaci.cisteKontoDoma < predictionType.hostiaCisteKontoVonku.max],
        "%c Čisté konto hosťujúci tím vonku:      ",
        false,
        "%",
    );

    console.log('Average(1)&(4) 4-match/total:    ' + matchStats.priemer_posledne4Zapasy_StrelenéGólyDomáci_InkasovaneGólyHostia + ' / ' + matchStats.priemer_StrelenéGólyDomáci_InkasovaneGólyHostia)
    console.log('Average(2)&(3):                  ' + matchStats.priemer_StrelenéGólyHostia_InkasovaneGólyDomáci)

    consoleConditionHighlighting(
        matchStats.filterDataBy_Vincent,
        [matchStats.filterDataBy_Vincent >= predictionType.filterDataBy_Vincent.max, matchStats.filterDataBy_Vincent > 0 && matchStats.filterDataBy_Vincent < predictionType.filterDataBy_Vincent.max],
        '%c probabilityBy_Vincent:                ',
        false,
    );

    consoleConditionHighlighting(
        matchStats.filterDataBy_Yuvalfra,
        [matchStats.filterDataBy_Yuvalfra >= predictionType.filterDataBy_Yuvalfra.max, matchStats.filterDataBy_Yuvalfra > 0 && matchStats.filterDataBy_Yuvalfra < predictionType.filterDataBy_Yuvalfra.max],
        '%c filterDataBy_Yuvalfra:                ',
        false,
    );

    consoleConditionHighlighting(
        matchStats.filterDataBy_JohnHaighsTable,
        [matchStats.filterDataBy_JohnHaighsTable <= predictionType.filterDataBy_johnHaighsTable.min, matchStats.filterDataBy_JohnHaighsTable > predictionType.filterDataBy_johnHaighsTable.min && matchStats.filterDataBy_JohnHaighsTable < predictionType.filterDataBy_johnHaighsTable.max],
        '%c filterDataBy_johnHaighsTable:         ',
        false,
    );

    consoleConditionHighlighting(
        [matchStats.Domaci.posledne_4_ZapasyDoma.streleneGolyPriemer, matchStats.Domaci.streleneGoly_Doma],
        [matchStats.Domaci.streleneGoly_Doma >= predictionType.domaciStreleneGolyDoma.max, matchStats.Domaci.streleneGoly_Doma >= predictionType.domaciStreleneGolyDoma.min && matchStats.Domaci.streleneGoly_Doma < predictionType.domaciStreleneGolyDoma.max],
        '%c Domáci tím strelené góly Doma 4-match/total:            ',
        true,
    );

    console.log('Hosťujúci tím inkasované góly Vonku 4-match/total: ' + matchStats.Hostia.posledne_4_ZapasyVonku.inkasovaneGolyPriemer + ' / ' + matchStats.Hostia.inkasovaneGoly_Vonku)

    consoleConditionHighlighting(
        [matchStats.Hostia.posledne_4_ZapasyVonku.streleneGolyPriemer, matchStats.Hostia.streleneGoly_Vonku],
        [matchStats.Hostia.streleneGoly_Vonku >= predictionType.hostiaStreleneGolyVonku.max, matchStats.Hostia.streleneGoly_Vonku >= predictionType.hostiaStreleneGolyVonku.min && matchStats.Hostia.streleneGoly_Vonku < predictionType.hostiaStreleneGolyVonku.max],
        '%c Hosťujúci tím strelené góly Vonku 4-match/total:        ',
        true,
    );

    console.log('Domáci tím inkasované góly Doma 4-match/total:     ' + matchStats.Domaci.posledne_4_ZapasyDoma.inkasovaneGolyPriemer + ' / ' + matchStats.Domaci.inkasovaneGoly_Doma);
    console.log('-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -');
    if (type === 'overUnder') {
        consoleConditionHighlighting(
            matchStats.výsledok.skóre,
            [
                (matchStats.výsledok.gólyDomáci + matchStats.výsledok.gólyHostia) > predictionType.vysledokZapasuNastrielaneGoly.min,
                (matchStats.výsledok.gólyDomáci + matchStats.výsledok.gólyHostia) === predictionType.vysledokZapasuNastrielaneGoly.min,
            ],
            "%c Výsledok: ",
            true,
        );
    } else if (type === 'homeAwayWin') {
        consoleConditionHighlighting(
            matchStats.výsledok.skóre,
            [
                matchStats.výsledok.gólyDomáci > matchStats.výsledok.gólyHostia,
                matchStats.výsledok.gólyDomáci === matchStats.výsledok.gólyHostia,
            ],
            "%c Výsledok: ",
            true,
        );
    }
    console.log('==================================================================================================================================================================================');
}       

function setDataToLocalStorage(name, data) {
    localStorage.setItem(name, data);
}

function getDataFromLocalStorage(name, data) {
    let result = localStorage.getItem(name, data);
    if(result !== ''){
        return JSON.parse(result);
    }
}

function progressBar() {
    var elem = document.getElementById("myBar");   
    var width = 10;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++; 
        elem.style.width = width + '%'; 
        elem.innerHTML = width * 1  + '%';
      }
    }
}

function showProgressBar(allLinks) {
    $("#myBar").width(0);
    $("#myBar").text(0 + '/' + allLinks);
    $("#myBar").show();
}

function moveProgressBar(i, multiple, allLinks) {
    $("#myBar").width(Math.round((multiple * i) * 100) / 100 + '%')
    $("#myBar").text(i * 1 + '/' + allLinks);
}

function getData(method, url, type = 'document') {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = type;
        xhr.onload = function () {
            if ((this.status >= 200 && this.status < 300) || this.status === 0) {
                hightScore.index++;
                xhr.response.index = hightScore.index;
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                obj: this,
                status: this.status,
                statusText: this.statusText
            });
        };
        xhr.send();
    });
}