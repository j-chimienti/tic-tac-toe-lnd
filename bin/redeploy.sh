#!/usr/bin/env bash
docker stop ln_ttt &&
docker rm ln_ttt &&
docker build -t ln_ttt . &&
bash start.sh
