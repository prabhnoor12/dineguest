import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDineGuestStore = defineStore('dineguest', () => {
  // Agency Profile / White-Label
  const agency = ref({
    agency_name: 'TasteCraft Hospitality Agency',
    agency_tagline: 'Captive Guest WiFi Marketing & Diner CRM Suite',
    brand_color: '#10b981', // Emerald 500
    custom_domain: 'wifi.tastecraft.agency',
    contact_email: 'concierge@tastecraft.agency',
    logo_icon: 'Wifi'
  })

  // Simulated Client View Mode
  const clientPortalViewMode = ref(false)

  // Client Venues (Restaurants managed by the agency)
  const restaurants = ref([
    {
      id: 'rest-1',
      name: 'Trattoria Bella Italian Kitchen',
      slug: 'trattoria-bella',
      venue_type: 'Authentic Italian & Wine Bar',
      owner_name: 'Chef Mateo Rossi',
      phone: '+1 (415) 555-0182',
      wifi_ssid: 'Trattoria_Guest_WiFi',
      router_gateway: 'Ubiquiti UniFi Dream Machine Pro',
      diners_captured_month: 842,
      total_diners_database: 4120,
      repeat_rate: 34.8,
      monthly_retainer: 149,
      campaign_revenue_month: 14250,
      status: 'active',
      card_brand: 'Visa',
      card_last4: '4412',
      next_billing: 'Nov 1, 2026'
    },
    {
      id: 'rest-2',
      name: 'Sakura Omakase & Bistro',
      slug: 'sakura-bistro',
      venue_type: 'Japanese Sushi & Omakase',
      owner_name: 'Chef Kenji Sato',
      phone: '+1 (415) 555-0193',
      wifi_ssid: 'Sakura_VIP_WiFi',
      router_gateway: 'TP-Link Omada ER605 SDN',
      diners_captured_month: 615,
      total_diners_database: 2980,
      repeat_rate: 41.2,
      monthly_retainer: 199,
      campaign_revenue_month: 18900,
      status: 'active',
      card_brand: 'Mastercard',
      card_last4: '9021',
      next_billing: 'Nov 1, 2026'
    },
    {
      id: 'rest-3',
      name: 'The Grillhouse & Smokehouse',
      slug: 'grillhouse',
      venue_type: 'Artisan BBQ & Craft Beer',
      owner_name: 'Marcus Vance',
      phone: '+1 (415) 555-0145',
      wifi_ssid: 'Grillhouse_Free_WiFi',
      router_gateway: 'Cisco Meraki MR44 Cloud AP',
      diners_captured_month: 490,
      total_diners_database: 2210,
      repeat_rate: 29.5,
      monthly_retainer: 99,
      campaign_revenue_month: 8700,
      status: 'expiring_soon',
      card_brand: 'Amex',
      card_last4: '1088',
      next_billing: 'Nov 1, 2026'
    }
  ])

  const selectedRestaurantId = ref('rest-1')

  const selectedRestaurant = computed(() => {
    return restaurants.value.find(r => r.id === selectedRestaurantId.value) || restaurants.value[0]
  })

  // Live Connected Diners in Dining Room Right Now
  const activeDiners = ref([
    {
      id: 'active-1',
      name: 'Marco Rossi',
      phone: '+1 (415) 555-4901',
      device: 'iPhone 15 Pro (iOS 18)',
      mac: '44:65:0E:12:8B:F1',
      dwell_minutes: 42,
      section: 'Main Patio (Table 14)',
      vip_tier: 'Gold Regular',
      visits_count: 8,
      connected_at: '42m ago'
    },
    {
      id: 'active-2',
      name: 'Chloe Chen',
      phone: '+1 (415) 555-9812',
      device: 'Samsung Galaxy S24 Ultra',
      mac: '78:4F:43:99:A2:3B',
      dwell_minutes: 18,
      section: 'Dining Room (Booth 4)',
      vip_tier: 'First-Time Guest',
      visits_count: 1,
      connected_at: '18m ago'
    },
    {
      id: 'active-3',
      name: 'Liam Vance',
      phone: '+1 (415) 555-2310',
      device: 'MacBook Pro M3',
      mac: 'B0:BE:76:34:11:0C',
      dwell_minutes: 55,
      section: 'Cocktail Bar (Seat 3)',
      vip_tier: 'Silver Member',
      visits_count: 4,
      connected_at: '55m ago'
    },
    {
      id: 'active-4',
      name: 'Sophia Patel',
      phone: '+1 (415) 555-7744',
      device: 'iPhone 14 Pro',
      mac: '2C:F0:EE:88:51:D4',
      dwell_minutes: 9,
      section: 'Window Table 08',
      vip_tier: 'Platinum VIP',
      visits_count: 14,
      connected_at: '9m ago'
    }
  ])

  // Diner CRM Directory
  const guests = ref([
    {
      id: 'guest-1',
      name: 'Sophia Patel',
      phone: '+1 (415) 555-7744',
      email: 'sophia.patel@techcorp.com',
      total_visits: 14,
      last_visit: 'Today (Active)',
      avg_party_size: 3,
      favorite_dish: 'Truffle Pappardelle Al Funghi',
      estimated_spend: 1840,
      vip_status: 'Platinum VIP',
      marketing_opt_in: true
    },
    {
      id: 'guest-2',
      name: 'Marco Rossi',
      phone: '+1 (415) 555-4901',
      email: 'marco.rossi@designstudio.io',
      total_visits: 8,
      last_visit: 'Today (Active)',
      avg_party_size: 2,
      favorite_dish: 'Dry-Aged Bistecca Alla Fiorentina',
      estimated_spend: 960,
      vip_status: 'Gold Regular',
      marketing_opt_in: true
    },
    {
      id: 'guest-3',
      name: 'David Vance',
      phone: '+1 (415) 555-0012',
      email: 'david.vance@gmail.com',
      total_visits: 5,
      last_visit: '3 days ago',
      avg_party_size: 4,
      favorite_dish: 'Wood-Fired Margherita D.O.P.',
      estimated_spend: 520,
      vip_status: 'Silver Member',
      marketing_opt_in: true
    },
    {
      id: 'guest-4',
      name: 'Elena Rostova',
      phone: '+1 (415) 555-8833',
      email: 'elena.rostova@gmail.com',
      total_visits: 3,
      last_visit: '34 days ago (At-Risk)',
      avg_party_size: 2,
      favorite_dish: 'Tiramisu della Nonna',
      estimated_spend: 280,
      vip_status: 'At-Risk Diner',
      marketing_opt_in: true
    }
  ])

  // Automated Re-Engagement Bots & Campaigns
  const campaigns = ref([
    {
      id: 'camp-1',
      title: '30-Day Inactive Diner Reactivation Bot',
      trigger: 'Diner hasn\'t connected to guest WiFi in 30 days',
      sms_copy: 'Hey {first_name}! We haven\'t seen you at Trattoria Bella lately. Show this text next Tuesday or Wednesday for 15% off your entire dining check!',
      active: true,
      diners_reactivated: 142,
      revenue_generated: 7810
    },
    {
      id: 'camp-2',
      title: '2-Hour Post-Visit Review Bridge (ReputeStack Sync)',
      trigger: '2 hours after diner disconnects from venue WiFi',
      sms_copy: 'Thanks for dining with us tonight at Trattoria Bella! If you loved your dinner, would you leave Chef Mateo a quick 5★ review? Tap here: {review_link}',
      active: true,
      reviews_generated: 184,
      revenue_generated: 4200
    },
    {
      id: 'camp-3',
      title: 'Birthday VIP Celebration Club',
      trigger: 'Fires 3 days before guest birthday',
      sms_copy: 'Happy Birthday month {first_name}! Celebrate with us at Trattoria Bella and enjoy a complimentary bottle of Prosecco on your birthday table reservation.',
      active: true,
      diners_reactivated: 68,
      revenue_generated: 3420
    }
  ])

  // Captive WiFi Portal Splash Screen Settings
  const captivePortal = ref({
    headline: 'Welcome to Trattoria Bella Italian Kitchen',
    subheadline: 'Enjoy complimentary high-speed guest WiFi with our compliments',
    brand_color: '#10b981',
    hero_image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    opt_in_vip_club: true,
    vip_incentive: 'Get 10% off your next chef special by joining our diner text club',
    require_phone: true,
    require_name: true,
    login_buttons: ['sms', 'apple', 'google']
  })

  // Hardware Integrations
  const integrations = ref({
    wifiGateway: {
      provider: 'Ubiquiti UniFi Cloud Controller & Radius Bridge',
      status: 'connected',
      access_points: 4,
      controller_url: 'https://unifi.trattoriabella.com:8443',
      active_ssids: ['Trattoria_Guest_WiFi', 'Trattoria_Staff_Private']
    },
    posSync: {
      provider: 'Toast POS & Square Dining API',
      status: 'connected',
      order_matching: true
    },
    twilioSms: {
      account_sid: 'AC_DINEGUEST_PROD_8912',
      sender_phone: '+1 (415) 880-9122',
      status: 'verified'
    }
  })

  // Agency Retainer Billing
  const billing = ref({
    agencySubscription: {
      plan_name: 'Agency Scale (Unlimited Venues)',
      price: 79,
      venues_used: 3,
      venues_included: 20,
      payment_method: 'Mastercard •••• 9811',
      next_billing_date: 'Nov 1, 2026'
    },
    stripeConnect: {
      charges_enabled: true,
      balance_available: 2840.00
    },
    venueRetainers: [
      { venue_id: 'rest-1', venue_name: 'Trattoria Bella Italian Kitchen', monthly_fee: 149, card_brand: 'Visa', card_last4: '4412', status: 'paid', next_charge_date: 'Nov 1, 2026', dunning_attempts: 0 },
      { venue_id: 'rest-2', venue_name: 'Sakura Omakase & Bistro', monthly_fee: 199, card_brand: 'Mastercard', card_last4: '9021', status: 'paid', next_charge_date: 'Nov 1, 2026', dunning_attempts: 0 },
      { venue_id: 'rest-3', venue_name: 'The Grillhouse & Smokehouse', monthly_fee: 99, card_brand: 'Amex', card_last4: '1088', status: 'expiring_soon', next_charge_date: 'Nov 1, 2026', dunning_attempts: 0 }
    ]
  })

  // White-Label DNS & SMTP
  const whiteLabelDns = ref({
    custom_cname: 'wifi.tastecraft.agency',
    cname_target: 'splash.dineguest.app',
    status: 'verified',
    sender_name: 'TasteCraft Dining VIP Club',
    sender_email: 'vip@tastecraft.agency'
  })

  // Computed
  const totalMonthlyRetainers = computed(() => {
    return billing.value.venueRetainers.reduce((acc, v) => acc + v.monthly_fee, 0)
  })

  const totalDinersCaptured = computed(() => {
    return restaurants.value.reduce((acc, r) => acc + r.diners_captured_month, 0)
  })

  const totalCampaignRevenue = computed(() => {
    return restaurants.value.reduce((acc, r) => acc + r.campaign_revenue_month, 0)
  })

  // Actions
  function simulateDinerConnect(guestName = 'Luca Ferrari', guestPhone = '+1 (415) 555-9012') {
    const restaurant = selectedRestaurant.value

    const newActiveDiner = {
      id: 'active-' + Date.now(),
      name: guestName,
      phone: guestPhone,
      device: 'iPhone 16 Pro',
      mac: '9C:35:EB:89:14:02',
      dwell_minutes: 1,
      section: 'Main Patio (Table 12)',
      vip_tier: 'First-Time Guest',
      visits_count: 1,
      connected_at: 'Just now'
    }

    activeDiners.value.unshift(newActiveDiner)
    restaurant.diners_captured_month++

    // Add to guests CRM if not exists
    guests.value.unshift({
      id: 'guest-' + Date.now(),
      name: guestName,
      phone: guestPhone,
      email: `${guestName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      total_visits: 1,
      last_visit: 'Today (Active)',
      avg_party_size: 2,
      favorite_dish: 'Wood-Fired Pizza',
      estimated_spend: 75,
      vip_status: 'First-Time Guest',
      marketing_opt_in: true
    })

    saveLocal()
    return newActiveDiner
  }

  function updateCaptivePortal(newSettings) {
    captivePortal.value = { ...captivePortal.value, ...newSettings }
    saveLocal()
  }

  function updateAgency(newProfile) {
    agency.value = { ...agency.value, ...newProfile }
    saveLocal()
  }

  function toggleClientPortalMode(force) {
    clientPortalViewMode.value = force !== undefined ? force : !clientPortalViewMode.value
    saveLocal()
  }

  function sendDunningNotice(venueId) {
    const item = billing.value.venueRetainers.find(v => v.venue_id === venueId)
    if (item) {
      item.dunning_attempts++
      saveLocal()
    }
  }

  function broadcastFlashPromo(headline, offerDiscount) {
    alert(`🚀 Flash VIP SMS Broadcast Dispatched to ${selectedRestaurant.value.diners_captured_month} verified diners!\n\nMessage:\n"${headline} — Show this text tonight at ${selectedRestaurant.value.name} for ${offerDiscount} off your check!"`)
  }

  function saveLocal() {
    try {
      localStorage.setItem('dineguest_state', JSON.stringify({
        agency: agency.value,
        restaurants: restaurants.value,
        billing: billing.value,
        captivePortal: captivePortal.value,
        whiteLabelDns: whiteLabelDns.value
      }))
    } catch (e) {
      // Ignore
    }
  }

  function loadLocal() {
    try {
      const saved = localStorage.getItem('dineguest_state')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.agency) agency.value = parsed.agency
        if (parsed.restaurants) restaurants.value = parsed.restaurants
        if (parsed.billing) billing.value = parsed.billing
        if (parsed.captivePortal) captivePortal.value = parsed.captivePortal
        if (parsed.whiteLabelDns) whiteLabelDns.value = parsed.whiteLabelDns
      }
    } catch (e) {
      // fallback
    }
  }

  loadLocal()

  return {
    agency,
    clientPortalViewMode,
    restaurants,
    selectedRestaurantId,
    selectedRestaurant,
    activeDiners,
    guests,
    campaigns,
    captivePortal,
    integrations,
    billing,
    whiteLabelDns,
    totalMonthlyRetainers,
    totalDinersCaptured,
    totalCampaignRevenue,
    simulateDinerConnect,
    updateCaptivePortal,
    updateAgency,
    toggleClientPortalMode,
    sendDunningNotice,
    broadcastFlashPromo
  }
})
