##### Stage 1
FROM node:latest as node
LABEL author="Ronald Panopio"
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --prod

##### Stage 2
FROM nginx:alpine
COPY ./config/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=node /app/dist/MyAQ/ /usr/share/nginx/html

EXPOSE 4200 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

# Use the following commands to build the image and run the container in production
# docker build -t rpanops/myaq-frontend:1.0.0 -f nginx.prod.dockerfile .
# docker run -d -p 8080:80 rpanops/myaq-frontend:1.0.0