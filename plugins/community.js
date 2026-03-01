module.exports = {
    command: ["del", "link", "reset", "infogp", "poll"],
    exec: async (sock, from, mek, args) => {
        const sender = mek.key.participant || mek.key.remoteJid;
        const metadata = await sock.groupMetadata(from);
        const admins = metadata.participants.filter(p => p.admin !== null).map(p => p.id);
        const isOwner = sender.includes("0100268983");
        const isAdmin = admins.includes(sender);

        if (!isOwner && !isAdmin) return sock.sendMessage(from, { text: "🚫 Réservé à l'État-Major." });

        const cmd = body.slice(1).trim().split(' ')[0].toLowerCase();

        // --- SUPPRIMER UN MESSAGE (Le pouvoir de censure) ---
        if (cmd === "del") {
            if (!mek.message.extendedTextMessage?.contextInfo?.quotedMessage) {
                return sock.sendMessage(from, { text: "📌 Répondez au message à supprimer avec *.del*" });
            }
            const key = {
                remoteJid: from,
                fromMe: false,
                id: mek.message.extendedTextMessage.contextInfo.stanzaId,
                participant: mek.message.extendedTextMessage.contextInfo.participant
            };
            await sock.sendMessage(from, { delete: key });
        }

        // --- RÉCUPÉRER LE LIEN D'INVITATION ---
        if (cmd === "link") {
            const code = await sock.groupInviteCode(from);
            await sock.sendMessage(from, { text: `🔗 *LIEN D'INVITATION :*\nhttps://chat.whatsapp.com/${code}` });
        }

        // --- CRÉER UN SONDAGE RAPIDE ---
        if (cmd === "poll") {
            const question = args.join(" ");
            if (!question) return sock.sendMessage(from, { text: "📌 Posez une question pour le sondage." });
            await sock.sendMessage(from, {
                poll: {
                    name: `📊 *SONDAGE IMPÉRIAL*\n${question}`,
                    values: ["✅ OUI", "❌ NON", "🤔 PEUT-ÊTRE"],
                    selectableCount: 1
                }
            });
        }

        // --- INFOS DÉTAILLÉES DU GROUPE ---
        if (cmd === "infogp") {
            let info = `🏮 *ARCHIVES DE LA COMMUNAUTÉ*\n\n`;
            info += `📌 *Nom :* ${metadata.subject}\n`;
            info += `👥 *Membres :* ${metadata.participants.length}\n`;
            info += `👑 *Créateur :* @${metadata.owner?.split('@')[0]}\n`;
            info += `📝 *Description :* ${metadata.desc || 'Aucune'}`;
            await sock.sendMessage(from, { text: info, mentions: [metadata.owner] });
        }
    }
}

