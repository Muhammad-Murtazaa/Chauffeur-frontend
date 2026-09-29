# NYC Premier Limo - React JS Clone

A modern, high-performance React JS clone of **[NYC Premier Limo](https://nycpremierlimo.com/)**.

Built with **React 18**, **Vite 6**, **Tailwind CSS**, **React Router v6**, and **Lucide React**.

---

## 🌟 Key Features

1. **Full Page & Route Mirroring**:
   - **Home (`/`)**: Hero section, trust badges (Flight Tracking, All-Inclusive, Meet & Greet, Tri-State, 5 Star), Trustindex / Google 5-star reviews carousel, Services grid, Fleet showcase, Airport transfers spotlight (JFK, LGA, EWR), Corporate travel, Areas served grid, 3-step booking guide, FAQ accordion, Call to action.
   - **Fleet (`/fleet`)**: Categorized luxury vehicle lineup (Sedans, SUVs, Executive Sprinters, Stretch Limos) with passenger/luggage capacities, specs, and instant reservation triggers.
   - **Services Hub (`/services`) & Detail Pages**:
     - Airport Car Service (`/airport-car-service`)
     - JFK Airport Limo Service (`/jfk-airport-limo-service`)
     - LGA Airport Limo Service (`/lga-airport-limo-service`)
     - EWR Airport Limo Service (`/ewr-airport-limo-service`)
     - Hourly Chauffeur Service (`/hourly-car-service`)
     - Corporate Transportation (`/corporate-limo-service`)
     - Point-to-Point Direct Rides (`/point-to-point-limo-service`)
     - City-to-City Long Distance (`/city-to-city-rides`)
     - Special Occasions Hub (`/special-occasions`)
     - Wedding Limousine Service (`/wedding-limo-service`)
     - Birthday & Milestone Celebrations (`/birthday-limo-service`)
     - Prom Limousine Service (`/prom-limousine-service`)
     - Winery Tour Limo Service (`/winery-tour-limo-service`)
   - **Areas We Serve Hub (`/areas-we-serve`) & Borough Pages**:
     - Manhattan (`/manhattan-limo-service`)
     - Brooklyn (`/brooklyn-limo-service`)
     - Queens (`/queens-limo-service`)
     - The Bronx (`/the-bronx-limo-service`)
     - Staten Island (`/staten-island-limo`)
   - **Reservations & Instant Quote (`/reservations`)**:
     - Interactive multi-step quote calculator with live flat-rate computation based on route and vehicle.
     - Switchable tab embedding the live **LimoAnywhere / LoginLA** reservation system (`https://member.loginla.com/quick/company/NPL`).
   - **About Us (`/about-us`)**: Company history, four core principles, chauffeur vetting standards.
   - **Contact Us (`/contact-us`)**: 24/7 dispatch info, direct click-to-call `(347) 888-9797`, interactive inquiry form.
   - **Legal & Policy Pages**:
     - Terms and Conditions (`/terms-conditions`)
     - Privacy Policy (`/privacy-policy`)
     - Cancellation & Refund Policy (`/cancellation-and-refund`)
     - Payment Policy (`/payment-policy`)

2. **Luxury Design System**:
   - Signature Obsidian Black (`#060B10`), Luxury Gold (`#E09900`), and Ivory typography.
   - Serif headings powered by **Playfair Display** and modern UI body text by **DM Sans**.
   - Responsive mega-menus for desktop and slide-out navigation for mobile.
   - Mobile bottom sticky bar with instant **Call** and **Book Now** actions matching the original website.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ (tested on v24.15.0)
- npm v9+

### Installation & Run

```bash
# Install dependencies
npm install

# Start local development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
new-chauffer/
├── index.html                   # HTML entry point with Playfair Display & DM Sans fonts
├── package.json                 # Project scripts & dependencies
├── vite.config.js               # Vite configuration (port 3000)
├── tailwind.config.js           # Custom luxury theme colors & font families
├── postcss.config.js            # PostCSS configuration
├── src/
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # Main router with all 28+ routes
│   ├── index.css                # Tailwind directives, custom scrollbars & gradients
│   ├── components/
│   │   ├── Navbar.jsx           # Luxury header with dropdowns & mobile drawer
│   │   ├── Footer.jsx           # Comprehensive footer with quick links & policies
│   │   ├── MobileStickyBar.jsx  # Fixed mobile bottom call/quote action bar
│   │   ├── QuoteBookingWidget.jsx # Interactive quote calculator with dynamic rates
│   │   ├── VehicleCard.jsx      # Reusable vehicle showcase card
│   │   ├── ReviewsSection.jsx   # Trustindex Google 5.0 verified reviews carousel
│   │   ├── FaqAccordion.jsx     # Collapsible FAQ accordion
│   │   ├── PageHero.jsx         # Reusable luxury hero banner with breadcrumbs
│   │   └── QuickStatsStrip.jsx  # 5-item highlight strip (Flight tracking, Flat rates, etc.)
│   ├── data/
│   │   ├── fleetData.js         # Detailed specs for luxury vehicles (Sedans, SUVs, Sprinters, Stretch Limos)
│   │   ├── servicesData.js      # Comprehensive descriptions of all chauffeured services
│   │   ├── reviewsData.js       # Real Google verified reviews from customers
│   │   ├── faqData.js           # Full FAQ questions & answers
│   │   └── areasData.js         # Boroughs & regions information
│   └── pages/                   # 28 dedicated page components
```
