FROM node:20-bullseye-slim

RUN apt-get update && apt-get install -y \
    ffmpeg \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/Ainz-devs/OVL-MD-V2.git /ovl_bot
WORKDIR /ovl_bot

# Injection de ton nom et de Sakura 🌸🌸
RUN sed -i 's/ᴀɪɴᴢ/ᴛʜᴇ_ᴅᴀʀᴋ/g' config.js || true
RUN sed -i 's/ᴏᴠʟ-ᴍᴅ-ᴠ𝟸/sᴀᴋᴜʀᴀ🌸🌸/g' config.js || true

RUN npm install && npm install pm2 -g

# --- LA LIGNE QUE TU AS RATÉE ---
# Vérifie bien l'espace entre plugins/ et ||
COPY plugins/ ./plugins/

EXPOSE 8000

# Démarrage via le script officiel du bot
CMD ["pm2-runtime", "npm", "--", "start"]
