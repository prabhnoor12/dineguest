import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import PortalCustomizerView from '../views/PortalCustomizerView.vue'
import GuestsView from '../views/GuestsView.vue'
import CampaignsView from '../views/CampaignsView.vue'
import IntegrationsView from '../views/IntegrationsView.vue'
import BillingView from '../views/BillingView.vue'
import SettingsView from '../views/SettingsView.vue'
import KioskView from '../views/KioskView.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
    meta: { title: 'Live Guest WiFi Radar' }
  },
  {
    path: '/portal-designer',
    name: 'portal-designer',
    component: PortalCustomizerView,
    meta: { title: 'Captive Splash Designer' }
  },
  {
    path: '/guests',
    name: 'guests',
    component: GuestsView,
    meta: { title: 'Diner CRM Profiles' }
  },
  {
    path: '/campaigns',
    name: 'campaigns',
    component: CampaignsView,
    meta: { title: 'VIP SMS Churn Bots' }
  },
  {
    path: '/integrations',
    name: 'integrations',
    component: IntegrationsView,
    meta: { title: 'Router & Gateway Hardware' }
  },
  {
    path: '/billing',
    name: 'billing',
    component: BillingView,
    meta: { title: 'Restaurant Retainers' }
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
    meta: { title: 'White-Label Branding' }
  },
  {
    path: '/kiosk',
    name: 'kiosk',
    component: KioskView,
    meta: { title: 'Hostess Stand Kiosk' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
