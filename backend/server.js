const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Veri dosyaları
const landmarkFile = './landmarks.json';
const visitedFile = './visited.json';

// Başlangıçta dosyaları oku veya boş dizi başlat
let landmarks = fs.existsSync(landmarkFile)
    ? JSON.parse(fs.readFileSync(landmarkFile, 'utf8'))
    : [];

let visitedNotes = fs.existsSync(visitedFile)
    ? JSON.parse(fs.readFileSync(visitedFile, 'utf8'))
    : [];

// Landmark oluşturma
app.post('/api/landmarks', (req, res) => {
    const { id, name, latitude, longitude, description, category } = req.body;

    const newLandmark = {
        id,
        name,
        location: { latitude, longitude },
        description,
        category
    };

    landmarks.push(newLandmark);
    fs.writeFileSync(landmarkFile, JSON.stringify(landmarks, null, 2));
    res.status(201).json(newLandmark);
});

// Tüm landmark verileri
app.get('/api/landmarks', (req, res) => {
    res.json(landmarks);
});

// Tek bir landmark
app.get('/api/landmarks/:id', (req, res) => {
    const landmark = landmarks.find(l => l.id == req.params.id);
    if (!landmark) return res.status(404).json({ error: "Not found" });
    res.json(landmark);
});

// Landmark güncelle
app.put('/api/landmarks/:id', (req, res) => {
    const index = landmarks.findIndex(l => l.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: "Not found" });

    landmarks[index] = { ...landmarks[index], ...req.body };
    fs.writeFileSync(landmarkFile, JSON.stringify(landmarks, null, 2));
    res.json(landmarks[index]);
});

// Landmark sil
app.delete('/api/landmarks/:id', (req, res) => {
    landmarks = landmarks.filter(l => l.id != req.params.id);
    fs.writeFileSync(landmarkFile, JSON.stringify(landmarks, null, 2));
    res.json({ message: "Deleted" });
});

// Ziyaret kaydı oluştur
app.post('/api/visited', (req, res) => {
    const { landmark_id, visited_date, visitor_name, visiting_note } = req.body;
    const found = landmarks.find(l => l.id === landmark_id);
    if (!found) return res.status(404).json({ error: "Landmark not found" });

    const newVisit = {
        id: Date.now(),
        landmark_id,
        name: found.name,
        visited_date,
        visitor_name,
        visiting_note
    };

    visitedNotes.push(newVisit);
    fs.writeFileSync(visitedFile, JSON.stringify(visitedNotes, null, 2));
    res.status(201).json(newVisit);
});

// Tüm ziyaret notları
app.get('/api/visited', (req, res) => {
    res.json(visitedNotes);
});

// Belirli bir ziyaret
app.get('/api/visited/:id', (req, res) => {
    const visit = visitedNotes.find(v => v.id == req.params.id);
    if (!visit) return res.status(404).json({ error: "Not found" });
    res.json(visit);
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});