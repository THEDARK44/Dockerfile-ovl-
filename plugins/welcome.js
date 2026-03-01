module.exports = {
    command: ["welcome"],
    exec: async (sock, from, mek, args) => {
        if (args[0] === "on") {
            await sock.sendMessage(from, { text: "✨ *ACCUEIL ACTIVÉ :* Sakura saluera chaque nouvel arrivant." });
        }
    }
}

// Note : La détection se fait via sock.ev.on('group-participants.update') dans l'index.

