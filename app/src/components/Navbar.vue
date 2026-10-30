<template>
  <header class="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Left: Logo & Agency Brand -->
      <div class="flex items-center space-x-4 sm:space-x-6">
        <router-link to="/" class="flex items-center space-x-3 group">
          <div
            class="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-slate-950 shadow-md transition-transform group-hover:scale-105 shrink-0"
            :style="{ backgroundColor: store.agency.brand_color || '#10b981' }"
          >
            <Wifi class="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div class="flex items-center space-x-2">
              <span class="font-bold tracking-tight text-white text-base">
                {{ store.clientPortalViewMode ? 'Manager Portal' : 'DineGuest' }}
              </span>
              <span
                v-if="store.clientPortalViewMode"
                class="text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20"
              >
                Restaurant View
              </span>
              <span
                v-else
                class="text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              >
                White-Label
              </span>
            </div>
            <p class="text-xs text-slate-400 hidden sm:block truncate max-w-[200px]">
              {{ store.clientPortalViewMode ? store.selectedRestaurant.name : store.agency.agency_name }}
            </p>
          </div>
        </router-link>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center space-x-1">
          <template v-if="!store.clientPortalViewMode">
            <router-link
              to="/"
              class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              :class="route.path === '/' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'"
            >
              WiFi Radar
            </router-link>
            <router-link
              to="/portal-designer"
              class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              :class="route.path === '/portal-designer' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'"
            >
              Splash Designer
            </router-link>
            <router-link
              to="/guests"
              class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              :class="route.path === '/guests' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'"
            >
              Diner CRM
            </router-link>
            <router-link
              to="/campaigns"
              class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5"
              :class="route.path === '/campaigns' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'"
            >
              <span>VIP SMS Bots</span>
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </router-link>
            <router-link
              to="/integrations"
              class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              :class="route.path === '/integrations' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'"
            >
              Hardware & APs
            </router-link>
            <router-link
              to="/billing"
              class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5"
              :class="route.path === '/billing' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'"
            >
              <span>Retainers</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 font-mono">
                ${{ store.totalMonthlyRetainers }}
              </span>
            </router-link>
            <router-link
              to="/settings"
              class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              :class="route.path === '/settings' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'"
            >
              White-Label
            </router-link>
            <router-link
              to="/kiosk"
              class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5"
              :class="route.path === '/kiosk' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'"
            >
              <Tablet class="w-3.5 h-3.5 text-emerald-400" />
              <span>Hostess Kiosk</span>
            </router-link>
          </template>

          <template v-else>
            <router-link
              to="/"
              class="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-800 text-white"
            >
              Live Connected Diners
            </router-link>
            <router-link
              to="/guests"
              class="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white"
            >
              My VIP Diner List
            </router-link>
          </template>
        </nav>
      </div>

      <!-- Right: Action Buttons -->
      <div class="flex items-center space-x-2 sm:space-x-3">
        <!-- Exit Simulation Button -->
        <button
          v-if="store.clientPortalViewMode"
          @click="store.toggleClientPortalMode(false)"
          class="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-all"
        >
          <EyeOff class="w-3.5 h-3.5" />
          <span>Exit Simulation</span>
        </button>

        <!-- Instant Test Simulator Trigger -->
        <button
          @click="triggerSimulatedConnect"
          class="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-950 transition-all shadow-md hover:brightness-110 active:scale-95"
          :style="{ backgroundColor: store.agency.brand_color || '#10b981' }"
        >
          <Zap class="w-3.5 h-3.5 text-slate-950" />
          <span class="hidden sm:inline">Simulate Diner WiFi Connect</span>
          <span class="sm:hidden">Test Connect</span>
        </button>

        <!-- Mobile Drawer Toggle -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 border border-slate-700 transition-colors focus:outline-none"
        >
          <X v-if="mobileMenuOpen" class="w-5 h-5" />
          <Menu v-else class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div
      v-if="mobileMenuOpen"
      class="md:hidden border-t border-slate-800 bg-slate-900/98 px-4 py-4 space-y-2 backdrop-blur-xl animate-fade-in"
    >
      <template v-if="!store.clientPortalViewMode">
        <router-link
          to="/"
          @click="mobileMenuOpen = false"
          class="block px-3 py-2 rounded-xl text-sm font-semibold transition-colors"
          :class="route.path === '/' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'"
        >
          Guest WiFi Presence Radar
        </router-link>
        <router-link
          to="/portal-designer"
          @click="mobileMenuOpen = false"
          class="block px-3 py-2 rounded-xl text-sm font-semibold transition-colors"
          :class="route.path === '/portal-designer' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'"
        >
          Captive Splash Screen Customizer
        </router-link>
        <router-link
          to="/guests"
          @click="mobileMenuOpen = false"
          class="block px-3 py-2 rounded-xl text-sm font-semibold transition-colors"
          :class="route.path === '/guests' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'"
        >
          Diner CRM & VIP Profiles
        </router-link>
        <router-link
          to="/campaigns"
          @click="mobileMenuOpen = false"
          class="block px-3 py-2 rounded-xl text-sm font-semibold transition-colors"
          :class="route.path === '/campaigns' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'"
        >
          VIP SMS Churn & Review Bots
        </router-link>
        <router-link
          to="/integrations"
          @click="mobileMenuOpen = false"
          class="block px-3 py-2 rounded-xl text-sm font-semibold transition-colors"
          :class="route.path === '/integrations' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'"
        >
          UniFi & Meraki Hardware Hub
        </router-link>
        <router-link
          to="/billing"
          @click="mobileMenuOpen = false"
          class="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-colors"
          :class="route.path === '/billing' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'"
        >
          <span>Hospitality Retainers</span>
          <span class="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
            ${{ store.totalMonthlyRetainers }}/mo
          </span>
        </router-link>
        <router-link
          to="/settings"
          @click="mobileMenuOpen = false"
          class="block px-3 py-2 rounded-xl text-sm font-semibold transition-colors"
          :class="route.path === '/settings' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'"
        >
          Agency White-Label & DNS
        </router-link>
        <router-link
          to="/kiosk"
          @click="mobileMenuOpen = false"
          class="block px-3 py-2 rounded-xl text-sm font-semibold transition-colors"
          :class="route.path === '/kiosk' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'"
        >
          Hostess Stand Kiosk (PIN Locked)
        </router-link>
      </template>

      <template v-else>
        <router-link
          to="/"
          @click="mobileMenuOpen = false"
          class="block px-3 py-2 rounded-xl text-sm font-semibold bg-emerald-600 text-white"
        >
          Live Connected Diners
        </router-link>
        <button
          @click="store.toggleClientPortalMode(false); mobileMenuOpen = false"
          class="w-full text-left px-3 py-2 rounded-xl text-sm font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20"
        >
          ✕ Exit Restaurant Simulation
        </button>
      </template>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDineGuestStore } from '../stores/dineguest'
import {
  Wifi,
  Zap,
  Tablet,
  EyeOff,
  Menu,
  X
} from 'lucide-vue-next'

const route = useRoute()
const store = useDineGuestStore()
const mobileMenuOpen = ref(false)

function triggerSimulatedConnect() {
  const diners = [
    { name: 'Gianluigi Buffon', phone: '+1 (415) 555-8812' },
    { name: 'Elena Rostova', phone: '+1 (415) 555-4421' },
    { name: 'Marcus Sterling', phone: '+1 (415) 555-7799' },
    { name: 'Aaliyah Jones', phone: '+1 (415) 555-3310' }
  ]
  const randomDiner = diners[Math.floor(Math.random() * diners.length)]
  const result = store.simulateDinerConnect(randomDiner.name, randomDiner.phone)
  alert(`📶 NEW DINER CONNECTED TO GUEST WIFI!\n\nDiner: ${result.name} (${result.phone})\nDevice: ${result.device}\nVenue: ${store.selectedRestaurant.name}\n\n✓ Added to VIP Diner CRM!\n✓ Captive portal opt-in confirmed: 10% off Tuesday text scheduled.`)
}
</script>
