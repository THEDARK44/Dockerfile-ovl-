module.exports = {
    command: ["animotaku", "actu", "fb"],
    exec: async (sock, from, mek, args) => {
        const fbUrl = "https://www.facebook.com/animotaku.fr/";
        
        // Message d'information pour les membres
        let info = `🏮 *RELAIS OFFICIEL ANIMOTAKU* 🏮\n\n`;
        info += `Retrouvez toute l'actualité Anime & Manga ici :\n${fbUrl}\n\n`;
        info += `⚠️ *Note :* Sakura filtre automatiquement les publicités pour ne garder que les annonces majeures.`;

        await sock.sendMessage(from, { 
            text: info,
            contextInfo: {
                externalAdReply: {
                    title: "Empire Sakura x AnimOtaku",
                    body: "Actualités filtrées en temps réel",
                    sourceUrl: fbUrl,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: mek });
    }
}

