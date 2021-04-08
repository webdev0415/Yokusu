export const withCatch = async fn => {
  try {
    const response = await fn()
    return {
      response,
      error: null
    }
  } catch (error) {
    return {
      response: null,
      error
    }
  }
}

export const mirror = obj => {
  for (const key of Object.keys(obj)) {
    obj[key] = key
  }
  return obj
}

export const getMetaTags = (title, description, pageUrl, settings) => {
  const headTitle = title + ' - ' + settings.domain.title || ''
  const metaDescription = description || ''
  const metaPageUrl = pageUrl || ''
  const metaOgImageUrl = settings.domain.og_image_url
    ? settings.domain.og_image_url
    : ''
  const metaTwitterNameArray = settings.domain.social_url_twitter
    ? settings.domain.social_url_twitter.split('/')
    : ''
  const metaTwitterName =
    metaTwitterNameArray.length > 0
      ? metaTwitterNameArray[metaTwitterNameArray.length - 1]
      : ''

  return {
    title: headTitle,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: metaDescription
      },
      { hid: 'og:title', name: 'og:title', content: headTitle },
      {
        hid: 'og:description',
        name: 'og:description',
        content: metaDescription
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: metaOgImageUrl
      },
      { hid: 'og:url', name: 'og:url', content: metaPageUrl },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      {
        hide: 'twitter:card',
        name: 'twitter:card',
        content: metaOgImageUrl ? 'summary_large_image' : 'summary'
      },
      {
        hide: 'og:site_name',
        name: 'twitter:image:alt',
        content: headTitle
      },
      {
        hide: 'twitter:site',
        name: 'twitter:site',
        content: metaTwitterName
      }
    ].filter(x => x.content),
    link: [
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        sizes: '57x57',
        href: '/apple-icon-57x57.png'
      },
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        sizes: '60x60',
        href: '/apple-icon-60x60.png'
      },
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        sizes: '72x72',
        href: '/apple-icon-72x72.png'
      },
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        sizes: '76x76',
        href: '/apple-icon-76x76.png'
      },
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        sizes: '114x114',
        href: '/apple-icon-114x114.png'
      },
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        sizes: '120x120',
        href: '/apple-icon-120x120.png'
      },
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        sizes: '144x144',
        href: '/apple-icon-144x144.png'
      },
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        sizes: '152x152',
        href: '/apple-icon-152x152.png'
      },
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        sizes: '180x180',
        href: '/apple-icon-180x180.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/android-icon-192x192.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: '/favicon-96x96.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      { rel: 'manifest', href: '/manifest.json' }
    ]
  }
}
