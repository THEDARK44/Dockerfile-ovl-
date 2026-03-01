FROM node:20-bullseye-slim

RUN apt-get update && apt-get install -y \
    ffmpeg \
    git \
    && rm -rf /var/lib/apt/lists/*

# Clonage du noyau
RUN git clone https://github.com/Ainz-devs/OVL-MD-V2.git /ovl_bot
WORKDIR /ovl_bot

# Injection de ton identité
RUN sed -i 's/ᴀɪɴᴢ/ᴛʜᴇ_ᴅᴀʀᴋ/g' config.js || true
RUN sed -i 's/ᴏᴠʟ-ᴍᴅ-ᴠ𝟸/sᴀᴋᴜʀᴀ🌸🌸/g' config.js || true

# Installation propre
RUN npm install && npm install pm2 -g

# Injection de tes plugins (Seulement si tu as créé le dossier !)
COPY plugins/*.js ./plugins/ || true

EXPOSE 8000

# CHANGEMENT ICI : On laisse le bot utiliser son propre script de démarrage
# Mais on le fait surveiller par PM2
CMD ["pm2-runtime", "npm", "--", "run", "Ovl"]
