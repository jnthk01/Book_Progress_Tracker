#!/usr/bin/env bash
# build.sh - Render build script

# Install dependencies
pip install -r requirements.txt

# (Optional) run migrations/init-db
flask --app app init-db