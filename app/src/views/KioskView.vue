<script setup>
import { ref, computed } from 'vue'
import { useDineGuestStore } from '../stores/dineguest'
import {
  Lock,
  Unlock,
  UserPlus,
  Wifi,
  QrCode,
  CheckCircle2,
  Sparkles,
  Users,
  UtensilsCrossed,
  Send,
  ShieldCheck,
  AlertCircle
} from 'lucide-vue-next'

const store = useDineGuestStore()

const pin = ref('')
const isUnlocked = ref(false)
const pinError = ref(false)

const guestName = ref('')
const guestPhone = ref('')
const partySize = ref(2)
const tableNumber = ref('Table 12')
const vipTier = ref('Gold Regular')
const checkinSuccess = ref(false)

// Fast WiFi Voucher State
const tempVoucherCode = ref('')
const showVoucherModal = ref(false)

function pressDigit(num) {
  if (pin.value.length < 4) {
    pin.value += num
    if (pin.value.length === 4) {
      validatePin()
    }
  }
}

function clearPin() {
  pin.value = ''
  pinError.value = false
}

function validatePin() {
  if (pin.value === '1234') {
    isUnlocked.value = true
    pin.value = ''
    pinError.value = false
  } else {
    pinError.value = true
    setTimeout(() => {
      pin.value = ''
      pinError.value = false
    }, 1200)
  }
}

function lockKiosk() {
  isUnlocked.value = false
  pin.value = ''
}

function submitCheckin() {
  if (!guestName.value || !guestPhone.value) return

  store.simulateDinerConnect(guestName.value, guestPhone.value)
  checkinSuccess.value = true

  setTimeout(() => {
    guestName.value = ''
    guestPhone.value = ''
    partySize.value = 2
    checkinSuccess.value = false
  }, 2500)
}

function generateVoucher() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  tempVoucherCode.value = `GUEST-${code}`
  showVoucherModal.value = true
}
</script>

<template>
  <div class="max-w-4xl mx-auto py-4">
    <!-- LOCKED STATE: 4-Digit PIN Pad -->
    <div v-if="!isUnlocked" class="flex flex-col items-center justify-center min-h-[600px] bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
      <div class="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
        <Lock class="w-8 h-8" />
      </div>
      <h2 class="text-2xl font-bold text-white tracking-tight">Hostess Stand VIP Terminal</h2>
      <p class="text-xs text-slate-400 mt-1">Enter Hostess 4-Digit PIN (Default: 1234)</p>

      <!-- PIN Dots -->
      <div class="flex gap-4 my-8">
        <div
          v-for="i in 4"
          :key="i"
          :class="[
            'w-4 h-4 rounded-full border-2 transition-all duration-200',
            pin.length >= i ? 'bg-emerald-400 border-emerald-400 scale-110 shadow-lg shadow-emerald-500/50' : 'border-slate-600 bg-transparent',
            pinError ? 'border-red-500 bg-red-500 animate-shake' : ''
          ]"
        ></div>
      </div>

      <!-- PIN Keypad -->
      <div class="grid grid-cols-3 gap-4 w-64 max-w-full">
        <button
          v-for="n in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
          :key="n"
          @click="pressDigit(n.toString())"
          class="h-16 rounded-2xl bg-slate-800/80 hover:bg-slate-700 active:scale-95 text-xl font-bold text-white transition-all border border-slate-700/50 flex items-center justify-center"
        >
          {{ n }}
        </button>
        <button
          @click="clearPin"
          class="h-16 rounded-2xl bg-slate-800/40 hover:bg-slate-800 text-xs font-semibold text-slate-400 active:scale-95 transition-all flex items-center justify-center uppercase"
        >
          Clear
        </button>
        <button
          @click="pressDigit('0')"
          class="h-16 rounded-2xl bg-slate-800/80 hover:bg-slate-700 active:scale-95 text-xl font-bold text-white transition-all border border-slate-700/50 flex items-center justify-center"
        >
          0
        </button>
        <button
          @click="validatePin"
          class="h-16 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-xs font-bold text-white transition-all flex items-center justify-center uppercase shadow-md shadow-emerald-900/30"
        >
          Unlock
        </button>
      </div>

      <div class="mt-6 text-center">
        <span class="text-[11px] text-slate-500 font-mono">Demo Unlock PIN: 1234</span>
      </div>
    </div>

    <!-- UNLOCKED STATE: Hostess Station UI -->
    <div v-else class="space-y-6">
      <!-- Top Hostess Header -->
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-xs font-bold text-emerald-700 uppercase tracking-wider">Hostess Kiosk Active</span>
            <span class="text-xs text-slate-400">• {{ store.selectedRestaurant.name }}</span>
          </div>
          <h1 class="text-2xl font-bold text-slate-900 mt-1">Front-Desk VIP Check-In & WiFi Vouchers</h1>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="generateVoucher"
            class="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Wifi class="w-3.5 h-3.5" />
            Generate Instant Passcode
          </button>
          <button
            @click="lockKiosk"
            class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Lock class="w-3.5 h-3.5" />
            Lock Station
          </button>
        </div>
      </div>

      <!-- Quick Check-in Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- VIP Guest Check-In Form (2 Cols) -->
        <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <UserPlus class="w-5 h-5 text-emerald-600" />
              <h2 class="text-base font-bold text-slate-900">Rapid Table Check-In & VIP Enrollment</h2>
            </div>
            <span class="text-xs text-slate-400">Enrolls into WiFi CRM automatically</span>
          </div>

          <div v-if="checkinSuccess" class="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 font-medium">
            <CheckCircle2 class="w-4 h-4 text-emerald-600" />
            Guest checked in! Welcome text and WiFi credentials dispatched via SMS.
          </div>

          <form @submit.prevent="submitCheckin" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="text-xs font-semibold text-slate-700 block mb-1">Diner Full Name</label>
                <input
                  v-model="guestName"
                  required
                  placeholder="e.g. Alessandro Moretti"
                  type="text"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label class="text-xs font-semibold text-slate-700 block mb-1">Mobile Phone (For VIP Specials)</label>
                <input
                  v-model="guestPhone"
                  required
                  placeholder="+1 (415) 555-0199"
                  type="tel"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="text-xs font-semibold text-slate-700 block mb-1">Party Size</label>
                <select
                  v-model="partySize"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                >
                  <option :value="1">1 Person (Solo)</option>
                  <option :value="2">2 Persons (Couple)</option>
                  <option :value="4">4 Persons</option>
                  <option :value="6">6+ Large Party</option>
                </select>
              </div>

              <div>
                <label class="text-xs font-semibold text-slate-700 block mb-1">Seated Table</label>
                <input
                  v-model="tableNumber"
                  type="text"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium"
                />
              </div>

              <div>
                <label class="text-xs font-semibold text-slate-700 block mb-1">VIP Recognition</label>
                <select
                  v-model="vipTier"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                >
                  <option value="First-Time Guest">First-Time Guest</option>
                  <option value="Gold Regular">Gold Regular</option>
                  <option value="Platinum VIP">Platinum VIP</option>
                </select>
              </div>
            </div>

            <div class="pt-2">
              <button
                type="submit"
                class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send class="w-4 h-4" />
                Check In Party & Send VIP Welcome Text
              </button>
            </div>
          </form>
        </div>

        <!-- Quick Status & Live Diners Side Panel -->
        <div class="space-y-4">
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Hostess Quick Pulse</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <span class="text-xs font-semibold text-emerald-900">In-House Diners Connected:</span>
                <span class="text-lg font-black text-emerald-700">{{ store.activeDiners.length }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span class="text-xs font-semibold text-slate-700">Today's Total Captures:</span>
                <span class="text-lg font-black text-slate-900">48</span>
              </div>
            </div>
          </div>

          <div class="bg-slate-900 text-white rounded-2xl p-6 shadow-sm space-y-2">
            <div class="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles class="w-3.5 h-3.5" />
              Tonight's Chef Incentive
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              Every guest connecting to guest WiFi tonight receives a free limoncello dessert voucher upon bill checkout.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Instant Passcode Voucher Modal -->
    <div
      v-if="showVoucherModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <div class="bg-white rounded-2xl border border-slate-200 max-w-sm w-full p-6 shadow-2xl text-center space-y-4">
        <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
          <Wifi class="w-6 h-6" />
        </div>
        <div>
          <h3 class="text-base font-bold text-slate-900">Single-Use WiFi Voucher</h3>
          <p class="text-xs text-slate-500 mt-0.5">Valid for 3 hours of guest access</p>
        </div>

        <div class="p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl">
          <div class="text-[10px] text-slate-400 uppercase font-semibold">Passcode Voucher</div>
          <div class="font-mono text-2xl font-black text-emerald-600 mt-1 tracking-widest select-all">
            {{ tempVoucherCode }}
          </div>
        </div>

        <div class="pt-2">
          <button
            @click="showVoucherModal = false"
            class="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
