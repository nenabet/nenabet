import { queryAllByAltText } from '@testing-library/react';
import React, { useState, useCallback, useEffect, Component } from 'react';
import { Helmet } from 'react-helmet'

import '../styles/global.css'
import '../styles/landing.css'

import $, { timers } from 'jquery';

function inputClick() {
    document.getElementById('search').style.width = '500px'
}

function searchPreview(key) {
    document.getElementById('searchPreview').innerHTML = `Pesquisar sobre: ${key.target.value}`

    if(key.target.value == '') {
        document.getElementById('searchPreview').innerHTML = 'Está afim de apostar?'
        document.getElementById('search').style.width = '300px'
    }
}

function NextGames() {
    document.getElementById('nextGameButton').style.width = '500px'
    document.getElementById('nextGameButton').disabled = true

    document.getElementById('leagueSearchTitle').hidden = false

    document.getElementById('mainSearch').hidden = true

    document.getElementById('leagueSearchDiv').hidden = false

    document.body.style.backgroundImage = "url(https://media.giphy.com/media/xT1XGx3mIWL2J6PMWc/giphy.gif)"

    // fetch("https://api-football-beta.p.rapidapi.com/leagues", {
	// "method": "GET",
	// "headers": {
	// 	"x-rapidapi-host": "api-football-beta.p.rapidapi.com",
	// 	"x-rapidapi-key": "8c44531f8emshe10a8bb9fd42edfp122e20jsnead2ff1e33c9"
	// }
    // })
    // .then(res => res.json())
    // .then(ligas => {
    //     console.log(ligas)

    //     document.getElementById('loadingGIF').hidden = true

    //     document.getElementById('nextGameButton').innerHTML = `Ligas encontradas: ${ligas.results}`
        
    //     document.getElementById('pageCount').hidden = false
    //     document.getElementById('pageCount').innerHTML = `Quantidade de páginas: ${ligas.paging.total}`

    //     console.log(ligas.response)

    //     let primeiro = ligas.response[0]

    //     console.log(`Primeiro ${primeiro}`)
    // })
    // .catch(err => {
    //     console.log(err);
    // });
}

function inputRise() {
    document.getElementById('leagueNameInput').style.width = '500px'
}

function leagueSearch() {
    let querryText = document.getElementById('leagueNameInput').value

    if(!querryText) {
        document.getElementById('leagueNameError').hidden = false

        setTimeout(() => {
            document.getElementById('leagueNameError').hidden = true
        }, 3000);

        return;
    }

    document.getElementById('loadingGIF').hidden = false

    fetch(`https://api-football-beta.p.rapidapi.com/leagues?name=${querryText}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "api-football-beta.p.rapidapi.com",
		"x-rapidapi-key": "8c44531f8emshe10a8bb9fd42edfp122e20jsnead2ff1e33c9"
	}
    })
    .then(res => res.json())
    .then(resp => {

        document.getElementById('loadingGIF').hidden = true

        console.log(resp)
        document.getElementById('leagueName').innerHTML = `Nome da liga: ${querryText}`
        document.getElementById('leagueCountry').innerHTML = `País da liga: ${resp.response[0].country.name}`

        document.getElementById('leagueFlag').hidden = false
        document.getElementById('leagueFlag').src = `${resp.response[0].league.logo}`

        let seasons = resp.response[0].seasons

        var str = '<ul>'
        
        seasons.forEach(function(season) {
            str += '<li>'+ JSON.stringify(season.year) + '</li>';

            if(season.current == true) {
                str += '<li style={{color: "red"}}>'+ `${JSON.stringify(season.year)} (Atual)` + '</li>';
            }
        });

        document.getElementById('seasonTitle').hidden = false
        document.getElementById("leagueSeasons").innerHTML = str;
    })
    .catch(err => {
        console.log(err);
    });
}

function leagueEnter(league) {
    document.getElementById('leaguePreview').innerHTML = `Pesquisar pela liga: ${league.target.value}`

    if(league.target.value == '') {
        document.getElementById('leaguePreview').innerHTML = ''
    }
}

function Landing() {
    return(
        <div className="content">

            <Helmet>
                <title>Nenabet</title>
            </Helmet>

            <form>

                <div className="headerTitle" style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems:'center'}}>
                    <h1 style={{fontSize:'50px'}}>NenaBet</h1>
                    <h2 style={{fontSize:'30px', color:'red'}} id='searchPreview'>Está afim de apostar?</h2>
                </div>

                <div className="mainSearch" id="mainSearch">
                    <div className="searchInput" style={{display:'flex', justifyContent:'center'}}>
                        <input id="search" onClick={inputClick} placeholder='Pesquisa aí vai' onChange={searchPreview}></input>
                    </div>
                </div>

                <div className="nextGameButtonDiv" style={{display: 'flex', justifyContent:'center', marginTop:'30px'}}>
                    <button id="nextGameButton" onClick={NextGames} type='button'>Pesquisar por liga</button>
                </div>

                <div className="leagueSearchDiv" id="leagueSearchDiv" hidden>
                    <h1 id='leagueSearchTitle' hidden>NenaBet - Ligas</h1>

                    <div id="leagueNameDiv" style={{display: 'flex', justifyContent:'center', marginTop: '30px'}}>
                        <input placeholder='País da liga (Em inglês)' onClick={inputRise} id="leagueNameInput" onChange={leagueEnter}></input>
                    </div>

                    <h3 id="leagueNameError" style={{color: 'red'}} hidden>O nome da liga é obrigatório</h3>

                    <div id="leagueSearchPreview">
                        <h2 id="leaguePreview"></h2>
                    </div>

                    <div id="leagueButtonDiv" style={{display:'flex', justifyContent:'center', marginTop:'30px'}}>
                        <button style={{backgroundColor:'red'}} type='button' onClick={leagueSearch} id="confirmLeagueButton">Pesquisar</button>
                    </div>

                    <div id="leagueInfo" style={{ display: 'flex', justifyContent:'center', marginTop: '15px', flexDirection: 'column'}}>
                        <img src="" style={{height:'120px', width:'150px'}} id="leagueFlag" hidden></img>

                        <h3 style={{marginLeft: '10px'}} id="leagueName"></h3>

                        <h3 style={{marginLeft: '10px', marginTop: '10px'}} id="leagueCountry"></h3>
                    </div>

                    <h2 id="seasonTitle" hidden>Temporadas jogadas: </h2>
                    <div className="leagueSeasons" id="leagueSeasons">
                    </div>
                </div>

                <div id="loadingImg" style={{display:'flex', justifyContent:'center'}}>
                    <img src='https://media.giphy.com/media/jAYUbVXgESSti/giphy.gif' hidden id="loadingGIF"></img>
                </div>

                <div id="leagueOptions" style={{marginTop:'30px'}}>
                    <h2 id="pageCount"></h2>
                </div>
            </form>

        </div>
    )
}

export default Landing