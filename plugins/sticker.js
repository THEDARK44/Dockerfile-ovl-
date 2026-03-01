module.exports = {
    command: ["s", "sticker"],
    exec: async (sock, from, mek, args) => {
        await sock.sendMessage(from, { text: "🌸 Envoi de l'image pour conversion..." }, { quoted: mek });
        // Code de conversion ici...
    }
}

