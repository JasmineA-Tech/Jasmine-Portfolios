export interface Service {
  number: string
  title: string
  description: string
  tag?: string
  booqableId: string
  image: string
}

export const services: Service[] = [
  {
    number: '01',
    title: '360 Photo Booth',
    description:
      'A fully immersive 360° video experience that captures every angle of your celebration.',
    tag: 'MOST POPULAR',
    booqableId: '360-video-booth',
    image: '/8B5B8E1E-5FF8-4B42-A840-C660A0827855.PNG',
  },
  {
    number: '02',
    title: 'iPad Photo Booth',
    description:
      'Sleek, modern photo booth with instant prints and digital sharing for your guests.',
    booqableId: 'ipad-photo-booth',
    image: '/BA6B348E-D17D-4385-82D4-BA396C5B026D.PNG',
  },
  {
    number: '03',
    title: 'Floral Backdrops',
    description:
      'Lush, custom floral walls that transform any space into a breathtaking backdrop.',
    booqableId: 'floral-backdrop',
    image:
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=85',
  },
  {
    number: '04',
    title: 'Heart Arches',
    description:
      'Romantic heart-shaped arches adorned with florals for ceremonies and photo moments.',
    booqableId: 'heart-arch',
    image:
      'https://images.unsplash.com/photo-1519225421980-888cb8d075de?auto=format&fit=crop&w=900&q=85',
  },
  {
    number: '05',
    title: 'Tables & Chairs',
    description:
      'Elegant furniture rentals to seat your guests in style and comfort.',
    booqableId: 'tables-chairs',
    image:
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=85',
  },
  {
    number: '06',
    title: 'Event Décor',
    description:
      'Curated décor packages that bring your vision to life with luxury details.',
    booqableId: 'party-decour',
    image:
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=85',
  },
]
