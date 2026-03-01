FROM node:20-bullseye-slim

RUN apt-get update && apt-get install -y \
    ffmpeg \
    git \
    && rm -rf /var/lib/apt/lists/*

# On clone le noyau original
RUN git clone https://github.com/Ainz-devs/OVL-MD-V2.git /ovl_bot
WORKDIR /ovl_bot

# --- CHIRURGIE DE L'IDENTITÉ ---
# On remplace le numéro du créateur, le nom du bot et du proprio dans le config.js
RUN sed -i "s/OWNER_NUMBER = '923092213197'/OWNER_NUMBER = '0100268983'/g" config.js
RUN sed -i "s/botname = 'OVL-MD-V2'/botname = 'Sakura 🌸🌸'/g" config.js
RUN sed -i "s/ownername = 'ᴀɪɴᴢ'/ownername = 'THE_DARK'/g" config.js

# Installation des dépendances et de PM2 pour la survie H24
RUN npm install && npm install pm2 -g

# --- ABSORPTION DE TES PLUGINS ---
# On s'assure que TON dossier plugins écrase ou s'ajoute à celui du bot
COPY plugins/ ./plugins/

EXPOSE 8000

# Démarrage impérial
CMD ["pm2-runtime", "npm", "--", "start"]
