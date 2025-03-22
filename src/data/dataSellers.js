import { slugify } from '@/lib/utils'

const sellersInformation = {
  'quilla-tenis': {
    authorInformation: {
      aboutHTML: <div>
        Tenis de campo
        <p>Clases de Tenis:<br />
          🎾 Personalizadas : niños, jóvenes, adultos.
          🎾 Clases grupales<br />
          🎾 Programas grupales mensuales.<br />
          Calle 93 #54 esquina, Barranquilla 080001<br />
        </p>
      </div>,
      // description: <div>Clases de Tenis: 🎾Personalizadas : niños, jóvenes, adultos. 🎾Clases grupales 🎾Programas grupales mensuales.'</div>,
      name: 'Quilla Tenis',
      slug: 'quilla-tenis',
      picture: 'https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/profile%2F174%2Flogo_768x768.jpg?alt=media',
      category: {
        label: 'Deportes',
        value: 'sports'
      },
      pageBackground: "https://instagram.fbaq5-1.fna.fbcdn.net/v/t51.29350-15/449169477_923632356185975_6776919064692422872_n.webp?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMjAweDEyMDAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fbaq5-1.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2QHcF8h73k2uEncgd80xlwkmRxAt9auKzXzp6_PURUOZL-GS5YCHMCWhTCkg4sS70uo&_nc_ohc=2q_5gHWN49QQ7kNvgFCCif8&_nc_gid=bWnEL4WeV0xGMcBTZTSQSA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzQwMTQ1MzAwMjYyNjY0MjQ0MA%3D%3D.3-ccb7-5&oh=00_AYF1z4tiRVj_ukaF4XXRW60oINE62N0CyRiz5DQ5Y4tQHg&oe=67E41697&_nc_sid=7a9f4b"
    },
    products: [
      {
        images: [{
          url: "https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/profile%2F174%2Fproducts%2Fproducto-01_768x768.jpg?alt=media", isHome: true
        }],
      }
    ]
  },
  'monster-ink-bq': {
    authorInformation: {
      name: 'Monster Ink Barranquilla',
      slug: 'monster-ink-bq',
      picture: 'https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/profile%2F168%2Fmonster-ink_768x768.jpg?alt=media&token=e045091b-ae98-4fd6-bc65-b727e56b18f1',
      category: {
        label: 'Tatuajes',
        value: 'tatuajes'
      }
    },
    products: [
      {
        images: [{ url: 'https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/profile%2F168%2Fpublications%2Fgeysha-sombras_768x768.jpg?alt=media&token=5dbf8184-f014-4085-b7a7-7923725eecbb', isHome: true }],
        showPriceHome: true,
        price: 700000,
        priceHome: 680
      },
      {
        images: [{ url: 'https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/profile%2F168%2Fpublications%2Ftattoo-realismo-sombras_768x768.jpg?alt=media&token=2688dcb8-61b5-41af-90f1-9fd73a4fd290', isHome: true }],
        showPriceHome: true,
        price: 700000,
        priceHome: 680
      },
      {
        images: [{ url: 'https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/profile%2F168%2Fpublications%2Ftatuaje-en-sombras_768x768.jpg?alt=media&token=e2bad5eb-8021-4672-9a13-64065c5cd93c', isHome: true }],
        showPriceHome: true,
      },
      {
        images: [{ url: 'https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/profile%2F168%2Fpublications%2F442442854_18029969963009396_5863529455428440747_n_768x768.jpg?alt=media&token=4971cd57-d56a-4571-85c2-cfb4dd25f39e' }],
        price: null,
      }],
    whatsappNumber: 573014270079,
  },
  'caribe-dev': {
    authorInformation: {
      name: 'Caribe Dev',
      slug: 'caribe-dev',
      picture: 'https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/profile%2F159%2Flogo_768x768.png?alt=media&token=2022f676-ed81-4bbb-bb5a-405d689de0cd',
      category: {
        label: 'Comunidad',
        value: 'community'
      }
    },
    products: [{
      images: [{ url: 'https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/profile%2F159%2Fpublications%2Fcaribe-conf-entrada_768x768.jpg?alt=media&token=4f2cbd7b-3f78-44f8-8d31-25ebc191717b', isHome: true }],
      price: 45000,
      title: 'CaribeConf 2025',

    }]
  },
  'mass-publicidad': {
    authorInformation: {
      description: '🟠 Impresión Digital, Gran Formato, Souvenirs ⚫ Diseño Grafico',
      instagram: 'https://www.instagram.com/masspublicidad_/',
      name: 'Mass Publicidad',
      picture: 'https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/profile%2F157%2Fmass_publicidad_768x768.jpg?alt=media&token=6a0ab14a-9dbf-411e-914a-41674a6e4759',
      slug: 'mass-publicidad',
    }
  },
  'fundacion-codigo-abierto': {
    authorInformation: {
      aboutHTML: <div>Construyendo un epicentro tech en el Caribe</div>,
      aboutHTMLButtonStyle: { color: 'white', textDecoration: 'underline' },
      description: 'Convirtiendo a Barranquilla y el Atlantico en el epicentro de la revolución tecnológica en Colombia.',
      pageBackground: '/images/users/fca/bg.jpeg',
      cssClassPage: '',
      dividerColor: '#b0b0b0',
      // background: '/images/logos/pikplay_store_logo.png',
      name: 'Fundación Código Abierto',
      place: 'Barranquilla',
      givenPikcoins: 0,
      picture: '/images/users/fca/logo.jpg',
      uid: 131,
      whatsappNumber: 573204863547,
      location: 'Barranquilla, Colombia',
      category: {
        label: 'Educación',
        value: 'education'
      }
    },
    bonuses: [{
      amount: "$20.000",
      backgroundImage: '',
      description: 'Descuento en tu primer diplomado',
      title: 'Bono de descuento',
    }],
    products: [
      {

        images: [{ url: 'https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/products%2F146%2Fcurso_photo.jpg?alt=media&token=2ff2c6bf-1532-4667-9f35-ee2afda19fea', isHome: true, }],
        title: 'Curso de Photoshop De Cero a Intermedio',
        price: 80000,
        buttonText: 'Asegurar mi cupo'
      },
      {
        cashbackAvailable: true,
        title: 'Desarrollo Web, Con énfasis en Inteligencia Artificial',
        images: [{ url: 'https://fundacioncodigoabierto.com/_next/image?url=%2Fcourses%2Fweb.webp&w=640&q=75' }],
        freeShipping: false,
      },
      {
        cashbackAvailable: true,
        title: 'Computación en la Nube',
        images: [{ url: 'https://fundacioncodigoabierto.com/_next/image?url=%2Fcourses%2Fcloud.webp&w=1080&q=75' }],
        freeShipping: false,
      }
    ]
  },
  'maxilofacial-care': {
    authorInformation: {
      aboutHTML: <div></div>,
      aboutHTMLButtonStyle: { color: 'white', textDecoration: 'underline' },
      description: 'Experiencia y tecnología de vanguardia ✨',
      pageBackground: 'https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/profile%2F151%2F471500893_18354437725134821_6595726740774147152_n_768x768.jpg?alt=media&token=49abd402-132f-4521-ba8f-6e3825f282f2',
      cssClassPage: '',
      dividerColor: '#b0b0b0',
      instagram: 'https://www.instagram.com/maxillofacial_center',
      // background: '/images/logos/pikplay_store_logo.png',
      name: 'Maxillofacial & Medical Center',
      givenPikcoins: 0,
      location: 'Medellín - Quibdó',
      picture: '/images/users/maxilofacial-care/logo.png',
      uid: 131,
      whatsappNumber: 573235862683,
      category: {
        label: 'Salud',
        value: 'Salud'
      }
    },
    bonuses: [{
      amount: "$50.000",
      backgroundImage: '/images/users/maxilofacial-care/bg_bono_1.jpg',
      description: 'Descuento en tu primera consulta',
      title: 'Bono de descuento',
    },
    {
      amount: "10%",
      backgroundImage: '/images/users/maxilofacial-care/bg_bono_1.jpg',
      description: 'Aplica para tratamiento de conducto',
      title: 'Bono de descuento',
    }]
  },
  'conversation-club': {
    authorInformation: {
      aboutHTML: <div>English Club es un espacio para tener experiencias inmersivas en el idioma.</div>,
      aboutHTMLButtonStyle: { color: 'white', textDecoration: 'underline' },
      pageBackground: 'https://lonelinessandinternationalstudent.wordpress.com/wp-content/uploads/2015/10/language-exchange.jpg',
      cssClassPage: 'conversationClubPage',
      dividerColor: '#b0b0b0',
      // background: '/images/logos/pikplay_store_logo.png',
      name: 'English Club',
      location: 'Barranquilla - Soledad',
      givenPikcoins: 0,
      picture: '/images/users/conversation_club/logo.png',
      rankingId: 1,
      uid: 131,
      whatsappNumber: 573204863547
    },
  },
  'le-fragance': {
    authorInformation: {
      aboutHTML: <div>Le Fragance es una tienda de perfumes premium, con más de 2 años de experiencia en el mercado.</div>,
      aboutHTMLButtonStyle: { color: 'white', textDecoration: 'underline' },
      dividerColor: '#b0b0b0',
      // background: '/images/backgrounds/campo-bg.jpeg',
      name: 'Le Fragance',
      place: 'Barranquilla',
      givenPikcoins: 12,
      location: 'Envíos a todo el pais',
      pageBackground: 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/UQLCPKQVN5AHHC2ZZDKTNN5XOM.jpg',
      picture: '/images/users/le-fragance/le-fragance.jpeg',
      slug: 'le-fragance',
      whatsappNumber: 573016815784,
      category: {
        label: 'Perfumes',
        value: 'perfumes'
      }
    },
    bonuses: [{
      amount: "$10.000",
      backgroundImage: '',
      description: 'Descuento en tu primera fragancia',
      title: 'Bono de descuento',
    }],
    competitions: ['sorteo-paco-rabanne-one-million-1-million-tradicional', 'cadena-oro-italiano-18k-60cm'],
    products: [{
      images: [
        { url: '/images/users/le-fragance/products/one-million.webp' },
      ],
      isNew: true,
      title: 'Paco Rabanne One million 1 Million Tradicional EDT 200 ml para hombre',
      quantity: 5,
      price: 130000,
      cashbackAvailable: true,
      slug: 'paco-rabanne-one-million-1-million-tradicional',
    },
    { // Product
      images: [
        {
          isHome: true,
          url: 'https://exdtvcqvfop.exactdn.com/wp-content/uploads/Acqua-di-Gio-Profondo-de-Giorgio-Armani-para-hombre-flyer-2.jpg?strip=all&lossy=1&ssl=1'
          // url: '/images/users/le-fragance/products/acgua di gio.avif',
        },
      ],
      showPriceHome: true,
      priceHome: 680,
      isNew: true,
      title: 'Acgua di gio',
      quantity: 5,
      price: 100000,
      cashbackAvailable: true,
      slug: 'acgua-di-gio',
    },
    {
      images: [
        { url: 'https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/products%2Flacoste.png?alt=media&token=92b61138-191a-4447-81bc-5defbbb27824' }
      ],
      isNew: true,
      title: 'Lacoste L.12.12. White',
      quantity: 5,
      price: 130000,
      cashbackAvailable: true,
      slug: 'la-coste',
    },
    {
      images: [
        { url: 'https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/products%2Feuforia.webp?alt=media&token=1f63f2df-9bce-4c10-abc5-e42f9b6de0c9' }
      ],
      isNew: true,
      title: 'Calvin Klein Euphoria',
      quantity: 5,
      price: 130000,
      cashbackAvailable: true,
      slug: slugify('Calvin Klein Euphoria'),
    }],
  },
  'bluepanther': {
    authorInformation: {
      aboutHTML: <div>
        <video width="140" height="260" controls>
          <source src="/images/users/bluepanther/video.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>,
      aboutHTMLButtonStyle: { color: 'white', textDecoration: 'underline' },
      background: 'https://instagram.fbaq5-1.fna.fbcdn.net/v/t39.30808-6/454723787_18361896526109558_4048109518435842878_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&cb=30a688f7-cd073ddd&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMjkweDIyOTMuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fbaq5-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=SBaMXu0ZfHMQ7kNvgGxH71O&_nc_gid=02ee83935d0d4f0e84bb6d63c8af7296&edm=AGFyKLkAAAAA&ccb=7-5&ig_cache_key=MzQzMDM0NDMyMzM0NTU0Mzc2Mw%3D%3D.3-ccb7-5-cb30a688f7-cd073ddd&oh=00_AYCmBCSoTpS6At3Z4SeUoBtE6-2OKzfu0JraN-Xp6-Tm8w&oe=6790662D&_nc_sid=5a0a6d',
      description: 'Videojuegos Y Collecionables, Compramos consolas',
      dividerColor: '#cbcbcb',
      facebook: 'https://www.facebook.com/profile.php?id=100064982311928',
      givenPikcoins: 0,
      instagram: 'https://www.instagram.com/bluepanthervideogames/',
      location: 'Medellín, Colombia',
      name: 'Blue Panther',
      pageBackground: 'images/users/bluepanther/bluepanther-bg.png',
      picture: '/images/users/bluepanther/logo.jpg',
      place: 'Medellín',
      rankingId: 2,
      slug: 'bluepanther',
      whatsapp: 'https://api.whatsapp.com/send?phone=573106614305',
      whatsappNumber: 573116453654,
    },
    competitions: ['act-4-sorteo-de-navidad'],
    products: [
      {
        cashbackAvailable: true,
        images: [{ url: 'https://bluepanther.store/cdn/shop/files/Instagrampost-37.png?v=1738270483&width=493' }],
        isNew: true,
        price: 2100000,
        title: 'Steam Deck 564GB',
        slug: 'steam-deck-564gb',
      },
      {
        cashbackAvailable: true,
        images: [{ url: 'https://bluepanther.store/cdn/shop/files/Instagrampost-36.png?v=1738270411&width=990' }],
        isNew: true,
        price: 2500000,
        title: 'Rog Ally Z1 Extreme',
        slug: 'rog-ally-z1-extreme'
      }
    ]
  },
  nataliatution: {
    authorInformation: {
      background: 'https://www.perfumesbogota.com.co/cdn/shop/products/fleur-orientica_580x.jpg?v=1677872919',
      dividerColor: 'white',
      givenPikcoins: 0,
      name: 'Nataliatution',
      picture: '/images/users/nataliatution/logo.jpg',
      place: 'Barranquilla',
      secondaryColor: 'white',
      whatsappNumber: 573117504310,
      category: {
        label: 'Ropa y Calzado',
        value: 'ropa-calzado'
      }
    },
    products: [{
      images: [
        { url: '/images/users/nataliatution/products/product1.jpeg' }
      ],
      isNew: true,
      title: 'Ropa, Calzado y Accesorios de Dama',
      cashbackAvailable: true,
      user: {
        name: 'Nataliatution',
        picture: '/images/users/nataliatution/logo.jpg'
      }
    },
    {
      images: [
        { url: '/images/users/nataliatution/products/deportiva.jpg' }
      ],
      isNew: true,
      title: 'Ropa Deportiva de Dama',
      cashbackAvailable: true,
      user: {
        name: 'Nataliatution',
        picture: '/images/users/nataliatution/logo.jpg'
      }
    }]
  },
}

export {
  sellersInformation
}