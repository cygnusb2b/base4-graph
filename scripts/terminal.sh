#!/bin/sh

if [ "$(docker inspect -f {{.State.Running}} ${COMPOSE_PROJECT_NAME}_app_1 2>/dev/null)" = true ];
then docker exec -it "${COMPOSE_PROJECT_NAME}_app_1" /bin/bash;
else printf "Container is not running -- did you 'yarn start'?\n" && exit 1; fi
