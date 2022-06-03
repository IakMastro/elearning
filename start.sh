#!/bin/bash

echo ">>> Starting the application"
docker-compose up -d

echo ">>> IP addresses"
docker inspect $(docker ps -q) | jq -r '.[] | { name: .Name, network: .NetworkSettings.Networks.elearningnet.IPAddress }' | awk '/name/ {print} /network/ {print}' | sed 's/\///g'
