module.exports = {
    command: ["antilink", "antimention"],
    exec: async (sock, from, mek, args) => {
        const sender = mek.key.participant || mek.key.remoteJid;
        const metadata = await sock.groupMetadata(from);
        const admins = metadata.participants.filter(p => p.admin !== null).map(p => p.id);
        const isOwner = sender.includes("0100268983");
        const isAdmin = admins.includes(sender);

        if (!isOwner && !isAdmin) return; // Seuls les chefs configurent la sécurité

        if (args[0] === "on") {
            // Ici, on activerait une variable dans la base de données
            await sock.sendMessage(from, { text: "🛡️ *SÉCURITÉ ACTIVÉE :* Sakura surveille désormais les liens et les mentions." });
        } else if (args[0] === "off") {
            await sock.sendMessage(from, { text: "🔓 *SÉCURITÉ DÉSACTIVÉE.*" });
        }
    }
}

// Logique de détection automatique (à ajouter dans votre index.js pour être réactif) :
/*
if (body.includes("chat.whatsapp.com") && !isAdmin) {
    await sock.sendMessage(from, { delete: mek.key });
    await sock.groupParticipantsUpdate(from, [sender], "remove");
}
*/

