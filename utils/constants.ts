import Img1 from "../public/assets/images/img-1.jpg"
import Img3 from "../public/assets/images/img-3.jpg"
import Img4 from "../public/assets/images/img-4.jpg"
import Img7 from "../public/assets/images/img-7.jpg"
import Img8 from "../public/assets/images/img-8.jpg"
import Img13 from "../public/assets/images/img-13.jpg"
import Img16 from "../public/assets/images/img-16.jpg"
import Img17 from "../public/assets/images/img-17.jpg"
import Img19 from "../public/assets/images/img-19.jpg"
import Img20 from "../public/assets/images/img-20.jpg"
import { Message, Notification, Product, ShowCase } from "./types"
const imageLinks = [
  "assets/images/img-1.jpg",
  "assets/images/img-2.jpg",
  "assets/images/img-3.jpg",
  "assets/images/img-4.jpg",
  "assets/images/img-5.jpg",
  "assets/images/img-6.jpg",
  "assets/images/img-7.jpg",
  "assets/images/img-8.jpg",
  "assets/images/img-9.jpg",
  "assets/images/img-10.jpg",
  "assets/images/img-11.jpg",
  "assets/images/img-12.jpg",
  "assets/images/img-13.jpg",
  "assets/images/img-14.jpg",
  "assets/images/img-15.jpg",
  "assets/images/img-16.jpg",
  "assets/images/img-17.jpg",
  "assets/images/img-18.jpg",
  "assets/images/img-19.jpg",
  "assets/images/img-20.jpg",
]
const paragraphs = [
  {
    "id": 1,
    "title": "Bienvenue dans Votre Univers Déco",
    "description": "Transformez votre intérieur avec des meubles uniques qui racontent votre histoire. Chaque pièce de notre collection est soigneusement sélectionnée pour vous offrir le parfait équilibre entre design, confort et qualité. Créez un espace qui vous ressemble.",
    "img": Img1
  },
  {
    "id": 3,
    "title": "Votre Style, Votre Intérieur",
    "description": "Personnalisez chaque pièce de votre maison avec des meubles modernes ou intemporels. Inspirez-vous de nos créations pour transformer votre espace en un lieu de vie unique, chaleureux et accueillant.",
    "img": Img3
  },
  {
    "id": 4,
    "title": "Élégance et Fonctionnalité",
    "description": "Des meubles qui allient beauté et praticité pour chaque pièce de votre maison. Apportez une touche de style tout en répondant aux besoins de votre quotidien.",
    "img": Img4
  },
  {
    "id": 7,
    "title": "Qualité et Durabilité",
    "description": "Optez pour des meubles conçus pour durer. Nos matériaux robustes et notre savoir-faire garantissent des pièces qui traverseront les années tout en restant élégantes et fonctionnelles.",
    "img": Img7
  },
  {
    "id": 8,
    "title": "Personnalisez Votre Espace",
    "description": "Exprimez votre style avec des meubles personnalisables. Choisissez parmi une variété de couleurs, matériaux et designs pour créer un intérieur qui vous ressemble véritablement.",
    "img": Img8
  },
  {
    "id": 13,
    "title": "Écoresponsabilité",
    "description": "Faites un choix responsable avec nos meubles durables, fabriqués à partir de matériaux respectueux de l’environnement. Associez style et conscience écologique sans compromis.",
    "img": Img13
  },
  {
    "id": 16,
    "title": "Confort et Bien-être",
    "description": "Choisissez des meubles conçus pour votre confort. Canapés moelleux, lits douillets et chaises ergonomiques : chaque détail est pensé pour votre bien-être au quotidien.",
    "img": Img16
  },
  {
    "id": 17,
    "title": "Des Solutions pour Petits Espaces",
    "description": "Optimisez chaque mètre carré grâce à nos meubles astucieux et compacts. Même les plus petits espaces peuvent allier design et fonctionnalité.",
    "img": Img17
  },
  {
    "id": 19,
    "title": "Des Meubles qui Parlent de Vous",
    "description": "Chaque meuble raconte une partie de votre histoire. Créez un intérieur à votre image, qui reflète vos goûts, vos passions et votre personnalité unique.",
    "img": Img19
  },
  {
    "id": 20,
    "title": "Transformez Votre Maison en Chez-Vous",
    "description": "Avec nos meubles, transformez chaque pièce en un espace chaleureux et accueillant. Faites de votre maison un véritable refuge, où chaque détail inspire confort et sérénité.",
    "img": Img20
  }
];

  const furnitureCategories:ShowCase[] = [
    {
      title: "prestige déco",
      href: "/produits/prestige",
      description: "Decouvrez notre collection de meubles excellentes et compatibles avec toutes vos demandes et vivez le confort vous voulez",
      image:"/assets/images/logo.jpg",
      main:true
    },{
      title: "Canapés et Fauteuils",
      href: "/produits/canapes-fauteuils",
      description: "Découvrez des canapés et fauteuils confortables et élégants pour votre salon.",
      image:"/assets/images/sofa.jpg"
    },
    {
      title: "Tables et Chaises",
      href: "/produits/tables-chaises",
      description: "Trouvez la table parfaite pour vos repas et des chaises design pour compléter votre espace.",
      image:"/assets/images/Table.jpg"
    },
    {
      title: "Meubles de Chambre",
      href: "/produits/meubles-chambre",
      description: "Lits, armoires et commodes pour créer une chambre à coucher cosy et fonctionnelle.",
      image:"/assets/images/bedroom.jpg"
    },
    {
      title: "Meubles de Bureau",
      href: "/produits/meubles-bureau",
      description: "Des solutions ergonomiques et stylées pour votre espace de travail.",
      image:"/assets/images/workspace.jpg"
    },
    {
      title: "Décoration et Accessoires",
      href: "/produits/decoration-accessoires",
      description: "Lampes, miroirs et objets déco pour ajouter une touche personnelle à votre intérieur.",
      image:"/assets/images/accessory.jpg"
    }
  ];
  const trends:ShowCase[] = [
    {
      href:"/tendances/nouveautes",
      description:"Découvrez nos dernières arrivées et les tendances du moment.",
      title:'Nouveautés',
      image:"/assets/images/growth.jpg"
    },
    {
      href:"/tendances/best-sellers",
      description:"Les préférés de nos clients, des pièces incontournables.",
      title:'Best-sellers',
      image:"/assets/images/best_seller.jpg"
    },
    {
      href:"/tendances/promotions",
      description:"Profitez de nos offres spéciales et économisez sur vos meubles préférés.",
      title:'Promotions',
      image:"/assets/images/Promotions.jpg"
    }
  ]
  const notifications: Notification[] = [
    {
      id: "1",
      userId: "user-123",
      type: "PRODUCT_ADDED",
      message: "A new product has been added to the catalog.",
      createdAt: new Date("2023-10-01T10:00:00Z"),
      read: false,
      product: {
        id: "product-001",
        name: "Modern Sofa",
        price: 499.99,
      },
    },
    {
      id: "2",
      userId: "user-456",
      type: "REVIEW_ADDED",
      message: "A new review has been submitted for a product.",
      createdAt: new Date("2023-10-02T11:30:00Z"),
      read: true,
      product: {
        id: "product-002",
        name: "Dining Table",
        price: 299.99,
      },
    },
    {
      id: "3",
      userId: "user-789",
      type: "ORDER_PLACED",
      message: "A new order has been placed.",
      createdAt: new Date("2023-10-03T12:45:00Z"),
      read: false,
      product: {
        id: "product-003",
        name: "Coffee Table",
        price: 149.99,
      },
    },
    {
      id: "4",
      userId: "user-123",
      type: "ORDER_CANCELED",
      message: "An order has been canceled.",
      createdAt: new Date("2023-10-04T09:15:00Z"),
      read: false,
      product: {
        id: "product-004",
        name: "Bookshelf",
        price: 199.99,
      },
    },
    {
      id: "5",
      userId: "user-456",
      type: "REVIEW_ADDED",
      message: "A new review has been submitted for a product.",
      createdAt: new Date("2023-10-05T14:20:00Z"),
      read: true,
      product: {
        id: "product-005",
        name: "Bed Frame",
        price: 399.99,
      },
    },
    {
      id: "6",
      userId: "user-789",
      type: "ORDER_PLACED",
      message: "A new order has been placed.",
      createdAt: new Date("2023-10-06T16:00:00Z"),
      read: false,
      product: {
        id: "product-006",
        name: "Office Chair",
        price: 249.99,
      },
    },
    {
      id: "7",
      userId: "user-123",
      type: "PRODUCT_ADDED",
      message: "A new product has been added to the catalog.",
      createdAt: new Date("2023-10-07T08:45:00Z"),
      read: false,
      product: {
        id: "product-007",
        name: "TV Stand",
        price: 179.99,
      },
    },
    {
      id: "8",
      userId: "user-456",
      type: "ORDER_CANCELED",
      message: "An order has been canceled.",
      createdAt: new Date("2023-10-08T13:10:00Z"),
      read: true,
      product: {
        id: "product-008",
        name: "Recliner",
        price: 349.99,
      },
    },
    {
      id: "9",
      userId: "user-789",
      type: "ORDER_PLACED",
      message: "A new order has been placed.",
      createdAt: new Date("2023-10-09T17:30:00Z"),
      read: false,
      product: {
        id: "product-009",
        name: "Dresser",
        price: 299.99,
      },
    },
    {
      id: "10",
      userId: "user-123",
      type: "PRODUCT_ADDED",
      message: "A new product has been added to the catalog.",
      createdAt: new Date("2023-10-10T10:50:00Z"),
      read: false,
      product: {
        id: "product-010",
        name: "Nightstand",
        price: 99.99,
      },
    },
    {
      id: "11",
      userId: "user-456",
      type: "REVIEW_ADDED",
      message: "A new review has been submitted for a product.",
      createdAt: new Date("2023-10-11T12:00:00Z"),
      read: true,
      product: {
        id: "product-011",
        name: "Sectional Sofa",
        price: 899.99,
      },
    },
    {
      id: "12",
      userId: "user-789",
      type: "ORDER_CANCELED",
      message: "An order has been canceled.",
      createdAt: new Date("2023-10-12T15:45:00Z"),
      read: false,
      product: {
        id: "product-012",
        name: "Coffee Table",
        price: 149.99,
      },
    },
    {
      id: "13",
      userId: "user-123",
      type: "PRODUCT_ADDED",
      message: "A new product has been added to the catalog.",
      createdAt: new Date("2023-10-13T09:30:00Z"),
      read: false,
      product: {
        id: "product-013",
        name: "Bar Stool",
        price: 79.99,
      },
    },
    {
      id: "14",
      userId: "user-456",
      type: "REVIEW_ADDED",
      message: "A new review has been submitted for a product.",
      createdAt: new Date("2023-10-14T14:15:00Z"),
      read: true,
      product: {
        id: "product-014",
        name: "Dining Chair",
        price: 129.99,
      },
    },
    {
      id: "15",
      userId: "user-789",
      type: "ORDER_PLACED",
      message: "A new order has been placed.",
      createdAt: new Date("2023-10-15T18:00:00Z"),
      read: false,
      product: {
        id: "product-015",
        name: "Console Table",
        price: 199.99,
      },
    },
  ];
  const products: Product[] = [
    {
      name: "Modern Sofa",
      price: 499.99,
      description: "A sleek and comfortable modern sofa for your living room.",
      category: "Furniture",
      images: [
        "",
        "",
      ],
      quantity: 10,
      sold: 5,
      reviews: [
        {
          userId: "user-123",
          comment: "Very comfortable and stylish!",
          rating: 5,
          createdAt: new Date("2023-09-15T10:00:00Z"),
        },
        {
          userId: "user-456",
          comment: "Great value for the price.",
          rating: 4,
          createdAt: new Date("2023-09-20T12:30:00Z"),
        },
      ],
    },
    {
      name: "Dining Table",
      price: 299.99,
      description: "A sturdy and elegant dining table for family meals.",
      category: "Furniture",
      images: [
        "",
        "",
      ],
      quantity: 15,
      sold: 8,
      reviews: [
        {
          userId: "user-789",
          comment: "Perfect size for our dining room.",
          rating: 5,
          createdAt: new Date("2023-09-25T14:45:00Z"),
        },
      ],
    },
    {
      name: "Coffee Table",
      price: 149.99,
      description: "A stylish coffee table for your living room.",
      category: "Furniture",
      images: [
        "",
        "",
      ],
      quantity: 20,
      sold: 12,
      reviews: [
        {
          userId: "user-123",
          comment: "Looks great in our living room!",
          rating: 4,
          createdAt: new Date("2023-10-01T09:15:00Z"),
        },
        {
          userId: "user-456",
          comment: "Very sturdy and well-made.",
          rating: 5,
          createdAt: new Date("2023-10-05T11:20:00Z"),
        },
      ],
    },
    {
      name: "Bed Frame",
      price: 399.99,
      description: "A durable and stylish bed frame for your bedroom.",
      category: "Furniture",
      images: [
        "",
        "",
      ],
      quantity: 8,
      sold: 3,
      reviews: [
        {
          userId: "user-789",
          comment: "Easy to assemble and looks great.",
          rating: 5,
          createdAt: new Date("2023-10-10T13:30:00Z"),
        },
      ],
    },
    {
      name: "Office Chair",
      price: 249.99,
      description: "An ergonomic office chair for long work hours.",
      category: "Furniture",
      images: [
        "",
        "",
      ],
      quantity: 12,
      sold: 7,
      reviews: [
        {
          userId: "user-123",
          comment: "Very comfortable and adjustable.",
          rating: 5,
          createdAt: new Date("2023-10-15T15:45:00Z"),
        },
        {
          userId: "user-456",
          comment: "Great support for my back.",
          rating: 4,
          createdAt: new Date("2023-10-20T17:00:00Z"),
        },
      ],
    },
    {
      name: "Bookshelf",
      price: 199.99,
      description: "A spacious bookshelf for your home library.",
      category: "Furniture",
      images: [
        "",
        "",
      ],
      quantity: 5,
      sold: 2,
      reviews: [
        {
          userId: "user-789",
          comment: "Perfect for organizing my books.",
          rating: 5,
          createdAt: new Date("2023-10-25T18:15:00Z"),
        },
      ],
    },
    {
      name: "TV Stand",
      price: 179.99,
      description: "A modern TV stand with ample storage space.",
      category: "Furniture",
      images: [
        "",
        "",
      ],
      quantity: 10,
      sold: 4,
      reviews: [
        {
          userId: "user-123",
          comment: "Fits our TV perfectly and looks great.",
          rating: 4,
          createdAt: new Date("2023-11-01T19:30:00Z"),
        },
      ],
    },
    {
      name: "Recliner",
      price: 349.99,
      description: "A comfortable recliner for your living room.",
      category: "Furniture",
      images: [
        "",
        "",
      ],
      quantity: 7,
      sold: 3,
      reviews: [
        {
          userId: "user-456",
          comment: "Very comfortable and easy to use.",
          rating: 5,
          createdAt: new Date("2023-11-05T20:45:00Z"),
        },
      ],
    },
    {
      name: "Dresser",
      price: 299.99,
      description: "A stylish dresser for your bedroom.",
      category: "Furniture",
      images: [
        "",
        "",
      ],
      quantity: 6,
      sold: 2,
      reviews: [
        {
          userId: "user-789",
          comment: "Looks great and has plenty of storage.",
          rating: 4,
          createdAt: new Date("2023-11-10T21:00:00Z"),
        },
      ],
    },
    {
      name: "Nightstand",
      price: 99.99,
      description: "A compact nightstand for your bedroom.",
      category: "Furniture",
      images: [
        "",
        "",
      ],
      quantity: 15,
      sold: 6,
      reviews: [
        {
          userId: "user-123",
          comment: "Perfect size for our bedroom.",
          rating: 5,
          createdAt: new Date("2023-11-15T22:15:00Z"),
        },
      ],
    },
  ];
  const messages: Message[] = [
    {
      id: '1',
      from: 'John Doe',
      to: 'Jane Smith',
      message: 'Hello, how are you?',
      createdAt: new Date('2025-02-08T10:30:00Z'),
      read: true,
    },
    {
      id: '2',
      from: 'Alice Johnson',
      to: 'Bob Brown',
      message: 'Please find the report attached.',
      createdAt: new Date('2025-02-07T15:00:00Z'),
      read: false,
    },
    {
      id: '3',
      from: 'Charlie Davis',
      to: 'Sophia Taylor',
      message: 'Let me know if you need anything.',
      createdAt: new Date('2025-02-06T13:45:00Z'),
      read: true,
    },
    {
      id: '4',
      from: 'Emily Wilson',
      to: 'David Moore',
      message: 'Great work on the project!',
      createdAt: new Date('2025-02-05T08:20:00Z'),
      read: false,
    },
    {
      id: '5',
      from: 'James White',
      to: 'Olivia Harris',
      message: 'Can we schedule a meeting tomorrow?',
      createdAt: new Date('2025-02-04T09:15:00Z'),
      read: true,
    },
    {
      id: '6',
      from: 'Olivia Harris',
      to: 'James White',
      message: 'Thanks for your help today.',
      createdAt: new Date('2025-02-03T12:00:00Z'),
      read: false,
    },
    {
      id: '7',
      from: 'David Moore',
      to: 'Emily Wilson',
      message: 'I\'ll get back to you soon.',
      createdAt: new Date('2025-02-02T16:30:00Z'),
      read: true,
    },
    {
      id: '8',
      from: 'Sophia Taylor',
      to: 'Charlie Davis',
      message: 'Happy to assist you!',
      createdAt: new Date('2025-02-01T14:00:00Z'),
      read: false,
    },
    {
      id: '9',
      from: 'Bob Brown',
      to: 'Alice Johnson',
      message: 'Looking forward to working with you.',
      createdAt: new Date('2025-01-31T11:45:00Z'),
      read: true,
    },
    {
      id: '10',
      from: 'Jane Smith',
      to: 'John Doe',
      message: 'Please confirm your availability.',
      createdAt: new Date('2025-01-30T17:30:00Z'),
      read: false,
    },
    {
      id: '11',
      from: 'John Doe',
      to: 'Alice Johnson',
      message: 'Can you send me the final draft by tomorrow?',
      createdAt: new Date('2025-01-29T08:45:00Z'),
      read: true,
    },
    {
      id: '12',
      from: 'Charlie Davis',
      to: 'Bob Brown',
      message: 'I received the files, thanks for sending.',
      createdAt: new Date('2025-01-28T09:00:00Z'),
      read: false,
    },
    {
      id: '13',
      from: 'Emily Wilson',
      to: 'Sophia Taylor',
      message: 'Let\'s have a quick call to discuss the updates.',
      createdAt: new Date('2025-01-27T10:15:00Z'),
      read: true,
    },
    {
      id: '14',
      from: 'Olivia Harris',
      to: 'David Moore',
      message: 'The presentation is ready for review.',
      createdAt: new Date('2025-01-26T14:30:00Z'),
      read: false,
    },
    {
      id: '15',
      from: 'James White',
      to: 'Jane Smith',
      message: 'Let me know when you are free to chat.',
      createdAt: new Date('2025-01-25T12:00:00Z'),
      read: true,
    },
    {
      id: '16',
      from: 'Sophia Taylor',
      to: 'John Doe',
      message: 'I have updated the document, please check.',
      createdAt: new Date('2025-01-24T13:45:00Z'),
      read: false,
    },
    {
      id: '17',
      from: 'Bob Brown',
      to: 'Charlie Davis',
      message: 'Can you send me the meeting agenda?',
      createdAt: new Date('2025-01-23T11:30:00Z'),
      read: true,
    },
    {
      id: '18',
      from: 'David Moore',
      to: 'Olivia Harris',
      message: 'Thanks for the feedback, I\'ll revise accordingly.',
      createdAt: new Date('2025-01-22T16:00:00Z'),
      read: false,
    },
    {
      id: '19',
      from: 'Alice Johnson',
      to: 'Sophia Taylor',
      message: 'Let\'s discuss the new project proposal.',
      createdAt: new Date('2025-01-21T10:10:00Z'),
      read: true,
    },
    {
      id: '20',
      from: 'Jane Smith',
      to: 'James White',
      message: 'The meeting has been rescheduled to next week.',
      createdAt: new Date('2025-01-20T09:00:00Z'),
      read: false,
    },
];
export {paragraphs,imageLinks,notifications,products,messages,furnitureCategories,trends}