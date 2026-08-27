import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '@prisma/client'
import path from 'path'
import bcrypt from 'bcryptjs'

const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` })
const prisma = new PrismaClient({ adapter })

const colors = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Gray', hex: '#808080' },
  { name: 'Navy', hex: '#1a1a2e' },
]

const sizes = ['S', 'M', 'L', 'XL'] as const

const products = [
  {
    name: 'Custom T-Shirt',
    slug: 'custom-t-shirt',
    description: 'High-quality custom printed t-shirt made from premium cotton.',
    basePrice: 1000,
    type: 'TSHIRT' as const,
  },
  {
    name: 'Custom Sweatshirt',
    slug: 'custom-sweatshirt',
    description: 'Cozy custom printed sweatshirt perfect for cooler weather.',
    basePrice: 2000,
    type: 'SWEATSHIRT' as const,
  },
  {
    name: 'Custom Hoodie',
    slug: 'custom-hoodie',
    description: 'Warm and stylish custom printed hoodie with front pocket.',
    basePrice: 3000,
    type: 'HOODIE' as const,
  },
]

const pricingEntries = [
  { key: 'tshirt_base', value: 1000, description: 'Base price for custom t-shirt (in cents)' },
  { key: 'sweatshirt_base', value: 2000, description: 'Base price for custom sweatshirt (in cents)' },
  { key: 'hoodie_base', value: 3000, description: 'Base price for custom hoodie (in cents)' },
  { key: 'extra_print', value: 300, description: 'Cost per extra print location (in cents)' },
  { key: 'xl_surcharge', value: 500, description: 'Additional charge for XL size (in cents)' },
  { key: 'standard_shipping', value: 1200, description: 'Standard shipping cost (in cents)' },
  { key: 'rush_shipping', value: 1700, description: 'Rush shipping cost (in cents)' },
  { key: 'tax_rate', value: 1300, description: 'Tax rate (basis points, 1300 = 13%)' },
]

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@georgesattire.com' },
    update: {},
    create: {
      email: 'admin@georgesattire.com',
      name: 'George Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log(`Admin user created/updated: ${adminUser.email}`)

  // Create products with variants
  for (const product of products) {
    const created = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description,
        basePrice: product.basePrice,
        type: product.type,
      },
      create: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        basePrice: product.basePrice,
        type: product.type,
      },
    })

    console.log(`Product created/updated: ${created.name}`)

    // Create variants for each color/size combination
    for (const color of colors) {
      for (const size of sizes) {
        const sku = `${product.slug}-${color.name.toLowerCase()}-${size.toLowerCase()}`
        await prisma.productVariant.upsert({
          where: {
            productId_color_size: {
              productId: created.id,
              color: color.name,
              size: size,
            },
          },
          update: {
            colorHex: color.hex,
            stock: 50,
            sku,
          },
          create: {
            productId: created.id,
            color: color.name,
            colorHex: color.hex,
            size: size,
            stock: 50,
            sku,
          },
        })
      }
    }
    console.log(`  Variants created for ${created.name} (${colors.length * sizes.length} variants)`)
  }

  // Create pricing config entries
  for (const entry of pricingEntries) {
    await prisma.pricingConfig.upsert({
      where: { key: entry.key },
      update: { value: entry.value, description: entry.description },
      create: entry,
    })
  }
  console.log(`Pricing config seeded: ${pricingEntries.length} entries`)

  console.log('Database seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
