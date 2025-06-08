# 🛍️ PiShop - Modern E-commerce Storefront

PiShop is a high-performance, cacheable e-commerce storefront built with modern web technologies. It provides a seamless shopping experience while maintaining optimal performance through advanced caching strategies.

## ✨ Features

- 🚀 **Lightning Fast Performance**
  - Server-side rendering for optimal initial load
  - Advanced caching strategies
  - Optimized asset delivery
  - Progressive Web App (PWA) capabilities

- 🎨 **Modern UI/UX**
  - Responsive design for all devices
  - Smooth animations and transitions
  - Intuitive navigation
  - Accessible interface

- 🔄 **Real-time Updates**
  - Live inventory tracking
  - Dynamic pricing
  - Instant order status updates

- 🔒 **Secure & Reliable**
  - HTTPS by default
  - Secure payment processing
  - Data encryption
  - Regular security updates

## 🏗️ Architecture

PiShop consists of two main components:

1. **Frontend Storefront** (`pishop`)
   - Next.js-based web application
   - Optimized for performance and SEO
   - Implements advanced caching strategies

2. **Backend API** (`pishop-api`)
   - RESTful API service
   - Handles business logic and data management
   - Provides real-time data updates

## 🚀 Getting Started

### Prerequisites

- Node.js 22.x or later
- Docker and Docker Compose
- Kubernetes cluster (for production deployment)

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/pilab-dev/pishop-frontend.git pishop
   cd pishop
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Docker Deployment

1. Build the images:
   ```bash
   docker build -t ghcr.io/pilab-dev/pishop:latest .
   docker build -t ghcr.io/pilab-dev/pishop-api:latest ./api
   ```

2. Run with Docker Compose:
   ```bash
   docker-compose up -d
   ```

### Kubernetes Deployment

1. Create the necessary secrets:
   ```bash
   kubectl create secret docker-registry regcred \
     --docker-server=ghcr.io \
     --docker-username=<username> \
     --docker-password=<token>
   ```

2. Apply the Kubernetes configuration:
   ```bash
   kubectl apply -f deployment.yaml
   ```

## 🔧 Configuration

### Environment Variables

- `NEXT_PUBLIC_PISHOP_API_URL`: API endpoint URL
- `PORT`: Application port (default: 3000)

### Caching Configuration

The application implements several caching strategies:

- **Static Page Caching**: Pre-rendered pages for instant delivery
- **API Response Caching**: Cached API responses for improved performance
- **Asset Caching**: Optimized caching for static assets
- **Service Worker**: Offline capabilities and performance optimization

## 📊 Performance Optimization

- Server-side rendering for optimal initial load
- Image optimization and lazy loading
- Code splitting and tree shaking
- Minified assets and optimized delivery
- CDN integration for global content delivery

## 🔐 Security

- HTTPS enforcement
- Content Security Policy (CSP)
- XSS protection
- CSRF protection
- Rate limiting
- Input validation and sanitization

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Traefik](https://traefik.io/) for ingress
- Secured with [Let's Encrypt](https://letsencrypt.org/)
- Hosted on [Kubernetes](https://kubernetes.io/)

---

Made with ❤️ by the PiLab Team
