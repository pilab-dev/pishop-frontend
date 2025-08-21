# Single stage build, the app should be compiled in this stage
FROM node:22-alpine AS runner

LABEL org.opencontainers.image.authors="Paal Gyula <gyula@pilab.hu>"
LABEL org.opencontainers.image.source="https://github.com/pilab-dev/pishop-frontend"
LABEL org.opencontainers.image.description="Pishop frontend"
LABEL org.opencontainers.image.title="Pishop frontend"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.vendor="Progressive Innovation LAB"

# Set the working directory
WORKDIR /app

# Add a group and user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN mkdir -p .next/cache && chown nextjs:nodejs .next/cache

# Set the user to the nextjs user
USER nextjs

# Copy the compiled assets and the app
COPY public /app/public
COPY .next/standalone .
COPY .next/static ./.next/static

# Create cache directory
VOLUME ["/app/.next/cache"]

# Set environment variables
ENV NODE_ENV=production

# Expose the default port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
