
FROM mcr.microsoft.com/playwright:v1.60.0-jammy
RUN npm install postman
RUN npm install -g netlify-cli node-jq serve
RUN apt update && apt install jq -y