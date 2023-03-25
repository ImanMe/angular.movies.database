import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDateFormData } from '../utilities/utils';
import { actorCreationDTO, actorDTO, actorsMovieDTO } from './actors.model';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + '/actors'

  searchByName(name: string): Observable<actorsMovieDTO[]>{
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post<actorsMovieDTO[]>(`${this.apiURL}/searchByName`, 
    JSON.stringify(name), {headers});
  }

  getAll(page: number, recordsPerPage: number): Observable<actorDTO[]>{    
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), params: params };
    return this.http.get<actorDTO[]>(this.apiURL, httpOptions) ;
  }  

  public getById(id: number): Observable<actorCreationDTO>{
    return this.http.get<actorCreationDTO>(`${this.apiURL}/${id}`);
  }

  create(actor: actorCreationDTO){       
    const formData = this.BuildFormData(actor);
    return this.http.post(this.apiURL, formData);
  }

  edit(id: number, actor: actorCreationDTO){
    const formData = this.BuildFormData(actor);
    return this.http.put(`${this.apiURL}/${id}`, formData);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  private BuildFormData(actor: actorCreationDTO): FormData {
    const formData = new FormData();

    formData.append('name', actor.name);

    if(actor.dateOfBirth)
      formData.append('dateOfBirth', formatDateFormData(actor.dateOfBirth));
    
    if(actor.picture)
      formData.append('picture', actor.picture);

    if(actor.biography)
      formData.append('biography', String(actor.biography));
    return formData;
  }
}
