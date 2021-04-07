FROM nginx:alpine
LABEL author="Ronald Panopio"
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf


# Use the following commands to build the image and run the container (run from the root folder)
# 1. You'll first need to build the project using `ng build`

# 2. Now build the Docker image:
# docker build -t rpanops/myaq-frontend:1.0.0 -f nginx.dockerfile .

#3. Run the Docker container:
# docker run -p 8080:80 -v $(pwd)/dist:/usr/share/nginx/html rpanops/myaq-frontend:1.0.0
