const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Vellzyy Express API v5 is running! 🚀');
});

app.get('/joke', async (req, res) => {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Gagal ambil joke' });
  }
});

app.get('/time', (req, res) => {
  res.json({ timestamp: new Date().toISOString() });
});

const createBratHandler = (baseUrl) => async (req, res) => {
  const text = req.query.text || 'Halo';
  try {
    const response = await axios.get(`${baseUrl}?text=${encodeURIComponent(text)}`, { responseType: 'arraybuffer' });
    res.set('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Gagal generate Brat' });
  }
};

app.get('/brat-gojo', createBratHandler('https://api-nanzz.my.id/docs/api/maker/brat/brat-gojo.php'));
app.get('/brat-naruto', createBratHandler('https://api-nanzz.my.id/docs/api/maker/brat/brat-naruto.php'));
app.get('/brat-prabowo', createBratHandler('https://api-nanzz.my.id/docs/api/maker/brat/brat-prabowo.php'));
app.get('/brat-vtuber-lipin', createBratHandler('https://api-nanzz.my.id/docs/api/maker/brat/brat-vtuber-lipin.php'));
app.get('/brat-video', createBratHandler('https://api-nanzz.my.id/docs/api/maker/brat/bratvid.php'));

app.listen(port, () => {
  console.log(`Server jalan di port ${port}`);
});