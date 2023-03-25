import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { movieDTO } from '../movies/movies.model';

@Injectable({
  providedIn: 'root'
})
export class WatchListService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + "/watchLists";

  public add(movieId: number){
    return this.http.post(this.apiURL, {movieId});
  }

  getAll(): Observable<movieDTO[]>{
    return this.http.get<movieDTO[]>(this.apiURL);
  }

  getById(id: number): Observable<movieDTO>{  
    return this.http.get<movieDTO>(`${this.apiURL}/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
