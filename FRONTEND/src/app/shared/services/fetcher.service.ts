import { Injectable} from '@angular/core';
import { ArticlePreview } from '../models/articlePreview.model';
import { ArticleFull } from '../models/articleFull.model';
import { Categorie } from '../models/categorie.model';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FetcherService {

  private baseUrl: string = environment.backendCatalogue;

  constructor(private http: HttpClient) { }

  public fetchFeaturedArticles(): Observable<ArticlePreview[]> {
    return this.http.get<ArticlePreview[]>(this.baseUrl + "/produits-featured").pipe(
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
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<ArticleFull>(
      this.baseUrl + "/produits-detail/" + id ,
      httpOptions
    ).pipe()
  }

  // renvoie les articles pour une categorie donnée
  public fetchArticleByCategorie(cat: string): Observable<ArticlePreview[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<ArticlePreview[]>(
      this.baseUrl + "/produits-bycat/" + cat,
      httpOptions
    ).pipe(
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
    return this.http.get<Categorie[]>(this.baseUrl + "/categories").pipe(
      map(items => items.filter(item => items))
    )
  }

  public fetchArticleByQuery(query: string): Observable<ArticlePreview[]> {
    return this.http.get<ArticlePreview[]>(this.baseUrl + "/search/" + query).pipe(
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
