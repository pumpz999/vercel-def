#!/bin/bash

# Post-Deployment Verification Script

# Check deployment URL
DEPLOY_URL=$(vercel --confirm)
echo "🌐 Deployment URL: $DEPLOY_URL"

# Perform basic health check
curl -f $DEPLOY_URL || {
  echo "❌ Deployment failed health check"
  exit 1
}

# Run basic accessibility and performance test
npx lighthouse $DEPLOY_URL --view

# Optional: Send deployment notification
send_slack_notification() {
  curl -X POST -H 'Content-type: application/json' \
  --data "{
    'text': '🚀 New deployment successful: $DEPLOY_URL',
    'attachments': [
      {
        'color': '#36a64f',
        'title': 'Deployment Details',
        'fields': [
          {
            'title': 'Environment',
            'value': 'Production',
            'short': true
          }
        ]
      }
    ]
  }" \
  $SLACK_WEBHOOK_URL
}

# Uncomment and configure if using Slack notifications
# send_slack_notification
