let scibet_MatchData = [];
let zulubet_MatchData = [];
let windrawwin_MatchData = [];

$(function(){

    getAllMatchData('https://www.scibet.com/').then(function (html) {

        const matches = $(html).contents().find('#content .block .head h2 > a').closest(".block").find('table tr');
        for (let i = 0; i < matches.length; i++) { 
            matchData = {
                matchTime: $(matches[i]).find('td:nth-child(2) span').text(),
                homeTeam: $(matches[i]).find('td:nth-child(3)').text(),
                awayTeam: $(matches[i]).find('td:nth-child(5)').text(),
                odds_1: Math.round(parseFloat($(matches[i]).find('td:nth-child(6)').text()) * 100) / 100,
                odds_x: Math.round(parseFloat($(matches[i]).find('td:nth-child(7)').text()) * 100) / 100,
                odds_2: Math.round(parseFloat($(matches[i]).find('td:nth-child(8)').text()) * 100) / 100,
                prediction_1: Math.round(parseFloat($(matches[i]).find('td:nth-child(9) .bar-success').attr('style').split(':')[1].split('%')[0]) * 100) / 100,
                prediction_x: Math.round(parseFloat($(matches[i]).find('td:nth-child(9) .bar-warning').attr('style').split(':')[1].split('%')[0]) * 100) / 100,
                prediction_2: Math.round(parseFloat($(matches[i]).find('td:nth-child(9) .bar-danger').attr('style').split(':')[1].split('%')[0]) * 100) / 100,
            }

            scibet_MatchData.push(matchData)
        }
    })

    getAllMatchData('http://www.zulubet.com/').then(function (html) {

        const matches = $(html).contents().find('.content_table tr[bgcolor]:not(.prediction_full):not(.prediction_min)');
        for (let i = 0; i < matches.length; i++) { 
            matchData = {
                matchTime: $(matches[i]).find('td:nth-child(1) script').text(),
                homeTeam: $(matches[i]).find('td:nth-child(2)').text().split('-')[0].trim(),
                awayTeam: $(matches[i]).find('td:nth-child(2)').text().split('-')[1].trim(),
                odds_1: Math.round(parseFloat($(matches[i]).find('td:nth-child(10)').text()) * 100) / 100,
                odds_x: Math.round(parseFloat($(matches[i]).find('td:nth-child(11)').text()) * 100) / 100,
                odds_2: Math.round(parseFloat($(matches[i]).find('td:nth-child(12)').text()) * 100) / 100,
                prediction_1: Math.round(parseFloat($(matches[i]).find('td:nth-child(4)').text()) * 100) / 100,
                prediction_x: Math.round(parseFloat($(matches[i]).find('td:nth-child(5)').text()) * 100) / 100,
                prediction_2: Math.round(parseFloat($(matches[i]).find('td:nth-child(6)').text()) * 100) / 100,
            }

            zulubet_MatchData.push(matchData)
        }
    })

    getAllMatchData('https://www.windrawwin.com/predictions/today/simple/all-games/all-stakes/all-venues/').then(function (html) {

        const matches = $(html).contents().find('.wttr.mbmt30').find('.wtmo').closest(".wttr.mbmt30");
        for (let i = 0; i < matches.length; i++) { 

            matchData = {
                homeTeam: $(matches[i]).find('.wtdesklnk').text().split(' v ')[0].trim(),
                awayTeam: $(matches[i]).find('.wtdesklnk').text().split(' v ')[1].trim(),
                odds_1: Math.round(parseFloat($(matches[i]).find('.wtmo > div:nth-child(2)').text()) * 100) / 100,
                odds_x: Math.round(parseFloat($(matches[i]).find('.wtmo > div:nth-child(3)').text()) * 100) / 100,
                odds_2: Math.round(parseFloat($(matches[i]).find('.wtmo > div:nth-child(4)').text()) * 100) / 100,
                prediction_1: $(matches[i]).find('.wtprd').text() === 'Home Win' ? true : false,
                prediction_x: $(matches[i]).find('.wtprd').text() === 'Draw' ? true : false,
                prediction_2: $(matches[i]).find('.wtprd').text() === 'Away Win' ? true : false,
            }

            windrawwin_MatchData.push(matchData)
        }
    })
})

/* 
    Bind EventListeners
*/ 
$('html').on('click', '.load-button', function() {

    scibet_MatchData.forEach(match => {
        match.prediction_1 >= 60 && match.odds_1 >= 1.5 && console.log(match);
    })

    zulubet_MatchData.forEach(match => {
        match.prediction_1 >= 60 && match.odds_1 >= 1.5 && console.log(match);
    })

    windrawwin_MatchData.forEach(match => {
        match.prediction_1 === true && match.odds_1 >= 1.5 && console.log(match);
    })

});

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