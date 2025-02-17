#!/bin/bash

# Comprehensive Diagnostic Script
echo "🔍 Comprehensive Vite Project Diagnostic"

# Check Node.js and npm
echo -e "\n📦 Node.js and NPM Versions:"
node --version
npm --version

# Check global npm configuration
echo -e "\n⚙️ NPM Global Configuration:"
npm config list

# Check project dependencies
echo -e "\n📋 Project Dependencies:"
npm list --depth=1

# Check for potential conflicts
echo -e "\n🚨 Potential Conflicts:"
npm doctor

# Verify file permissions
echo -e "\n🔒 File Permissions:"
stat package.json
stat vite.config.ts

# Check environment variables
echo -e "\n🌍 Environment Variables:"
env | grep VITE

# Network connectivity
echo -e "\n🌐 Network Connectivity:"
curl -V
ping -c 4 registry.npmjs.org

# Disk space
echo -e "\n💾 Disk Space:"
df -h

# Memory info
echo -e "\n🧠 Memory Information:"
free -h
