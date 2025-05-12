const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/top-albums", async (req, res) => {
    try {
        const response = await axios.get(
            "https://itunes.apple.com/us/rss/topalbums/limit=20/json"
        );

        const items = response.data.feed.entry.map((entry) => ({
            albumName: entry["im:name"].label,
            artist: entry["im:artist"].label,
            image: entry["im:image"][2].label,
            id: entry.id.attributes["im:id"],
        }));

        res.json(items);
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch top albums" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app.get("/api/album-tracks", async (req, res) => {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "Album ID required" });

    try {
        const response = await axios.get("https://itunes.apple.com/lookup", {
            params: {
                id,
                entity: "song",
            },
        });

        // The first item is album metadata, the rest are tracks
        const tracks = response.data.results.slice(1);
        res.json(tracks);
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch album tracks" });
    }
});

app.get("/api/search", async (req, res) => {
    const { term } = req.query;
    if (!term) return res.status(400).json({ error: "Missing search term" });

    try {
        const response = await axios.get("https://itunes.apple.com/search", {
            params: {
                term,
                entity: "album",
                media: "music",
                limit: 25,
            },
        });

        res.json(response.data.results);
    } catch (e) {
        res.status(500).json({ error: "Search failed" });
    }
});