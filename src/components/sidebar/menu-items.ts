import {
  BanknoteIcon,
  BoxIcon,
  BuildingIcon,
  ChartNoAxesCombined,
  FactoryIcon,
  FolderIcon,
  HandCoinsIcon,
  IdCardIcon,
  LayoutDashboard,
  PackageIcon,
  QrCodeIcon,
  TagIcon,
  ToolboxIcon,
  UsersIcon,
} from 'lucide-react'

export const main = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Licenses',
    url: '/licenses',
    icon: QrCodeIcon,
  },
  {
    name: 'Packages',
    url: '/packages',
    icon: PackageIcon,
  },
  {
    name: 'Customers',
    url: '/customers',
    icon: UsersIcon,
  },
]

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
  { name: 'Licenses',  url: '/licenses',  icon: QrCodeIcon  },
  { name: 'Packages',  url: '/packages',  icon: PackageIcon },
  { name: 'Suppliers', url: '/suppliers', icon: FactoryIcon },
  { name: 'Products',  url: '/products',  icon: BoxIcon     },
  { name: 'Services',  url: '/services',  icon: ToolboxIcon },
  { name: 'Customers', url: '/customers', icon: UsersIcon   },
]

export const categories = [
  { name: 'Supplier Categories', url: '/supplier-categories', icon: TagIcon    },
  { name: 'Product Categories',  url: '/product-categories',  icon: FolderIcon },
  { name: 'Service Categories',  url: '/service-categories',  icon: FolderIcon },
  { name: 'Customer Categories', url: '/customer-categories', icon: TagIcon    },
]

export const purchasing = [
  {
    name: 'Products',
    url: '/purchasing/products',
    icon: BoxIcon,
  },
  {
    name: 'Services',
    url: '/purchasing/services',
    icon: ToolboxIcon,
  },
]

export const inventory = [
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
    icon: BanknoteIcon,
  },
  {
    name: 'Manual Sales',
    url: '/manual-sales',
    icon: HandCoinsIcon,
  },
]

export const finance = [
  {
    name: 'Finance',
    url: '/finance',
    icon: ChartNoAxesCombined,
  },
]

export const groups = [
  { label: 'System',      items: system     },
  { label: 'Records',     items: records    },
  { label: 'Categories',  items: categories },
  { label: 'Purchasing',  items: purchasing },
  { label: 'Inventory',   items: inventory  },
  { label: 'Sales',       items: sales      },
  { label: 'Finance',     items: finance    },
]
