<template>
  <div class="space-y-8 pb-16 max-w-5xl">
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center space-x-2 text-xs text-slate-400 mb-1">
          <router-link to="/" class="hover:text-white">← Live Radar</router-link>
          <span>/</span>
          <span class="text-emerald-400 font-medium">VIP SMS Automation</span>
        </div>
        <h1 class="text-3xl font-extrabold text-white tracking-tight font-display">Automated Diner Re-Engagement & Churn Bots</h1>
        <p class="text-xs text-slate-400">
          Autonomously brings diners back to the dining room during slow mid-week nights using verified WiFi visit history.
        </p>
      </div>

      <!-- Total Influenced Sales Pill -->
      <div class="flex items-center space-x-3">
        <div class="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs">
          <span class="text-slate-400">Bot Revenue Influenced:</span>
          <span class="font-bold text-emerald-400 font-mono text-sm">+$15,430 / mo</span>
        </div>
      </div>
    </div>

    <!-- FLASH SLOW-NIGHT SMS BROADCAST TOOL -->
    <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/5 via-slate-900 to-slate-900 space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 class="text-base font-bold text-white flex items-center space-x-2">
            <Zap class="w-4 h-4 text-emerald-400" />
            <span>Flash Slow-Night SMS Broadcast ("Fill Empty Tables")</span>
          </h3>
          <p class="text-xs text-slate-400">Send a 1-tap text offer to verified local diners to immediately pack your restaurant on slow Tuesdays or Wednesdays</p>
        </div>

        <span class="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full">
          TCPA Compliant Blast
        </span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label class="block font-bold uppercase tracking-wider text-slate-400 mb-1 text-[10px]">Target Audience Segment</label>
          <select
            v-model="flashPromo.segment"
            class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500 font-medium"
          >
            <option value="All Verified Diners (4,120 recipients)">All Verified Diners (4,120 recipients)</option>
            <option value="Regulars & VIPs Only (1,240 recipients)">Regulars & VIPs Only (1,240 recipients)</option>
            <option value="Inactive Diners 30+ Days (850 recipients)">Inactive Diners 30+ Days (850 recipients)</option>
          </select>
        </div>

        <div>
          <label class="block font-bold uppercase tracking-wider text-slate-400 mb-1 text-[10px]">Exclusive Flash Offer</label>
          <input
            v-model="flashPromo.offer"
            type="text"
            placeholder="e.g. Free Bottle of Wine with 2 Entrees"
            class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <!-- Preview & Broadcast Button -->
      <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div class="space-y-1">
          <span class="text-[10px] uppercase font-bold text-slate-400">SMS Copy Preview:</span>
          <p class="text-slate-300 font-mono text-[11px]">
            "Hey {first_name}, slow rainy night at Trattoria Bella! Show this text tonight before 9PM to get: <strong class="text-emerald-400">{{ flashPromo.offer }}</strong>. Table reservations: https://tbl.io/bella"
          </p>
        </div>

        <button
          @click="fireFlashBroadcast"
          class="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-400/20 transition-all shrink-0 active:scale-95 flex items-center space-x-1.5"
        >
          <Send class="w-3.5 h-3.5" />
          <span>Dispatch Flash Blast</span>
        </button>
      </div>
    </div>

    <!-- 3 AUTONOMOUS CHURN & REVIEW BOTS -->
    <div class="space-y-4">
      <h3 class="text-base font-bold text-white flex items-center space-x-2">
        <Bot class="w-4 h-4 text-cyan-400" />
        <span>Always-On Autonomous Re-Engagement Bots</span>
      </h3>

      <div class="grid grid-cols-1 gap-4">
        <div
          v-for="camp in store.campaigns"
          :key="camp.id"
          class="glass-panel p-5 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
        >
          <div class="space-y-1.5 max-w-xl">
            <div class="flex items-center space-x-2">
              <span class="font-bold text-sm text-white">{{ camp.title }}</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                ✓ Auto-Active
              </span>
            </div>
            <p class="text-[11px] text-slate-400 font-mono">Trigger: {{ camp.trigger }}</p>
            <p class="text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-[11px]">
              "{{ camp.sms_copy }}"
            </p>
          </div>

          <div class="text-right shrink-0 space-y-1 sm:pl-4 sm:border-l sm:border-slate-800">
            <div class="text-2xl font-black text-emerald-400 font-display">
              ${{ camp.revenue_generated.toLocaleString() }}
            </div>
            <div class="text-[11px] text-slate-400 font-medium">Direct Sales Generated</div>
            <div class="text-[10px] text-slate-400 font-mono">
              {{ camp.diners_reactivated ? `${camp.diners_reactivated} Diners Returned` : `${camp.reviews_generated} 5★ Reviews Generated` }}
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useDineGuestStore } from '../stores/dineguest'
import {
  Zap,
  Send,
  Bot
} from 'lucide-vue-next'

const store = useDineGuestStore()

const flashPromo = reactive({
  segment: 'All Verified Diners (4,120 recipients)',
  offer: 'Free Truffle Arancini with any 2 Chef Entrees'
})

function fireFlashBroadcast() {
  store.broadcastFlashPromo(flashPromo.segment, flashPromo.offer)
}
</script>
