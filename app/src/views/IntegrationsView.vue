<script setup>
import { ref } from 'vue'
import { useDineGuestStore } from '../stores/dineguest'
import {
  Wifi,
  Radio,
  Server,
  Zap,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  RefreshCw,
  Sliders,
  ShieldCheck,
  Smartphone,
  ChevronRight,
  Database
} from 'lucide-vue-next'

const store = useDineGuestStore()

const activeTab = ref('hardware')
const isCopied = ref(false)
const testPayloadSent = ref(false)

// Mock Webhook Mapper Config for POS Integration
const webhookFields = ref([
  { sourceField: 'customer.mobile_phone', targetField: 'diner_phone', sample: '+14155557744', mapped: true },
  { sourceField: 'customer.full_name', targetField: 'diner_name', sample: 'Sophia Patel', mapped: true },
  { sourceField: 'order.total_amount_cents', targetField: 'check_spend_cents', sample: '18400', mapped: true },
  { sourceField: 'table.table_identifier', targetField: 'dining_table', sample: 'Patio-14', mapped: true },
  { sourceField: 'server.staff_name', targetField: 'assigned_waiter', sample: 'Gianni M.', mapped: true }
])

const toastWebhookUrl = `https://api.dineguest.app/v1/pos/webhook/${store.selectedRestaurant.id}`

function copyWebhookUrl() {
  navigator.clipboard.writeText(toastWebhookUrl)
  isCopied.value = true
  setTimeout(() => isCopied.value = false, 2500)
}

function simulatePosWebhook() {
  testPayloadSent.value = true
  setTimeout(() => {
    testPayloadSent.value = false
    // Simulate updating guest spend in CRM
    const guest = store.guests.find(g => g.name === 'Sophia Patel')
    if (guest) {
      guest.estimated_spend += 184
      guest.last_visit = 'Just now (POS Checkout)'
    }
    alert('✅ Test POS Checkout Webhook Ingested!\nSophia Patel check ($184.00) matched with WiFi MAC address 2C:F0:EE:88:51:D4.')
  }, 1200)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div>
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Hardware & Network Layer
          </span>
          <span class="text-xs text-slate-400">Venue: {{ store.selectedRestaurant.name }}</span>
        </div>
        <h1 class="text-2xl font-bold text-slate-900 mt-1">Router Gateways & POS Sync</h1>
        <p class="text-sm text-slate-500 mt-0.5">
          Connect hospitality AP controllers (UniFi, Omada, Meraki) and bridge POS dining transactions.
        </p>
      </div>

      <!-- Navigation Pills -->
      <div class="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
        <button
          @click="activeTab = 'hardware'"
          :class="[
            'px-4 py-2 text-xs font-semibold rounded-lg transition-all',
            activeTab === 'hardware' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          ]"
        >
          <Wifi class="w-3.5 h-3.5 inline mr-1.5" />
          WiFi Gateways
        </button>
        <button
          @click="activeTab = 'pos'"
          :class="[
            'px-4 py-2 text-xs font-semibold rounded-lg transition-all',
            activeTab === 'pos' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          ]"
        >
          <Zap class="w-3.5 h-3.5 inline mr-1.5" />
          POS Webhook Mapper
        </button>
        <button
          @click="activeTab = 'sms'"
          :class="[
            'px-4 py-2 text-xs font-semibold rounded-lg transition-all',
            activeTab === 'sms' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          ]"
        >
          <Smartphone class="w-3.5 h-3.5 inline mr-1.5" />
          Twilio / SMS Gateway
        </button>
      </div>
    </div>

    <!-- TAB 1: Hardware & Network Gateways -->
    <div v-if="activeTab === 'hardware'" class="space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- UniFi Controller Card (Active) -->
        <div class="bg-white rounded-2xl border-2 border-emerald-500/40 p-6 shadow-sm relative overflow-hidden">
          <div class="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            Active Gateway
          </div>
          <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl mb-4 border border-emerald-100">
            <Wifi class="w-6 h-6" />
          </div>
          <h3 class="text-base font-bold text-slate-900">Ubiquiti UniFi Controller</h3>
          <p class="text-xs text-slate-500 mt-1">
            Enterprise captive portal redirect via UniFi Network application & external RADIUS auth.
          </p>

          <div class="mt-4 p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
            <div class="flex justify-between items-center">
              <span class="text-slate-500">Controller Host:</span>
              <span class="font-mono text-slate-700 font-semibold truncate max-w-[160px]">unifi.trattoria.com:8443</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-500">Active APs:</span>
              <span class="font-bold text-emerald-600">4 Access Points Online</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-500">Broadcast SSID:</span>
              <span class="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800">Trattoria_Guest_WiFi</span>
            </div>
          </div>

          <div class="mt-5 flex gap-2">
            <button class="flex-1 py-2 px-3 text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl transition-colors flex items-center justify-center gap-1.5">
              <RefreshCw class="w-3.5 h-3.5" />
              Sync Radios
            </button>
            <button class="p-2 border border-slate-200 text-slate-600 hover:text-slate-900 rounded-xl">
              <Sliders class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- TP-Link Omada SDN -->
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-slate-300 transition-colors">
          <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl mb-4 border border-blue-100">
            <Radio class="w-6 h-6" />
          </div>
          <h3 class="text-base font-bold text-slate-900">TP-Link Omada SDN</h3>
          <p class="text-xs text-slate-500 mt-1">
            Hardware controller or Omada Cloud integration with external portal URL forwarding.
          </p>

          <div class="mt-4 p-3 bg-slate-50 rounded-xl space-y-2 text-xs text-slate-600">
            <div class="flex justify-between">
              <span>Controller ID:</span>
              <span class="font-mono font-medium">omada-omk-4491</span>
            </div>
            <div class="flex justify-between">
              <span>Status:</span>
              <span class="text-slate-500">Standby (Configured)</span>
            </div>
          </div>

          <div class="mt-5">
            <button class="w-full py-2 px-3 text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition-colors">
              Manage Omada Settings
            </button>
          </div>
        </div>

        <!-- Cisco Meraki Cloud APs -->
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-slate-300 transition-colors">
          <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl mb-4 border border-amber-100">
            <Server class="w-6 h-6" />
          </div>
          <h3 class="text-base font-bold text-slate-900">Cisco Meraki Dashboard</h3>
          <p class="text-xs text-slate-500 mt-1">
            EXCAP (External Captive Portal) with walled-garden domain pass-through for iOS & Android.
          </p>

          <div class="mt-4 p-3 bg-slate-50 rounded-xl space-y-2 text-xs text-slate-600">
            <div class="flex justify-between">
              <span>Meraki Org:</span>
              <span class="font-mono font-medium">TasteCraft-Network</span>
            </div>
            <div class="flex justify-between">
              <span>Status:</span>
              <span class="text-slate-500">Available</span>
            </div>
          </div>

          <div class="mt-5">
            <button class="w-full py-2 px-3 text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition-colors">
              Connect Meraki Network
            </button>
          </div>
        </div>
      </div>

      <!-- RADIUS & Walled Garden Architecture Spec -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck class="w-4 h-4 text-emerald-600" />
          External RADIUS Server & Walled Garden Configuration
        </h3>
        <p class="text-xs text-slate-500 mt-1">
          Copy these values into your venue's UniFi / Omada / Meraki wireless controller captive portal settings:
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Captive Portal Landing URL</div>
            <div class="font-mono text-xs font-bold text-slate-800 mt-1 select-all">https://wifi.tastecraft.agency/portal/trattoria-bella</div>
          </div>
          <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">RADIUS Authentication Server</div>
            <div class="font-mono text-xs font-bold text-slate-800 mt-1 select-all">radius.dineguest.app:1812</div>
          </div>
          <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Walled Garden Hostnames</div>
            <div class="font-mono text-xs font-bold text-slate-800 mt-1 select-all">*.tastecraft.agency, apple.com, google.com</div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 2: POS Webhook Field Mapper -->
    <div v-if="activeTab === 'pos'" class="space-y-6">
      <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Zap class="w-3 h-3" />
              Two-Way Revenue Enrichment
            </div>
            <h3 class="text-lg font-bold text-slate-900 mt-2">Visual No-Code POS Webhook Mapper</h3>
            <p class="text-xs text-slate-500 mt-0.5">
              Ingest real-time checkout orders from Toast POS, Square Dining, or Clover to enrich diner WiFi CRM profiles with actual check totals.
            </p>
          </div>
          <button
            @click="simulatePosWebhook"
            :disabled="testPayloadSent"
            class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw :class="['w-3.5 h-3.5', testPayloadSent ? 'animate-spin' : '']" />
            {{ testPayloadSent ? 'Ingesting Mock Checkout...' : 'Send Test POS Checkout' }}
          </button>
        </div>

        <!-- Ingestion Endpoint -->
        <div class="mt-6">
          <label class="text-xs font-semibold text-slate-700 block mb-1.5">Your Venue Inbound Webhook URL (Toast / Square / Clover):</label>
          <div class="flex items-center gap-2">
            <input
              type="text"
              readonly
              :value="toastWebhookUrl"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-700 select-all focus:outline-none"
            />
            <button
              @click="copyWebhookUrl"
              class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Copy class="w-3.5 h-3.5" />
              {{ isCopied ? 'Copied!' : 'Copy Endpoint' }}
            </button>
          </div>
        </div>

        <!-- Visual Field Mapping Table -->
        <div class="mt-6">
          <div class="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">Field Mapping Matrix</div>
          <div class="border border-slate-200 rounded-xl overflow-hidden">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 border-b border-slate-200 text-slate-500">
                <tr>
                  <th class="px-4 py-3 font-semibold">Incoming POS JSON Key</th>
                  <th class="px-4 py-3 font-semibold"></th>
                  <th class="px-4 py-3 font-semibold">DineGuest CRM Property</th>
                  <th class="px-4 py-3 font-semibold">Sample Ingested Value</th>
                  <th class="px-4 py-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr v-for="(field, idx) in webhookFields" :key="idx" class="hover:bg-slate-50">
                  <td class="px-4 py-3 font-mono font-medium text-slate-900">{{ field.sourceField }}</td>
                  <td class="px-2 py-3 text-slate-400 text-center">
                    <ChevronRight class="w-4 h-4 inline" />
                  </td>
                  <td class="px-4 py-3 font-mono text-emerald-600 font-semibold">{{ field.targetField }}</td>
                  <td class="px-4 py-3 font-mono text-slate-500 bg-slate-50/50">{{ field.sample }}</td>
                  <td class="px-4 py-3 text-right">
                    <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 class="w-3 h-3" />
                      Mapped
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 3: Twilio SMS Gateway -->
    <div v-if="activeTab === 'sms'" class="space-y-6">
      <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
            <Smartphone class="w-5 h-5" />
          </div>
          <div>
            <h3 class="text-base font-bold text-slate-900">Twilio / Telnyx SMS Broadcasting Pipe</h3>
            <p class="text-xs text-slate-500">Dedicated 10DLC compliant carrier routing for high-deliverability SMS alerts and VIP blasts.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <label class="text-xs font-semibold text-slate-700 block mb-1">Twilio Account SID</label>
              <input
                type="text"
                readonly
                :value="store.integrations.twilioSms.account_sid"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-700"
              />
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-700 block mb-1">Dedicated Outbound SMS Sender Number</label>
              <input
                type="text"
                readonly
                :value="store.integrations.twilioSms.sender_phone"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-700 font-bold"
              />
            </div>
          </div>

          <div class="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
            <div class="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
              <CheckCircle2 class="w-4 h-4 text-emerald-600" />
              10DLC Brand Campaign Approved
            </div>
            <p class="text-xs text-emerald-700 leading-relaxed">
              Carrier throughput is active at <strong>150 SMS/second</strong> with automatic TCPA double opt-in consent captured at the captive WiFi portal.
            </p>
            <div class="pt-2">
              <span class="text-[11px] font-semibold text-slate-600">Opt-in clause appended to splash screen:</span>
              <div class="text-[11px] font-mono bg-white p-2 rounded border border-emerald-200 text-slate-700 mt-1">
                "By connecting, you agree to receive dining VIP specials from Trattoria Bella. Reply STOP to cancel."
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
