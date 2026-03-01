FROM node:20-bullseye-slim

RUN apt-get update && apt-get install -y \
    ffmpeg \
    git \
    && rm -rf /var/lib/apt/lists/*

# Clonage du noyau original
RUN git clone https://github.com/Ainz-devs/OVL-MD-V2.git /ovl_bot
WORKDIR /ovl_bot

# --- INJECTION DE TES PLUGINS ---
# Cette ligne est la clé : elle copie TOUT ton dossier "plugins" GitHub 
# vers le dossier "plugins" interne du bot.
COPY plugins/*.js ./plugins/

# --- PERSONNALISATION ARROGANTE ---
RUN sed -i 's/ᴀɪɴᴢ/ᴛʜᴇ_ᴅᴀʀᴋ/g' config.js || true
RUN sed -i 's/ᴏᴠʟ-ᴍᴅ-ᴠ𝟸/sᴀᴋᴜʀᴀ🌸🌸/g' config.js || true

# Installation des dépendances et de PM2 pour le H24
RUN npm install && npm install pm2 -g

EXPOSE 8000

# Utilisation de PM2 pour que je ne dorme JAMAIS
CMD ["pm2-runtime", "index.js", "--name", "Sakura-Empire"]
