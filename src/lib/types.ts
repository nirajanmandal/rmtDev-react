export type jobItems = {
    badgeLetters: string;
    company: string;
    daysAgo: number;
    id: number;
    relevanceScore: number;
    title: string;
};

export type jobItemExtended = jobItems & {
    description: string;
    qualifications: string[];
    reviews: string[];
    location: string;
    salary: string;
    duration: string;
    companyURL: string
    coverImgURL: string
}

export type SortBy = "relevant" | "recent"

export type PageDirection = "next" | "previous"