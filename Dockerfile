FROM node:20-bullseye-slim

RUN apt-get update && apt-get install -y \
    ffmpeg \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/Ainz-devs/OVL-MD-V2.git /ovl_bot
WORKDIR /ovl_bot

# Injection des noms (Correction des syntaxes SED)
RUN sed -i 's/ᴀɪɴᴢ/ᴛʜᴇ_ᴅᴀʀᴋ/g' config.js
RUN sed -i 's/ᴏᴠʟ-ᴍᴅ-ᴠ𝟸/sᴀᴋᴜʀᴀ🌸🌸/g' config.js

RUN npm install && npm install pm2 -g

# Cette ligne ne doit pas avoir de slash bizarre
COPY plugins/*.js ./plugins/ || true

EXPOSE 8000

# Commande de démarrage officielle du bot OVL
CMD ["pm2-runtime", "npm", "--", "start"]
