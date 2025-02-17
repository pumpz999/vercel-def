#!/bin/bash

# Comprehensive Deployment Script

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Deployment Configuration
PROJECT_NAME="defi-platform"
REQUIRED_NODE_VERSION="18.x"
REQUIRED_PNPM_VERSION="8.x"

# Logging functions
log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Prerequisite Checks
check_prerequisites() {
    # Check Node.js version
    if ! node -v | grep -q "v18"; then
        log_error "Node.js ${REQUIRED_NODE_VERSION} is required. Current version: $(node -v)"
    fi

    # Check pnpm version
    if ! pnpm --version | grep -q "8"; then
        log_error "pnpm ${REQUIRED_PNPM_VERSION} is required. Current version: $(pnpm --version)"
    fi
}

# Install Dependencies
install_dependencies() {
    echo "Installing project dependencies..."
    pnpm install
    pnpm dlx playwright install
}

# Compile Smart Contracts
compile_contracts() {
    echo "Compiling smart contracts..."
    pnpm hardhat compile
}

# Generate Environment Configuration
generate_env() {
    # Generate secure, randomized environment variables
    ALCHEMY_API_KEY=$(openssl rand -hex 16)
    WALLET_CONNECT_PROJECT_ID=$(openssl rand -hex 16)
    JWT_SECRET=$(openssl rand -base64 32)

    cat > .env <<EOL
# Blockchain Configuration
VITE_NETWORK_ENV=mainnet
VITE_ALCHEMY_API_KEY=${ALCHEMY_API_KEY}
VITE_WALLET_CONNECT_PROJECT_ID=${WALLET_CONNECT_PROJECT_ID}

# Authentication
JWT_SECRET=${JWT_SECRET}

# MongoDB Connection
MONGODB_URI=mongodb+srv://your_connection_string

# Admin Configuration
VITE_ADMIN_WALLET=0x_your_admin_wallet_address
EOL

    log_success "Environment configuration generated"
}

# Deploy Smart Contracts
deploy_contracts() {
    echo "Deploying smart contracts..."
    pnpm hardhat run scripts/deploy.ts --network mainnet
}

# Build Frontend
build_frontend() {
    echo "Building frontend application..."
    pnpm build
}

# Initialize Admin Panel Configurations
initialize_admin_panel() {
    # Programmatically set initial admin configurations
    pnpm tsx scripts/initialize-admin-config.ts
}

# Deploy to Vercel
deploy_to_vercel() {
    echo "Deploying to Vercel..."
    vercel --prod
}

# Main Deployment Function
main() {
    clear
    echo "🚀 DeFi Platform Automated Deployment 🚀"
    
    # Run deployment steps
    check_prerequisites
    generate_env
    install_dependencies
    compile_contracts
    deploy_contracts
    build_frontend
    initialize_admin_panel
    deploy_to_vercel

    log_success "Deployment Completed Successfully!"
}

# Execute Main Deployment
main
