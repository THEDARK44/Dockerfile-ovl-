module.exports = {
    command: ["balance", "daily", "bet", "give"],
    exec: async (sock, from, mek, args) => {
        const cmd = mek.message.conversation || mek.message.extendedTextMessage?.text;
        const type = cmd.slice(1).trim().split(' ')[0].toLowerCase();
        const user = mek.key.participant || mek.key.remoteJid;

        // Note: Normalement on utilise une base de données, ici on simule pour le test
        if (type === "daily") {
            await sock.sendMessage(from, { text: `🌸 *Récompense Journalière*\n\nVous avez reçu *500 SakuraCoins* ! 💰` }, { quoted: mek });
        }

        if (type === "balance") {
            await sock.sendMessage(from, { text: `🏦 *BANQUE DE L'EMPIRE*\n\nPortefeuille de @${user.split('@')[0]} :\n💰 *1,250 SakuraCoins*`, mentions: [user] }, { quoted: mek });
        }

        if (type === "bet") {
            const amount = args[0] || 0;
            if (amount <= 0) return sock.sendMessage(from, { text: "📌 Misez une somme, Chef !" });
            const win = Math.random() > 0.5;
            const result = win ? `gagné ${amount * 2}` : `perdu ${amount}`;
            await sock.sendMessage(from, { text: `🎲 *CASINO SAKURA*\n\nVous avez ${result} SakuraCoins !` }, { quoted: mek });
        }
    }
}

