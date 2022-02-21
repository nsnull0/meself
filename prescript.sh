#! /usr/bin/env sh

echo "---" > _data/mapbox_secrets.yaml
echo "TOKEN_MAPBOX: $1" >> _data/mapbox_secrets.yaml
echo "---" >> _data/mapbox_secrets.yaml

echo "---" > _data/slack_secrets.yaml
echo "URL_SLACK_WEBHOOK: $2" >> _data/slack_secrets.yaml
echo "---" >> _data/slack_secrets.yaml

echo "---" > _data/google_secrets.yaml
echo "URL_SLACK_WEBHOOK: $3" >> _data/google_secrets.yaml
echo "---" >> _data/google_secrets.yaml