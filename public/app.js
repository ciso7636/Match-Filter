'use strict';

var allMatchesStatistics = [];

var colors = {
    BgRed: "\x1b[31m%s\x1b[0m",
    BgGreen: "\x1b[32m%s\x1b[0m",
    BgYellow:  "\x1b[33m%s\x1b[0m",
}

var hightScore = {
    index: 0,
    yuvalfra_Average_koeficient: 2.5,
    average14_koeficient: 1.4,
    average23_koeficient: 1.25,
    average14_4last_koeficient: 1.3,
    average23_4last_koeficient: 1.2,
    johnHaighs_Under25_koeficient: 47,
    johnHaighs_Under25_koeficient_under: 67,
    vincent_Scale_koeficient: 3.5,
    vincent_Scale_koeficient_under: 2.5
};

window.onload = function () {
    //overGoalPrediction(allLinks);
    //underGoalPrediction(allLinks);
    //awayTeamScorePrediction(allLinks);
    //homeTeamWinPrediction(allLinks);
    //goalPrediction(allLinks);
};

$(function(){
    const allLinks = document.querySelectorAll('#btable .trow8 td:last-child > a:first-child');
    $('h1.header').text('Cick to load ' + allLinks.length + ' matches')
    $('.load-button').click(function() {
        let self = this;
        $(self).addClass('loading');
        $('.row-buttons').hide();
        $('h1').show();
        $('h1').text('...loading data');
        startProgressBar(allLinks.length);
        loadMatchesData(allLinks).then(function (allMatchesData) {
            allMatchesStatistics = allMatchesData;
            $(self).removeClass('loading');
            $(self).text('Data has been loaded');
            $('.row-buttons').show();
            $('h1').hide();
        })
    })

    $('.overGoalPrediction').click(function() {
        overGoalPrediction(allMatchesStatistics);
    })
})

function overGoalPrediction(allMatchesStatistics){
    for (let matchStats of allMatchesStatistics) {
        if(matchStats instanceof Object === false){
            continue;
        }
        // if(matchStats.Domaci.cisteKontoDoma >= 35 || matchStats.Hostia.cisteKontoVonku >= 32){
        //     return false;
        // }
        // if (matchStats.Hostia.cisteKontoVonku >= 40 && Math.abs(matchStats.Hostia.cisteKontoVonku - matchStats.Domaci.cisteKontoDoma) < 15) {
        //     return false;
        // }
        // if (matchStats.Hostia.cisteKontoVonku >= 45 && Math.abs(matchStats.Hostia.cisteKontoVonku - matchStats.Domaci.cisteKontoDoma) < 20) {
        //     return false;
        // }
        // if (matchStats.Hostia.cisteKontoVonku >= 50 && Math.abs(matchStats.Hostia.cisteKontoVonku - matchStats.Domaci.cisteKontoDoma) < 25) {
        //     return false;
        // }

        if (matchStats.priemerStrelenéGóly_Domáci_InkasovaneGóly_Hostia >= hightScore.average14_4last_koeficient) {
            console.log('Liga:' + matchStats.Liga + ': ' + matchStats.Domaci.nazovTimu + ' vs ' + matchStats.Hostia.nazovTimu);
            console.log('Domáci tím pozícia v tabuľke:    ' + matchStats.Domaci.pozicia + ' / ' + matchStats.Domaci.pocetTimov)
            console.log('Hosťujúci tím pozícia v tabuľke: ' + matchStats.Hostia.pozicia + ' / ' + matchStats.Hostia.pocetTimov)
            console.log('filterDataBy_Yuvalfra: ' + matchStats.filterDataBy_Yuvalfra);
            console.log('filterDataBy_johnHaighsTable: ' + matchStats.filterDataBy_JohnHaighsTable);
            console.log('filterDataBy_Vincent: ' + matchStats.filterDataBy_Vincent);
            console.log('homeTeamFavorits: ' + matchStats.homeTeamFavorits);
            console.log('awayTeamFavorits: ' + matchStats.awayTeamFavorits);
    
            
            if(matchStats.Domaci.cisteKontoDoma <= 25){
                console.log("%c Čisté konto domáci tím doma:     " + matchStats.Domaci.cisteKontoDoma + '%', 'background: green; color: white; display: block;')
            } else if (matchStats.Domaci.cisteKontoDoma > 25 && matchStats.Domaci.cisteKontoDoma < 40) {
                console.log("%c Čisté konto domáci tím doma:     " + matchStats.Domaci.cisteKontoDoma + '%', 'background: yellow; color: black; display: block;')
            } else {
                console.log("%c Čisté konto domáci tím doma:     " + matchStats.Domaci.cisteKontoDoma + '%', 'background: red; color: white; display: block;')
            }

            if(matchStats.Hostia.cisteKontoVonku <= 25){
                console.log("%c Čisté konto hosťujúci tím vonku: " + matchStats.Hostia.cisteKontoVonku + '%', 'background: green; color: white; display: block;')
            } else if (matchStats.Hostia.cisteKontoVonku > 25 && matchStats.Hostia.cisteKontoVonku < 40) {
                console.log("%c Čisté konto hosťujúci tím vonku: " + matchStats.Hostia.cisteKontoVonku + '%', 'background: yellow; color: black; display: block;')
            } else {
                console.log("%c Čisté konto hosťujúci tím vonku: " + matchStats.Hostia.cisteKontoVonku + '%', 'background: red; color: white; display: block;')
            }
            console.log('Average(1)&(4) 4-match/total:    ' + matchStats.priemerStrelenéGóly_posledne4Zapasy_Domáci_InkasovaneGóly_Hostia + ' / ' + matchStats.priemerStrelenéGóly_Domáci_InkasovaneGóly_Hostia)
            console.log('Average(2)&(3):                  ' + matchStats.priemerStrelenéGóly_Hostia_InkasovaneGóly_Domáci)
            
            if(matchStats.filterDataBy_Vincent >= 2){
                console.log('%c probabilityBy_Vincent:           ' + matchStats.filterDataBy_Vincent, 'background: green; color: white; display: block;')
            } else if (matchStats.filterDataBy_Vincent > 0 && matchStats.filterDataBy_Vincent < 2) {
                console.log('%c probabilityBy_Vincent:           ' + matchStats.filterDataBy_Vincent, 'background: yellow; color: black; display: block;')
            } else {
                console.log('%c probabilityBy_Vincent:           ' + matchStats.filterDataBy_Vincent, 'background: red; color: white; display: block;')
            }

            if(matchStats.Domaci.streleneGoly_Doma >= 1.5){
                console.log('%c Domáci tím strelené góly Doma 4-match/total:       ' + matchStats.Domaci.posledne_4_ZapasyDoma.streleneGolyPriemer + ' / ' + matchStats.Domaci.streleneGoly_Doma , 'background: green; color: white; font-weight: bold; display: block;')
            } else if (matchStats.Domaci.streleneGoly_Doma >= 1.2 && matchStats.Domaci.streleneGoly_Doma < 1.5) {
                console.log('%c Domáci tím strelené góly Doma 4-match/total:       ' + matchStats.Domaci.posledne_4_ZapasyDoma.streleneGolyPriemer + ' / ' + matchStats.Domaci.streleneGoly_Doma , 'background: yellow; color: black; font-weight: bold; display: block;')
            } else {
                console.log('%c Domáci tím strelené góly Doma 4-match/total:       ' + matchStats.Domaci.posledne_4_ZapasyDoma.streleneGolyPriemer + ' / ' + matchStats.Domaci.streleneGoly_Doma , 'background: red; color: white; font-weight: bold; display: block;')
            }
            
            console.log('Hosťujúci tím inkasované góly Vonku 4-match/total: ' + matchStats.Hostia.posledne_4_ZapasyVonku.streleneGolyPriemer + ' / ' + matchStats.Hostia.inkasovaneGoly_Vonku)
            
            if(matchStats.Hostia.streleneGoly_Vonku >= 1.35){
                console.log('%c Hosťujúci tím strelené góly Vonku 4-match/total:   ' + matchStats.Hostia.posledne_4_ZapasyVonku.streleneGolyPriemer + ' / ' + matchStats.Hostia.inkasovaneGoly_Vonku , 'background: green; color: white; font-weight: bold; display: block;')
            } else if (matchStats.Hostia.streleneGoly_Vonku >= 1.1 && matchStats.Hostia.streleneGoly_Vonku < 1.35) {
                console.log('%c Hosťujúci tím strelené góly Vonku 4-match/total:   ' + matchStats.Hostia.posledne_4_ZapasyVonku.streleneGolyPriemer + ' / ' + matchStats.Hostia.inkasovaneGoly_Vonku , 'background: yellow; color: black; font-weight: bold; display: block;')
            } else {
                console.log('%c Hosťujúci tím strelené góly Vonku 4-match/total:   ' + matchStats.Hostia.posledne_4_ZapasyVonku.streleneGolyPriemer + ' / ' + matchStats.Hostia.inkasovaneGoly_Vonku , 'background: red; color: white; font-weight: bold; display: block;')
            }
            console.log('Domáci tím inkasované góly Doma 4-match/total:     ' + matchStats.Domaci.posledne_4_ZapasyDoma.inkasovaneGolyPriemer + ' / ' + matchStats.Domaci.inkasovaneGoly_Doma);
            console.log('==================================================================================================================================================================================');
        }
    }
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
};

// function overGoalPrediction(allLinks) {
//     var filterDataBy_Yuvalfra = yuvalfra_Strategy(allLinks);
//     var filterDataBy_johnHaighsTable = johnHaighsTable_Strategy(allLinks);
//     var startMatch_ELEMENT = $(allLinks).closest('tr').find('td[align="center"] > font');

//     Loop1: // The first for loop is labeled "Loop1"
//     for (var j = 0; j < filterDataBy_johnHaighsTable.length; j++) {

//         var statsHref = filterDataBy_johnHaighsTable[j].getAttribute("href");
//         var decodeStatsHref = decodeURI(statsHref);

//         if (statsHref != null) {
//             getData('GET', 'https://www.soccerstats.com/' + decodeStatsHref).then(function (data) {
//                 top.soccerUrl = data.URL;
//                 var html = data;
//                 var cleanSheetsHome, cleanSheetsAway, homeTeam, awayTeam, league;
//                 Loop2: // The second for loop is labeled "Loop2"
//                 for (var i = 0; i < html.querySelectorAll('.trow3 td').length; i++) {
//                     if (html.querySelectorAll('.trow3 td')[i].innerText.indexOf("Clean sheets") != -1) {
//                         var cleanSheets = html.querySelectorAll('.trow3 td')[i];
//                         cleanSheetsHome = parseFloat(cleanSheets.previousSibling.previousSibling.innerText);
//                         cleanSheetsAway = parseFloat(cleanSheets.nextSibling.nextSibling.innerText);
//                         league = decodeURI(html.URL).split('?')[1].split('=')[1].split('&')[0];
//                         homeTeam = decodeURI(html.URL).split('stats')[decodeURI(html.URL).split('stats').length - 1].split('-vs-')[0];
//                         awayTeam = decodeURI(html.URL).split('stats')[decodeURI(html.URL).split('stats').length - 1].split('-vs-')[1];

//                         var lastMatchesTable = $(html).contents().find('.six.columns table tr td span a').closest('table').prev()[0]
//                         var lastMatchesTable_Rows = $(lastMatchesTable).find('tr');

//                         var probabilityBy_Vincent = vincent_Strategy(lastMatchesTable_Rows);
//                         if (probabilityBy_Vincent >= hightScore.vincent_Scale_koeficient) {

//                             if(cleanSheetsHome >= 35 || cleanSheetsAway >= 32){
//                                 return false;
//                             }
//                             if (cleanSheetsAway >= 40 && Math.abs(cleanSheetsAway - cleanSheetsHome) < 15) {
//                                 return false;
//                             }
//                             if (cleanSheetsAway >= 45 && Math.abs(cleanSheetsAway - cleanSheetsHome) < 20) {
//                                 return false;
//                             }
//                             if (cleanSheetsAway >= 50 && Math.abs(cleanSheetsAway - cleanSheetsHome) < 25) {
//                                 return false;
//                             }

//                             Loop3: for (var l = 0; l < html.querySelectorAll('.trow3 td:first-child').length; l++) {
//                                 if (html.querySelectorAll('.trow3 td:first-child')[l].innerText.indexOf("League average (home goals per match) ") != -1) {
//                                     var average14 = html.querySelectorAll('.trow3 td:first-child')[l] || 0;
//                                     var average14Val = parseFloat(average14.parentElement.previousElementSibling.lastElementChild.innerText);
//                                 } else if (html.querySelectorAll('.trow3 td:first-child')[l].innerText.indexOf("League average (away goals per match) ") != -1) {

//                                     var average23 = html.querySelectorAll('.trow3 td:first-child')[l] || 0;
//                                     var average23Val = parseFloat(average23.parentElement.previousElementSibling.lastElementChild.innerText);

//                                     if (average14Val >= hightScore.average14_koeficient && average23Val >= hightScore.average23_koeficient) {
//                                         Loop4: for (var k = 0; k < html.querySelectorAll('.trow2 td').length; k++) {
//                                             if (html.querySelectorAll('.trow2 td')[k].innerText.indexOf("Scored+conc. per match") != -1) {
//                                                 var scoredConc = html.querySelectorAll('.trow2 td')[k];
//                                                 var scoredConcHome = scoredConc.previousSibling.previousSibling.innerText;
//                                                 var scoredConcHomeTotal = scoredConc.previousSibling.innerText;
//                                                 var cscoredConcAway = scoredConc.nextSibling.nextSibling.innerText;
//                                                 var cscoredConcAwayTotal = scoredConc.nextSibling.innerText;
//                                             }
//                                         }
//                                         var goalsScored_TR = $(scoredConc).closest('tr').prev().prev().prev();
//                                         var goalsConceded_TR = $(scoredConc).closest('tr').prev();

//                                         var totalScored_Home = parseFloat(goalsScored_TR.find('td:first-child b').text());
//                                         var totalScored_Away = parseFloat(goalsScored_TR.find('td:last-child b').text());
//                                         var totalConceded_Away = parseFloat(goalsConceded_TR.find('td:last-child b').text());
//                                         var totalConceded_Home = parseFloat(goalsConceded_TR.find('td:first-child b').text());

//                                         var last4MatchesTable = $(html).contents().find('.six.columns table tr td span a').closest('table').prev()[1];
//                                         var last4MatchesTable_TR = $(last4MatchesTable).find('tr');

//                                         if (last4MatchesTable_TR.length === 4 && last4MatchesTable_TR.last().find('td').length === 7) {
//                                             if (last4MatchesTable_TR.last().find('td:nth-child(2)').text() !== " ") {

//                                                 var averageGoals = calculateAverageGoals(last4MatchesTable_TR, totalScored_Home, totalConceded_Away, totalConceded_Home, totalScored_Away);

//                                                 if (!averageGoals) {
//                                                     continue Loop3;
//                                                 }

//                                                 var positionInTable =  getPositionInTable(html);
//                                                 var average14Val_4last = (averageGoals.averageScored_Home_4_match + averageGoals.averageConceded_Away_4_match) / 2;

//                                                 if (average14Val_4last >= hightScore.average14_4last_koeficient) {
//                                                     console.log('Liga:' + league.toUpperCase() + ': ' + homeTeam + ' vs ' + awayTeam);
//                                                     console.log('Domáci tím pozícia v tabuľke:    ' + positionInTable.home + ' / ' + positionInTable.all)
//                                                     console.log('Hosťujúci tím pozícia v tabuľke: ' + positionInTable.away + ' / ' + positionInTable.all)
//                                                     if(cleanSheetsHome <= 25){
//                                                         console.log("%c Čisté konto domáci tím doma:     " + cleanSheetsHome + '%', 'background: green; color: white; display: block;')
//                                                     } else if (cleanSheetsHome > 25 && cleanSheetsHome < 40) {
//                                                         console.log("%c Čisté konto domáci tím doma:     " + cleanSheetsHome + '%', 'background: yellow; color: black; display: block;')
//                                                     } else {
//                                                         console.log("%c Čisté konto domáci tím doma:     " + cleanSheetsHome + '%', 'background: red; color: white; display: block;')
//                                                     }
    
//                                                     if(cleanSheetsAway <= 25){
//                                                         console.log("%c Čisté konto hosťujúci tím vonku: " + cleanSheetsAway + '%', 'background: green; color: white; display: block;')
//                                                     } else if (cleanSheetsAway > 25 && cleanSheetsAway < 40) {
//                                                         console.log("%c Čisté konto hosťujúci tím vonku: " + cleanSheetsAway + '%', 'background: yellow; color: black; display: block;')
//                                                     } else {
//                                                         console.log("%c Čisté konto hosťujúci tím vonku: " + cleanSheetsAway + '%', 'background: red; color: white; display: block;')
//                                                     }
//                                                     console.log('Average(1)&(4) 4-match/total:    ' + average14Val_4last + ' / ' + average14Val)
//                                                     console.log('Average(2)&(3):                  ' + (averageGoals.averageConceded_Home + averageGoals.averageScored_Away) / 2 )
                                                    
//                                                     if(probabilityBy_Vincent >= 2){
//                                                         console.log('%c probabilityBy_Vincent:           ' + probabilityBy_Vincent, 'background: green; color: white; display: block;')
//                                                     } else if (probabilityBy_Vincent > 0 && probabilityBy_Vincent < 2) {
//                                                         console.log('%c probabilityBy_Vincent:           ' + probabilityBy_Vincent, 'background: yellow; color: black; display: block;')
//                                                     } else {
//                                                         console.log('%c probabilityBy_Vincent:           ' + probabilityBy_Vincent, 'background: red; color: white; display: block;')
//                                                     }
    
//                                                     if(averageGoals.averageTotalScored_Home >= 1.5){
//                                                         console.log('%c Domáci tím strelené góly Doma 4-match/total:       ' + averageGoals.averageScored_Home_4_match + ' / ' + averageGoals.averageTotalScored_Home , 'background: green; color: white; font-weight: bold; display: block;')
//                                                     } else if (averageGoals.averageTotalScored_Home >= 1.2 && averageGoals.averageTotalScored_Home < 1.5) {
//                                                         console.log('%c Domáci tím strelené góly Doma 4-match/total:       ' + averageGoals.averageScored_Home_4_match + ' / ' + averageGoals.averageTotalScored_Home , 'background: yellow; color: black; font-weight: bold; display: block;')
//                                                     } else {
//                                                         console.log('%c Domáci tím strelené góly Doma 4-match/total:       ' + averageGoals.averageScored_Home_4_match + ' / ' + averageGoals.averageTotalScored_Home , 'background: red; color: white; font-weight: bold; display: block;')
//                                                     }
                                                    
//                                                     console.log('Hosťujúci tím inkasované góly Vonku 4-match/total: ' + averageGoals.averageConceded_Away_4_match + ' / ' + averageGoals.averageTotalConceded_Away)
                                                    
//                                                     if(averageGoals.averageTotalScored_Away >= 1.35){
//                                                         console.log('%c Hosťujúci tím strelené góly Vonku 4-match/total:   ' + averageGoals.averageScored_Away_4_match + ' / ' + averageGoals.averageTotalScored_Away , 'background: green; color: white; font-weight: bold; display: block;')
//                                                     } else if (averageGoals.averageTotalScored_Away >= 1.1 && averageGoals.averageTotalScored_Away < 1.35) {
//                                                         console.log('%c Hosťujúci tím strelené góly Vonku 4-match/total:   ' + averageGoals.averageScored_Away_4_match + ' / ' + averageGoals.averageTotalScored_Away , 'background: yellow; color: black; font-weight: bold; display: block;')
//                                                     } else {
//                                                         console.log('%c Hosťujúci tím strelené góly Vonku 4-match/total:   ' + averageGoals.averageScored_Away_4_match + ' / ' + averageGoals.averageTotalScored_Away , 'background: red; color: white; font-weight: bold; display: block;')
//                                                     }
//                                                     console.log('Domáci tím inkasované góly Doma 4-match/total:     ' + averageGoals.averageConceded_Home_4_match + ' / ' + averageGoals.averageTotalConceded_Home);
//                                                     console.log('==================================================================================================================================================================================');
//                                                 }
//                                             }
//                                         }
//                                         continue Loop3;
//                                     }
//                                 }
//                             }
//                         } else {
//                             break;
//                         }
//                     }
//                 }
//             }).catch(function (err) {
//                 console.log(err);
//                 if (err.status === 404) {
//                     console.log(top.soccerUrl);
//                 }
//             });
//         }
//     }
// }

function underGoalPrediction(allLinks) {

    var filterDataBy_Yuvalfra = yuvalfra_Strategy_under(allLinks);
    var filterDataBy_johnHaighsTable = johnHaighsTable_Strategy_under(allLinks);
    var startMatch_ELEMENT = $(allLinks).closest('tr').find('td[align="center"] > font');

    Loop1: // The first for loop is labeled "Loop1"
    for (var j = 0; j < allLinks.length; j++) {

        var statsHref = filterDataBy_Yuvalfra[j].getAttribute("href");
        var decodeStatsHref = decodeURI(statsHref);

        if (statsHref != null) {
            getData('GET', 'https://www.soccerstats.com/' + decodeStatsHref).then(function (data) {
                top.soccerUrl = data.URL;
                var html = data;
                var cleanSheetsHome, cleanSheetsAway, homeTeam, awayTeam, league;
                Loop2: // The second for loop is labeled "Loop2"
                for (var i = 0; i < html.querySelectorAll('.trow3 td').length; i++) {
                    if (html.querySelectorAll('.trow3 td')[i].innerText.indexOf("Clean sheets") != -1) {
                        var cleanSheets = html.querySelectorAll('.trow3 td')[i];
                        cleanSheetsHome = parseFloat(cleanSheets.previousSibling.previousSibling.innerText);
                        cleanSheetsAway = parseFloat(cleanSheets.nextSibling.nextSibling.innerText);
                        league = decodeURI(html.URL).split('?')[1].split('=')[1].split('&')[0];
                        homeTeam = decodeURI(html.URL).split('stats')[decodeURI(html.URL).split('stats').length - 1].split('-vs-')[0];
                        awayTeam = decodeURI(html.URL).split('stats')[decodeURI(html.URL).split('stats').length - 1].split('-vs-')[1];

                        var lastMatchesTable = $(html).contents().find('.six.columns table tr td span a').closest('table').prev()[0]
                        var lastMatchesTable_Rows = $(lastMatchesTable).find('tr');

                        var probabilityBy_Vincent = vincent_Strategy(lastMatchesTable_Rows);
                        if (probabilityBy_Vincent <= hightScore.vincent_Scale_koeficient_under) {
                            if (cleanSheetsHome <= 30 || cleanSheetsAway <= 30 || Math.abs(cleanSheetsAway - cleanSheetsHome) > 40) {
                                return false;
                            }

                            Loop3: for (var l = 0; l < html.querySelectorAll('.trow3 td:first-child').length; l++) {
                                if (html.querySelectorAll('.trow3 td:first-child')[l].innerText.indexOf("League average (home goals per match) ") != -1) {
                                    var average14 = html.querySelectorAll('.trow3 td:first-child')[l] || 0;
                                    var average14Val = parseFloat(average14.parentElement.previousElementSibling.lastElementChild.innerText);
                                } else if (html.querySelectorAll('.trow3 td:first-child')[l].innerText.indexOf("League average (away goals per match) ") != -1) {

                                    var average23 = html.querySelectorAll('.trow3 td:first-child')[l] || 0;
                                    var average23Val = parseFloat(average23.parentElement.previousElementSibling.lastElementChild.innerText);

                                    if (Math.abs(average23Val - average14Val) <= 0.25 && average14Val <= hightScore.average14_koeficient) {
                                        Loop4: for (var k = 0; k < html.querySelectorAll('.trow2 td').length; k++) {
                                            if (html.querySelectorAll('.trow2 td')[k].innerText.indexOf("Scored+conc. per match") != -1) {
                                                var scoredConc = html.querySelectorAll('.trow2 td')[k];
                                                var scoredConcHome = scoredConc.previousSibling.previousSibling.innerText;
                                                var scoredConcHomeTotal = scoredConc.previousSibling.innerText;
                                                var cscoredConcAway = scoredConc.nextSibling.nextSibling.innerText;
                                                var cscoredConcAwayTotal = scoredConc.nextSibling.innerText;
                                            }
                                        }
                                        var goalsScored_TR = $(scoredConc).closest('tr').prev().prev().prev();
                                        var goalsConceded_TR = $(scoredConc).closest('tr').prev();

                                        var totalScored_Home = parseFloat(goalsScored_TR.find('td:first-child b').text());
                                        var totalScored_Away = parseFloat(goalsScored_TR.find('td:last-child b').text());
                                        var totalConceded_Away = parseFloat(goalsConceded_TR.find('td:last-child b').text());
                                        var totalConceded_Home = parseFloat(goalsConceded_TR.find('td:first-child b').text());

                                        var last4MatchesTable = $(html).contents().find('.six.columns table tr td span a').closest('table').prev()[1];
                                        var last4MatchesTable_TR = $(last4MatchesTable).find('tr');

                                        if (last4MatchesTable_TR.length === 4 && last4MatchesTable_TR.last().find('td').length === 7) {
                                            if (last4MatchesTable_TR.last().find('td:nth-child(2)').text() !== " ") {

                                                var averageGoals = calculateAverageGoals(last4MatchesTable_TR, totalScored_Home, totalConceded_Away, totalConceded_Home, totalScored_Away);

                                                if (!averageGoals) {
                                                    continue Loop3;
                                                }
                                                var positionInTable =  getPositionInTable(html);
                                                var average14Val_4last = (averageGoals.averageScored_Home_4_match + averageGoals.averageConceded_Away_4_match) / 2;

                                                if (Math.abs(averageGoals.averageScored_Home_4_match - averageGoals.averageTotalScored_Home) < 0.3 && average14Val_4last <= hightScore.average14_4last_koeficient) {

                                                    console.log('Liga:' + league.toUpperCase() + ': ' + homeTeam + ' vs ' + awayTeam);
                                                    console.log('Domáci tím pozícia v tabuľke:    ' + positionInTable.home + ' / ' + positionInTable.all)
                                                    console.log('Hosťujúci tím pozícia v tabuľke: ' + positionInTable.away + ' / ' + positionInTable.all)
                                                    if(cleanSheetsHome <= 25){
                                                        console.log("%c Čisté konto domáci tím doma:     " + cleanSheetsHome + '%', 'background: green; color: white; display: block;')
                                                    } else if (cleanSheetsHome > 25 && cleanSheetsHome < 40) {
                                                        console.log("%c Čisté konto domáci tím doma:     " + cleanSheetsHome + '%', 'background: yellow; color: black; display: block;')
                                                    } else {
                                                        console.log("%c Čisté konto domáci tím doma:     " + cleanSheetsHome + '%', 'background: red; color: white; display: block;')
                                                    }
    
                                                    if(cleanSheetsAway <= 25){
                                                        console.log("%c Čisté konto hosťujúci tím vonku: " + cleanSheetsAway + '%', 'background: green; color: white; display: block;')
                                                    } else if (cleanSheetsAway > 25 && cleanSheetsAway < 40) {
                                                        console.log("%c Čisté konto hosťujúci tím vonku: " + cleanSheetsAway + '%', 'background: yellow; color: black; display: block;')
                                                    } else {
                                                        console.log("%c Čisté konto hosťujúci tím vonku: " + cleanSheetsAway + '%', 'background: red; color: white; display: block;')
                                                    }
                                                    console.log('Average(1)&(4) 4-match/total:    ' + average14Val_4last + ' / ' + average14Val)
                                                    console.log('Average(2)&(3):                  ' + (averageGoals.averageConceded_Home + averageGoals.averageScored_Away) / 2 )
                                                    
                                                    if(probabilityBy_Vincent >= 2){
                                                        console.log('%c probabilityBy_Vincent:           ' + probabilityBy_Vincent, 'background: green; color: white; display: block;')
                                                    } else if (probabilityBy_Vincent > 0 && probabilityBy_Vincent < 2) {
                                                        console.log('%c probabilityBy_Vincent:           ' + probabilityBy_Vincent, 'background: yellow; color: black; display: block;')
                                                    } else {
                                                        console.log('%c probabilityBy_Vincent:           ' + probabilityBy_Vincent, 'background: red; color: white; display: block;')
                                                    }
    
                                                    if(averageGoals.averageTotalScored_Home >= 1.5){
                                                        console.log('%c Domáci tím strelené góly Doma 4-match/total:       ' + averageGoals.averageScored_Home_4_match + ' / ' + averageGoals.averageTotalScored_Home , 'background: green; color: white; font-weight: bold; display: block;')
                                                    } else if (averageGoals.averageTotalScored_Home >= 1.2 && averageGoals.averageTotalScored_Home < 1.5) {
                                                        console.log('%c Domáci tím strelené góly Doma 4-match/total:       ' + averageGoals.averageScored_Home_4_match + ' / ' + averageGoals.averageTotalScored_Home , 'background: yellow; color: black; font-weight: bold; display: block;')
                                                    } else {
                                                        console.log('%c Domáci tím strelené góly Doma 4-match/total:       ' + averageGoals.averageScored_Home_4_match + ' / ' + averageGoals.averageTotalScored_Home , 'background: red; color: white; font-weight: bold; display: block;')
                                                    }
                                                    
                                                    console.log('Hosťujúci tím inkasované góly Vonku 4-match/total: ' + averageGoals.averageConceded_Away_4_match + ' / ' + averageGoals.averageTotalConceded_Away)
                                                    
                                                    if(averageGoals.averageTotalScored_Away >= 1.35){
                                                        console.log('%c Hosťujúci tím strelené góly Vonku 4-match/total:   ' + averageGoals.averageScored_Away_4_match + ' / ' + averageGoals.averageTotalScored_Away , 'background: green; color: white; font-weight: bold; display: block;')
                                                    } else if (averageGoals.averageTotalScored_Away >= 1.1 && averageGoals.averageTotalScored_Away < 1.35) {
                                                        console.log('%c Hosťujúci tím strelené góly Vonku 4-match/total:   ' + averageGoals.averageScored_Away_4_match + ' / ' + averageGoals.averageTotalScored_Away , 'background: yellow; color: black; font-weight: bold; display: block;')
                                                    } else {
                                                        console.log('%c Hosťujúci tím strelené góly Vonku 4-match/total:   ' + averageGoals.averageScored_Away_4_match + ' / ' + averageGoals.averageTotalScored_Away , 'background: red; color: white; font-weight: bold; display: block;')
                                                    }
                                                    console.log('Domáci tím inkasované góly Doma 4-match/total:     ' + averageGoals.averageConceded_Home_4_match + ' / ' + averageGoals.averageTotalConceded_Home);
                                                    console.log('==================================================================================================================================================================================');
                                                    
                                                }
                                            }
                                        }
                                        continue Loop3;
                                    }
                                }
                            }
                        } else {
                            break;
                        }
                    }
                }
            }).catch(function (err) {
                console.log(err);
                if (err.status === 404) {
                    console.log(top.soccerUrl);
                }
            });
        }
    }
}

function homeTeamWinPrediction(allLinks) {

    var filterData_HomeTeamFavorits = homeTeamFavorits_Filter(allLinks);
    var startMatch_ELEMENT = $(allLinks).closest('tr').find('td[align="center"] > font');

    Loop1: // The first for loop is labeled "Loop1"
    for (var j = 0; j < filterData_HomeTeamFavorits.length; j++) {

        var statsHref = filterData_HomeTeamFavorits[j].getAttribute("href");
        var decodeStatsHref = decodeURI(statsHref);

        if (statsHref != null) {
            getData('GET', 'https://www.soccerstats.com/' + decodeStatsHref).then(function (data) {
                top.soccerUrl = data.URL;
                var html = data;
                var cleanSheetsHome, cleanSheetsAway, homeTeam, awayTeam, league;
                Loop2: // The second for loop is labeled "Loop2"
                for (var i = 0; i < html.querySelectorAll('.trow3 td').length; i++) {
                    if (html.querySelectorAll('.trow3 td')[i].innerText.indexOf("Clean sheets") != -1) {
                        var cleanSheets = html.querySelectorAll('.trow3 td')[i];
                        cleanSheetsHome = parseFloat(cleanSheets.previousSibling.previousSibling.innerText);
                        cleanSheetsAway = parseFloat(cleanSheets.nextSibling.nextSibling.innerText);
                        league = decodeURI(html.URL).split('?')[1].split('=')[1].split('&')[0];
                        homeTeam = decodeURI(html.URL).split('stats')[decodeURI(html.URL).split('stats').length - 1].split('-vs-')[0];
                        awayTeam = decodeURI(html.URL).split('stats')[decodeURI(html.URL).split('stats').length - 1].split('-vs-')[1];

                        if (cleanSheetsHome >= 35 && Math.abs(cleanSheetsAway - cleanSheetsHome) >= 10) {
                            Loop3: for (var l = 0; l < html.querySelectorAll('.trow3 td:first-child').length; l++) {
                                if (html.querySelectorAll('.trow3 td:first-child')[l].innerText.indexOf("League average (home goals per match) ") != -1) {
                                    var average14 = html.querySelectorAll('.trow3 td:first-child')[l] || 0;
                                    var average14Val = parseFloat(average14.parentElement.previousElementSibling.lastElementChild.innerText);
                                } else if (html.querySelectorAll('.trow3 td:first-child')[l].innerText.indexOf("League average (away goals per match) ") != -1) {

                                    var average23 = html.querySelectorAll('.trow3 td:first-child')[l] || 0;
                                    var average23Val = parseFloat(average23.parentElement.previousElementSibling.lastElementChild.innerText);

                                    if (average14Val >= 0) {
                                        Loop4: for (var k = 0; k < html.querySelectorAll('.trow2 td').length; k++) {
                                            if (html.querySelectorAll('.trow2 td')[k].innerText.indexOf("Scored+conc. per match") != -1) {
                                                var scoredConc = html.querySelectorAll('.trow2 td')[k];
                                                var scoredConcHome = scoredConc.previousSibling.previousSibling.innerText;
                                                var scoredConcHomeTotal = scoredConc.previousSibling.innerText;
                                                var cscoredConcAway = scoredConc.nextSibling.nextSibling.innerText;
                                                var cscoredConcAwayTotal = scoredConc.nextSibling.innerText;
                                            }
                                        }
                                        var goalsScored_TR = $(scoredConc).closest('tr').prev().prev().prev();
                                        var goalsConceded_TR = $(scoredConc).closest('tr').prev();

                                        var totalScored_Home = parseFloat(goalsScored_TR.find('td:first-child b').text());
                                        var totalScored_Away = parseFloat(goalsScored_TR.find('td:last-child b').text());
                                        var totalConceded_Away = parseFloat(goalsConceded_TR.find('td:last-child b').text());
                                        var totalConceded_Home = parseFloat(goalsConceded_TR.find('td:first-child b').text());

                                        var last4MatchesTable = $(html).contents().find('.six.columns table tr td span a').closest('table').prev()[1];
                                        var last4MatchesTable_TR = $(last4MatchesTable).find('tr');

                                        if (last4MatchesTable_TR.length === 4 && last4MatchesTable_TR.last().find('td').length === 7) {
                                            if (last4MatchesTable_TR.last().find('td:nth-child(2)').text() !== " ") {

                                                var averageGoals = calculateAverageGoals(last4MatchesTable_TR, totalScored_Home, totalConceded_Away, totalConceded_Home, totalScored_Away);

                                                if (!averageGoals) {
                                                    continue Loop3;
                                                }
                                                var positionInTable =  getPositionInTable(html);
                                                var average14Val_4last = (averageGoals.averageScored_Home_4_match + averageGoals.averageConceded_Away_4_match) / 2;
                                                var average23Val_4last = (averageGoals.averageScored_Away_4_match + averageGoals.averageConceded_Home_4_match) / 2;

                                                if (average14Val_4last >= hightScore.average14_4last_koeficient) {
                                                    console.log('Liga:' + league.toUpperCase() + ': ' + homeTeam + ' vs ' + awayTeam);
                                                    console.log('Domáci tím pozícia v tabuľke:    ' + positionInTable.home)
                                                    console.log('Hosťujúci tím pozícia v tabuľke: ' + positionInTable.away)
                                                    console.log("Čisté konto domáci tím doma:     " + cleanSheetsHome + '%')
                                                    console.log("Čisté konto hosťujúci tím vonku: " + cleanSheetsAway + '%')
                                                    console.log('Average(1)&(4) 4-match/total:    ' + average14Val_4last + ' / ' + average14Val)
                                                    console.log('Average(2)&(3):                  ' + average23Val_4last)
                                                    console.log('Domáci tím strelené góly Doma 4-match/total:       ' + averageGoals.averageScored_Home_4_match + ' / ' + averageGoals.averageTotalScored_Home)
                                                    console.log('Hosťujúci tím inkasované góly Vonku 4-match/total: ' + averageGoals.averageConceded_Away_4_match + ' / ' + averageGoals.averageTotalConceded_Away)
                                                    console.log('Hosťujúci tím strelené góly Vonku 4-match/total:   ' + averageGoals.averageScored_Away_4_match + ' / ' + averageGoals.averageTotalScored_Away)
                                                    console.log('Domáci tím inkasované góly Doma 4-match/total:     ' + averageGoals.averageConceded_Home_4_match + ' / ' + averageGoals.averageTotalConceded_Home);
                                                    console.log('==================================================================================================================================================================================');
                                                }
                                            }
                                        }
                                        continue Loop3;
                                    }
                                }
                            }
                        } else {
                            break;
                        }
                    }
                }
            }).catch(function (err) {
                console.log(err);
                if (err.status === 404) {
                    console.log(top.soccerUrl);
                }
            });
        }
    }
}

function awayTeamScorePrediction(allLinks) {

    var filterData_AwayTeamFavorits = awayTeamFavorits_Filter(allLinks);
    var startMatch_ELEMENT = $(allLinks).closest('tr').find('td[align="center"] > font');

    Loop1: // The first for loop is labeled "Loop1"
    for (var j = 0; j < filterData_AwayTeamFavorits.length; j++) {

        var statsHref = filterData_AwayTeamFavorits[j].getAttribute("href");
        var decodeStatsHref = decodeURI(statsHref);

        if (statsHref != null) {
            getData('GET', 'https://www.soccerstats.com/' + decodeStatsHref).then(function (data) {
                top.soccerUrl = data.URL;
                var html = data;
                var cleanSheetsHome, cleanSheetsAway, homeTeam, awayTeam, league;
                Loop2: // The second for loop is labeled "Loop2"
                for (var i = 0; i < html.querySelectorAll('.trow3 td').length; i++) {
                    if (html.querySelectorAll('.trow3 td')[i].innerText.indexOf("Clean sheets") != -1) {
                        var cleanSheets = html.querySelectorAll('.trow3 td')[i];
                        cleanSheetsHome = parseFloat(cleanSheets.previousSibling.previousSibling.innerText);
                        cleanSheetsAway = parseFloat(cleanSheets.nextSibling.nextSibling.innerText);
                        league = decodeURI(html.URL).split('?')[1].split('=')[1].split('&')[0];
                        homeTeam = decodeURI(html.URL).split('stats')[decodeURI(html.URL).split('stats').length - 1].split('-vs-')[0];
                        awayTeam = decodeURI(html.URL).split('stats')[decodeURI(html.URL).split('stats').length - 1].split('-vs-')[1];

                        if (cleanSheetsHome <= 40) {
                            Loop3: for (var l = 0; l < html.querySelectorAll('.trow3 td:first-child').length; l++) {
                                if (html.querySelectorAll('.trow3 td:first-child')[l].innerText.indexOf("League average (home goals per match) ") != -1) {
                                    var average14 = html.querySelectorAll('.trow3 td:first-child')[l] || 0;
                                    var average14Val = parseFloat(average14.parentElement.previousElementSibling.lastElementChild.innerText);
                                } else if (html.querySelectorAll('.trow3 td:first-child')[l].innerText.indexOf("League average (away goals per match) ") != -1) {

                                    var average23 = html.querySelectorAll('.trow3 td:first-child')[l] || 0;
                                    var average23Val = parseFloat(average23.parentElement.previousElementSibling.lastElementChild.innerText);

                                    if (average23Val >= 0) {
                                        Loop4: for (var k = 0; k < html.querySelectorAll('.trow2 td').length; k++) {
                                            if (html.querySelectorAll('.trow2 td')[k].innerText.indexOf("Scored+conc. per match") != -1) {
                                                var scoredConc = html.querySelectorAll('.trow2 td')[k];
                                                var scoredConcHome = scoredConc.previousSibling.previousSibling.innerText;
                                                var scoredConcHomeTotal = scoredConc.previousSibling.innerText;
                                                var cscoredConcAway = scoredConc.nextSibling.nextSibling.innerText;
                                                var cscoredConcAwayTotal = scoredConc.nextSibling.innerText;
                                            }
                                        }
                                        var goalsScored_TR = $(scoredConc).closest('tr').prev().prev().prev();
                                        var goalsConceded_TR = $(scoredConc).closest('tr').prev();

                                        var totalScored_Home = parseFloat(goalsScored_TR.find('td:first-child b').text());
                                        var totalScored_Away = parseFloat(goalsScored_TR.find('td:last-child b').text());
                                        var totalConceded_Away = parseFloat(goalsConceded_TR.find('td:last-child b').text());
                                        var totalConceded_Home = parseFloat(goalsConceded_TR.find('td:first-child b').text());

                                        var last4MatchesTable = $(html).contents().find('.six.columns table tr td span a').closest('table').prev()[1];
                                        var last4MatchesTable_TR = $(last4MatchesTable).find('tr');

                                        if (last4MatchesTable_TR.length === 4 && last4MatchesTable_TR.last().find('td').length === 7) {
                                            if (last4MatchesTable_TR.last().find('td:nth-child(2)').text() !== " ") {

                                                var averageGoals = calculateAverageGoals(last4MatchesTable_TR, totalScored_Home, totalConceded_Away, totalConceded_Home, totalScored_Away);

                                                if (!averageGoals) {
                                                    continue Loop3;
                                                }

                                                var average23Val_4last = (averageGoals.averageScored_Away_4_match + averageGoals.averageConceded_Home_4_match) / 2;
                                                var average14Val_4last = (averageGoals.averageScored_Home_4_match + averageGoals.averageConceded_Away_4_match) / 2;
                                                var isGreatFormAwayTeam = averageGoals.averageScored_Away_4_match - averageGoals.averageTotalScored_Away <= -0.4 ? true : false;
                                                var scoredAway_4_match = averageGoals.averageScored_Away_4_match,
                                                    totalScored_Away = averageGoals.averageTotalScored_Away;
                                                var scoredHome_4_match = averageGoals.averageScored_Home_4_match,
                                                    totalScored_Home = averageGoals.averageTotalScored_Home;


                                                if (scoredAway_4_match < totalScored_Away) {
                                                    var checkFormAwayTeam = Math.abs(totalScored_Away * 100 - scoredAway_4_match * 100) / totalScored_Away;
                                                    if (checkFormAwayTeam >= 15) {
                                                        continue Loop3;
                                                    }
                                                }
                                                var positionInTable =  getPositionInTable(html);

                                                if (average23Val_4last >= hightScore.average23_4last_koeficient) {
                                                    console.log('Liga:' + league.toUpperCase() + ': ' + homeTeam + ' vs ' + awayTeam);
                                                    console.log('Domáci tím pozícia v tabuľke:    ' + positionInTable.home)
                                                    console.log('Hosťujúci tím pozícia v tabuľke: ' + positionInTable.away)
                                                    console.log("Čisté konto domáci tím doma:     " + cleanSheetsHome + '%')
                                                    console.log("Čisté konto hosťujúci tím vonku: " + cleanSheetsAway + '%')
                                                    console.log('Average(1)&(4) 4-match/total:    ' + average14Val_4last + ' / ' + average14Val)
                                                    console.log('Average(2)&(3):                  ' + (averageGoals.averageConceded_Home + averageGoals.averageScored_Away) / 2 )
                                                    console.log('Domáci tím strelené góly Doma 4-match/total:       ' + averageGoals.averageScored_Home_4_match + ' / ' + averageGoals.averageTotalScored_Home)
                                                    console.log('Hosťujúci tím inkasované góly Vonku 4-match/total: ' + averageGoals.averageConceded_Away_4_match + ' / ' + averageGoals.averageTotalConceded_Away)
                                                    console.log('Hosťujúci tím strelené góly Vonku 4-match/total:   ' + averageGoals.averageScored_Away_4_match + ' / ' + averageGoals.averageTotalScored_Away)
                                                    console.log('Domáci tím inkasované góly Doma 4-match/total:     ' + averageGoals.averageConceded_Home_4_match + ' / ' + averageGoals.averageTotalConceded_Home);
                                                    console.log('==================================================================================================================================================================================');
                                                }
                                            }
                                        }
                                        continue Loop3;
                                    }
                                }
                            }
                        } else {
                            break;
                        }
                    }
                }
            }).catch(function (err) {
                console.log(err);
                if (err.status === 404) {
                    console.log(top.soccerUrl);
                }
            });
        }
    }
}

function goalPrediction(allLinks) {

    //var filterDataBy_Yuvalfra = yuvalfra_Strategy(allLinks);
    //var filterDataBy_johnHaighsTable = johnHaighsTable_Strategy(filterDataBy_Yuvalfra);
    //var startMatch_ELEMENT = $(allLinks).closest('tr').find('td[align="center"] > font');

    Loop1: // The first for loop is labeled "Loop1"
    for (var j = 0; j < allLinks.length; j++) {

        var statsHref = allLinks[j].getAttribute("href");
        var decodeStatsHref = decodeURI(statsHref);

        if (statsHref != null) {
            getData('GET', 'https://www.soccerstats.com/' + decodeStatsHref).then(function (data) {
                top.soccerUrl = data.URL;
                var html = data;
                var cleanSheetsHome, cleanSheetsAway, homeTeam, awayTeam, league;
                Loop2: // The second for loop is labeled "Loop2"
                for (var i = 0; i < html.querySelectorAll('.trow3 td').length; i++) {
                    if (html.querySelectorAll('.trow3 td')[i].innerText.indexOf("Clean sheets") != -1) {
                        var cleanSheets = html.querySelectorAll('.trow3 td')[i];
                        cleanSheetsHome = parseFloat(cleanSheets.previousSibling.previousSibling.innerText);
                        cleanSheetsAway = parseFloat(cleanSheets.nextSibling.nextSibling.innerText);
                        league = decodeURI(html.URL).split('?')[1].split('=')[1].split('&')[0];
                        homeTeam = decodeURI(html.URL).split('stats')[decodeURI(html.URL).split('stats').length - 1].split('-vs-')[0];
                        awayTeam = decodeURI(html.URL).split('stats')[decodeURI(html.URL).split('stats').length - 1].split('-vs-')[1];

                        var lastMatchesTable = $(html).contents().find('.six.columns table tr td span a').closest('table').prev()[0]
                        var lastMatchesTable_Rows = $(lastMatchesTable).find('tr');

                        var probabilityBy_Vincent = vincent_Strategy(lastMatchesTable_Rows);

                        Loop3: for (var l = 0; l < html.querySelectorAll('.trow3 td:first-child').length; l++) {
                            if (html.querySelectorAll('.trow3 td:first-child')[l].innerText.indexOf("League average (home goals per match) ") != -1) {
                                var average14 = html.querySelectorAll('.trow3 td:first-child')[l] || 0;
                                var average14Val = parseFloat(average14.parentElement.previousElementSibling.lastElementChild.innerText);
                            } else if (html.querySelectorAll('.trow3 td:first-child')[l].innerText.indexOf("League average (away goals per match) ") != -1) {

                                var average23 = html.querySelectorAll('.trow3 td:first-child')[l] || 0;
                                var average23Val = parseFloat(average23.parentElement.previousElementSibling.lastElementChild.innerText);

                                    Loop4: for (var k = 0; k < html.querySelectorAll('.trow2 td').length; k++) {
                                        if (html.querySelectorAll('.trow2 td')[k].innerText.indexOf("Scored+conc. per match") != -1) {
                                            var scoredConc = html.querySelectorAll('.trow2 td')[k];
                                            var scoredConcHome = scoredConc.previousSibling.previousSibling.innerText;
                                            var scoredConcHomeTotal = scoredConc.previousSibling.innerText;
                                            var cscoredConcAway = scoredConc.nextSibling.nextSibling.innerText;
                                            var cscoredConcAwayTotal = scoredConc.nextSibling.innerText;
                                        }
                                    }
                                    var goalsScored_TR = $(scoredConc).closest('tr').prev().prev().prev();
                                    var goalsConceded_TR = $(scoredConc).closest('tr').prev();

                                    var totalScored_Home = parseFloat(goalsScored_TR.find('td:first-child b').text());
                                    var totalScored_Away = parseFloat(goalsScored_TR.find('td:last-child b').text());
                                    var totalConceded_Away = parseFloat(goalsConceded_TR.find('td:last-child b').text());
                                    var totalConceded_Home = parseFloat(goalsConceded_TR.find('td:first-child b').text());

                                    var last4MatchesTable = $(html).contents().find('.six.columns table tr td span a').closest('table').prev()[1];
                                    var last4MatchesTable_TR = $(last4MatchesTable).find('tr');

                                    if (last4MatchesTable_TR.length === 4 && last4MatchesTable_TR.last().find('td').length === 7) {
                                        if (last4MatchesTable_TR.last().find('td:nth-child(2)').text() !== " ") {

                                            var averageGoals = calculateAverageGoals(last4MatchesTable_TR, totalScored_Home, totalConceded_Away, totalConceded_Home, totalScored_Away);

                                            if (!averageGoals) {
                                                continue Loop3;
                                            }

                                            var filterDataBy_Yuvalfra = yuvalfra_StrategyAverage(totalScored_Home, totalConceded_Home, totalScored_Away, totalConceded_Away);
                                            var positionInTable =  getPositionInTable(html);
                                            var average14Val_4last = (averageGoals.averageScored_Home_4_match + averageGoals.averageConceded_Away_4_match) / 2;

                                                console.log('Liga:' + league.toUpperCase() + ': ' + homeTeam + ' vs ' + awayTeam);
                                                console.log('Domáci tím pozícia v tabuľke:    ' + positionInTable.home)
                                                console.log('Hosťujúci tím pozícia v tabuľke: ' + positionInTable.away)
                                                if(cleanSheetsHome <= 25){
                                                    console.log("%c Čisté konto domáci tím doma:     " + cleanSheetsHome + '%', 'background: green; color: white; display: block;')
                                                } else if (cleanSheetsHome > 25 && cleanSheetsHome < 40) {
                                                    console.log("%c Čisté konto domáci tím doma:     " + cleanSheetsHome + '%', 'background: yellow; color: black; display: block;')
                                                } else {
                                                    console.log("%c Čisté konto domáci tím doma:     " + cleanSheetsHome + '%', 'background: red; color: white; display: block;')
                                                }

                                                if(cleanSheetsAway <= 25){
                                                    console.log("%c Čisté konto hosťujúci tím vonku: " + cleanSheetsAway + '%', 'background: green; color: white; display: block;')
                                                } else if (cleanSheetsAway > 25 && cleanSheetsAway < 40) {
                                                    console.log("%c Čisté konto hosťujúci tím vonku: " + cleanSheetsAway + '%', 'background: yellow; color: black; display: block;')
                                                } else {
                                                    console.log("%c Čisté konto hosťujúci tím vonku: " + cleanSheetsAway + '%', 'background: red; color: white; display: block;')
                                                }
                                                console.log('Average(1)&(4) 4-match/total:    ' + average14Val_4last + ' / ' + average14Val)
                                                console.log('Average(2)&(3):                  ' + (averageGoals.averageConceded_Home + averageGoals.averageScored_Away) / 2 )
                                                if(probabilityBy_Vincent >= 2){
                                                    console.log('%c probabilityBy_Vincent:           ' + probabilityBy_Vincent, 'background: green; color: white; display: block;')
                                                } else if (probabilityBy_Vincent > 0 && probabilityBy_Vincent < 2) {
                                                    console.log('%c probabilityBy_Vincent:           ' + probabilityBy_Vincent, 'background: yellow; color: black; display: block;')
                                                } else {
                                                    console.log('%c probabilityBy_Vincent:           ' + probabilityBy_Vincent, 'background: red; color: white; display: block;')
                                                }
                                                if(filterDataBy_Yuvalfra >= 2){
                                                    console.log('%c probabilityBy_Yuvalfra:           ' + filterDataBy_Yuvalfra, 'background: green; color: white; display: block;')
                                                } else if (filterDataBy_Yuvalfra > 0 && filterDataBy_Yuvalfra < 2) {
                                                    console.log('%c probabilityBy_Yuvalfra:           ' + filterDataBy_Yuvalfra, 'background: yellow; color: black; display: block;')
                                                } else {
                                                    console.log('%c probabilityBy_Yuvalfra:           ' + filterDataBy_Yuvalfra, 'background: red; color: white; display: block;')
                                                }

                                                if(averageGoals.averageTotalScored_Home >= 1.5){
                                                    console.log('%c Domáci tím strelené góly Doma 4-match/total:       ' + averageGoals.averageScored_Home_4_match + ' / ' + averageGoals.averageTotalScored_Home , 'background: green; color: white; font-weight: bold; display: block;')
                                                } else if (averageGoals.averageTotalScored_Home >= 1.2 && averageGoals.averageTotalScored_Home < 1.5) {
                                                    console.log('%c Domáci tím strelené góly Doma 4-match/total:       ' + averageGoals.averageScored_Home_4_match + ' / ' + averageGoals.averageTotalScored_Home , 'background: yellow; color: black; font-weight: bold; display: block;')
                                                } else {
                                                    console.log('%c Domáci tím strelené góly Doma 4-match/total:       ' + averageGoals.averageScored_Home_4_match + ' / ' + averageGoals.averageTotalScored_Home , 'background: red; color: white; font-weight: bold; display: block;')
                                                }

                                                console.log('Hosťujúci tím inkasované góly Vonku 4-match/total: ' + averageGoals.averageConceded_Away_4_match + ' / ' + averageGoals.averageTotalConceded_Away)
                                                
                                                if(averageGoals.averageTotalScored_Away >= 1.35){
                                                    console.log('%c Hosťujúci tím strelené góly Vonku 4-match/total:   ' + averageGoals.averageScored_Away_4_match + ' / ' + averageGoals.averageTotalScored_Away , 'background: green; color: white; font-weight: bold; display: block;')
                                                } else if (averageGoals.averageTotalScored_Away >= 1.1 && averageGoals.averageTotalScored_Away < 1.35) {
                                                    console.log('%c Hosťujúci tím strelené góly Vonku 4-match/total:   ' + averageGoals.averageScored_Away_4_match + ' / ' + averageGoals.averageTotalScored_Away , 'background: yellow; color: black; font-weight: bold; display: block;')
                                                } else {
                                                    console.log('%c Hosťujúci tím strelené góly Vonku 4-match/total:   ' + averageGoals.averageScored_Away_4_match + ' / ' + averageGoals.averageTotalScored_Away , 'background: red; color: white; font-weight: bold; display: block;')
                                                }
                                                console.log('Domáci tím inkasované góly Doma 4-match/total:     ' + averageGoals.averageConceded_Home_4_match + ' / ' + averageGoals.averageTotalConceded_Home);
                                                console.log('==================================================================================================================================================================================');
                                        }
                                    }
                                    continue Loop3;
                            }
                        }
                    }
                }
            }).catch(function (err) {
                console.log(err);
                if (err.status === 404) {
                    console.log(top.soccerUrl);
                }
            });
        }
    }
}


/* 
    Get Data Functions
*/ 
function getAllMatchData(matchLink) {

    return new Promise(function (resolve, reject) {

        const statsHref = matchLink.getAttribute("href");
        const decodeStatsHref = decodeURI(statsHref);

        if (statsHref != null) {
            getData('GET', 'https://www.soccerstats.com/' + decodeStatsHref).then(function (html) {
                top.soccerUrl = html.URL;
                
                const teamNames = getNameOfTeams(html.URL);
                const positionInTable = getPositionInTable(html);
                const cleanSheets = getCleanScheets(html.querySelectorAll('.trow3 td'));
                const scoredAndConcededGolas = getScoredAndConcededGolas(html.querySelectorAll('.trow2 td'));

                const lastMatchesTables = $(html).contents().find('.six.columns table tr td span a').closest('table').prev()
                const lastAllMatchesTable_Rows = $(lastMatchesTables[0]).find('tr');
                const lastMatchesCurrentPositionTable_Rows = $(lastMatchesTables[1]).find('tr');
                const last_4_AllMatches = hasTableSufficientNumberOfRows(lastAllMatchesTable_Rows) ? countResultsOfMatchesBothTeams(lastAllMatchesTable_Rows, 4) : null;
                const last_4_MatchesCurrentPosition = hasTableSufficientNumberOfRows(lastMatchesCurrentPositionTable_Rows) ? countResultsOfMatchesBothTeams(lastMatchesCurrentPositionTable_Rows, 4) : null;

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
                    filterDataBy_Yuvalfra: filterDataBy_Yuvalfra,
                    filterDataBy_JohnHaighsTable: filterDataBy_JohnHaighsTable,
                    filterDataBy_Vincent: filterDataBy_Vincent,
                    homeTeamFavorits: homeTeamFavorits,
                    awayTeamFavorits: awayTeamFavorits,
                    priemerStrelenéGóly_Domáci_InkasovaneGóly_Hostia: parseFloat(((scoredAndConcededGolas.homeTeamScored_home + scoredAndConcededGolas.awayTeamConceded_away) / 2).toFixed(2)),
                    priemerStrelenéGóly_posledne4Zapasy_Domáci_InkasovaneGóly_Hostia: parseFloat(((last_4_MatchesCurrentPosition.toCountHomeMatchesReslult.scoredGoalsAverage + last_4_MatchesCurrentPosition.toCountAwayMatchesReslult.concededGoalsAverage) / 2).toFixed(2)),
                    priemerStrelenéGóly_Hostia_InkasovaneGóly_Domáci: parseFloat(((scoredAndConcededGolas.awayTeamScored_away + scoredAndConcededGolas.homeTeamConceded_home) / 2).toFixed(2)),                                        
                    priemerStrelenéGóly_posledne4Zapasy_Hostia_InkasovaneGóly_Domáci: parseFloat(((last_4_MatchesCurrentPosition.toCountAwayMatchesReslult.scoredGoalsAverage + last_4_MatchesCurrentPosition.toCountHomeMatchesReslult.concededGoalsAverage) / 2).toFixed(2)),                    
                    Liga: teamNames.league,
                    Domaci: {
                        nazovTimu: teamNames.homeTeam,
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
                        nazovTimu: teamNames.awayTeam,
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

const getNameOfTeams = (url) => {
    const teams = decodeURI(url).split('stats')[decodeURI(url).split('stats').length - 1].split('-vs-');

    return{
        league: decodeURI(url).split('?')[1].split('=')[1].split('&')[0],
        homeTeam: teams[0].split('2019-')[teams[0].split('2019-').length - 1],
        awayTeam: teams[1],
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
            toCountHomeMatchesReslult: resultOfCountingHomeTeamMatches,
            toCountAwayMatchesReslult: resultOfCountingAwayTeamMatches,
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
        if (rows.last().find('td:nth-child(2)').text() !== " ") {
            return true;
        }
        return false;
    } 
    return false;
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

function startProgressBar(allLinks) {
    $("#myBar").width(0);
    $("#myBar").text(0 + '/' + allLinks);
    $("#myBar").show();
}

function moveProgressBar(i, multiple, allLinks) {
    $("#myBar").width(Math.round((multiple * i) * 100) / 100 + '%')
    $("#myBar").text(i * 1 + '/' + allLinks);
}

function getData(method, url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = "document";
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
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