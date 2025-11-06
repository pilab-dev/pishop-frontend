#!/bin/bash

# Exit on any error
set -e

echo "🚀 Building Next.js application..."
npm run build

echo "📁 Copying required files for standalone deployment..."
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

echo "🎯 Starting the application..."
echo "Server will be available at: http://localhost:3001"
PORT=3001 npm start
