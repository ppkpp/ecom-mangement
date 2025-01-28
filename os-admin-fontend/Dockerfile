FROM node:18.18.0

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Expose the port that Vite uses (default is 5173)
EXPOSE 5173

# Set the environment variable for Vite to bind to all network interfaces
ENV VITE_HOST=0.0.0.0

CMD ["npm", "run","dev"]
