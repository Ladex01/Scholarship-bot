# DiplomatScholar & NYSC Lagos Opportunity Hunter

> **24/7 Cloud Service with Automated 4-Hour Scanning & Real-Time Sync**
> Optimized for Nigerian Political Science/International Relations graduates, NYSC Corps Members, and Federal Contracting Bid Specialists.

---

## 🚀 Instant Deployment on Render.com (Option A - Recommended)

This repository includes a pre-configured `render.yaml` Blueprint.

### Step 1: Connect to Render
1. Go to [render.com](https://dashboard.render.com/) and log in.
2. Click **New +** $\rightarrow$ **Web Service** (or **Blueprint**).
3. Connect your GitHub repository (`Scholarship-bot`).

### Step 2: Build & Start Settings
If Render asks for manual settings, use:
- **Environment / Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Health Check Path**: `/api/health`

### Step 3: Environment Variables (Optional)
In your Render Service $\rightarrow$ **Environment**:
- `GEMINI_API_KEY`: *(Optional: your Google Gemini API key)*
- `TELEGRAM_BOT_TOKEN`: `8854756208:AAGmabFVzYUvPPsyQcCm65OLCIVyBQaNcDQ`
- `SCAN_INTERVAL_HOURS`: `4`

Render will keep your service active 24/7 so you can access your dashboard on your phone and receive automated 4-hour updates even when your laptop is turned off!

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to access the live dashboard.
