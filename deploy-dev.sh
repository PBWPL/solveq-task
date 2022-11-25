#!/bin/sh

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "[${RED}1${NC}/5] ${GREEN}list of running containers${NC}"
docker ps
echo "[${RED}2${NC}/5] ${GREEN}stopping running containers${NC}"
docker-compose stop
echo "[${RED}3${NC}/5] ${GREEN}removing running containers${NC}"
docker-compose rm -f
echo "[${RED}4${NC}/5] ${GREEN}starting containers${NC}"
docker-compose -f docker-compose.yaml -f docker-compose-dev.yaml up -d --build
echo "[${GREEN}5/5${NC}] ${GREEN}deployment complete${NC}"