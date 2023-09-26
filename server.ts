import express from 'express';
import path from 'path';
import morgan from 'morgan';

const app = express();
const port = 4000;
app.use(morgan('combined'));

let requestCount = 0;
let lastHomePageRequestTime = Date.now();

function generateGradient() {
    const color1 = Math.floor(Math.random() * 16777215).toString(16);
    const color2 = Math.floor(Math.random() * 16777215).toString(16);
    const angle = Math.floor(Math.random() * 360);
    return `linear-gradient(${angle}deg, #${color1}, #${color2})`;
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    requestCount++;
    lastHomePageRequestTime = Date.now();
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/library.html', (req, res) => {
    requestCount++;
    res.sendFile(path.join(__dirname, 'library.html'));
});

app.get('/gradient', (req, res) => {
    requestCount++;
    res.send({ gradient: generateGradient(), requestCount });
});

app.get('/lastHomePageRequestTime', (req, res) => {
    requestCount++;
    res.send({ lastHomePageRequestTime });
});

app.get('/404.html',(req, res) => {
    requestCount++;
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Обработка 404 ошибки
app.use((req, res) => {
    requestCount++;
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
