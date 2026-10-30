<template>
  <div class="space-y-8 pb-16">
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center space-x-2 text-xs text-slate-400 mb-1">
          <span class="text-emerald-400 font-medium">Guest WiFi Presence Radar</span>
          <span>/</span>
          <span>In-House Foot Traffic</span>
        </div>
        <div class="flex items-center space-x-3">
          <h1 class="text-3xl font-extrabold text-white tracking-tight font-display">Live Diner WiFi Presence</h1>
          <!-- Venue Selector Dropdown -->
          <select
            v-if="!store.clientPortalViewMode"
            v-model="store.selectedRestaurantId"
            class="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option v-for="r in store.restaurants" :key="r.id" :value="r.id">
              {{ r.name }} ({{ r.venue_type }})
            </option>
          </select>
        </div>
        <p class="text-xs text-slate-400 mt-1">
          Captures verified diner mobile numbers the moment they connect to venue WiFi and triggers automatic slow-night SMS re-engagement.
        </p>
      </div>

      <!-- Live WiFi Gateway Status Pill -->
      <div class="flex items-center space-x-3">
        <div class="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="text-slate-300">SSID:</span>
          <span class="font-bold text-white font-mono">{{ store.selectedRestaurant.wifi_ssid }}</span>
        </div>
      </div>
    </div>

    <!-- 4 KPI SCORECARDS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Diners Captured -->
      <div class="glass-panel p-5 rounded-2xl border border-slate-800">
        <div class="flex items-center justify-between text-slate-400 mb-2">
          <span class="text-[11px] font-bold uppercase tracking-wider">Diners Captured this Month</span>
          <Users class="w-4 h-4 text-emerald-400" />
        </div>
        <div class="flex items-baseline space-x-2">
          <span class="text-3xl font-black text-white font-display">{{ store.selectedRestaurant.diners_captured_month }}</span>
          <span class="text-xs text-slate-400">/ {{ store.selectedRestaurant.total_diners_database }} total</span>
        </div>
        <p class="text-[11px] text-emerald-400 font-semibold mt-2">
          +24% customer list growth vs last month
        </p>
      </div>

      <!-- Repeat Visit Rate -->
      <div class="glass-panel p-5 rounded-2xl border border-slate-800">
        <div class="flex items-center justify-between text-slate-400 mb-2">
          <span class="text-[11px] font-bold uppercase tracking-wider">Repeat Diner Visit Rate</span>
          <TrendingUp class="w-4 h-4 text-cyan-400" />
        </div>
        <div class="flex items-baseline space-x-2">
          <span class="text-3xl font-black text-white font-display">{{ store.selectedRestaurant.repeat_rate }}%</span>
          <span class="text-xs text-emerald-400 font-bold">Loyalty</span>
        </div>
        <p class="text-[11px] text-slate-400 mt-2">
          Industry avg is 20% (3rd-party delivery steals rest)
        </p>
      </div>

      <!-- Re-engagement Sales -->
      <div class="glass-panel p-5 rounded-2xl border border-slate-800">
        <div class="flex items-center justify-between text-slate-400 mb-2">
          <span class="text-[11px] font-bold uppercase tracking-wider">VIP SMS Influenced Sales</span>
          <DollarSign class="w-4 h-4 text-emerald-400" />
        </div>
        <div class="flex items-baseline space-x-2">
          <span class="text-3xl font-black text-emerald-400 font-display">${{ store.selectedRestaurant.campaign_revenue_month.toLocaleString() }}</span>
        </div>
        <p class="text-[11px] text-slate-400 mt-2">
          Direct check revenue from slow-night SMS blasts
        </p>
      </div>

      <!-- Monthly Retainer -->
      <div class="glass-panel p-5 rounded-2xl border border-slate-800">
        <div class="flex items-center justify-between text-slate-400 mb-2">
          <span class="text-[11px] font-bold uppercase tracking-wider">Hospitality Retainer</span>
          <ShieldCheck class="w-4 h-4 text-orange-400" />
        </div>
        <div class="flex items-baseline space-x-2">
          <span class="text-3xl font-black text-white font-display">${{ store.selectedRestaurant.monthly_retainer }}</span>
          <span class="text-xs text-slate-400">/mo</span>
        </div>
        <p class="text-[11px] text-emerald-400 mt-2 font-medium">
          Auto-renews on {{ store.selectedRestaurant.next_billing }}
        </p>
      </div>
    </div>

    <!-- LIVE GUEST WIFI PRESENCE BANNER -->
    <div class="glass-panel p-6 rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 via-slate-900/60 to-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex items-center space-x-5">
        <div class="relative w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
          <Wifi class="w-8 h-8 animate-pulse text-emerald-400" />
          <span class="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
          </span>
        </div>
        <div>
          <h3 class="text-base font-bold text-white flex items-center space-x-2">
            <span>{{ store.activeDiners.length }} Guests Connected Right Now</span>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live In Dining Room
            </span>
          </h3>
          <p class="text-xs text-slate-300 mt-1 max-w-xl">
            Connected via <strong class="text-white">{{ store.selectedRestaurant.router_gateway }}</strong>. When guests authenticate through the captive splash portal, their visit dwell time and verified mobile number sync into your diner CRM.
          </p>
        </div>
      </div>

      <div class="flex items-center space-x-3 shrink-0">
        <router-link
          to="/portal-designer"
          class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
        >
          Edit Splash Portal
        </router-link>
        <button
          @click="quickSimulate"
          class="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-lg shadow-emerald-400/20 transition-all active:scale-95"
        >
          <Zap class="w-4 h-4 text-slate-950" />
          <span>Simulate Diner Connect</span>
        </button>
      </div>
    </div>

    <!-- LIVE CONNECTED DINERS TABLE -->
    <div class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
        <div>
          <h3 class="text-base font-bold text-white flex items-center space-x-2">
            <span>Active In-House Dining Guests</span>
            <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              Live Presence
            </span>
          </h3>
          <p class="text-xs text-slate-400">
            Diners currently seated and logged onto venue WiFi with dwell duration.
          </p>
        </div>

        <router-link
          to="/guests"
          class="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors self-start sm:self-auto"
        >
          <Users class="w-3.5 h-3.5 text-emerald-400" />
          <span>View All {{ store.guests.length }} CRM Profiles</span>
        </router-link>
      </div>

      <div class="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px] bg-slate-950/60">
                <th class="py-3 px-4">Diner Name / Cell</th>
                <th class="py-3 px-4">Connected Device</th>
                <th class="py-3 px-4">Table / Section</th>
                <th class="py-3 px-4">Dwell Duration</th>
                <th class="py-3 px-4">VIP Loyalty Status</th>
                <th class="py-3 px-4 text-right">Lifetime Visits</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60">
              <tr
                v-for="diner in store.activeDiners"
                :key="diner.id"
                class="hover:bg-slate-900/40 transition-colors"
              >
                <!-- Diner Name -->
                <td class="py-3.5 px-4 font-bold text-white">
                  <div>{{ diner.name }}</div>
                  <div class="text-[11px] font-mono text-slate-400 font-normal">{{ diner.phone }}</div>
                </td>

                <!-- Device & MAC -->
                <td class="py-3.5 px-4">
                  <div class="text-slate-300 font-medium">{{ diner.device }}</div>
                  <div class="text-[10px] font-mono text-slate-400">{{ diner.mac }}</div>
                </td>

                <!-- Section -->
                <td class="py-3.5 px-4 text-slate-300">
                  <span class="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[11px]">
                    {{ diner.section }}
                  </span>
                </td>

                <!-- Dwell Duration -->
                <td class="py-3.5 px-4">
                  <span class="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                    <Clock class="w-3 h-3 text-emerald-400" />
                    <span>{{ diner.dwell_minutes }} mins dwell</span>
                  </span>
                </td>

                <!-- VIP Status -->
                <td class="py-3.5 px-4">
                  <span
                    class="px-2.5 py-1 rounded-full text-[10px] font-bold"
                    :class="{
                      'bg-amber-500/10 text-amber-300 border border-amber-500/30': diner.vip_tier.includes('Platinum') || diner.vip_tier.includes('Gold'),
                      'bg-slate-800 text-slate-300 border border-slate-700': diner.vip_tier.includes('Silver'),
                      'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30': diner.vip_tier.includes('First-Time')
                    }"
                  >
                    {{ diner.vip_tier }}
                  </span>
                </td>

                <!-- Lifetime Visits -->
                <td class="py-3.5 px-4 font-mono font-bold text-white text-right">
                  {{ diner.visits_count }} visits
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDineGuestStore } from '../stores/dineguest'
import {
  Wifi,
  Users,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-vue-next'

const store = useDineGuestStore()

function quickSimulate() {
  const result = store.simulateDinerConnect()
  alert(`📶 GUEST WIFI AUTHENTICATION SUCCESS!\n\nDiner: ${result.name}\nPhone: ${result.phone}\nDevice: ${result.device}\nTable: ${result.section}\n\n✓ Opted-in to Trattoria VIP Dining Club!\n✓ 10% Welcome SMS scheduled.`)
}
</script>
