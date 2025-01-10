import { ArticlePreview } from "./articlePreview.model";

export interface ArticleFull extends ArticlePreview{
    poids: number;
    description: string;
    dimensions: string;
}