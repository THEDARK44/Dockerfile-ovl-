module.exports = {
    command: ["tiktok", "ytmp3", "ytmp4", "play"],
    exec: async (sock, from, mek, args) => {
        if (!args[0]) return sock.sendMessage(from, { text: "📌 Donnez-moi un lien, Chef !" });
        await sock.sendMessage(from, { text: "⏳ *Sakura récupère le média...* cela prendra quelques secondes." });
        // L'intégration des API de téléchargement se fera sur l'hébergeur pour plus de vitesse.
    }
}

