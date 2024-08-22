# Etapa de construcción
FROM node:18 AS build

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación Angular
RUN npm run build 

# Etapa de producción
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

# Copiar los archivos de la etapa de construcción al contenedor Nginx
COPY --from=build /app/dist/front-crud /usr/share/nginx/html

# Exponer el puerto 80 
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]
