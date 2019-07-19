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

$(function(){
    $( "#datepicker" ).datepicker({ dateFormat: 'dd.mm.yy' });

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
                prediction_1: Math.round(parseFloat($(matches[i]).find('td:nth-child(9) .bar-success').attr('style').split(':')[1].split('%')[0]) * 100) / 100,
                prediction_x: Math.round(parseFloat($(matches[i]).find('td:nth-child(9) .bar-warning').attr('style').split(':')[1].split('%')[0]) * 100) / 100,
                prediction_2: Math.round(parseFloat($(matches[i]).find('td:nth-child(9) .bar-danger').attr('style').split(':')[1].split('%')[0]) * 100) / 100,
            }

            if (Math.round(parseFloat($(matches[i]).find('td:nth-child(9) .bar-success').attr('style').split(':')[1].split('%')[0]) * 100) / 100 >= 60) {
                scibet_MatchData.push(matchData)
            }
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
                prediction_1: Math.round(parseFloat($(matches[i]).find('td:nth-child(4)').text()) * 100) / 100,
                prediction_x: Math.round(parseFloat($(matches[i]).find('td:nth-child(5)').text()) * 100) / 100,
                prediction_2: Math.round(parseFloat($(matches[i]).find('td:nth-child(6)').text()) * 100) / 100,
            }

            if (Math.round(parseFloat($(matches[i]).find('td:nth-child(4)').text()) * 100) / 100 >= 60) {
                zulubet_MatchData.push(matchData);
            }
        }
    })

    getAllMatchData('https://www.windrawwin.com/predictions/today/simple/all-games/all-stakes/all-venues/').then(function (html) {
        
        let matchData;
        const matches = $(html).contents().find('.wttr.mbmt30').find('.wtmo').closest(".wttr.mbmt30");
        for (let i = 0; i < matches.length; i++) { 
            matchData = {
                website: 'windrawwin',
                homeTeam: $(matches[i]).find('.wtdesklnk').text().split(' v ')[0].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                awayTeam: $(matches[i]).find('.wtdesklnk').text().split(' v ')[1].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                odds_1: Math.round(parseFloat($(matches[i]).find('.wtmo > div:nth-child(2)').text()) * 100) / 100,
                odds_x: Math.round(parseFloat($(matches[i]).find('.wtmo > div:nth-child(3)').text()) * 100) / 100,
                odds_2: Math.round(parseFloat($(matches[i]).find('.wtmo > div:nth-child(4)').text()) * 100) / 100,
                prediction_1: $(matches[i]).find('.wtprd').text() === 'Home Win' ? true : false,
                prediction_x: $(matches[i]).find('.wtprd').text() === 'Draw' ? true : false,
                prediction_2: $(matches[i]).find('.wtprd').text() === 'Away Win' ? true : false,
            }

            if ($(matches[i]).find('.wtprd').text() === 'Home Win') {
                windrawwin_MatchData.push(matchData)
            }
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
                    prediction_1: Math.round(parseFloat($(matches[i]).find('td:nth-child(5)').text()) * 100) / 100,
                    prediction_x: Math.round(parseFloat($(matches[i]).find('td:nth-child(6)').text()) * 100) / 100,
                    prediction_2: Math.round(parseFloat($(matches[i]).find('td:nth-child(7)').text()) * 100) / 100,
                }

                if (Math.round(parseFloat($(matches[i]).find('td:nth-child(5)').text()) * 100) / 100 >= 60) {
                    vitibet_MatchData.push(matchData)
                }
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
                prediction_1: Math.round(parseFloat($(matches[i]).find('td:nth-child(5)').text().split('%')[0]) * 100) / 100,
                prediction_x: Math.round(parseFloat($(matches[i]).find('td:nth-child(6)').text().split('%')[0]) * 100) / 100,
                prediction_2: Math.round(parseFloat($(matches[i]).find('td:nth-child(7)').text().split('%')[0]) * 100) / 100,
            }

            if (Math.round(parseFloat($(matches[i]).find('td:nth-child(5)').text().split('%')[0]) * 100) / 100 >= 60) {
                mybet_MatchData.push(matchData)                
            }
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

            if ($(matches[i]).find('td:nth-child(3)').text() === '1') {
                supatips_MatchData.push(matchData)
            }
        }
    })

    getAllMatchData('https://www.footballtips.com/accumulator-tips/').then(function (html) {
        
        let matchData;
        const winPredictionsTitle = $(html).contents().find('.tips-grid li .tips-card__name').closest('.bet').find('.heading__title') || [];

        for (let i = 0; i < winPredictionsTitle.length; i++) { 
            if (winPredictionsTitle[i].innerText === 'Win Accumulator') {
                const matches = $(winPredictionsTitle[i]).closest('.bet').find('.tips-grid li .tips-card__name');
                
                for (let i = 0; i < matches.length; i++) { 

                    matchData = {
                        website: 'footballtips',
                        homeTeam: $(matches[i]).find('.tips-card__name-one').text().split(' v ')[0].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                        awayTeam: $(matches[i]).find('.tips-card__name-one').text().split(' v ')[1].trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                        prediction_1: $(matches[i]).find('.tips-card__name-two').text() === 'Home win' ? true : false,
                        prediction_x: $(matches[i]).find('.tips-card__name-two').text() === 'Draw' ? true : false,
                        prediction_2: $(matches[i]).find('.tips-card__name-two').text() === 'Away win' ? true : false,
                    }

                    if ($(matches[i]).find('.tips-card__name-two').text() === 'Home win') {
                        footballtips_MatchData.push(matchData)
                    }
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

            if (winnerTeam === homeTeam) {
                sportytrader_MatchData.push(matchData)
            }
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

            if ($(matches[i]).find('td:nth-child(3)').text() === '1') {
                betensured_MatchData.push(matchData)
            }
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

                if (winnerTeam === homeTeam) {
                    olbg_MatchData.push(matchData)
                }
            }
        }
    })

})

/* 
    Bind EventListeners
*/ 

$('html').on('click', '.save-button', function() {
    setDataToLocalStorage(getToDay(), JSON.stringify(allMatchesTodayFiltered));
});

$('html').on('click', '.set-button', function() {
    const selectedDay = $('#datepicker').val();
    const localStorageData = getDataFromLocalStorage(selectedDay);

    if (localStorageData !== null) {
        const day = selectedDay.split('.')[0];
        const month = selectedDay.split('.')[1];
        const year = selectedDay.split('.')[2];

        mergeResultMatchesFromBetexplorer(selectedDay, 'year=' + year + '&month=' + month + '&day=' + day, localStorageData);

    } else {
        alert('Zvolený dátum neobsahuje žiadne dáta.')
    }
});

$('html').on('click', '.load-button', function() {
    allMatchesTodayFiltered = [];

    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, scibet_MatchData);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, zulubet_MatchData);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, windrawwin_MatchData);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, vitibet_MatchData);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, mybet_MatchData);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, supatips_MatchData);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, footballtips_MatchData);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, sportytrader_MatchData);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, betensured_MatchData);
    mergeAllMatchesWithAllFiltredMatchces(allMatchesToday, olbg_MatchData);

    const newArray = allMatchesTodayFiltered.sort((a, b) => (a.found < b.found) ? 1 : -1);

    console.log('Zhoda    Čas    Kurz      Zápas | Liga')
    newArray.forEach(array => {
        console.log('  ' + array.found + '     ' + array.matchTime + '   ' + array.odds_1 + '      ' + array.homeTeam + ' - ' + array.awayTeam + ' | ' + array.league);
    })
});

const mergeAllMatchesWithAllFiltredMatchces = (allMatches, filteredMatches) => {
    for (let i = 0; i < filteredMatches.length; i++) { 
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
            
            let duplicate = null;
            allMatchesTodayFiltered.forEach((match, i) => {
                if (match.id === findHomeTeam[0].homeTeam + findAwayTeam[0].awayTeam) {
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
                    matchTime: findHomeTeam[0].matchTime,
                    homeTeam: findHomeTeam[0].homeTeam,
                    awayTeam: findAwayTeam[0].awayTeam,
                    league: findHomeTeam[0].league,
                    website: [filteredMatches[i].website],
                    odds_1: findHomeTeam[0].odds_1,
                    odds_x: findHomeTeam[0].odds_x,
                    odds_2: findHomeTeam[0].odds_2,
                    id: findHomeTeam[0].homeTeam + findAwayTeam[0].awayTeam,
                })
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

                    Object.assign(match, {reslut: {
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

function getToDay() {
    const date = new Date;
    return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth()+1)).slice(-2) + '.' + date.getFullYear();
}

function sortNumber(a, b) {
    return a - b;
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