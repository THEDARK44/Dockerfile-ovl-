module.exports = {
    command: ["kick", "add", "promote", "demote", "tagall", "mute", "unmute", "warn"],
    exec: async (sock, from, mek, args) => {
        if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: "❌ Uniquement en groupe, Chef !" });

        const sender = mek.key.participant || mek.key.remoteJid;
        const metadata = await sock.groupMetadata(from);
        const participants = metadata.participants;
        const admins = participants.filter(p => p.admin !== null).map(p => p.id);
        const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
        
        // --- LES GARDES-FOUS ---
        const isOwner = sender.includes("0100268983"); // THE_DARK
        const isAdmin = admins.includes(sender);
        const isBotAdmin = admins.includes(botId);

        // Récupération de la commande
        const body = mek.message.conversation || mek.message.extendedTextMessage?.text || "";
        const cmd = body.slice(1).trim().split(' ')[0].toLowerCase();

        // 1. Blocage de sécurité pour les membres simples
        if (!isOwner && !isAdmin) {
            return sock.sendMessage(from, { text: "🚫 *ACCÈS REFUSÉ.*\nSeule la Garde Impériale ou le Chef peut utiliser cette commande." });
        }

        // 2. Commandes réservées au CHEF UNIQUEMENT
        if (["promote", "demote"].includes(cmd) && !isOwner) {
            return sock.sendMessage(from, { text: "👑 Seul le Maître *THE_DARK* peut nommer ou destituer des Généraux." });
        }

        // --- EXÉCUTION DES COMMANDES ---

        switch (cmd) {
            case "kick":
                if (!isBotAdmin) return sock.sendMessage(from, { text: "❌ Nommez-moi Admin pour expulser." });
                let usersToKick = mek.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
                if (usersToKick.length === 0) return sock.sendMessage(from, { text: "📌 Identifiez la cible avec @." });
                await sock.groupParticipantsUpdate(from, usersToKick, "remove");
                await sock.sendMessage(from, { text: "🚮 Élimination terminée." });
                break;

            case "tagall":
                let msg = `📣 *APPEL GÉNÉRAL DE L'EMPIRE*\n\n`;
                for (let part of participants) msg += `@${part.id.split('@')[0]}\n`;
                await sock.sendMessage(from, { text: msg, mentions: participants.map(a => a.id) });
                break;

            case "mute":
                if (!isBotAdmin) return sock.sendMessage
}

