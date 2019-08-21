let siteStats_1 = [];
let siteStats_x = [];
let siteStats_2 = [];
let allMatchesToday = [];
let allMatchesTodayFiltered = [];
let scibet_MatchData = [];
let zulubet_MatchData = [];
let windrawwin_MatchData = [];
let vitibet_MatchData = [];
let mybet_MatchData = [];
let supatips_MatchData = [];
let footballtips_MatchData = [];
let sportytrader_MatchData = [];
let betensured_MatchData = [];
let olbg_MatchData = [];
let freesupertips_MatchData = [];
let forebet_MatchData = [];
let predictz_MatchData = [];
let statarea_MatchData = [];
let bettingtips1x2_MatchData = [];
let footballpredictionsNet_MatchData = [];
let footballpredictionsCom_MatchData = [];
let tips180_MatchData = [];
let footballbettingtips_MatchData = [];
let footyaccumulators_MatchData = [];
let oddslot_MatchData = [];
let sbat_MatchData = [];
let kickoff_MatchData = [];

let siteStats = [
    {site: 'footballpredictionsCom', url: 'https://footballpredictions.com/footballpredictions/', matches: 0, correctPrediction: 0},
    {site: 'footballpredictionsNet', url: 'https://footballpredictions.net/football-predictions-free-betting-tips', matches: 0, correctPrediction: 0},
    {site: 'bettingtips1x2', url: 'https://bettingtips1x2.com/', matches: 0, correctPrediction: 0},
    {site: 'statarea', url: 'https://www.statarea.com/predictions', matches: 0, correctPrediction: 0},
    {site: 'predictz', url: 'https://www.predictz.com/predictions/', matches: 0, correctPrediction: 0},
    {site: 'forebet', url: 'https://www.forebet.com/en/football-tips-and-predictions-for-today', matches: 0, correctPrediction: 0},
    {site: 'freesupertips', url: 'https://www.freesupertips.com/accumulator-tips/', matches: 0, correctPrediction: 0},
    {site: 'olbg', url: 'https://www.olbg.com/betting-tips/Football/1', matches: 0, correctPrediction: 0},
    {site: 'betensured', url: 'https://www.betensured.com/home', matches: 0, correctPrediction: 0},
    {site: 'sportytrader', url: 'https://www.sportytrader.com/en/betting-tips/football/', matches: 0, correctPrediction: 0},
    {site: 'footballtips', url: 'https://www.footballtips.com/accumulator-tips/', matches: 0, correctPrediction: 0},
    {site: 'supatips', url: 'https://www.supatips.com/', matches: 0, correctPrediction: 0},
    {site: 'mybet.tips', url: 'https://mybet.tips/soccer/predictions/', matches: 0, correctPrediction: 0},
    {site: 'vitibet', url: 'http://www.vitibet.com/freevitibettips.php', matches: 0, correctPrediction: 0},
    {site: 'windrawwin', url: 'https://www.windrawwin.com/predictions/today/simple/all-games/all-stakes/all-venues/', matches: 0, correctPrediction: 0},
    {site: 'zulubet', url: 'http://www.zulubet.com/', matches: 0, correctPrediction: 0},
    {site: 'scibet', url: 'https://www.scibet.com/', matches: 0, correctPrediction: 0},
    {site: 'tips180', url: 'https://www.tips180.com', matches: 0, correctPrediction: 0},
    {site: 'footballbettingtips', url: 'https://footballbettingtips.org/tips/2019-08-19.html', matches: 0, correctPrediction: 0},
    {site: 'footyaccumulators', url: 'https://footyaccumulators.com/football-tips', matches: 0, correctPrediction: 0},
    {site: 'oddslot', url: 'https://oddslot.com/odds/', matches: 0, correctPrediction: 0},
    {site: 'sbat', url: 'https://www.sbat.com/tips/free-football-betting-tips', matches: 0, correctPrediction: 0},
    {site: 'kickoff', url: 'https://www.kickoff.co.uk/acca-smacker/', matches: 0, correctPrediction: 0},
]

$(function(){
    $( "#datepicker" ).datepicker({ dateFormat: 'dd.mm.yy' });

    siteStats_1 =  getDataFromLocalStorage('SiteStats' + '_' + '1');
    siteStats_x =  getDataFromLocalStorage('SiteStats' + '_' + 'x');
    siteStats_2 =  getDataFromLocalStorage('SiteStats' + '_' + '2');

    getAllMatchData('https://www.betexplorer.com/next/soccer/').then(function (html) {

        let matchData;
        const matches = $(html).contents().find('.table-main tbody .table-main__tt').closest('tr');
        for (let i = 0; i < matches.length; i++) { 
            matchData = {
                website: 'betexplorer',
                matchTime: $(matches[i]).find('.table-main__tt .table-main__time').text(),
                league: $(matches[i]).closest('tbody').find('.js-tournament th').text(),
                homeTeam: $(matches[i]).find('.table-main__tt a').text().split(' - ')[0].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                awayTeam: $(matches[i]).find('.table-main__tt a').text().split(' - ')[1].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                odds_1: $(matches[i]).find('.table-main__odds').length > 0 ? Math.round(parseFloat($(matches[i]).find('.table-main__odds').eq(0).find('a').attr('data-odd')) * 100) / 100 : '-.--',
                odds_x: $(matches[i]).find('.table-main__odds').length > 0 ? Math.round(parseFloat($(matches[i]).find('.table-main__odds').eq(1).find('a').attr('data-odd')) * 100) / 100 : '-.--',
                odds_2: $(matches[i]).find('.table-main__odds').length > 0 ? Math.round(parseFloat($(matches[i]).find('.table-main__odds').eq(2).find('a').attr('data-odd')) * 100) / 100 : '-.--',
            }

            allMatchesToday.push(matchData)
        }
    })

    getAllMatchData('https://www.freesupertips.com/accumulator-tips/').then(function (html) {

        let matchData;
        const matches = $(html).contents().find('.TipBetslip__legs .TipBetslip__leg .TipBetslip__row');

        for (let i = 0; i < matches.length; i++) { 
            const winTeam = $(matches[i]).find('.TipBetslip__market').text().split('to Win');

            if (winTeam.length > 1) {
                let loseTeam = $(matches[i]).find('.TipBetslip__outcome').text();
                let homeTeam;
                let awayTeam;
                let prediction_1;
                let prediction_2;

                if (loseTeam.split(' at ').length > 1) {
                    homeTeam = loseTeam.split(' at ')[1];
                    awayTeam = winTeam[0];
                    prediction_1 = false;
                    prediction_2 = true;
                } else {
                    homeTeam = winTeam[0];
                    awayTeam = loseTeam.split(' v ').length > 1 ? loseTeam.split(' v ')[1] : loseTeam.split(' vs ')[1];
                    prediction_1 = true;
                    prediction_2 = false;
                }

                matchData = {
                    website: 'freesupertips',
                    matchTime: $(matches[i]).find('.TipBetslip__meta').text().split('i')[0].trim(),
                    homeTeam: homeTeam.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                    awayTeam: awayTeam.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                    prediction_1: prediction_1,
                    prediction_x: false,
                    prediction_2: prediction_2,
                }
                
                if (freesupertips_MatchData.find(match => match.homeTeam === matchData.homeTeam)) {
                    continue;
                }

                freesupertips_MatchData.push(matchData);
            }
        }
    })

    getAllMatchData('https://www.forebet.com/en/football-tips-and-predictions-for-today').then(function (html) {

        let matchData;
        const matches = $(html).contents().find('.schema tr .tnms').closest('tr');
        for (let i = 0; i < matches.length; i++) { 
            matchData = {
                website: 'forebet',
                matchTime: $(matches[i]).find('.tnms time').text(),
                homeTeam: $(matches[i]).find('.tnms .homeTeam').text().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                awayTeam: $(matches[i]).find('.tnms .awayTeam').text().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                prediction_1: Math.round(parseFloat($(matches[i]).find('.predict').prev().prev().prev().text().trim()) * 100) / 100 >= 60 ? true : false,
                prediction_x: Math.round(parseFloat($(matches[i]).find('.predict').prev().prev().text().trim()) * 100) / 100 >= 60 ? true : false,
                prediction_2: Math.round(parseFloat($(matches[i]).find('.predict').prev().text().trim()) * 100) / 100 >= 60 ? true : false,
            }
            forebet_MatchData.push(matchData);
        }
    })

    getAllMatchData('https://www.predictz.com/predictions/').then(function (html) {

        let matchData;
        const matches = $(html).contents().find('.pttr.ptcnt');
        for (let i = 0; i < matches.length; i++) { 
            const homeTeamGoal = parseFloat($(matches[i]).find('.ptpredboxsml').text().split(' ')[1].split('-')[0]);
            const awayTeamGoal = parseFloat($(matches[i]).find('.ptpredboxsml').text().split(' ')[1].split('-')[1]);

            matchData = {
                website: 'predictz',
                homeTeam: $(matches[i]).find('.pttd.ptgame').text().split(' v ')[0].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                awayTeam: $(matches[i]).find('.pttd.ptgame').text().split(' v ')[1].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                prediction_1: ($(matches[i]).find('.ngreen.ptpredboxsml').length && homeTeamGoal - awayTeamGoal >= 2) ? true : false,
                prediction_x: $(matches[i]).find('.nyellow.ptpredboxsml').length ? true : false,
                prediction_2: ($(matches[i]).find('.nred.ptpredboxsml').length && awayTeamGoal - homeTeamGoal >= 2) ? true : false,
            }
            predictz_MatchData.push(matchData);
        }
    })

    getAllMatchData('https://bettingtips1x2.com/').then(function (html) {

        let matchData;
        const matches = $(html).contents().find('table.results').eq(1).find('tr');
        for (let i = 0; i < matches.length; i++) { 

            if ($(matches[i]).find('td').length > 0) {
                const homeTeamGoal = parseFloat($(matches[i]).find('td').eq(7).text().split(':')[0]);
                const awayTeamGoal = parseFloat($(matches[i]).find('td').eq(7).text().split(':')[1]);

                matchData = {
                    website: 'bettingtips1x2',
                    matchTime: $(matches[i]).find('td').eq(2).text(),
                    homeTeam: $(matches[i]).find('td').eq(3).text().split(' - ')[0].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                    awayTeam: $(matches[i]).find('td').eq(3).text().split(' - ')[1].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                    prediction_1: (homeTeamGoal > awayTeamGoal && homeTeamGoal - awayTeamGoal >= 3) ? true : false,
                    prediction_x: (homeTeamGoal === awayTeamGoal && homeTeamGoal + awayTeamGoal === 0) ? true : false,
                    prediction_2: (homeTeamGoal < awayTeamGoal && awayTeamGoal - homeTeamGoal >= 3) ? true : false,
                }
                bettingtips1x2_MatchData.push(matchData);
            }
        }
    })

    getAllMatchData('https://www.statarea.com/predictions').then(function (html) {

        let matchData;
        const matches = $(html).contents().find('.competition .body .match');
        for (let i = 0; i < matches.length; i++) { 
            matchData = {
                website: 'statarea',
                matchTime: $(matches[i]).find('.date').text(),
                homeTeam: $(matches[i]).find('.hostteam .name').text().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                awayTeam: $(matches[i]).find('.guestteam .name').text().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                prediction_1: Math.round(parseFloat($(matches[i]).find('.inforow .coefrow > .coefbox').eq(0).text()) * 100) / 100 >= 65 ? true : false,
                prediction_x: Math.round(parseFloat($(matches[i]).find('.inforow .coefrow > .coefbox').eq(1).text()) * 100) / 100 >= 35 ? true : false,
                prediction_2: Math.round(parseFloat($(matches[i]).find('.inforow .coefrow > .coefbox').eq(2).text()) * 100) / 100 >= 65 ? true : false,
            }
            statarea_MatchData.push(matchData);
        }
    })

    getAllMatchData('https://footballpredictions.net/football-predictions-free-betting-tips').then(function (html) {

        let matchData;
        const matches = $(html).contents().find('.competition-match .blue-card-outer-outer');
        for (let i = 0; i < matches.length; i++) { 
            const homeTeam =  $(matches[i]).find('.home-team .team-label').text().trim();
            const awayTeam =  $(matches[i]).find('.away-team .team-label').text().trim();
            const prediction = $(matches[i]).find('.prediction')[0].innerText.split('Prediction:')[1];

            matchData = {
                website: 'footballpredictionsNet',
                homeTeam: homeTeam.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                awayTeam: awayTeam.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                prediction_1: prediction.split('to win')[0].trim() === homeTeam ? true : false,
                prediction_x: prediction.trim() === 'Draw' ? true : false,
                prediction_2: prediction.split('to win')[0].trim() === awayTeam ? true : false,
            }
            footballpredictionsNet_MatchData.push(matchData);
        }
    })

    getAllMatchData('https://footballpredictions.com/footballpredictions/').then(function (html) {

        let matchData;
        const matches = $(html).contents().find('.acc-content.active .base-box');

        for (let i = 0; i < matches.length; i++) { 
            const date = $(matches[i]).find('.prediction .bp-details > p').eq(2).find('strong').eq(0).text().split('/');

            if (date[0] + '.' + date[1] + '.' + date[2] === getToDay()) {
                const homeTeamGoal = parseFloat($(matches[i]).find('.predictionbox strong').text().split('-')[0].trim());
                const awayTeamGoal = parseFloat($(matches[i]).find('.predictionbox strong').text().split('-')[1].trim());

                matchData = {
                    website: 'footballpredictionsCom',
                    homeTeam: $(matches[i]).find('.predtitle h2').text().split(' vs ')[0].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                    awayTeam: $(matches[i]).find('.predtitle h2').text().split(' vs ')[1].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                    prediction_1: homeTeamGoal > awayTeamGoal ? true : false,
                    prediction_x: homeTeamGoal === awayTeamGoal ? true : false,
                    prediction_2: homeTeamGoal < awayTeamGoal ? true : false,
                }
                footballpredictionsCom_MatchData.push(matchData);
            }

        }
    })

    getAllMatchData('https://www.scibet.com/').then(function (html) {

        let matchData;
        const matches = $(html).contents().find('#content .block .head h2 > a').closest(".block").find('table tr');
        for (let i = 0; i < matches.length; i++) { 
            matchData = {
                website: 'scibet',
                matchTime: $(matches[i]).find('td:nth-child(2) span').text(),
                homeTeam: $(matches[i]).find('td:nth-child(3)').text().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                awayTeam: $(matches[i]).find('td:nth-child(5)').text().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                odds_1: Math.round(parseFloat($(matches[i]).find('td:nth-child(6)').text()) * 100) / 100,
                odds_x: Math.round(parseFloat($(matches[i]).find('td:nth-child(7)').text()) * 100) / 100,
                odds_2: Math.round(parseFloat($(matches[i]).find('td:nth-child(8)').text()) * 100) / 100,
                prediction_1: Math.round(parseFloat($(matches[i]).find('td:nth-child(9) .bar-success').attr('style').split(':')[1].split('%')[0]) * 100) / 100 >= 65 ? true : false,
                prediction_x: Math.round(parseFloat($(matches[i]).find('td:nth-child(9) .bar-warning').attr('style').split(':')[1].split('%')[0]) * 100) / 100 >= 35 ? true : false,
                prediction_2: Math.round(parseFloat($(matches[i]).find('td:nth-child(9) .bar-danger').attr('style').split(':')[1].split('%')[0]) * 100) / 100 >= 65 ? true : false,
            }
            scibet_MatchData.push(matchData);
        }
    })

    getAllMatchData('http://www.zulubet.com/').then(function (html) {

        let matchData;
        const matches = $(html).contents().find('.content_table tr[bgcolor]:not(.prediction_full):not(.prediction_min)');
        for (let i = 0; i < matches.length; i++) { 
            matchData = {
                website: 'zulubet',
                matchTime: $(matches[i]).find('td:nth-child(1) script').text(),
                homeTeam: $(matches[i]).find('td:nth-child(2)').text().split('-')[0].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                awayTeam: $(matches[i]).find('td:nth-child(2)').text().split('-')[1].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                odds_1: Math.round(parseFloat($(matches[i]).find('td:nth-child(10)').text()) * 100) / 100,
                odds_x: Math.round(parseFloat($(matches[i]).find('td:nth-child(11)').text()) * 100) / 100,
                odds_2: Math.round(parseFloat($(matches[i]).find('td:nth-child(12)').text()) * 100) / 100,
                prediction_1: Math.round(parseFloat($(matches[i]).find('td:nth-child(4)').text()) * 100) / 100 >= 65 ? true : false,
                prediction_x: Math.round(parseFloat($(matches[i]).find('td:nth-child(5)').text()) * 100) / 100 >= 35 ? true : false,
                prediction_2: Math.round(parseFloat($(matches[i]).find('td:nth-child(6)').text()) * 100) / 100 >= 65 ? true : false,
            }
            zulubet_MatchData.push(matchData);
        }
    })

    getAllMatchData('https://www.windrawwin.com/predictions/today/simple/all-games/all-stakes/all-venues/').then(function (html) {
        
        let matchData;
        const matches = $(html).contents().find('.wttr.mbmt30').find('.wtmo').closest(".wttr.mbmt30");
        for (let i = 0; i < matches.length; i++) { 
            const homeTeamGoal = parseFloat($(matches[i]).find('.wtsc').text().split('-')[0].trim());
            const awayTeamGoal = parseFloat($(matches[i]).find('.wtsc').text().split('-')[1].trim());

            matchData = {
                website: 'windrawwin',
                homeTeam: $(matches[i]).find('.wtdesklnk').text().split(' v ')[0].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                awayTeam: $(matches[i]).find('.wtdesklnk').text().split(' v ')[1].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                prediction_1: ($(matches[i]).find('.wtprd').text() === 'Home Win' && homeTeamGoal - awayTeamGoal >= 2) ? true : false,
                prediction_x: $(matches[i]).find('.wtprd').text() === 'Draw' ? true : false,
                prediction_2: ($(matches[i]).find('.wtprd').text() === 'Away Win' && awayTeamGoal - homeTeamGoal >= 2) ? true : false,
            }
            windrawwin_MatchData.push(matchData);
        }
    })

    getAllMatchData('http://www.vitibet.com/freevitibettips.php').then(function (html) {

        let matchData;
        const matches = $(html).contents().find('.tabulkaquick tr td:first-child.standardbunka').closest("tr");
        for (let i = 0; i < matches.length; i++) { 

            const date = new Date();
            const toDayString = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth()+1)).slice(-2);
            const matchDay = $(matches[i]).find('td:first-child').text();

            // only today
            if (toDayString === matchDay) {
                matchData = {
                    website: 'vitibet',
                    homeTeam: $(matches[i]).find('td:nth-child(3)').text().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                    awayTeam: $(matches[i]).find('td:nth-child(4)').text().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                    prediction_1: Math.round(parseFloat($(matches[i]).find('td:nth-child(5)').text()) * 100) / 100 >= 65 ? true : false,
                    prediction_x: Math.round(parseFloat($(matches[i]).find('td:nth-child(6)').text()) * 100) / 100 >= 35 ? true : false,
                    prediction_2: Math.round(parseFloat($(matches[i]).find('td:nth-child(7)').text()) * 100) / 100 >= 65 ? true : false,
                }
                vitibet_MatchData.push(matchData);
            }
        }
    })

    getAllMatchData('https://mybet.tips/soccer/predictions/').then(function (html) {

        let matchData;
        const matches = $(html).contents().find('#events table tr.link');
        for (let i = 0; i < matches.length; i++) { 
            matchData = {
                website: 'mybet.tips',
                matchTime: $(matches[i]).find('td:nth-child(1)').text(),
                homeTeam: $(matches[i]).find('td:nth-child(2)').text().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                awayTeam: $(matches[i]).find('td:nth-child(4)').text().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                prediction_1: Math.round(parseFloat($(matches[i]).find('td:nth-child(5)').text().split('%')[0]) * 100) / 100 >= 60 ? true : false,
                prediction_x: Math.round(parseFloat($(matches[i]).find('td:nth-child(6)').text().split('%')[0]) * 100) / 100 >= 35 ? true : false,
                prediction_2: Math.round(parseFloat($(matches[i]).find('td:nth-child(7)').text().split('%')[0]) * 100) / 100 >= 60 ? true : false,
            }
            mybet_MatchData.push(matchData);
        }
    })

    getAllMatchData('https://www.supatips.com/').then(function (html) {
        
        let matchData;
        const matches = $(html).contents().find('#yesdraw tbody tr');
        for (let i = 0; i < matches.length; i++) { 
            let match = $(matches[i]).find('td:nth-child(1)').next().text().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            let hasCorrectName = match.split(' vs ').length === 2 ? true : false;

            matchData = {
                website: 'supatips',
                homeTeam: hasCorrectName === true ? match.split(' vs ')[0].trim() : match.split(' ')[0].trim(),
                awayTeam: hasCorrectName === true ? match.split(' vs ')[1].trim() : match.split(' ')[match.split(' ').length - 1].trim(),
                prediction_1: $(matches[i]).find('td:nth-child(3)').text() === '1' ? true : false,
                prediction_1x: $(matches[i]).find('td:nth-child(3)').text() === '1X' ? true : false,
                prediction_x: $(matches[i]).find('td:nth-child(3)').text() === 'X' ? true : false,
                prediction_2: $(matches[i]).find('td:nth-child(3)').text() === '2' ? true : false,
                prediction_2x: $(matches[i]).find('td:nth-child(3)').text() === 'X2' ? true : false,
            }
            supatips_MatchData.push(matchData);
        }
    })

    getAllMatchData('https://www.footballtips.com/accumulator-tips/').then(function (html) {
        
        let matchData;
        const winPredictionsTitle = $(html).contents().find('.tips-grid li .tips-card__name').closest('.bet').find('.heading__title') || [];

        for (let i = 0; i < winPredictionsTitle.length; i++) { 
            if (winPredictionsTitle[i].innerText === 'Win Accumulator') {
                const matches = $(winPredictionsTitle[i]).closest('.bet').find('.tips-grid li .tips-card__name');
                
                for (let i = 0; i < matches.length; i++) { 

                    const match = $(matches[i]).find('.tips-card__name-one').text().split(' v ').length === 2 ? $(matches[i]).find('.tips-card__name-one').text().split(' v ') : $(matches[i]).find('.tips-card__name-one').text().split(' vs ');

                    matchData = {
                        website: 'footballtips',
                        homeTeam: match[0].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                        awayTeam: match[1].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                        prediction_1: $(matches[i]).find('.tips-card__name-two').text() === 'Home win' ? true : false,
                        prediction_x: $(matches[i]).find('.tips-card__name-two').text() === 'Draw' ? true : false,
                        prediction_2: $(matches[i]).find('.tips-card__name-two').text() === 'Away win' ? true : false,
                    }
                    footballtips_MatchData.push(matchData);
                }
            }
        }
    })

    getAllMatchData('https://www.sportytrader.com/en/betting-tips/football/').then(function (html) {
        
        let matchData;
        const matches = $(html).contents().find('.betting-card');
        for (let i = 0; i < matches.length; i++) { 
            const winnerTeam = $(matches[i]).find('.our-bet .bet-card-our-prono').text().split('win')[0].trim();
            const homeTeam = $(matches[i]).find('.bet-card-vs .bet-card-vs-left').text().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const awayTeam = $(matches[i]).find('.bet-card-vs .bet-card-vs-right').text().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            matchData = {
                website: 'sportytrader',
                homeTeam: homeTeam,
                awayTeam: awayTeam,
                prediction_1: winnerTeam === homeTeam  ? true : false,
                prediction_x: $(matches[i]).find('.our-bet .bet-card-our-prono').text().toLowerCase().indexOf('draw') !== -1 ? true : false,
                prediction_2: winnerTeam === awayTeam  ? true : false,
            }
            sportytrader_MatchData.push(matchData);
        }
    })

    getAllMatchData('https://www.betensured.com/home').then(function (html) {
        
        let matchData;
        const matches = $(html).contents().find('.hide-iframe #today-div tr');
        for (let i = 0; i < matches.length; i++) { 
            matchData = {
                website: 'betensured',
                homeTeam: $(matches[i]).find('td:nth-child(2)').text().split(' vs ')[0].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                awayTeam: $(matches[i]).find('td:nth-child(2)').text().split(' vs ')[1].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                prediction_1: $(matches[i]).find('td:nth-child(3)').text() === '1' ? true : false,
                prediction_1x: $(matches[i]).find('td:nth-child(3)').text() === '1X' ? true : false,
                prediction_x: $(matches[i]).find('td:nth-child(3)').text() === 'X' ? true : false,
                prediction_2: $(matches[i]).find('td:nth-child(3)').text() === '2' ? true : false,
                prediction_2x: $(matches[i]).find('td:nth-child(3)').text() === 'X2' ? true : false,
            }
            betensured_MatchData.push(matchData);
        }
    })

    getAllMatchData('https://www.olbg.com/betting-tips/Football/1').then(function (html) {
        
        let matchData;
        const matches = $(html).contents().find('#tipsListingContainer-Match .tip-row');
        for (let i = 0; i < matches.length; i++) { 
            const toDay = $(matches[i]).find('td:nth-child(2) .event-start-date-holder').text().trim();
            const winnerTeam = $(matches[i]).find('td:nth-child(3) .selection-name').text().trim();
            const homeTeam = $(matches[i]).find('td:nth-child(2) h5').text().split(' v ')[0].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const awayTeam = $(matches[i]).find('td:nth-child(2) h5').text().split(' v ')[1].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if (toDay === 'Today') {
                matchData = {
                    website: 'olbg',
                    homeTeam: homeTeam,
                    awayTeam: awayTeam,
                    prediction_1: winnerTeam === homeTeam  ? true : false,
                    prediction_x: $(matches[i]).find('td:nth-child(3) .selection-name').text().toLowerCase().indexOf('draw') !== -1 ? true : false,
                    prediction_2: winnerTeam === awayTeam  ? true : false,
                }
                olbg_MatchData.push(matchData);
            }
        }
    })

    getAllMatchData('https://www.tips180.com').then(function (html) {
        
        let matchData;
        const matches = $(html).contents().find('.table_change').eq(0).find('tr');
        for (let i = 0; i < matches.length; i++) { 
            matchData = {
                website: 'tips180',
                homeTeam: $(matches[i]).find('td').eq(2).text().split(' vs ')[0].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                awayTeam: $(matches[i]).find('td').eq(2).text().split(' vs ')[1].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                prediction_1: $(matches[i]).find('td').eq(3).text().trim() === '1' ? true : false,
                prediction_x: $(matches[i]).find('td').eq(3).text().trim() === 'X' ? true : false,
                prediction_2: $(matches[i]).find('td').eq(3).text().trim() === '2' ? true : false,
            }
            tips180_MatchData.push(matchData);
        }
    })

    getAllMatchData('https://footballbettingtips.org/tips/' + getToDay('-') + '.html').then(function (html) {
        
        let matchData;
        const matches = $(html).contents().find('.results').find('td a').closest('tr');
        for (let i = 0; i < matches.length; i++) { 
            const homeTeamGoal = parseFloat($(matches[i]).find('td').eq(5).text().split(':')[0].trim());
            const awayTeamGoal = parseFloat($(matches[i]).find('td').eq(5).text().split(':')[1].trim());

            matchData = {
                website: 'footballbettingtips',
                homeTeam: $(matches[i]).find('td').eq(1).text().split(' - ')[0].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                awayTeam: $(matches[i]).find('td').eq(1).text().split(' - ')[1].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                prediction_1: (homeTeamGoal > awayTeamGoal && homeTeamGoal - awayTeamGoal >= 3) ? true : false,
                prediction_x: (homeTeamGoal === awayTeamGoal && homeTeamGoal + awayTeamGoal === 0) ? true : false,
                prediction_2: (homeTeamGoal < awayTeamGoal && awayTeamGoal - homeTeamGoal >= 3) ? true : false,
            }
            footballbettingtips_MatchData.push(matchData);
        }
    })

    getAllMatchData('https://footyaccumulators.com/football-tips').then(function (html) {
        
        let matchData;
        const matches = $(html).contents().find('.selection');
        for (let i = 0; i < matches.length; i++) { 
            const winTeam = $(matches[i]).find('.cQkHWR > div:last-child').text().split(' to win')[0].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const homeTeam = $(matches[i]).find('.cQkHWR > div').eq(0).text().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const awayTeam = $(matches[i]).find('.cQkHWR > div').eq(2).text().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            matchData = {
                website: 'footyaccumulators',
                homeTeam: homeTeam,
                awayTeam: awayTeam,
                prediction_1: homeTeam === winTeam ? true : false,
                prediction_x: false,
                prediction_2: awayTeam === winTeam ? true : false,
            }
            footyaccumulators_MatchData.push(matchData);
        }
    })

    getAllMatchData('https://oddslot.com/odds/').then(function (html) {
        
        let matchData;
        const matches = $(html).contents().find('table.team-schedule--full tbody tr');
        for (let i = 0; i < matches.length; i++) { 
            const homeTeam = $(matches[i]).find('.team-meta__name').eq(0).text().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const awayTeam = $(matches[i]).find('.team-meta__name').eq(1).text().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const homeTeamChance = Math.round(parseFloat($(matches[i]).find('.team-schedule__status').eq(1).text()));
            const awayTeamChance = Math.round(parseFloat($(matches[i]).find('.team-schedule__status').eq(5).text()));

            matchData = {
                website: 'oddslot',
                homeTeam: homeTeam,
                awayTeam: awayTeam,
                prediction_1: (homeTeamChance >= 50 && awayTeamChance < 19) ? true : false,
                prediction_x: (homeTeamChance >= 35 && awayTeamChance >= 35) ? true : false,
                prediction_2: (homeTeamChance < 19 && awayTeamChance >= 50) ? true : false,
            }
            oddslot_MatchData.push(matchData);
        }
    })

    getAllMatchData('https://www.sbat.com/tips/free-football-betting-tips').then(function (html) {
        
        let matchData;
        const matches = $(html).contents().find('.free-tips__card');
        for (let i = 0; i < matches.length; i++) { 
            const homeTeam = $(matches[i]).find('.free-tips__match').text().split(' v ')[0].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const awayTeam = $(matches[i]).find('.free-tips__match').text().split(' v ')[1].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const winTeam = $(matches[i]).find('.free-tips__result').text().split('to win')[0].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            matchData = {
                website: 'sbat',
                homeTeam: homeTeam,
                awayTeam: awayTeam,
                prediction_1: homeTeam === winTeam ? true : false,
                prediction_x: false,
                prediction_2: awayTeam === winTeam ? true : false,
            }
            sbat_MatchData.push(matchData);
        }
    })

    getAllMatchData('https://www.kickoff.co.uk/acca-smacker/').then(function (html) {
        
        let matchData;
        const matches = $(html).contents().find('.ko-awp-row-data');
        for (let i = 0; i < matches.length; i++) { 
            const homeTeam = $(matches[i]).find('.ko-awp-cell-team-names > div').eq(0).text().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const awayTeam = $(matches[i]).find('.ko-awp-cell-team-names > div').eq(2).text().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const winTeam = $(matches[i]).find('.ko-awp-prediction-wrap .ko-awp-prediction-market-name .ko-mobile-hide').text().split('Win')[0].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const winTeamChance = Math.round(parseFloat($(matches[i]).find('.ko-awp-prediction-wrap .iconAccaPredSelectTextWrapper').text().split('%')[0].trim()));

            matchData = {
                website: 'kickoff',
                homeTeam: homeTeam,
                awayTeam: awayTeam,
                prediction_1: ('Home' === winTeam && winTeamChance >= 55) ? true : false,
                prediction_x: false,
                prediction_2: ('Away' === winTeam && winTeamChance >= 55) ? true : false,
            }
            kickoff_MatchData.push(matchData);
        }
    })
})

/* 
    Bind EventListeners
*/ 

$('html').on('click', '.save-button', function() {
    setDataToLocalStorage(getToDay() + '_' + $(this).data('save-type') , JSON.stringify(allMatchesTodayFiltered));
});

$('html').on('click', '.stats-button_1', function() {
    resetSiteStats();

    for (let y = 1; y <= 12; y++) {
        const month = y >= 10 ? y : '0' + y;

        for (let i = 1; i <= 31; i++) { 
            const day = i >= 10 ? i : '0' + i;
            const name = day + '.' + month + '.' + '2019'
            const localStorageData = getDataFromLocalStorage(name + '_' + '1');
    
            if (localStorageData !== null) {
                localStorageData.forEach(data => {
                    const result = data.result || data.reslut;
    
                    if (result !== undefined) {
                        data.website.forEach(website => {
    
                            for (let i = 0; i < siteStats.length; i++) { 
                                if (siteStats[i].site === website) {
                                    siteStats[i].matches++
    
                                    if (result.vyhral === 'domaci') {
                                        siteStats[i].correctPrediction++
                                    }
                                }
                            }
                        })
                    }
                })
            }
        }
    }

    // Zlucenie ulozenych siteStats s existujucimi datami zo zapasov
    // const newSiteStats = mergeSiteStats(siteStats_1, siteStats);
    // writeSiteStats(newSiteStats);
    // setDataToLocalStorage('SiteStats_1', JSON.stringify(newSiteStats))

    // Vypisanie konkretnych siteStats
    writeSiteStats(siteStats_1);

    // Vypisanie a ulozenie siteStats z dat zo zapasov
    //writeSiteStats(siteStats);
    //setDataToLocalStorage('SiteStats_1', JSON.stringify(siteStats))
});

$('html').on('click', '.stats-button_x', function() {
    resetSiteStats();

    for (let y = 1; y <= 12; y++) {
        const month = y >= 10 ? y : '0' + y;

        for (let i = 1; i <= 31; i++) { 
            const day = i >= 10 ? i : '0' + i;
            const name = day + '.' + month + '.' + '2019'
            const localStorageData = getDataFromLocalStorage(name + '_' + 'x');

            if (localStorageData !== null) {
                
                localStorageData.forEach(data => {
                    const result = data.result || data.reslut;

                    if (result !== undefined) {
                        data.website.forEach(website => {

                            for (let i = 0; i < siteStats.length; i++) { 
                                if (siteStats[i].site === website) {
                                    siteStats[i].matches++
                                    if (result.vyhral === 'remiza') {
                                        siteStats[i].correctPrediction++
                                    }
                                }
                            }
                        })
                    }
                })
            }
        }
    }

    // Zlucenie ulozenych siteStats s existujucimi datami zo zapasov
    // const newSiteStats = mergeSiteStats(siteStats_x, siteStats);
    // writeSiteStats(newSiteStats);
    // setDataToLocalStorage('SiteStats_x', JSON.stringify(newSiteStats))

    // Vypisanie konkretnych siteStats
    writeSiteStats(siteStats_x);

    // Vypisanie a ulozenie siteStats z dat zo zapasov
    //writeSiteStats(siteStats);
    //setDataToLocalStorage('SiteStats_x', JSON.stringify(siteStats))
});

$('html').on('click', '.stats-button_2', function() {
    resetSiteStats();

    for (let y = 1; y <= 12; y++) {
        const month = y >= 10 ? y : '0' + y;

        for (let i = 1; i <= 31; i++) { 
            const day = i >= 10 ? i : '0' + i;
            const name = day + '.' + month + '.' + '2019'
            const localStorageData = getDataFromLocalStorage(name + '_' + '2');

            if (localStorageData !== null) {
                localStorageData.forEach(data => {
                    const result = data.result || data.reslut;

                    if (result !== undefined) {
                        data.website.forEach(website => {

                            for (let i = 0; i < siteStats.length; i++) { 
                                if (siteStats[i].site === website) {
                                    siteStats[i].matches++
                                    if (result.vyhral === 'host') {
                                        siteStats[i].correctPrediction++
                                    }
                                }
                            }
                        })
                    }
                })
            }
        }
    }

    // Zlucenie ulozenych siteStats s existujucimi datami zo zapasov
    // const newSiteStats = mergeSiteStats(siteStats_2, siteStats);
    // writeSiteStats(newSiteStats);
    // setDataToLocalStorage('SiteStats_2', JSON.stringify(newSiteStats))

    // Vypisanie konkretnych siteStats
    writeSiteStats(siteStats_2);

    // Vypisanie a ulozenie siteStats z dat zo zapasov
    // writeSiteStats(siteStats);
    // setDataToLocalStorage('SiteStats_2', JSON.stringify(siteStats))
});

$('html').on('click', '.stats-button_reset', function() {
    resetWrittenSiteStats();
});

$('html').on('click', '.set-button', function() {
    const selectedDay = $('#datepicker').val();
    const selectedType = $('.dropdown').val();
    const localStorageData = getDataFromLocalStorage(selectedDay + '_' + selectedType);

    if (localStorageData !== null) {
        const day = selectedDay.split('.')[0];
        const month = selectedDay.split('.')[1];
        const year = selectedDay.split('.')[2];

        mergeResultMatchesFromBetexplorer(selectedDay + '_' + selectedType, 'year=' + year + '&month=' + month + '&day=' + day, localStorageData);

    } else {
        alert('Zvolený dátum neobsahuje žiadne dáta.')
    }
});

$('html').on('click', '.load-button_1', function() {
    allMatchesTodayFiltered = [];

    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, scibet_MatchData, 'prediction_1', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, statarea_MatchData, 'prediction_1', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, forebet_MatchData, 'prediction_1', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, bettingtips1x2_MatchData, 'prediction_1', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, zulubet_MatchData, 'prediction_1', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, vitibet_MatchData, 'prediction_1', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, supatips_MatchData, 'prediction_1', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, betensured_MatchData, 'prediction_1', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, tips180_MatchData, 'prediction_1', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, footballbettingtips_MatchData, 'prediction_1', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, footyaccumulators_MatchData, 'prediction_1', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, oddslot_MatchData, 'prediction_1', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, sbat_MatchData, 'prediction_1', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, kickoff_MatchData, 'prediction_1', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, predictz_MatchData, 'prediction_1', true);

    // Nizke percent
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, freesupertips_MatchData, 'prediction_1', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, footballpredictionsCom_MatchData, 'prediction_1', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, footballpredictionsNet_MatchData, 'prediction_1', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, windrawwin_MatchData, 'prediction_1', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, mybet_MatchData, 'prediction_1', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, footballtips_MatchData, 'prediction_1', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, sportytrader_MatchData, 'prediction_1', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, olbg_MatchData, 'prediction_1', true);

    $('.save-button').data('save-type', '1');

    const newArray = allMatchesTodayFiltered.sort((a, b) => (a.found < b.found) ? 1 : -1);

    console.log('Zhoda    Čas    Kurz      Zápas | Liga')
    newArray.forEach(array => {
        console.log('  ' + array.found + '     ' + array.matchTime + '   ' + array.odds_1 + '      ' + array.homeTeam + ' - ' + array.awayTeam + ' | ' + array.league + '                                 ' + array.website);
    })
});

$('html').on('click', '.load-button_x', function() {
    allMatchesTodayFiltered = [];

    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, predictz_MatchData, 'prediction_x', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, scibet_MatchData, 'prediction_x', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, statarea_MatchData, 'prediction_x', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, forebet_MatchData, 'prediction_x', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, bettingtips1x2_MatchData, 'prediction_x', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, footballpredictionsCom_MatchData, 'prediction_x', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, footballpredictionsNet_MatchData, 'prediction_x', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, zulubet_MatchData, 'prediction_x', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, windrawwin_MatchData, 'prediction_x', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, vitibet_MatchData, 'prediction_x', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, mybet_MatchData, 'prediction_x', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, supatips_MatchData, 'prediction_x', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, footballtips_MatchData, 'prediction_x', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, sportytrader_MatchData, 'prediction_x', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, betensured_MatchData, 'prediction_x', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, olbg_MatchData, 'prediction_x', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, tips180_MatchData, 'prediction_x', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, footballbettingtips_MatchData, 'prediction_x', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, footyaccumulators_MatchData, 'prediction_x', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, oddslot_MatchData, 'prediction_x', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, sbat_MatchData, 'prediction_x', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, kickoff_MatchData, 'prediction_x', true);

    $('.save-button').data('save-type', 'x');

    const newArray = allMatchesTodayFiltered.sort((a, b) => (a.found < b.found) ? 1 : -1);

    console.log('Zhoda    Čas    Kurz      Zápas | Liga')
    newArray.forEach(array => {
        console.log('  ' + array.found + '     ' + array.matchTime + '   ' + array.odds_x + '      ' + array.homeTeam + ' - ' + array.awayTeam + ' | ' + array.league + '                                 ' + array.website);
    })
});

$('html').on('click', '.load-button_2', function() {
    allMatchesTodayFiltered = [];

    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, statarea_MatchData, 'prediction_2', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, scibet_MatchData, 'prediction_2', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, forebet_MatchData, 'prediction_2', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, bettingtips1x2_MatchData, 'prediction_2', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, zulubet_MatchData, 'prediction_2', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, vitibet_MatchData, 'prediction_2', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, supatips_MatchData, 'prediction_2', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, betensured_MatchData, 'prediction_2', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, tips180_MatchData, 'prediction_2', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, footballbettingtips_MatchData, 'prediction_2', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, footyaccumulators_MatchData, 'prediction_2', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, oddslot_MatchData, 'prediction_2', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, sbat_MatchData, 'prediction_2', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, kickoff_MatchData, 'prediction_2', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, predictz_MatchData, 'prediction_2', true);

    // Nizke percent
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, freesupertips_MatchData, 'prediction_2', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, footballpredictionsCom_MatchData, 'prediction_2', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, footballpredictionsNet_MatchData, 'prediction_2', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, windrawwin_MatchData, 'prediction_2', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, mybet_MatchData, 'prediction_2', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, footballtips_MatchData, 'prediction_2', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, sportytrader_MatchData, 'prediction_2', true);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, olbg_MatchData, 'prediction_2', true);

    $('.save-button').data('save-type', '2');

    const newArray = allMatchesTodayFiltered.sort((a, b) => (a.found < b.found) ? 1 : -1);

    console.log('Zhoda    Čas    Kurz      Zápas | Liga')
    newArray.forEach(array => {
        console.log('  ' + array.found + '     ' + array.matchTime + '   ' + array.odds_2 + '      ' + array.homeTeam + ' - ' + array.awayTeam + ' | ' + array.league + '                                 ' + array.website);
    })
});

function mergeAllMatchesWithAllFiltredMatchces (allMatches, filteredMatches, selector, condition) {
    for (let i = 0; i < filteredMatches.length; i++) { 

        if (filteredMatches[i][selector] === condition) {
            const findHomeTeam = allMatches.filter(match => {
                if (match.homeTeam.length >= filteredMatches[i].homeTeam.length) {
                    return match.homeTeam.toLowerCase().indexOf(filteredMatches[i].homeTeam.toLowerCase()) !== -1
                } else {
                    return filteredMatches[i].homeTeam.toLowerCase().indexOf(match.homeTeam.toLowerCase()) !== -1
                }
                
            });
            const findAwayTeam = allMatches.filter(match => {
                if (match.awayTeam.length >= filteredMatches[i].awayTeam.length) {
                    return match.awayTeam.toLowerCase().indexOf(filteredMatches[i].awayTeam.toLowerCase()) !== -1
                } else {
                    return filteredMatches[i].awayTeam.toLowerCase().indexOf(match.awayTeam.toLowerCase()) !== -1
                }
            });

            if (findHomeTeam.length > 0 && findAwayTeam.length > 0) {

                const matchName = findHomeTeam.length > findAwayTeam.length ? findAwayTeam : findHomeTeam;

                if (matchName.length > 1) {
                    break;
                }
                
                let duplicate = null;
                allMatchesTodayFiltered.forEach((match, i) => {
                    if (match.id === matchName[0].homeTeam + matchName[0].awayTeam) {
                        duplicate = i;
                        return;
                    }
                })
                
                if (duplicate !== null) {
                    allMatchesTodayFiltered[duplicate].found ++; 
                    allMatchesTodayFiltered[duplicate].website.push(filteredMatches[i].website); 
                } else {
                    allMatchesTodayFiltered.push({
                        found: 1,
                        matchTime: matchName[0].matchTime,
                        homeTeam: matchName[0].homeTeam,
                        awayTeam: matchName[0].awayTeam,
                        league: matchName[0].league,
                        website: [filteredMatches[i].website],
                        odds_1: matchName[0].odds_1,
                        odds_x: matchName[0].odds_x,
                        odds_2: matchName[0].odds_2,
                        id: matchName[0].homeTeam + matchName[0].awayTeam,
                    })
                }
            }
        }
    }
}

function mergeResultMatchesFromBetexplorer(localStorageName, urlDate, localStorageData) {
    getAllMatchData('https://www.betexplorer.com/results/soccer/?' + urlDate).then(function (html) {
        let matchData = [];
        const matches = $(html).contents().find('.table-main tbody .table-main__tt').closest('tr');

        for (let i = 0; i < matches.length; i++) { 
            let data = {
                league: $(matches[i]).closest('tbody').find('.js-tournament th').text(),
                homeTeam: $(matches[i]).find('.table-main__tt a').text().split(' - ')[0].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                awayTeam: $(matches[i]).find('.table-main__tt a').text().split(' - ')[1].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                homeTeamGoal: parseFloat($(matches[i]).find('.table-main__result').text().split(':')[0]),
                awayTeamGoal: parseFloat($(matches[i]).find('.table-main__result').text().split(':')[1]),
                id: $(matches[i]).find('.table-main__tt a').text().split(' - ')[0].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "") + $(matches[i]).find('.table-main__tt a').text().split(' - ')[1].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
            }

            matchData.push(data)
        }
        
        localStorageData.forEach(match => {
            for (let i = 0; i < matchData.length; i++) { 

                if (match.id === matchData[i].id) {
                    let vyhral = '';

                    if (matchData[i].homeTeamGoal > matchData[i].awayTeamGoal) {
                        vyhral = 'domaci';
                    } else if (matchData[i].homeTeamGoal === matchData[i].awayTeamGoal) {
                        vyhral = 'remiza';
                    } else if (matchData[i].homeTeamGoal < matchData[i].awayTeamGoal) {
                        vyhral = 'host';
                    }

                    Object.assign(match, {result: {
                        skóre: matchData[i].homeTeamGoal + ' - ' + matchData[i].awayTeamGoal,
                        homeTeamGoal: matchData[i].homeTeamGoal, 
                        awayTeamGoal: matchData[i].awayTeamGoal,
                        vyhral: vyhral,
                    }})
                }
            }
        })

        setDataToLocalStorage(localStorageName, JSON.stringify(localStorageData))
    })
}

function mergeSiteStats(savedSiteStats, siteStats) {
    for (let i = 0; i < siteStats.length; i++) { 
        for (let z = 0; z < savedSiteStats.length; z++) { 
            if (siteStats[i].site === savedSiteStats[z].site) {
                siteStats[i].matches += savedSiteStats[z].matches;
                siteStats[i].correctPrediction += savedSiteStats[z].correctPrediction;
            }
        }
    }
    return siteStats;
}

function getAllMatchData(matchLink) {
    return new Promise(function (resolve, reject) {
        getData('GET', matchLink).then(function (html) {
            resolve(html); 
        }).catch(function (err) {
            console.log(err);
            resolve();
            if (err.status === 404) {
                console.log(top.soccerUrl);
            }
        });
    })
}

function getData(method, url, type = 'document') {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = type;
        xhr.onload = function () {
            if ((this.status >= 200 && this.status < 300) || this.status === 0) {
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

function setDataToLocalStorage(name, data) {
    localStorage.setItem(name, data);
}

function getDataFromLocalStorage(name, data) {
    let result = localStorage.getItem(name, data);
    if(result !== ''){
        return JSON.parse(result);
    }
}

function resetSiteStats() {
    siteStats = [
        {site: 'footballpredictionsCom', url: 'https://footballpredictions.com/footballpredictions/', matches: 0, correctPrediction: 0},
        {site: 'footballpredictionsNet', url: 'https://footballpredictions.net/football-predictions-free-betting-tips', matches: 0, correctPrediction: 0},
        {site: 'bettingtips1x2', url: 'https://bettingtips1x2.com/', matches: 0, correctPrediction: 0},
        {site: 'statarea', url: 'https://www.statarea.com/predictions', matches: 0, correctPrediction: 0},
        {site: 'predictz', url: 'https://www.predictz.com/predictions/', matches: 0, correctPrediction: 0},
        {site: 'forebet', url: 'https://www.forebet.com/en/football-tips-and-predictions-for-today', matches: 0, correctPrediction: 0},
        {site: 'freesupertips', url: 'https://www.freesupertips.com/accumulator-tips/', matches: 0, correctPrediction: 0},
        {site: 'olbg', url: 'https://www.olbg.com/betting-tips/Football/1', matches: 0, correctPrediction: 0},
        {site: 'betensured', url: 'https://www.betensured.com/home', matches: 0, correctPrediction: 0},
        {site: 'sportytrader', url: 'https://www.sportytrader.com/en/betting-tips/football/', matches: 0, correctPrediction: 0},
        {site: 'footballtips', url: 'https://www.footballtips.com/accumulator-tips/', matches: 0, correctPrediction: 0},
        {site: 'supatips', url: 'https://www.supatips.com/', matches: 0, correctPrediction: 0},
        {site: 'mybet.tips', url: 'https://mybet.tips/soccer/predictions/', matches: 0, correctPrediction: 0},
        {site: 'vitibet', url: 'http://www.vitibet.com/freevitibettips.php', matches: 0, correctPrediction: 0},
        {site: 'windrawwin', url: 'https://www.windrawwin.com/predictions/today/simple/all-games/all-stakes/all-venues/', matches: 0, correctPrediction: 0},
        {site: 'zulubet', url: 'http://www.zulubet.com/', matches: 0, correctPrediction: 0},
        {site: 'scibet', url: 'https://www.scibet.com/', matches: 0, correctPrediction: 0},
        {site: 'tips180', url: 'https://www.tips180.com', matches: 0, correctPrediction: 0},
        {site: 'footballbettingtips', url: 'https://footballbettingtips.org/tips/2019-08-19.html', matches: 0, correctPrediction: 0},
        {site: 'footyaccumulators', url: 'https://footyaccumulators.com/football-tips', matches: 0, correctPrediction: 0},
        {site: 'oddslot', url: 'https://oddslot.com/odds/', matches: 0, correctPrediction: 0},
        {site: 'sbat', url: 'https://www.sbat.com/tips/free-football-betting-tips', matches: 0, correctPrediction: 0},
        {site: 'kickoff', url: 'https://www.kickoff.co.uk/acca-smacker/', matches: 0, correctPrediction: 0},
    ]
}

function resetWrittenSiteStats() {
    resetSiteStats();
    $('.stats').empty();
    console.clear();
}

function writeSiteStats(stats) {
    stats.sort((a, b) => (mathRound((a.correctPrediction / a.matches) * 100) < mathRound((b.correctPrediction / b.matches) * 100)) ? 1 : -1)

    stats.forEach(data => {
        $('.stats').append(`<a href=${data.url} target="_blank" class="label ui small">${data.site} - ${mathRound((data.correctPrediction / data.matches) * 100)}</a>`)
        console.log(`${mathRound((data.correctPrediction / data.matches) * 100)}%  ${data.site} (${data.correctPrediction} z ${data.matches})`);
    })
}

function getToDay(type) {
    const date = new Date;
    if (type === '-') {
        return (date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2));
    }
    return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth()+1)).slice(-2) + '.' + date.getFullYear();
}

function mathRound(num) {
    if (isNaN(num)) {
        return 0;
    } else {
        return Math.round(parseFloat(num) * 100 / 100)
    }
}