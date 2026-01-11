export interface Author {
    name: string;
    role: string;
    image: string;
    date: string;
    bio?: string;
}

export interface ImpactStats {
    hectares: number;
    trees: number;
    jobs: number;
}

export interface RelatedArticle {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
}
