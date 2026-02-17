
export interface Agreement {
    id: number;
    name: string;
    year: number;
    category: string;
    signatories: string[];
    summary: string;
    full_text: string;
    created_at: Date;
    semantic_scores?: Analysis; // Optional as it might be joined
}

export interface Analysis {
    id: number;
    agreement_id: number;
    sovereignty_score: number;
    binding_score: number;
    human_centricity_score: number;
    economic_weight: number;
    analysis_notes: string;
}
