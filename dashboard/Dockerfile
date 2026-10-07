FROM node:22-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --fetch-timeout=120000 --fetch-retries=5

COPY . .

ARG VITE_API_URL=http://localhost:8000/api/v1
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

EXPOSE 3000

CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "3000"]