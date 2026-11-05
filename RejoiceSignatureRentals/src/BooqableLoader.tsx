import { useEffect } from 'react'

// Loads Booqable once for the whole app so the cart is available on every page
export default function BooqableLoader() {
  useEffect(() => {
    if (document.getElementById('booqable-script')) return

    const script = document.createElement('script')
    script.id = 'booqable-script'
    script.src =
      'https://641751eb-ca89-416c-8fb9-f59540ee7412.assets.booqable.com/v2/booqable.js'
    script.async = true

    document.body.appendChild(script)
  }, [])

  return null
}
