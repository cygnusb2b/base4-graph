#!/bin/sh
docker volume prune --filter label=base4.graph.discard=true --force
