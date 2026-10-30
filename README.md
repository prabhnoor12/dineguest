# DineGuest 📶🍷
> **Turnkey White-Label Captive Guest WiFi Marketing, Diner CRM & VIP SMS Club for Restaurants, Cafes & Bars**

[![Vue 3](https://img.shields.io/badge/Vue-3.5-emerald.svg)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

DineGuest is an **"Agency-in-a-Box"** white-label SaaS platform engineered for digital marketing agencies, hospitality consultants, and restaurant operators. It turns standard in-restaurant guest WiFi into an automated diner acquisition and retention funnel.

Every time a diner connects to guest WiFi on their smartphone, DineGuest captures their verified phone number and name via a high-converting captive splash screen, syncs check totals with POS systems, and activates automated Tuesday/Wednesday slow-night SMS re-engagement bots.

---

## 🚀 Key Modules & Architecture

### 1. Live Guest WiFi Presence Radar
- Real-time stream of diners physically connected inside the dining room.
- Measures live dwell duration, wireless AP signal strength, and device profile (iOS / Android).
- Tracks lifetime dining visits and tags VIP loyalty tiers (*First-Time Guest*, *Silver Member*, *Gold Regular*, *Platinum VIP*).

### 2. Interactive Captive Splash Screen Designer
- Live WYSIWYG mobile preview on an iPhone 16 mockup.
- Customizable chef hero imagery, brand accents, headline incentives, and social/SMS authentication buttons.
- Compliance-ready TCPA double opt-in consent for automated SMS marketing.

### 3. Hospitality Diner CRM Profiles
- Automatically builds an enriched guest database with visit frequencies, average check spend, favorite dishes, and lifetime revenue.
- Searchable directory with VIP status filtering and one-click CSV export.

### 4. Autonomous Churn & Review Bots
- **30-Day Churn Prevention Bot**: Detects when a diner hasn't connected in 30 days and automatically dispatches a 15% off Tuesday/Wednesday perk.
- **2-Hour Post-Visit Review Bridge**: Dispatches a Google 5★ review request 2 hours after the diner disconnects from the venue's WiFi (native sync with ReputeStack).
- **VIP Birthday Club**: Fires 3 days prior to the diner's birthday month with a complimentary Prosecco / dessert incentive.
- **Flash VIP SMS Broadcast Blast**: One-click broadcast dispatch to all captured diners for filling empty tables on slow weeknights.

### 5. Enterprise Hardware & Network Integrations
- **Ubiquiti UniFi**: Native external captive portal forwarding and RADIUS server integration (`radius.dineguest.app:1812`).
- **TP-Link Omada SDN & Cisco Meraki**: External portal URL pass-through with walled garden allowances for Apple CNP and Google captive probes.
- **Two-Way POS Webhook Mapper**: Visual no-code field mapper for Toast POS, Square Dining, and Clover webhooks to enrich diner WiFi profiles with real dining check totals.
- **Twilio / Telnyx 10DLC**: Dedicated high-deliverability SMS pipe (150 SMS/second throughput).

### 6. Agency Economics & Self-Healing Retainer Dunning
- **Wholesale License**: $79/mo on Agency Scale (includes up to 20 venue locations).
- **Client Retail Retainers**: $99 – $199/mo per restaurant venue (82%+ net profit margin).
- **Milestone Expansion Trigger**: Automatically alerts agencies when a venue crosses 2,500 captured diners to upsell automated SMS blast tiers.
- **Self-Healing Value Dunning Bot**: Dunning notices anchor payment requests to **irreplaceable business value** (e.g. *"Your guest WiFi drove 142 repeat covers and $14,250 in dining sales this month"*).

### 7. Full Agency White-Label & Deliverables
- **Custom CNAME Domain**: Complete white-labeling on `wifi.youragency.com` with auto-provisioned SSL.
- **Staff & Floor Manager PWA**: Standalone Progressive Web App installable on iOS and Android homescreens.
- **Automated 1st-of-Month Executive Deliverable**: Generates a printable PDF ROI Letterhead report proving dining receipts and new diner captures.
- **Hostess Stand Kiosk**: 4-digit PIN lock (`1234`) terminal for hostess check-in and instant single-use WiFi passcode vouchers.

---

## 🛠️ Quickstart

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation
```bash
# Navigate to app directory
cd app

# Install dependencies
npm install

# Start local development server (Port 5177)
npm run dev

# Build production bundle
npm run build
```

---

## 🍽️ The Local Hospitality SaaS Suite Pairing
| Product | In-Venue Focus | Synergy with DineGuest |
| :--- | :--- | :--- |
| **DineSnap** | Digital QR Menus, 86'd stock, waiter call bells, POS menu sync | Handles the in-meal ordering experience while DineGuest captures the diner's contact information. |
| **ReputeStack** | Google 5★ Review generation & Negative Review Shield | DineGuest's 2-hour post-visit bot routes satisfied diners directly into ReputeStack's review shield. |
| **CallRescue** | 4-second missed call auto-responder | Captures phone orders and catering leads that call when hostesses are seating tables. |

---

## 📄 License
MIT License. Created for turnkey white-label SaaS deployment.
