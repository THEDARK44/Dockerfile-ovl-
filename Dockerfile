FROM node:20-bullseye-slim
RUN apt-get update && apt-get install -y ffmpeg git && rm -rf /var/lib/apt/lists/*
RUN git clone https://github.com/Ainz-devs/OVL-MD-V2.git /ovl_bot
WORKDIR /ovl_bot
RUN npm install && npm install pm2 -g

# --- L'ÉTAPE QUE TU AS OUBLIÉE ---
COPY . . 

EXPOSE 8000
CMD ["pm2-runtime", "npm", "--", "start"]

