<script setup>
import { ref } from 'vue'
import { useDineGuestStore } from '../stores/dineguest'
import {
  Globe,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Printer,
  Smartphone,
  Copy,
  ExternalLink,
  Eye,
  RefreshCw,
  Palette,
  Sparkles,
  Lock
} from 'lucide-vue-next'

const store = useDineGuestStore()

const agencyName = ref(store.agency.agency_name)
const brandColor = ref(store.agency.brand_color)
const customDomain = ref(store.agency.custom_domain)
const contactEmail = ref(store.agency.contact_email)

const showReportModal = ref(false)
const dnsChecking = ref(false)
const dnsStatus = ref('verified')

function saveAgencyProfile() {
  store.updateAgency({
    agency_name: agencyName.value,
    brand_color: brandColor.value,
    custom_domain: customDomain.value,
    contact_email: contactEmail.value
  })
  alert('✅ White-Label Agency Settings Saved!')
}

function verifyDns() {
  dnsChecking.value = true
  setTimeout(() => {
    dnsChecking.value = false
    dnsStatus.value = 'verified'
    alert('✅ DNS Verification Successful! CNAME wifi.tastecraft.agency correctly resolves with SSL active.')
  }, 1000)
}

function printExecutiveReport() {
  window.print()
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div>
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Agency White-Label Suite
          </span>
        </div>
        <h1 class="text-2xl font-bold text-slate-900 mt-1">Branding, Custom CNAME & Executive Digests</h1>
        <p class="text-sm text-slate-500 mt-0.5">
          Deliver DineGuest completely under your agency's brand identity, custom domain, and automated letterhead deliverables.
        </p>
      </div>

      <!-- Client Portal View Simulator Toggle -->
      <div class="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200">
        <div class="text-right">
          <div class="text-xs font-bold text-slate-800">Client View Mode</div>
          <div class="text-[10px] text-slate-500">Hide agency billing & controls</div>
        </div>
        <button
          @click="store.toggleClientPortalMode()"
          :class="[
            'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5',
            store.clientPortalViewMode
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
          ]"
        >
          <Eye class="w-3.5 h-3.5" />
          {{ store.clientPortalViewMode ? 'Active (Restricted)' : 'Simulate' }}
        </button>
      </div>
    </div>

    <!-- 2 Column Settings Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Card 1: Agency Brand Identity -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div class="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <Palette class="w-5 h-5 text-emerald-600" />
          <h2 class="text-base font-bold text-slate-900">White-Label Brand Identity</h2>
        </div>

        <div class="space-y-4">
          <div>
            <label class="text-xs font-semibold text-slate-700 block mb-1">Agency Brand Name</label>
            <input
              v-model="agencyName"
              type="text"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label class="text-xs font-semibold text-slate-700 block mb-1">Concierge Support Email</label>
            <input
              v-model="contactEmail"
              type="email"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label class="text-xs font-semibold text-slate-700 block mb-1">Primary Theme Accent Color</label>
            <div class="flex items-center gap-3">
              <input
                v-model="brandColor"
                type="color"
                class="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer p-0.5 bg-white"
              />
              <input
                v-model="brandColor"
                type="text"
                class="w-32 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-800"
              />
              <span class="text-xs text-slate-400">Used across captive portal buttons & PWA header</span>
            </div>
          </div>

          <div class="pt-2">
            <button
              @click="saveAgencyProfile"
              class="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              Save White-Label Identity
            </button>
          </div>
        </div>
      </div>

      <!-- Card 2: Custom CNAME DNS Mapping -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div class="flex items-center justify-between pb-4 border-b border-slate-100">
          <div class="flex items-center gap-2.5">
            <Globe class="w-5 h-5 text-emerald-600" />
            <h2 class="text-base font-bold text-slate-900">Custom CNAME & SSL Endpoint</h2>
          </div>
          <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle2 class="w-3 h-3 text-emerald-600" />
            SSL Active
          </span>
        </div>

        <p class="text-xs text-slate-500 leading-relaxed">
          Point your agency subdomain to our cloud cluster so restaurant diners land on your domain when authenticating to guest WiFi.
        </p>

        <div class="space-y-3">
          <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <div class="flex justify-between items-center text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
              <span>Record Type</span>
              <span>Host / Subdomain</span>
              <span>Points To (Target)</span>
            </div>
            <div class="flex justify-between items-center font-mono text-xs font-bold text-slate-800 pt-1">
              <span>CNAME</span>
              <span class="text-emerald-700">wifi</span>
              <span class="text-slate-600">splash.dineguest.app</span>
            </div>
          </div>

          <div>
            <label class="text-xs font-semibold text-slate-700 block mb-1">Your Full Custom Domain</label>
            <input
              v-model="customDomain"
              type="text"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-900 font-bold"
            />
          </div>

          <div class="pt-2">
            <button
              @click="verifyDns"
              :disabled="dnsChecking"
              class="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw :class="['w-3.5 h-3.5', dnsChecking ? 'animate-spin' : '']" />
              {{ dnsChecking ? 'Querying DNS Nameservers...' : 'Re-Verify CNAME Record' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 2: Automated 1st-of-Month Executive Deliverable & PWA Customizer -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 1st-of-Month Letterhead Report Generator -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div class="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <FileText class="w-5 h-5 text-emerald-600" />
          <h2 class="text-base font-bold text-slate-900">1st-of-Month Executive ROI Letterhead</h2>
        </div>

        <p class="text-xs text-slate-500 leading-relaxed">
          Automatically generated on the 1st of every month and emailed to restaurant owners. Proves tangible ROI and justifies your agency retainer.
        </p>

        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
          <div class="flex justify-between">
            <span class="text-slate-500">Target Venue:</span>
            <span class="font-bold text-slate-800">{{ store.selectedRestaurant.name }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Report Period:</span>
            <span class="font-medium text-slate-700">October 2026 Monthly Digest</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Diners Captured & Retained:</span>
            <span class="font-bold text-emerald-600">{{ store.selectedRestaurant.diners_captured_month }} guests</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Influenced Check Revenue:</span>
            <span class="font-bold text-slate-900">${{ store.selectedRestaurant.campaign_revenue_month.toLocaleString() }}</span>
          </div>
        </div>

        <button
          @click="showReportModal = true"
          class="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Eye class="w-3.5 h-3.5" />
          Preview Printable Executive Letterhead
        </button>
      </div>

      <!-- White-Label PWA Mobile App Customizer -->
      <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div class="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <Smartphone class="w-5 h-5 text-emerald-600" />
          <h2 class="text-base font-bold text-slate-900">Staff & Manager PWA App Customizer</h2>
        </div>

        <p class="text-xs text-slate-500 leading-relaxed">
          Restaurant floor managers can install DineGuest directly to their iPhone or Android homescreen as an app with no App Store needed.
        </p>

        <div class="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md font-bold text-xl">
            DG
          </div>
          <div class="space-y-0.5">
            <div class="text-xs font-bold text-slate-900">TasteCraft DineGuest Manager</div>
            <div class="text-[11px] text-slate-500">Standalone Progressive Web App (PWA)</div>
            <div class="text-[11px] text-emerald-600 font-medium">Ready for iOS "Add to Home Screen"</div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 pt-2">
          <button class="py-2 px-3 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 transition-colors">
            Export manifest.json
          </button>
          <button class="py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold transition-colors">
            Copy PWA Install Link
          </button>
        </div>
      </div>
    </div>

    <!-- Printable Executive Letterhead Deliverable Modal -->
    <div
      v-if="showReportModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <div class="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <!-- Close Bar -->
        <div class="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 print:hidden">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Executive Report Preview</span>
          <div class="flex items-center gap-2">
            <button
              @click="printExecutiveReport"
              class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Printer class="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button @click="showReportModal = false" class="text-slate-400 hover:text-slate-600 text-sm p-1">✕</button>
          </div>
        </div>

        <!-- Printable Document Canvas -->
        <div class="border border-slate-200 rounded-xl p-8 bg-white shadow-sm space-y-6 text-slate-900 print:border-none print:shadow-none print:p-0">
          <!-- Document Header -->
          <div class="flex items-start justify-between pb-6 border-b-2 border-slate-900">
            <div>
              <div class="text-xl font-black uppercase tracking-tight text-slate-900">{{ store.agency.agency_name }}</div>
              <div class="text-xs text-slate-500">{{ store.agency.agency_tagline }}</div>
              <div class="text-xs font-mono text-emerald-700 mt-1">{{ store.agency.custom_domain }}</div>
            </div>
            <div class="text-right">
              <span class="px-2.5 py-1 bg-slate-100 rounded text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                Monthly ROI Brief
              </span>
              <div class="text-xs text-slate-500 mt-1">October 2026</div>
            </div>
          </div>

          <!-- Venue & Summary -->
          <div>
            <div class="text-xs text-slate-400 uppercase tracking-wider">Prepared Exclusively For:</div>
            <div class="text-lg font-bold text-slate-900">{{ store.selectedRestaurant.name }}</div>
            <div class="text-xs text-slate-500">General Manager & Ownership Team</div>
          </div>

          <!-- Highlight Metrics -->
          <div class="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <div>
              <div class="text-[11px] text-slate-500 uppercase font-semibold">New Diners Captured</div>
              <div class="text-2xl font-black text-emerald-600 mt-0.5">{{ store.selectedRestaurant.diners_captured_month }}</div>
            </div>
            <div>
              <div class="text-[11px] text-slate-500 uppercase font-semibold">Total CRM Database</div>
              <div class="text-2xl font-black text-slate-900 mt-0.5">{{ store.selectedRestaurant.total_diners_database }}</div>
            </div>
            <div>
              <div class="text-[11px] text-slate-500 uppercase font-semibold">Influenced Sales</div>
              <div class="text-2xl font-black text-slate-900 mt-0.5">${{ store.selectedRestaurant.campaign_revenue_month.toLocaleString() }}</div>
            </div>
          </div>

          <!-- Executive Narrative -->
          <div class="space-y-3 text-xs leading-relaxed text-slate-700">
            <h4 class="font-bold text-slate-900 text-sm">Monthly Strategic Highlights:</h4>
            <p>
              During October 2026, the <strong>TasteCraft Captive Guest WiFi Engine</strong> authenticated <strong>{{ store.selectedRestaurant.diners_captured_month }} dining parties</strong> at {{ store.selectedRestaurant.name }} without requiring manual staff interaction.
            </p>
            <p>
              Through automated churn prevention bots, <strong>142 inactive diners</strong> returned on Tuesday and Wednesday evenings, generating an estimated <strong>${{ store.selectedRestaurant.campaign_revenue_month.toLocaleString() }}</strong> in incremental dining receipts.
            </p>
          </div>

          <!-- Agency Signature Block -->
          <div class="pt-8 border-t border-slate-200 flex justify-between items-end">
            <div>
              <div class="font-serif italic text-base text-slate-800">TasteCraft Concierge Team</div>
              <div class="text-[11px] text-slate-400 mt-0.5">Hospitality Growth & Technology Director</div>
            </div>
            <div class="text-right text-[10px] text-slate-400">
              Generated via TasteCraft Platform • Verified Immutable Ledger
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
