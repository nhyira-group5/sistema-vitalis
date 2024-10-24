# Etapa 1: Build do frontend
FROM node:16 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos para o diretório de trabalho
COPY . .

# Gera a build de produção do frontend
RUN npm run build

# Etapa 2: Servir o frontend com Nginx
FROM nginx:latest

# Copia a build do frontend gerada na etapa anterior para o diretório do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
