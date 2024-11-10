# Usa una imagen de Node.js
FROM node:14

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo de dependencias e instala
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos
COPY . .

# Exponer el puerto en el que correrá el servicio
EXPOSE 3000

# Comando para ejecutar el servicio
CMD ["node", "src/app.js"]