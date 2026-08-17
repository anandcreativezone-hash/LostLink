import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TraineeService {

  // constructor() { }
  apiurl ='http://127.0.0.1:8000/api'

  constructor(private http: HttpClient) {}

  addTrainee(data:any){
    return this.http.post(`${this.apiurl}/create/`, data)
  }

  getTrainee(){
    return this.http.get(`${this.apiurl}/view/`)
  }

  deleteTrainee(id:number){
    return this.http.delete(`${this.apiurl}/delete/${id}/`)
  }

  
  updateTrainee(id:number, data:any){
    return this.http.put(`${this.apiurl}/update/${id}/`, data)
  }
}
