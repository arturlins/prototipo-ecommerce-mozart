export interface Product {
    id: string;
    name: string;
    price: number;
    category: 'Musculação' | 'Yoga' | 'Acessórios' | 'Bem-estar';
    description: string;
    image: string;
    gallery?: string[];
    rating: number; // 1-5
    variations?: {
        type: string; // e.g. "Peso", "Cor"
        options: string[];
    }[];
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Tapete de Yoga Premium',
        price: 129.90,
        category: 'Yoga',
        description: 'Encontre o equilíbrio perfeito com nosso Tapete de Yoga Premium. Desenvolvido com material antiderrapante de alta densidade (TPE ecológico), ele oferece amortecimento superior para suas articulações e estabilidade em cada asana. Ideal para todos os níveis, do iniciante ao avançado, e fácil de transportar com a alça inclusa. Transforme sua prática em um momento sagrado de conforto e foco.',
        image: '/products/tapete-yoga1.webp',
        gallery: ['/products/tapete-yoga1.webp', '/products/tapete-yoga2.webp', '/products/tapete-yoga3.webp', '/products/tapete-yoga4.webp'],
        rating: 4.8,
        variations: [
            { type: 'Cor', options: ['Verde Sálvia', 'Azul Oceano', 'Preto Carvão'] },
            { type: 'Espessura', options: ['4mm', '6mm'] }
        ]
    },
    {
        id: '2',
        name: 'Kit de Faixas Elásticas',
        price: 89.90,
        category: 'Acessórios',
        description: 'Potencialize seus treinos onde estiver com o Kit de Faixas Elásticas Mozart. Composto por 5 níveis de intensidade (do super leve ao ultra pesado), estas faixas de látex 100% natural são perfeitas para fortalecimento muscular, alongamento e reabilitação. Leves, compactas e versáteis, permitem que você leve sua academia na mala.',
        image: '/products/faixa-elastica-1.webp',
        gallery: ['/products/faixa-elastica-1.webp', '/products/faixa-elastica-2.webp', '/products/faixa-elastica-3.webp'],
        rating: 4.5,
        variations: [
            { type: 'Intensidade', options: ['Kit Completo (5 Níveis)'] }
        ]
    },
    {
        id: '3',
        name: 'Halteres Sextavados',
        price: 45.00,
        category: 'Musculação',
        description: 'Construa força com segurança e durabilidade. Nossos Halteres Sextavados possuem revestimento emborrachado que protege o piso e reduz ruídos, além de um design hexagonal que impede que o equipamento role no chão. A pegada ergonômica cromada e serrilhada garante firmeza mesmo com as mãos suadas.',
        image: '/products/halteres1.webp',
        gallery: ['/products/halteres1.webp', '/products/halteres2.webp'],
        rating: 4.9,
        variations: [
            { type: 'Peso', options: ['2kg', '5kg', '10kg', '15kg'] }
        ]
    },
    {
        id: '4',
        name: 'Whey Protein Isolado',
        price: 199.90,
        category: 'Bem-estar',
        description: 'Nutrição pura para sua recuperação muscular. Nosso Whey Protein Isolado Mozart fornece 28g de proteína por dose, com zero adição de açúcares ea baixo teor de carboidratos. Filtrado a frio para preservar a integridade dos aminoácidos, possui absorção ultra-rápida, ideal para o pós-treino. Sabor incrivelmente cremoso que não enjoa.',
        image: '/products/whey1.jpg',
        gallery: ['/products/whey1.jpg', '/products/whey2.webp', '/products/whey3.webp', '/products/whey4.webp'],
        rating: 4.7,
        variations: [
            { type: 'Sabor', options: ['Baunilha', 'Chocolate Belga', 'Morango'] },
            { type: 'Tamanho', options: ['900g', '1.8kg'] }
        ]
    },
    {
        id: '5',
        name: 'Garrafa Térmica',
        price: 69.90,
        category: 'Acessórios',
        description: 'Hidratação com estilo e performance. A Garrafa Térmica Mozart mantém sua água gelada por até 24 horas ou seu café quente por até 12 horas, graças à tecnologia de isolamento a vácuo em parede dupla. Feita em aço inoxidável 18/8 de grau alimentício, não retém cheiro e é livre de BPA. Acompanha tampa hermética anti-vazamento.',
        image: '/products/garrafa-termica1.webp',
        gallery: ['/products/garrafa-termica1.webp', '/products/garrafa-termica2.webp', '/products/garrafa-termica3.webp'],
        rating: 4.6,
        variations: [
            { type: 'Cor', options: ['Branco Minimal', 'Preto Matte', 'Verde Mozart'] }
        ]
    }
];
