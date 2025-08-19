# 🌳 TreePlant - Environmental Impact Platform

A modern web application built with Next.js that enables users to plant trees, track their environmental impact, and participate in a global reforestation community.

## 🚀 Features

- **🌱 Tree Planting**: Browse and purchase trees to plant in various locations
- **🗺️ Interactive Maps**: View planted trees on an interactive map with coordinates
- **👤 User Authentication**: Secure signup/login with email verification
- **🛒 Shopping Cart**: Add trees to cart and manage orders
- **📊 Leaderboard**: Track top contributors and environmental impact
- **📱 Responsive Design**: Mobile-first design with PWA capabilities
- **🎯 Referral System**: Invite friends and earn rewards
- **📍 Geolocation**: Track and log tree locations with coordinates
- **💳 Payment Integration**: Secure checkout and payment processing

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **State Management**: Redux Toolkit
- **Maps**: Interactive mapping with geolocation services
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── Models/              # Database schemas
├── Utils/               # Utility functions
├── action/              # Server actions
├── app/                 # Next.js 13+ app directory
│   ├── Components/      # Reusable UI components
│   ├── Features/        # Feature-specific code
│   ├── api/            # API routes
│   ├── Tree/           # Tree-related pages
│   └── pages/          # Page components
├── components/         # Shared UI components
└── lib/               # Library configurations
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB database
- Environment variables configured

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd tree-plant-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Email Service
EMAIL_SERVER_USER=your_email
EMAIL_SERVER_PASSWORD=your_password
EMAIL_FROM=noreply@yourapp.com

# Payment (if applicable)
STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Other services
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/verify` - Email verification
- `POST /api/auth/resend` - Resend verification email

### Trees
- `GET /api/Tree/AllTree` - Get all available trees
- `GET /api/Tree/Mytree` - Get user's planted trees
- `POST /api/Tree/Order` - Create tree order
- `GET /api/Tree/Coords` - Get tree coordinates
- `POST /api/Tree/Logtree` - Log a planted tree

### Cart
- `POST /api/Cart/Addtree` - Add tree to cart
- `GET /api/Cart/Mycarttree` - Get user's cart
- `DELETE /api/Cart/Removetree` - Remove tree from cart
- `PUT /api/Cart/UpdateCart` - Update cart quantities

### Other
- `GET /api/leaderboard` - Get leaderboard data
- `POST /api/create-order` - Process payments
- `GET /api/TreeInfo` - Get tree information

## 🎨 UI Components

Built with shadcn/ui and Tailwind CSS:

- Navigation & Layout components
- Form components (inputs, buttons, selects)
- Data display (cards, tables, badges)
- Feedback components (alerts, toasts)
- Interactive elements (dialogs, dropdowns)

## 🗺️ Map Features

- Interactive tree location mapping
- Satellite view toggle
- Custom markers for different tree types
- Geolocation services for precise coordinates
- Regional tree distribution visualization

## 👥 User Features

- **Profile Management**: Track personal tree planting history
- **Referral System**: Earn rewards for inviting friends
- **Leaderboard**: Compete with other users
- **Order History**: View past purchases and plantings
- **Impact Tracking**: Monitor environmental contributions

## 🔧 Development

### Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Code Organization

- **Models**: Database schemas and data structures
- **Components**: Reusable UI components
- **Features**: Business logic organized by feature
- **Utils**: Helper functions and utilities
- **API Routes**: Backend endpoints

## 🌍 Environment Impact

This application helps users:
- Plant real trees in verified locations
- Track carbon offset contributions
- Participate in global reforestation efforts
- Build environmental awareness communities

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📱 PWA Features

- Service worker for offline functionality
- Push notifications for tree updates
- App-like experience on mobile devices
- Cached resources for improved performance

## 🔒 Security

- Secure authentication with NextAuth.js
- Protected API routes
- Input validation and sanitization
- Environment variable protection

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Environmental organizations supporting reforestation
- Open source community for amazing tools and libraries
- Contributors and users making this project possible

## 📞 Support

For support, email support@yourapp.com or create an issue in this repository.

---

Made with 💚 for a greener planet 🌍