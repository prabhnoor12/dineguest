<template>
  <div class="space-y-8 pb-16">
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center space-x-2 text-xs text-slate-400 mb-1">
          <router-link to="/" class="hover:text-white">← Live Radar</router-link>
          <span>/</span>
          <span class="text-emerald-400 font-medium">Diner CRM Directory</span>
        </div>
        <h1 class="text-3xl font-extrabold text-white tracking-tight font-display">Diner CRM & VIP Profiles</h1>
        <p class="text-xs text-slate-400">
          Every diner captured via guest WiFi, automatically tagged by visit frequency, dwell time, and estimated lifetime spend.
        </p>
      </div>

      <div class="flex items-center space-x-3">
        <button
          @click="exportCsv"
          class="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
        >
          <Download class="w-3.5 h-3.5" />
          <span>Export Diner CSV</span>
        </button>
      </div>
    </div>

    <!-- FILTER CHIPS & SEARCH -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="flex items-center gap-2 flex-wrap text-xs">
        <button
          v-for="filter in ['All Diners', 'Platinum VIP (10+)', 'Gold Regulars', 'At-Risk (30+ Days Inactive)']"
          :key="filter"
          @click="activeFilter = filter"
          class="px-3 py-1.5 rounded-xl font-bold transition-all"
          :class="activeFilter === filter ? 'bg-emerald-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'"
        >
          {{ filter }}
        </button>
      </div>

      <div class="relative w-full sm:w-64">
        <Search class="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search diner name or phone..."
          class="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
        />
      </div>
    </div>

    <!-- DINER CRM TABLE -->
    <div class="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px] bg-slate-950/60">
              <th class="py-3 px-4">Diner Name & Contact</th>
              <th class="py-3 px-4">VIP Loyalty Status</th>
              <th class="py-3 px-4">Visit Count</th>
              <th class="py-3 px-4">Last WiFi Visit</th>
              <th class="py-3 px-4">Favorite Ordered Dish</th>
              <th class="py-3 px-4 text-right">Est. Spend</th>
              <th class="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60">
            <tr
              v-for="guest in filteredGuests"
              :key="guest.id"
              class="hover:bg-slate-900/40 transition-colors"
            >
              <!-- Name & Contact -->
              <td class="py-3.5 px-4">
                <div class="font-bold text-white text-sm">{{ guest.name }}</div>
                <div class="text-[11px] font-mono text-emerald-400">{{ guest.phone }}</div>
                <div class="text-[10px] text-slate-400 font-mono">{{ guest.email }}</div>
              </td>

              <!-- VIP Tier -->
              <td class="py-3.5 px-4">
                <span
                  class="px-2.5 py-1 rounded-full text-[10px] font-bold"
                  :class="{
                    'bg-amber-500/10 text-amber-300 border border-amber-500/30': guest.vip_status.includes('Platinum') || guest.vip_status.includes('Gold'),
                    'bg-slate-800 text-slate-300 border border-slate-700': guest.vip_status.includes('Silver'),
                    'bg-rose-500/10 text-rose-400 border border-rose-500/30 animate-pulse': guest.vip_status.includes('At-Risk'),
                    'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30': guest.vip_status.includes('First-Time')
                  }"
                >
                  {{ guest.vip_status }}
                </span>
              </td>

              <!-- Visits -->
              <td class="py-3.5 px-4 font-mono font-bold text-white">
                {{ guest.total_visits }} visits
              </td>

              <!-- Last Visit -->
              <td class="py-3.5 px-4 text-slate-300 font-mono">
                {{ guest.last_visit }}
              </td>

              <!-- Favorite Dish -->
              <td class="py-3.5 px-4 text-slate-300">
                <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px]">
                  {{ guest.favorite_dish }}
                </span>
              </td>

              <!-- Spend -->
              <td class="py-3.5 px-4 font-mono font-bold text-emerald-400 text-right text-sm">
                ${{ guest.estimated_spend }}
              </td>

              <!-- Action -->
              <td class="py-3.5 px-4 text-right">
                <button
                  @click="sendPersonalSms(guest.name, guest.phone)"
                  class="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold transition-colors"
                >
                  Text VIP Offer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDineGuestStore } from '../stores/dineguest'
import {
  Download,
  Search
} from 'lucide-vue-next'

const store = useDineGuestStore()
const activeFilter = ref('All Diners')
const searchQuery = ref('')

const filteredGuests = computed(() => {
  let list = store.guests
  if (activeFilter.value === 'Platinum VIP (10+)') {
    list = list.filter(g => g.total_visits >= 10)
  } else if (activeFilter.value === 'Gold Regulars') {
    list = list.filter(g => g.vip_status.includes('Gold') || g.vip_status.includes('Silver'))
  } else if (activeFilter.value === 'At-Risk (30+ Days Inactive)') {
    list = list.filter(g => g.vip_status.includes('At-Risk'))
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(g => g.name.toLowerCase().includes(q) || g.phone.includes(q))
  }
  return list
})

function sendPersonalSms(name, phone) {
  alert(`📱 1-to-1 VIP SMS Dispatched to ${name} (${phone}):\n\n"Chef Mateo has reserved a complimentary glass of Chianti Classico for you tonight at Trattoria Bella!"`)
}

function exportCsv() {
  alert('Exporting verified diner CRM list (4,120 records) with phone numbers and email addresses to CSV...')
}
</script>
