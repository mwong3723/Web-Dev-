import express from 'express';
import fs from 'fs';
import path from 'path';

// Get the directory name of the current module
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const SIGNATURES_FILE = path.join(__dirname, '../data/signatures.json');

const router = express.Router();

// GET all signatures
router.get('/', (req, res) => {
    fs.readFile(SIGNATURES_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading file');
        const signatures = JSON.parse(data || '[]');
        res.json(signatures);
    });
});

// POST a new signature
router.post('/', express.json(), (req, res) => {
    const { name, comment } = req.body;

    if (!name) return res.status(400).json({ error: 'Name is required' });

    fs.readFile(SIGNATURES_FILE, 'utf8', (err, data) => {
        const signatures = JSON.parse(data || '[]');
        const newSignature = { name, comment };
        signatures.push(newSignature);

        fs.writeFile(SIGNATURES_FILE, JSON.stringify(signatures, null, 2), err => {
            if (err) return res.status(500).json({ error: 'Failed to save' });
            res.status(201).json(newSignature);
        });
    });
});

export default router;
