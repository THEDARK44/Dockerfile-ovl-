const axios = require('axios');

module.exports = {
    command: ["anime", "manga", "neko", "waifu"],
    exec: async (sock, from, mek, args) => {
        const text = args.join(" ");
        const cmd = mek.message.conversation || mek.message.extendedTextMessage?.text;
        const type = cmd.slice(1).trim().split(' ')[0].toLowerCase();

        if (type === "waifu" || type === "neko") {
            const res = await axios.get(`https://api.waifu.pics/sfw/${type}`);
            await sock.sendMessage(from, { image: { url: res.data.url }, caption: `🌸 Voici votre ${type}, Maître.` }, { quoted: mek });
        }

        if (type === "anime") {
            if (!text) return sock.sendMessage(from, { text: "📌 Quel anime cherchez-vous ?" });
            await sock.sendMessage(from, { text: `🔍 *RECHERCHE ANIME : ${text}*\n\n(Résultats bientôt disponibles via Jikan API)` });
        }
    }
}

