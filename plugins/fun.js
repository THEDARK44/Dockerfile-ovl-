module.exports = {
    command: ["gay", "love", "blague", "fb"],
    exec: async (sock, from, mek, args) => {
        const cmd = mek.message.conversation || mek.message.extendedTextMessage?.text;
        const type = cmd.slice(1).trim().split(' ')[0].toLowerCase();

        if (type === "gay") {
            const percentage = Math.floor(Math.random() * 100);
            await sock.sendMessage(from, { text: `🏳️‍🌈 Test de pureté : @${mek.key.participant?.split('@')[0]} est gay à *${percentage}%* !`, mentions: [mek.key.participant] });
        }

        if (type === "blague") {
            const blagues = [
                "Pourquoi les plongeurs plongent-ils toujours en arrière ? Parce que sinon ils tombent dans le bateau.",
                "Qu'est-ce qu'un nem avec des écouteurs ? Un nem-p3."
            ];
            await sock.sendMessage(from, { text: `😂 ${blagues[Math.floor(Math.random() * blagues.length)]}` });
        }
    }
}

