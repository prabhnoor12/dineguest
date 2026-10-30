<script setup>
import { ref, computed } from 'vue'
import { useDineGuestStore } from '../stores/dineguest'
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Send,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  Building,
  RefreshCw,
  ExternalLink,
  Copy,
  Receipt
} from 'lucide-vue-next'

const store = useDineGuestStore()

const showDunningModal = ref(false)
const selectedDunningVenue = ref(null)
const dunningSentSuccess = ref(false)
const showCheckoutModal = ref(false)
const selectedCheckoutVenue = ref(null)
const checkoutCopied = ref(false)

const wholesaleLicenseCost = 79
const agencyMrr = computed(() => store.totalMonthlyRetainers)
const netProfit = computed(() => agencyMrr.value - wholesaleLicenseCost)
const marginPercent = computed(() => {
  if (agencyMrr.value === 0) return 0
  return ((netProfit.value / agencyMrr.value) * 100).toFixed(1)
})

function openDunningModal(venue) {
  selectedDunningVenue.value = venue
  dunningSentSuccess.value = false
  showDunningModal.value = true
}

function triggerDunningNotice() {
  if (!selectedDunningVenue.value) return
  store.sendDunningNotice(selectedDunningVenue.value.venue_id)
  dunningSentSuccess.value = true
  setTimeout(() => {
    showDunningModal.value = false
  }, 2200)
}

function openCheckoutModal(venue) {
  selectedCheckoutVenue.value = venue
  checkoutCopied.value = false
  showCheckoutModal.value = true
}

function copyCheckoutLink() {
  const url = `https://billing.tastecraft.agency/checkout/${selectedCheckoutVenue.value?.venue_id || 'rest-1'}?amount=${selectedCheckoutVenue.value?.monthly_fee || 149}`
  navigator.clipboard.writeText(url)
  checkoutCopied.value = true
  setTimeout(() => checkoutCopied.value = false, 2500)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div>
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Agency Economics & Retainer Protection
          </span>
        </div>
        <h1 class="text-2xl font-bold text-slate-900 mt-1">Hospitality Retainer Hub & Value Dunning</h1>
        <p class="text-sm text-slate-500 mt-0.5">
          Wholesale SaaS licensing vs client retail retainers with dynamic value-anchored dunning bots.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 text-white shadow-sm">
          <ShieldCheck class="w-3.5 h-3.5 text-emerald-400" />
          Stripe Connect Active
        </span>
      </div>
    </div>

    <!-- Financial KPI Overview Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Agency Retainer MRR</span>
          <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign class="w-4 h-4" />
          </div>
        </div>
        <div class="mt-2 text-2xl font-bold text-slate-900">${{ agencyMrr }}/mo</div>
        <div class="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
          <TrendingUp class="w-3 h-3" />
          Billed to 3 venues
        </div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Wholesale SaaS Cost</span>
          <div class="w-8 h-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center">
            <CreditCard class="w-4 h-4" />
          </div>
        </div>
        <div class="mt-2 text-2xl font-bold text-slate-900">${{ wholesaleLicenseCost }}/mo</div>
        <div class="text-[11px] text-slate-500 mt-1">
          Agency Scale License (Includes 20 Venues)
        </div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Net Monthly Profit</span>
          <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <TrendingUp class="w-4 h-4" />
          </div>
        </div>
        <div class="mt-2 text-2xl font-bold text-emerald-700">${{ netProfit }}/mo</div>
        <div class="text-[11px] text-emerald-600 font-bold mt-1">
          {{ marginPercent }}% Agency Net Margin
        </div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Client Revenue Influenced</span>
          <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Receipt class="w-4 h-4" />
          </div>
        </div>
        <div class="mt-2 text-2xl font-bold text-slate-900">${{ store.totalCampaignRevenue.toLocaleString() }}</div>
        <div class="text-[11px] text-blue-600 font-semibold mt-1">
          Influenced dining check sales
        </div>
      </div>
    </div>

    <!-- Milestone Expansion Trigger Alert -->
    <div class="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
      <div class="absolute -right-8 -bottom-8 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            <Zap class="w-3 h-3" />
            Milestone Expansion Opportunity
          </span>
          <h3 class="text-lg font-bold text-white mt-2">
            Sakura Omakase crossed 2,500 captured diners (Now at 2,980)
          </h3>
          <p class="text-xs text-slate-300 mt-1 max-w-2xl">
            Recommend unlocking the <strong>Automated Tuesday/Wednesday SMS Broadcast Tier</strong> (+ $99/mo). Their database size guarantees 35-50 extra dining covers every off-peak night.
          </p>
        </div>
        <button
          @click="openCheckoutModal(store.billing.venueRetainers[1])"
          class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl shadow transition-all flex items-center justify-center gap-1.5 whitespace-nowrap self-start md:self-auto"
        >
          Send Expansion Upgrade Link
          <ArrowUpRight class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Venue Retainers Table -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-base font-bold text-slate-900">Hospitality Client Retainer Roster</h2>
          <p class="text-xs text-slate-500 mt-0.5">Recurring fees collected from restaurants via Stripe Connect</p>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider">
            <tr>
              <th class="px-6 py-3 font-semibold">Restaurant Venue</th>
              <th class="px-6 py-3 font-semibold">Monthly Retainer</th>
              <th class="px-6 py-3 font-semibold">Payment Method</th>
              <th class="px-6 py-3 font-semibold">Next Invoice</th>
              <th class="px-6 py-3 font-semibold">Billing Health</th>
              <th class="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="venue in store.billing.venueRetainers" :key="venue.venue_id" class="hover:bg-slate-50/80">
              <td class="px-6 py-4">
                <div class="font-bold text-slate-900">{{ venue.venue_name }}</div>
                <div class="text-[11px] text-slate-400">ID: {{ venue.venue_id }}</div>
              </td>
              <td class="px-6 py-4 font-bold text-slate-900">
                ${{ venue.monthly_fee }}<span class="text-slate-400 font-normal">/mo</span>
              </td>
              <td class="px-6 py-4 font-mono text-slate-600">
                {{ venue.card_brand }} •••• {{ venue.card_last4 }}
              </td>
              <td class="px-6 py-4 text-slate-600">
                {{ venue.next_charge_date }}
              </td>
              <td class="px-6 py-4">
                <span
                  v-if="venue.status === 'paid'"
                  class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
                >
                  <CheckCircle2 class="w-3 h-3" />
                  Auto-Debit Ready
                </span>
                <span
                  v-else
                  class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 animate-pulse"
                >
                  <AlertTriangle class="w-3 h-3" />
                  Card Expiring (Need Dunning)
                </span>
              </td>
              <td class="px-6 py-4 text-right space-x-2">
                <button
                  @click="openDunningModal(venue)"
                  class="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-xs font-semibold transition-colors"
                >
                  Value Dunning Bot
                </button>
                <button
                  @click="openCheckoutModal(venue)"
                  class="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                >
                  Stripe Link
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Self-Healing Value-Grounded Dunning Modal -->
    <div
      v-if="showDunningModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <div class="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
        <div class="flex items-center justify-between pb-4 border-b border-slate-100">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Zap class="w-4 h-4" />
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-900">Self-Healing Value Dunning Notice</h3>
              <p class="text-xs text-slate-500">Grounded with proof of actual diners & revenue</p>
            </div>
          </div>
          <button @click="showDunningModal = false" class="text-slate-400 hover:text-slate-600 text-sm">✕</button>
        </div>

        <div class="mt-4 space-y-4">
          <div class="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-2">
            <div class="font-bold text-amber-900">Target Venue: {{ selectedDunningVenue?.venue_name }}</div>
            <p class="text-amber-800 leading-relaxed">
              Standard SaaS reminders say <em>"Your card failed"</em>. DineGuest anchors to <strong>irreplaceable business loss</strong> before asking for payment.
            </p>
          </div>

          <!-- Preview of the dynamic SMS/Email -->
          <div class="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Dynamic Message Preview</div>
            <div class="text-xs text-slate-800 font-serif leading-relaxed italic bg-white p-3 rounded-lg border border-slate-200">
              "Hi {{ selectedDunningVenue?.venue_name }}, your guest WiFi marketing engine captured <strong>{{ store.selectedRestaurant.diners_captured_month }} new diner profiles</strong> and influenced <strong>${{ store.selectedRestaurant.campaign_revenue_month.toLocaleString() }} in dining sales</strong> this month alone.<br><br>
              Your card ending in •••• {{ selectedDunningVenue?.card_last4 }} expires soon. Update your payment details in 1 tap to keep your captive guest WiFi portal & VIP SMS club active: <u>https://billing.tastecraft.agency/update</u>"
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-2">
          <button
            @click="showDunningModal = false"
            class="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
          >
            Cancel
          </button>
          <button
            @click="triggerDunningNotice"
            :disabled="dunningSentSuccess"
            class="px-4 py-2 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <Send class="w-3.5 h-3.5" />
            {{ dunningSentSuccess ? 'Notice Dispatched!' : 'Dispatch Value-Grounded Notice' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Client Checkout Link Modal -->
    <div
      v-if="showCheckoutModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <div class="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
        <div class="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 class="text-base font-bold text-slate-900">Hospitality Client Checkout Link</h3>
          <button @click="showCheckoutModal = false" class="text-slate-400 hover:text-slate-600 text-sm">✕</button>
        </div>

        <div class="mt-4 space-y-3">
          <p class="text-xs text-slate-600">
            Share this branded Stripe billing link with <strong>{{ selectedCheckoutVenue?.venue_name }}</strong> to authorize auto-debit:
          </p>
          <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-700 break-all select-all">
            https://billing.tastecraft.agency/checkout/{{ selectedCheckoutVenue?.venue_id }}?plan=hospitality_retainer&amount={{ selectedCheckoutVenue?.monthly_fee }}
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-2">
          <button
            @click="showCheckoutModal = false"
            class="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
          >
            Close
          </button>
          <button
            @click="copyCheckoutLink"
            class="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <Copy class="w-3.5 h-3.5" />
            {{ checkoutCopied ? 'Link Copied!' : 'Copy Checkout URL' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
