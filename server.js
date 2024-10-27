const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

function readCounters(){
    try {
        const data = fs.readFileSync('counters.json','utf8');
        return JSON.parse(data);

    } catch(err) {
        return { homeViews: 0, aboutViews: 0};
    }
}

function writeCounters (counters){
    fs.writeFileSync('counters.json', JSON.stringify(counters), 'utf8');
}

let counters = readCounters();

app.get('/', (req, res) => {
    counters.homeViews++;
writeCounters(counters);
res.send(`
    <h1>Главная страница</h1>
    <p>Просмотров этой страницы: ${counters.homeViews}</p>
    <a href="/about">Перейти на страницу "/about"</a>
`);
});

app.get('/about', (req, res) => {
    counters.aboutViews++;
    writeCounters(counters);
    res.send(`
        <h1>Страница "О нас"</h1>
        <p>Просмотров этой страницы: ${counters.aboutViews}</p>
        <a href="/">Перейти на главную страницу</a>
    `);
});

app.use((req, res) => {
    res.status(404).send(`
        <h1>404 - Страница не найдена</h1>
        <a href="/">Перейти на главную страницу</a>
    `);
});

app.listen(port, () => {
    console.log(`Сервер запущен по адресу http://localhost:${port}`);
});
