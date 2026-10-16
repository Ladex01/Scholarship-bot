# Production Dockerfile for DiplomatScholar & Lagos NYSC Hunter
FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy application source
COPY . .

# Build Vite frontend assets
RUN npm run build

# Expose server port (default 3000)
ENV PORT=3000
ENV NODE_ENV=production
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start full-stack Node server (serves frontend + background 4-hour cron + Telegram bot)
CMD ["npm", "start"]
