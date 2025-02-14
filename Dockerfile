# Étape 1 : Construction de l'application avec Node.js
FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape 2 : Serveur Nginx pour servir les fichiers statiques
FROM nginx:latest
WORKDIR /usr/share/nginx/html

# Copier les fichiers construits
COPY --from=builder /app/dist .

# Copier la configuration Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
