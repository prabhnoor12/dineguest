<template>
  <div class="space-y-8 pb-16 max-w-6xl">
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center space-x-2 text-xs text-slate-400 mb-1">
          <router-link to="/" class="hover:text-white">← Live Radar</router-link>
          <span>/</span>
          <span class="text-emerald-400 font-medium">Captive Splash Designer</span>
        </div>
        <h1 class="text-3xl font-extrabold text-white tracking-tight font-display">Captive WiFi Splash Screen Designer</h1>
        <p class="text-xs text-slate-400">
          Design the exact branded login screen diners see on their mobile phones when they connect to your venue's free WiFi.
        </p>
      </div>

      <button
        @click="savePortalSettings"
        class="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-lg shadow-emerald-400/20 transition-all self-start sm:self-auto active:scale-95"
      >
        <Save class="w-4 h-4" />
        <span>{{ savedToast ? '✓ Splash Screen Saved!' : 'Save Splash Portal' }}</span>
      </button>
    </div>

    <!-- MAIN TWO-COLUMN DESIGNER -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <!-- LEFT COLUMN: DESIGN CONTROLS (7 COLS) -->
      <div class="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-2">
            <Sparkles class="w-4 h-4" />
            <span>Splash Screen Content & Styling</span>
          </span>
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
            UniFi & Meraki Sync Active
          </span>
        </div>

        <div class="space-y-4 text-xs">
          <!-- Headline -->
          <div>
            <label class="block font-bold uppercase tracking-wider text-slate-300 mb-1 text-[10px]">Venue Welcome Headline</label>
            <input
              v-model="portal.headline"
              type="text"
              class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <!-- Subheadline -->
          <div>
            <label class="block font-bold uppercase tracking-wider text-slate-300 mb-1 text-[10px]">Subtitle Message</label>
            <input
              v-model="portal.subheadline"
              type="text"
              class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <!-- Hero Food Background Image Presets -->
          <div>
            <label class="block font-bold uppercase tracking-wider text-slate-300 mb-2 text-[10px]">Hero Photography Background</label>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="img in [
                  { label: 'Italian Pasta', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80' },
                  { label: 'Japanese Sushi', url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=80' },
                  { label: 'Steakhouse Grill', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80' }
                ]"
                :key="img.label"
                type="button"
                @click="portal.hero_image_url = img.url"
                class="p-2 rounded-xl border text-left transition-all relative overflow-hidden h-16 flex flex-col justify-end"
                :class="portal.hero_image_url === img.url ? 'border-emerald-500 ring-2 ring-emerald-500/30' : 'border-slate-800 opacity-60 hover:opacity-100'"
              >
                <img :src="img.url" class="absolute inset-0 w-full h-full object-cover z-0" />
                <div class="absolute inset-0 bg-slate-950/60 z-10"></div>
                <span class="relative z-20 text-[10px] font-bold text-white">{{ img.label }}</span>
              </button>
            </div>
          </div>

          <!-- VIP SMS Club Incentive -->
          <div>
            <label class="block font-bold uppercase tracking-wider text-slate-300 mb-1 text-[10px]">VIP SMS Club Incentive (Opt-In Hook)</label>
            <input
              v-model="portal.vip_incentive"
              type="text"
              class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <!-- Authentication Toggles -->
          <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Diner Login Methods</span>
            <label class="flex items-center space-x-2.5 text-slate-300">
              <input type="checkbox" checked disabled class="rounded text-emerald-500" />
              <span>📱 Mobile Phone SMS Verification (Captures verified phone for marketing)</span>
            </label>
            <label class="flex items-center space-x-2.5 text-slate-300">
              <input type="checkbox" checked disabled class="rounded text-emerald-500" />
              <span>🍏 1-Tap Apple ID Sign-In</span>
            </label>
            <label class="flex items-center space-x-2.5 text-slate-300">
              <input type="checkbox" checked disabled class="rounded text-emerald-500" />
              <span>✉️ Email Address Opt-In</span>
            </label>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN: REALISTIC IPHONE 16 MOCKUP (5 COLS) -->
      <div class="lg:col-span-5 flex justify-center">
        <!-- Phone Shell -->
        <div class="w-[320px] rounded-[48px] bg-slate-900 border-[8px] border-slate-800 shadow-2xl p-3 relative overflow-hidden">
          
          <!-- Screen Glass -->
          <div class="rounded-[38px] bg-slate-950 min-h-[560px] relative overflow-hidden flex flex-col justify-between text-white p-5">
            <!-- Background Image with Dark Vignette -->
            <img :src="portal.hero_image_url" class="absolute inset-0 w-full h-full object-cover opacity-30 z-0" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40 z-10"></div>

            <!-- Dynamic Island Notch & Status Bar -->
            <div class="relative z-20 flex items-center justify-between text-[11px] font-mono text-slate-300 pt-1">
              <span>12:42</span>
              <div class="w-20 h-4 bg-slate-950 rounded-full border border-slate-800"></div>
              <div class="flex items-center space-x-1">
                <Wifi class="w-3.5 h-3.5 text-emerald-400" />
                <span>100%</span>
              </div>
            </div>

            <!-- Splash Content -->
            <div class="relative z-20 text-center space-y-4 py-6 my-auto">
              <!-- Restaurant Logo Circle -->
              <div class="w-14 h-14 rounded-2xl bg-emerald-500 text-slate-950 font-black text-xl flex items-center justify-center mx-auto shadow-xl">
                🍷
              </div>

              <div>
                <h4 class="text-base font-black tracking-tight leading-tight font-display">{{ portal.headline }}</h4>
                <p class="text-[11px] text-slate-300 mt-1 leading-relaxed">{{ portal.subheadline }}</p>
              </div>

              <!-- VIP Offer Pill -->
              <div class="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-[10px] text-emerald-300 leading-snug">
                🎁 <strong>VIP Dining Perk:</strong> {{ portal.vip_incentive }}
              </div>

              <!-- Login Form Mockup -->
              <div class="space-y-2 text-left text-xs">
                <div>
                  <label class="block text-[9px] uppercase font-bold text-slate-400 mb-0.5">Mobile Phone (for WiFi Passcode)</label>
                  <input
                    v-model="previewPhone"
                    type="tel"
                    placeholder="+1 (415) 555-0199"
                    class="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs focus:outline-none font-mono"
                  />
                </div>
                <button
                  @click="testMockConnect"
                  class="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg active:scale-95"
                >
                  Connect to High-Speed WiFi
                </button>
              </div>

              <p class="text-[9px] text-slate-400 leading-tight">
                By connecting, you agree to receive dining offers from {{ store.selectedRestaurant.name }}. Reply STOP to cancel anytime.
              </p>
            </div>

            <!-- Home Bar Indicator -->
            <div class="relative z-20 w-28 h-1 bg-slate-600 rounded-full mx-auto"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useDineGuestStore } from '../stores/dineguest'
import {
  Save,
  Sparkles,
  Wifi
} from 'lucide-vue-next'

const store = useDineGuestStore()
const savedToast = ref(false)
const previewPhone = ref('+1 (415) 555-8912')

const portal = reactive({ ...store.captivePortal })

function savePortalSettings() {
  store.updateCaptivePortal({ ...portal })
  savedToast.value = true
  setTimeout(() => {
    savedToast.value = false
  }, 2500)
}

function testMockConnect() {
  alert(`📶 Simulated Diner Connected to Guest WiFi!\n\nPhone: ${previewPhone.value}\nAdded to ${store.selectedRestaurant.name}'s Diner CRM.\nWiFi access granted for 120 minutes.`)
}
</script>
