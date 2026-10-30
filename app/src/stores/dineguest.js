import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase, isConfigured, setCustomSupabaseCredentials, testSupabaseConnection } from '../services/supabase'

export const useDineGuestStore = defineStore('dineguest', () => {
  const isSupabaseActive = ref(isConfigured)
  const isSyncing = ref(false)
  const syncError = ref(null)

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

  // Fallback Venue Model
  const fallbackRestaurant = {
    id: 'placeholder',
    name: 'Demo Hospitality Venue',
    slug: 'demo-venue',
    venue_type: 'Restaurant & Bar',
    owner_name: 'General Manager',
    phone: '+1 (415) 555-0182',
    wifi_ssid: 'Guest_Free_WiFi',
    router_gateway: 'Ubiquiti UniFi Cloud Controller',
    diners_captured_month: 0,
    total_diners_database: 0,
    repeat_rate: 34.8,
    monthly_retainer: 149,
    campaign_revenue_month: 0,
    status: 'active',
    card_brand: 'Visa',
    card_last4: '4412',
    next_billing: 'Nov 1, 2026'
  }

  // Client Venues (Loaded from Supabase)
  const restaurants = ref([])
  const selectedRestaurantId = ref('')

  const selectedRestaurant = computed(() => {
    return restaurants.value.find(r => r.id === selectedRestaurantId.value) || restaurants.value[0] || fallbackRestaurant
  })

  // Live Connected Diners in Dining Room Right Now
  const activeDiners = ref([])

  // Diner CRM Directory
  const guests = ref([])

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
    headline: 'Welcome to Complimentary Guest WiFi',
    subheadline: 'Enjoy high-speed guest internet with our compliments',
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
      venues_used: computed(() => restaurants.value.length),
      venues_included: 20,
      payment_method: 'Mastercard •••• 9811',
      next_billing_date: 'Nov 1, 2026'
    },
    stripeConnect: {
      charges_enabled: true,
      balance_available: 2840.00
    },
    venueRetainers: [
      { venue_id: 'rest-1', venue_name: 'Trattoria Bella Italian Kitchen', monthly_fee: 149, card_brand: 'Visa', card_last4: '4412', status: 'paid', next_charge_date: 'Nov 1, 2026', dunning_attempts: 0 }
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
    return restaurants.value.reduce((acc, r) => acc + (Number(r.monthly_retainer) || 0), 0)
  })

  const totalDinersCaptured = computed(() => {
    return restaurants.value.reduce((acc, r) => acc + (Number(r.diners_captured_month) || 0), 0)
  })

  const totalCampaignRevenue = computed(() => {
    return restaurants.value.reduce((acc, r) => acc + (Number(r.campaign_revenue_month) || 0), 0)
  })

  // --- SUPABASE DATA FETCHING ---
  async function fetchFromSupabase() {
    if (!supabase) return
    isSyncing.value = true
    syncError.value = null

    try {
      // 1. Fetch Restaurants
      const { data: venueRows, error: venueErr } = await supabase
        .from('restaurants')
        .select('*')
        .order('created_at', { ascending: false })

      if (venueErr) throw venueErr

      if (venueRows && venueRows.length > 0) {
        restaurants.value = venueRows.map(v => ({
          id: v.id,
          name: v.name,
          slug: v.slug,
          venue_type: v.venue_type || 'Restaurant & Bar',
          owner_name: v.owner_name,
          phone: v.phone,
          wifi_ssid: v.wifi_ssid || 'Guest_WiFi',
          router_gateway: v.router_gateway || 'Ubiquiti UniFi',
          diners_captured_month: Number(v.diners_captured_month || 0),
          total_diners_database: Number(v.total_diners_database || 0),
          repeat_rate: Number(v.repeat_rate || 32.5),
          monthly_retainer: Number(v.monthly_retainer || 149),
          campaign_revenue_month: Number(v.campaign_revenue_month || 0),
          status: v.status || 'active',
          card_brand: v.card_brand || 'Visa',
          card_last4: v.card_last4 || '4412',
          next_billing: v.next_billing || 'Nov 1, 2026'
        }))

        if (!selectedRestaurantId.value || !restaurants.value.find(r => r.id === selectedRestaurantId.value)) {
          selectedRestaurantId.value = restaurants.value[0].id
        }
      }

      // 2. Fetch Active WiFi Sessions
      const { data: sessionRows, error: sessionErr } = await supabase
        .from('active_wifi_sessions')
        .select('*')
        .order('connected_at', { ascending: false })
        .limit(20)

      if (!sessionErr && sessionRows && sessionRows.length > 0) {
        activeDiners.value = sessionRows.map(s => ({
          id: s.id,
          name: s.diner_name,
          phone: s.diner_phone,
          device: s.device_model || 'Smartphone',
          mac: s.mac_address,
          dwell_minutes: Number(s.dwell_minutes || 1),
          section: s.seating_section || 'Main Dining',
          vip_tier: s.vip_tier || 'First-Time Guest',
          visits_count: 1,
          connected_at: formatTimeAgo(s.connected_at)
        }))
      }

      // 3. Fetch Diner CRM Profiles
      const { data: crmRows, error: crmErr } = await supabase
        .from('diner_crm')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)

      if (!crmErr && crmRows && crmRows.length > 0) {
        guests.value = crmRows.map(g => ({
          id: g.id,
          name: g.name,
          phone: g.phone,
          email: g.email || `${g.name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
          total_visits: Number(g.total_visits || 1),
          last_visit: g.last_visit || 'Today',
          avg_party_size: Number(g.avg_party_size || 2),
          favorite_dish: g.favorite_dish || 'Chef Special',
          estimated_spend: Number(g.estimated_spend || 75),
          vip_status: g.vip_status || 'First-Time Guest',
          marketing_opt_in: Boolean(g.marketing_opt_in)
        }))
      }

      isSupabaseActive.value = true
    } catch (err) {
      console.warn('Supabase DineGuest fetch notice:', err.message)
      syncError.value = err.message
    } finally {
      isSyncing.value = false
    }
  }

  // --- ACTIONS (Write to Supabase + Local Reactive State) ---
  async function simulateDinerConnect(guestName = 'Luca Ferrari', guestPhone = '+1 (415) 555-9012') {
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
    if (restaurant && restaurant.id !== 'placeholder') {
      restaurant.diners_captured_month++
    }

    const newGuest = {
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
    }

    guests.value.unshift(newGuest)

    // Persist to Supabase if connected
    if (supabase && restaurant && restaurant.id !== 'placeholder') {
      try {
        await supabase.from('active_wifi_sessions').insert({
          restaurant_id: restaurant.id,
          diner_name: guestName,
          diner_phone: guestPhone,
          device_model: newActiveDiner.device,
          mac_address: newActiveDiner.mac,
          dwell_minutes: 1,
          seating_section: newActiveDiner.section,
          vip_tier: newActiveDiner.vip_tier
        })

        await supabase.from('diner_crm').insert({
          restaurant_id: restaurant.id,
          name: guestName,
          phone: guestPhone,
          email: newGuest.email,
          total_visits: 1,
          avg_party_size: 2,
          favorite_dish: newGuest.favorite_dish,
          estimated_spend: newGuest.estimated_spend,
          vip_status: newGuest.vip_status,
          marketing_opt_in: true
        })
      } catch (e) {
        console.warn('Supabase connect log notice:', e.message)
      }
    }

    return newActiveDiner
  }

  // 1-Click Database Seed into Supabase
  async function seedSupabaseDatabase() {
    if (!supabase) {
      alert('Please configure your Supabase URL & Anon Key first!')
      return
    }

    isSyncing.value = true
    try {
      const demoVenues = [
        {
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
          monthly_retainer: 149.00,
          campaign_revenue_month: 14250.00,
          status: 'active'
        },
        {
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
          monthly_retainer: 199.00,
          campaign_revenue_month: 18900.00,
          status: 'active'
        },
        {
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
          monthly_retainer: 99.00,
          campaign_revenue_month: 8700.00,
          status: 'expiring_soon'
        }
      ]

      const { data: insertedVenues, error: venueErr } = await supabase
        .from('restaurants')
        .insert(demoVenues)
        .select()

      if (venueErr) throw venueErr

      alert('✅ Successfully populated Supabase database with restaurant venues!')
      await fetchFromSupabase()
    } catch (err) {
      alert('Seed Error: ' + err.message)
    } finally {
      isSyncing.value = false
    }
  }

  function updateCaptivePortal(newSettings) {
    captivePortal.value = { ...captivePortal.value, ...newSettings }
  }

  function updateAgency(newProfile) {
    agency.value = { ...agency.value, ...newProfile }
  }

  function toggleClientPortalMode(force) {
    clientPortalViewMode.value = force !== undefined ? force : !clientPortalViewMode.value
  }

  function sendDunningNotice(venueId) {
    const item = billing.value.venueRetainers.find(v => v.venue_id === venueId)
    if (item) {
      item.dunning_attempts++
    }
  }

  function broadcastFlashPromo(headline, offerDiscount) {
    alert(`🚀 Flash VIP SMS Broadcast Dispatched to ${selectedRestaurant.value.diners_captured_month} verified diners!\n\nMessage:\n"${headline} — Show this text tonight at ${selectedRestaurant.value.name} for ${offerDiscount} off your check!"`)
  }

  function formatTimeAgo(dateString) {
    if (!dateString) return 'Just now'
    const diff = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000)
    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    return `${Math.floor(diff / 3600)}h ago`
  }

  // Load from Supabase on startup
  fetchFromSupabase()

  return {
    isSupabaseActive,
    isSyncing,
    syncError,
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
    fetchFromSupabase,
    simulateDinerConnect,
    seedSupabaseDatabase,
    updateCaptivePortal,
    updateAgency,
    toggleClientPortalMode,
    sendDunningNotice,
    broadcastFlashPromo,
    setCustomSupabaseCredentials,
    testSupabaseConnection
  }
})
