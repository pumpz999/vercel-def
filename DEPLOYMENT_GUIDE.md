# DeFi Platform Deployment Guide

## Prerequisites
- Vercel Account
- GitHub Repository
- Web3 API Keys

## Deployment Steps

### 1. Vercel Deployment
1. Connect GitHub Repository
2. Configure Project Settings
   - Build Command: `pnpm build`
   - Output Directory: `dist`
   - Install Command: `pnpm install`

### 2. Environment Variables
Set in Vercel Dashboard:
- `VITE_ALCHEMY_API_KEY`
- `VITE_WALLET_CONNECT_PROJECT_ID`
- `VITE_BACKEND_URL`

### 3. Custom Domain (Optional)
1. Go to Project Settings
2. Navigate to Domains
3. Add Custom Domain
4. Configure DNS Records

### 4. Continuous Deployment
- Automatic deployments on GitHub push
- Preview environments for pull requests

## Troubleshooting
- Clear Vercel cache
- Verify environment variables
- Check build logs

## Monitoring
- Vercel Analytics
- Error tracking
- Performance monitoring

## Support
Contact: support@defiplatform.com
