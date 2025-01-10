import { Injectable} from '@angular/core';
import { ArticlePreview } from '../models/articlePreview.model';
import { ArticleFull } from '../models/articleFull.model';
import { Categorie } from '../models/categorie.model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FetcherService {

  private baseUrl: string = `https://cnamapp-2cms.onrender.com/api/products/`;

  constructor(private http: HttpClient) { }

  public fetchFeaturedArticles(): Observable<ArticlePreview[]> {
    return this.http.get<ArticleFull[]>(this.baseUrl + "getProducts").pipe(
      map(items => items.filter(item => item.en_avant === true)),
      map(items => items.map(item => ({
        id: String(item.id),
        nom: item.nom,
        prix: item.prix,
        note: item.note,
        id_categorie: item.id_categorie,
        en_avant: item.en_avant,
        images: item.images || []
      } as ArticlePreview)))
    );
  }
  
  // Cette fonction renvoie toutes les infos d'un article
  public fetchArticleFull(id: string): Observable<ArticleFull> {
    return this.http.get<ArticleFull[]>(this.baseUrl + "getProducts").pipe(
      map(items => {
        const item = items.find(item => item.id == id);
        if (item) {
          return item;
        } else {
          throw new Error(`Article with id ${id} not found`);
        }
      })
    );
  }

  // renvoie les articles pour une categorie donnée
  public fetchArticleByCategorie(cat: string): Observable<ArticlePreview[]> {
    return this.http.get<ArticlePreview[]>(this.baseUrl + "getProducts").pipe(
      map(items => items.filter(item => item.id_categorie == cat)),
      map(items => items.map(item => ({
        id: String(item.id),
        nom: item.nom,
        prix: item.prix,
        note: item.note,
        id_categorie: item.id_categorie,
        en_avant: item.en_avant,
        images: item.images || []
      } as ArticlePreview)))
    );
  }

  // renvoie les catégories
  public fetchCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.baseUrl + "getCategories").pipe(
      map(items => items.filter(item => items))
    )
  }

  public fetchOneCategorie(id: string): Observable<Categorie> {
    return this.http.get<Categorie[]>(this.baseUrl + "getCategories").pipe(
      map(items => {
        const item = items.find(item => item.id === id);
        if (item) {
          return item;
        } else {
          throw new Error(`Categorie with id ${id} not found`);
        }
      })
    )
  }


  public fetchArticleByQuery(query: string): Observable<ArticlePreview[]> {
    return this.http.get<ArticlePreview[]>(this.baseUrl + "getProducts").pipe(
      map(items => items.filter(item => item.nom.toLowerCase().includes(query.toLowerCase()))),
      map(items => items.map(item => ({
        id: String(item.id),
        nom: item.nom,
        prix: item.prix,
        note: item.note,
        id_categorie: item.id_categorie,
        en_avant: item.en_avant,
        images: item.images || []
      } as ArticlePreview)))
    );
  }

}
