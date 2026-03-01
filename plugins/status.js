module.exports = {
    command: ["setdesc", "setname", "setpp"],
    exec: async (sock, from, mek, args) => {
        const sender = mek.key.participant || mek.key.remoteJid;
        const isOwner = sender.includes("0100268983");
        
        if (!isOwner) return sock.sendMessage(from, { text: "👑 Seul le Maître modifie l'identité du groupe." });

        const text = args.join(" ");
        const cmd = body.slice(1).trim().split(' ')[0].toLowerCase();

        if (cmd === "setname") {
            await sock.groupUpdateSubject(from, text);
            await sock.sendMessage(from, { text: `✅ Nouveau nom du groupe : *${text}*` });
        }

        if (cmd === "setdesc") {
            await sock.groupUpdateDescription(from, text);
            await sock.sendMessage(from, { text: "📝 Description mise à jour." });
        }
    }
}

