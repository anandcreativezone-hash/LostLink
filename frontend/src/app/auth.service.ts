import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url="http://localhost:8000/api/token/";

  constructor(private http:HttpClient) { }

  login(data:any){
    return this.http.post(this.url,data);
  }





  getMyLostItems(){

    let token = localStorage.getItem('access');

    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(
      'http://localhost:8000/api/lostitems/myitems/',
      { headers }
    );

  }







  createLostItem(data:any){

  let token = localStorage.getItem('access');

  let headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.post(
    'http://localhost:8000/api/lostitems/create/',
    data,
    { headers }
  );

}






  createFoundItem(data:any){

  let token = localStorage.getItem('access');

  let headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.post(
    'http://localhost:8000/api/founditems/create/',
    data,
    { headers }
  );

}







getMyFoundItems(){

  let token = localStorage.getItem('access');

  let headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get(
    'http://localhost:8000/api/founditems/myitems/',
    { headers }
  );

}




deleteLostItem(id:number){

  let token = localStorage.getItem('access');

  let headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.delete(
    `http://localhost:8000/api/lostitems/delete/${id}/`,
    { headers }
  );

}







updateLostItem(id:number,data:any){

  let token = localStorage.getItem('access');

  let headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.put(
    `http://localhost:8000/api/lostitems/update/${id}/`,
    data,
    { headers }
  );

}










deleteFoundItem(id:number){

  let token = localStorage.getItem('access');

  let headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.delete(
    `http://localhost:8000/api/founditems/delete/${id}/`,
    { headers }
  );

}









updateFoundItem(id:number,data:any){

  let token = localStorage.getItem('access');

  let headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.put(
    `http://localhost:8000/api/founditems/update/${id}/`,
    data,
    { headers }
  );

}







searchLostItems(query:string){

  let token = localStorage.getItem('access');

  let headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get(
    `http://localhost:8000/api/lostitems/search/?q=${query}`,
    { headers }
  );

}








getMatches(id:number){

  let token = localStorage.getItem('access');

  let headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get(
    `http://localhost:8000/api/lostitems/matches/${id}/`,
    { headers }
  );

}

register(data:any){
  return this.http.post(
    'http://localhost:8000/api/users/register/',
    data
  );
}

getPendingUsers(){

  let token = localStorage.getItem('access');

  let headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get(
    'http://localhost:8000/api/admin/pending-users/',
    { headers }
  );

}



approveUser(id:number){

  let token = localStorage.getItem('access');

  let headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.put(
    `http://localhost:8000/api/admin/approve-user/${id}/`,
    {},
    { headers }
  );

}



deletePendingUser(id:number){

  let token = localStorage.getItem('access');

  let headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.delete(
    `http://localhost:8000/api/admin/delete-user/${id}/`,
    { headers }
  );

}




getCurrentUser(){

  let token = localStorage.getItem('access');

  let headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get(
    'http://localhost:8000/api/users/current/',
    { headers }
  );

}



getApprovedUsers(){

  let token = localStorage.getItem('access');

  let headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get(
    'http://localhost:8000/api/admin/approved-users/',
    { headers }
  );

}








sendMessage(data:any){

  let token = localStorage.getItem('access');

  let headers = new HttpHeaders({
    Authorization:`Bearer ${token}`
  });

  return this.http.post(
    'http://localhost:8000/api/messages/send/',
    data,
    {headers}
  );

}









getInbox(){

  let token = localStorage.getItem('access');

  let headers = new HttpHeaders({
    Authorization:`Bearer ${token}`
  });

  return this.http.get(
    'http://localhost:8000/api/messages/inbox/',
    {headers}
  );



  
}








// getUnreadCount(){

//   let token = localStorage.getItem('access');

//   let headers = new HttpHeaders({
//     Authorization:`Bearer ${token}`
//   });

//   return this.http.get(
//     'http://localhost:8000/api/messages/unread-count/',
//     {headers}
//   );

// }

getUnreadCount(){

  let token =
  localStorage.getItem('access');

  let headers =
  new HttpHeaders({
    Authorization:
    `Bearer ${token}`
  });

  return this.http.get(
    'http://localhost:8000/api/messages/unread-count/',
    { headers }
  );

}








getArchiveMessages(){

  let token = localStorage.getItem('access');

  let headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get(
    'http://localhost:8000/api/messages/archive/',
    { headers }
  );

}


deleteArchiveMessage(id:number){

  let token = localStorage.getItem('access');

  let headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.delete(
    `http://localhost:8000/api/messages/archive/delete/${id}/`,
    { headers }
  );

}




getManualFoundItems(){

  let token = localStorage.getItem('access');

  let headers = new HttpHeaders({
    Authorization:`Bearer ${token}`
  });

  return this.http.get(
    'http://localhost:8000/api/founditems/manual-list/',
    {headers}
  );

}



getFoundItemDetails(id:number){

  let token =
  localStorage.getItem('access');

  let headers =
  new HttpHeaders({
    Authorization:`Bearer ${token}`
  });

  return this.http.get(
    `http://localhost:8000/api/founditems/details/${id}/`,
    {headers}
  );

}





claimFoundItem(id:number){

  let token =
  localStorage.getItem('access');

  let headers =
  new HttpHeaders({
    Authorization:`Bearer ${token}`
  });

  return this.http.post(

    `http://localhost:8000/api/founditems/claim/${id}/`,

    {},

    {headers}

  );

}


// =========================
// Accept Claim
// =========================

acceptClaim(id:number){

  let token =
  localStorage.getItem('access');

  let headers =
  new HttpHeaders({
    Authorization:`Bearer ${token}`
  });

  return this.http.post(

    `http://localhost:8000/api/founditems/accept/${id}/`,

    {},

    {headers}

  );

}

// =========================
// Reject Claim
// =========================

rejectClaim(id:number){

  let token =
  localStorage.getItem('access');

  let headers =
  new HttpHeaders({
    Authorization:`Bearer ${token}`
  });

  return this.http.post(

    `http://localhost:8000/api/founditems/reject/${id}/`,

    {},

    {headers}

  );

}




resolveClaim(id:number){

  let token =
  localStorage.getItem('access');

  let headers =
  new HttpHeaders({
    Authorization:`Bearer ${token}`
  });

  return this.http.post(

    `http://localhost:8000/api/founditems/resolve/${id}/`,

    {},

    {headers}

  );

}













getResolvedItems(){

  let token=localStorage.getItem('access');

  let headers=new HttpHeaders({
    Authorization:`Bearer ${token}`
  });

  return this.http.get(

    'http://localhost:8000/api/admin/resolved-items/',

    {headers}

  );

}









getResolvedItemDetails(id:number){

  let token=localStorage.getItem('access');

  let headers=new HttpHeaders({
    Authorization:`Bearer ${token}`
  });

  return this.http.get(

    `http://localhost:8000/api/admin/resolved-items/${id}/`,

    {headers}

  );

}







}



