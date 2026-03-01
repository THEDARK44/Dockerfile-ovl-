module.exports = {
    command: ["menu", "help", "ping", "owner", "runtime"],
    exec: async (sock, from, mek, args) => {
        const cmd = mek.message.conversation || mek.message.extendedTextMessage?.text;
        const type = cmd.slice(1).trim().split(' ')[0].toLowerCase();

        if (type === "ping") {
            await sock.sendMessage(from, { text: "🏮 *Vitesse de l'éclair :* Stable" }, { quoted: mek });
        }
        
        if (type === "owner") {
            await sock.sendMessage(from, { text: `👑 *Mon créateur est THE_DARK.*\nContact: 0100268983` }, { quoted: mek });
        }

        if (type === "menu" || type === "help") {
            let menu = `🌸 *BIENVENUE DANS L'EMPIRE SAKURA* 🌸\n\n`;
            menu += `👤 *Maître :* THE_DARK\n`;
            menu += `📌 *Préfixe :* .\n\n`;
            menu += `*--- COMMANDES DISPONIBLES ---*\n`;
            menu += `📝 .sticker (ou .s)\n`;
            menu += `🚫 .kick (admin)\n`;
            menu += `➕ .add (admin)\n`;
            menu += `⚙️ .runtime\n`;
            menu += `👑 .owner\n\n`;
            menu += `_Sakura 🌸🌸 en cours de déploiement..._`;
            await sock.sendMessage(from, { text: menu }, { quoted: mek });
        }
    }
}
	
