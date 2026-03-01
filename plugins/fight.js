const combats = {};

module.exports = {
    command: ["fight", "choisir", "action", "attaque"],
    exec: async (sock, from, mek, args) => {
        const sender = mek.key.participant || mek.key.remoteJid;
        const body = (mek.message.conversation || mek.message.extendedTextMessage?.text || "").trim();
        const cmd = body.slice(1).split(' ')[0].toLowerCase();

        if (cmd === "fight") {
            const target = mek.message.extendedTextMessage?.contextInfo?.mentionedJid[0];
            if (!target) return sock.sendMessage(from, { text: "Identifie un autre mortel à humilier, humain." });
            
            combats[from] = { p1: { id: sender, hp: 100, perso: "", action: "" }, p2: { id: target, hp: 100, perso: "", action: "" }, status: "CHOIX" };
            await sock.sendMessage(from, { 
                text: `⚖️ *L'ARÈNE DU MÉPRIS*\n\nDeux créatures insignifiantes vont tenter de briller... Amusez-moi.\n\n👉 *.choisir <Nom>*\n👉 *.action <Attaque>*`,
                mentions: [sender, target]
            });
        }

        if (cmd === "choisir") {
            const combat = combats[from]; if (!combat) return;
            const joueur = (sender === combat.p1.id) ? combat.p1 : combat.p2;
            if (joueur) {
                joueur.perso = args.join(" ");
                await sock.sendMessage(from, { text: `🏮 *Analyse :* *${joueur.perso}*... Un choix d'une banalité affligeante.` });
            }
        }

        if (cmd === "action") {
            const combat = combats[from]; if (!combat) return;
            const joueur = (sender === combat.p1.id) ? combat.p1 : combat.p2;
            if (joueur) {
                joueur.action = args.join(" ");
                await sock.sendMessage(from, { text: `📝 *Action notée :* ${joueur.action}. Essayez de ne pas rater.` });
                if (combat.p1.action && combat.p2.action) combat.status = "READY";
            }
        }

        if (cmd === "attaque") {
            const combat = combats[from];
            if (!combat || combat.status !== "READY") return;

            const p1 = combat.p1; const p2 = combat.p2;
            
            // Dégâts équitables et aléatoires (Pas de favoris)
            let d1 = Math.floor(Math.random() * 30) + 10;
            let d2 = Math.floor(Math.random() * 30) + 10;

            // Chance d'esquive pour n'importe qui (10% de chance)
            let e1 = Math.random() < 0.1;
            let e2 = Math.random() < 0.1;
            if (e1) d2 = 0;
            if (e2) d1 = 0;

            p2.hp -= d1; p1.hp -= d2;

            let sc = `🎬 *RAPPORT DE JUGEMENT*\n\n`;
            sc += `⚔️ *COMBATTANT 1 :* ${p1.perso}\n💥 Action : ${p1.action}\n${e2 ? "💨 *ÉCHEC :* L'adversaire a évité ce geste maladroit." : `📉 Dégâts infligés : -${d1}%`}\n\n`;
            
            sc += `⚔️ *COMBATTANT 2 :* ${p2.perso}\n💥 Réplique : ${p2.action}\n${e1 ? "💨 *ÉCHEC :* Une tentative pitoyable qui finit dans le vide." : `📉 Dégâts infligés : -${d2}%`}\n\n`;
            
            sc += `📊 *BILAN DES HP (Misérable) :*\n👤 ${p1.perso} : ${Math.max(0, p1.hp)}%\n👤 ${p2.perso} : ${Math.max(0, p2.hp)}%\n\n`;
            
            if (p1.hp <= 0 || p2.hp <= 0) {
                sc += "🏆 *LE DIVERTISSEMENT EST TERMINÉ.* L'un de vous a cessé d'exister. Tant mieux.";
                delete combats[from];
            } else {
                sc += "🔄 _Continuez à vous agiter. (.action pour le prochain tour)_";
                p1.action = ""; p2.action = ""; combat.status = "CHOIX";
            }

            await sock.sendMessage(from, { text: sc, mentions: [p1.id, p2.id] });
        }
    }
};
      
