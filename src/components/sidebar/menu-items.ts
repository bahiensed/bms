import {
  BarChart2,
  BoxIcon,
  BuildingIcon,
  HandPlatterIcon,
  IdCardIcon,
  LayoutDashboard,
  QrCodeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  StoreIcon,
  UsersIcon,
} from 'lucide-react'

export const dashboard = {
  name: 'Dashboard',
  url: '/dashboard',
  icon: LayoutDashboard,
}

export const system = [
  {
    name: 'Company Data',
    url: '/company',
    icon: BuildingIcon,
  },
  {
    name: 'System Users',
    url: '/users',
    icon: IdCardIcon,
  },
]

export const records = [
  {
    name: 'Licenses',
    url: '/licenses',
    icon: QrCodeIcon,
  },
  {
    name: 'Suppliers',
    url: '/suppliers',
    icon: StoreIcon,
  },
  {
    name: 'Products',
    url: '/products',
    icon: BoxIcon,
  },
  {
    name: 'Services',
    url: '/services',
    icon: HandPlatterIcon,
  },
  {
    name: 'Customers',
    url: '/customers',
    icon: UsersIcon,
  },
]

export const purchasing = [
  {
    name: 'QR Codes',
    url: '/purchasing',
    icon: ShoppingBagIcon,
  },
  {
    name: 'Products',
    url: '/purchasing/products',
    icon: BoxIcon,
  },
  {
    name: 'Services',
    url: '/purchasing/services',
    icon: HandPlatterIcon,
  },
]

export const inventory = [
  {
    name: 'Licenses',
    url: '/inventory/licenses',
    icon: QrCodeIcon,
  },
  {
    name: 'Products',
    url: '/inventory/products',
    icon: BoxIcon,
  },
]

export const sales = [
  {
    name: 'Sales',
    url: '/sales',
    icon: ShoppingCartIcon,
  },
]

export const finance = [
  {
    name: 'Finance',
    url: '/finance',
    icon: BarChart2,
  },
]
