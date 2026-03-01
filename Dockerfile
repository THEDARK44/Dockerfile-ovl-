FROM node:20-bullseye-slim

RUN apt-get update && apt-get install -y \
    ffmpeg \
    git \
    && rm -rf /var/lib/apt/lists/*

# Clonage du noyau
RUN git clone https://github.com/Ainz-devs/OVL-MD-V2.git /ovl_bot
WORKDIR /ovl_bot

# Injection de ton identité et de la mienne
RUN sed -i 's/ᴀɪɴᴢ/ᴛʜᴇ_ᴅᴀʀᴋ/g' config.js || true
RUN sed -i 's/ᴏᴠʟ-ᴍᴅ-ᴠ𝟸/sᴀᴋᴜʀᴀ🌸🌸/g' config.js || true

# Installation propre
RUN npm install && npm install pm2 -g

# Injection de tes plugins (si tu as bien créé le dossier comme demandé)
COPY plugins/*.js ./plugins/

EXPOSE 8000

# CORRECTION CRUCIALE : On lance index.js, pas Ovl.js
CMD ["pm2-runtime", "index.js", "--name", "Sakura-Souveraine"]
