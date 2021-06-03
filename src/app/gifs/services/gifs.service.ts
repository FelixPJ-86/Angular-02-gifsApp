import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIFResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private apiKey:string='8gzDKG4TWxdm0W1ONtBcMQrpVvE4qQc1';
 private _historial:string[]=[];

// TODO:cambiar any por su tipo
public resultados:Gif[]=[];

get historial(){
  
return [...this._historial];

}

constructor(private http:HttpClient){
this._historial=JSON.parse(localStorage.getItem('historial')) || [];
this.resultados=JSON.parse(localStorage.getItem('resultados')) || [];
}

buscarGifs(query:string){

query=query.trim().toLocaleLowerCase();
if(!this._historial.includes(query)){
  this._historial.unshift(query);
  this._historial=this._historial.splice(0,10);

  localStorage.setItem('historial',JSON.stringify(this._historial));

}


this.http.get<SearchGIFResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=20`)
.subscribe((resp:SearchGIFResponse)=>{
console.log(resp.data);
this.resultados=resp.data;
localStorage.setItem('resultados',JSON.stringify(this.resultados));

} )

}

}
