# Selecciona la imagen base
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de la aplicación
COPY package*.json ./
COPY ./src ./src

# Instala las dependencias
RUN npm install

# Expón el puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Ejecuta la aplicación
CMD ["node", "src/index.js"]
