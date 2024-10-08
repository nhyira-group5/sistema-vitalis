FROM nginx:latest

#Define o diretório de trabalho
WORKDIR /usr/share/nginx/html

#Copia os arquivos da pasta dist para o diretório do servidor
COPY ./dist .
#COPY nginx.conf /etc/nginx/sites-available/default

#Verifica se os arquivos foram copiados corretamente (apenas para fins de depuração)
RUN ls -la

#Expor a porta 80
EXPOSE 80

#Comando para iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]