#!/bin/sh

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "[${RED}1${NC}/7] ${GREEN}building app${NC}"
npm run build
echo "[${RED}2${NC}/7] ${GREEN}list of running containers${NC}"
docker ps
echo "[${RED}3${NC}/7] ${GREEN}stopping running containers${NC}"
docker-compose stop
echo "[${RED}4${NC}/7] ${GREEN}removing running containers${NC}"
docker-compose rm -f
echo "[${RED}5${NC}/7] ${GREEN}starting containers${NC}"
docker-compose -f docker-compose.yaml -f docker-compose-prod.yaml up -d --build
echo "[${RED}6${NC}/7] ${GREEN}importing database${NC}"
docker-compose exec -T db mysql -uroot -ppassword task <db-data.sql
echo "[${GREEN}7/7${NC}] ${GREEN}deployment complete${NC}"