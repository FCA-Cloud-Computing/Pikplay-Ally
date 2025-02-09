import { slugify } from '@/lib/utils'

const sellersInformation = {
    'fundacion-codigo-abierto': {
        authorInformation: {
            aboutHTML: <div>Construyendo un epicentro tech en el Caribe</div>,
            aboutHTMLButtonStyle: { color: 'white', textDecoration: 'underline' },
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
        }]
    },
    'maxilofacial-care': {
        authorInformation: {
            aboutHTML: <div></div>,
            aboutHTMLButtonStyle: { color: 'white', textDecoration: 'underline' },
            pageBackground: 'https://instagram.fbaq5-1.fna.fbcdn.net/v/t39.30808-6/471500893_18354437725134821_6595726740774147152_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMjAweDE1MDAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fbaq5-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2AGYzx8rnoC9AIzetCSvR1WwxKC1SoXqj8SZ0zgIWfNKgGnhZBiJHsHTRV18z3CG8Aw&_nc_ohc=UxH_5JVjpdwQ7kNvgHuMShh&_nc_gid=df72401a5381411eb0be2c1228fe735a&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzQ0MTAyNDE2OTEzNDI0MzYwMg%3D%3D.3-ccb7-5&oh=00_AYD2Et-1MhhRuI0fSETpYFlwHS_o7hZKKc-VEPUvpAJQeg&oe=67ABF3BE&_nc_sid=22de04',
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
            aboutHTML: '<div>English Club es un espacio para tener experiencias inmersivas en el idioma.</div>',
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
            givenPikcoins: 0,
            location: 'Envíos a todo el pais',
            pageBackground: 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/UQLCPKQVN5AHHC2ZZDKTNN5XOM.jpg',
            picture: '/images/users/le-fragance/le-fragance.jpeg',
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
                { url: '/images/users/le-fragance/products/one-million.webp' }
            ],
            isNew: true,
            title: 'Paco Rabanne One million 1 Million Tradicional EDT 200 ml para hombre',
            quantity: 5,
            price: 130000,
            cashbackAvailable: true,
            slug: 'paco-rabanne-one-million-1-million-tradicional',
            user: {
                name: 'Le Fragance',
                picture: '/images/users/le-fragance/le-fragance.jpeg',
                slug: 'le-fragance'
            },

        },
        {
            images: [
                { url: '/images/users/le-fragance/products/acgua di gio.avif' }
            ],
            isNew: true,
            title: 'Acgua di gio',
            quantity: 5,
            price: 100000,
            cashbackAvailable: true,
            slug: 'acgua-di-gio',
            user: {
                name: 'Le Fragance',
                picture: '/images/users/le-fragance/le-fragance.jpeg',
                slug: 'le-fragance'
            }
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
            user: {
                name: 'Le Fragance',
                picture: '/images/users/le-fragance/le-fragance.jpeg',
                slug: 'le-fragance'
            }
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
            user: {
                name: 'Le Fragance',
                picture: '/images/users/le-fragance/le-fragance.jpeg',
                slug: 'le-fragance'
            }
        }],
    },
    'blue-panther': {
        authorInformation: {
            aboutHTML: `<div><video width="140" height="260" controls>
        <source src="/images/users/bluepanther/video.mp4" type="video/mp4">
        Tu navegador no soporta el elemento de video.
        </video></div>`,
            aboutHTMLButtonStyle: { color: 'white', textDecoration: 'underline' },
            background: 'https://instagram.fbaq5-1.fna.fbcdn.net/v/t39.30808-6/454723787_18361896526109558_4048109518435842878_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&cb=30a688f7-cd073ddd&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMjkweDIyOTMuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fbaq5-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=SBaMXu0ZfHMQ7kNvgGxH71O&_nc_gid=02ee83935d0d4f0e84bb6d63c8af7296&edm=AGFyKLkAAAAA&ccb=7-5&ig_cache_key=MzQzMDM0NDMyMzM0NTU0Mzc2Mw%3D%3D.3-ccb7-5-cb30a688f7-cd073ddd&oh=00_AYCmBCSoTpS6At3Z4SeUoBtE6-2OKzfu0JraN-Xp6-Tm8w&oe=6790662D&_nc_sid=5a0a6d',
            dividerColor: '#cbcbcb',
            facebook: 'https://www.facebook.com/profile.php?id=100064982311928',
            givenPikcoins: 0,
            instagram: 'https://www.instagram.com/bluepanthervideogames/',
            location: 'Medellín, Colombia',
            name: 'Blue Panther',
            pageBackground: 'images/users/bluepanther/bg-blue.jpg',
            picture: '/images/users/bluepanther/logo.jpg',
            place: 'Medellín',
            rankingId: 2,
            whatsapp: 'https://api.whatsapp.com/send?phone=573106614305'
        },
        competitions: ['act-4-sorteo-de-navidad']
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