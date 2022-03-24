import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-localites',
  templateUrl: './localites.page.html',
  styleUrls: ['./localites.page.scss'],
})
export class LocalitesPage implements OnInit {
  slideOpts = {
    speed: 500
  };
  actualites:DocumentData[] = [];
  today: any;

  constructor(private firestore: AngularFirestore,
    private afStore: AngularFirestore,
     public ngroute: Router) {
      this.today = new Date();
      var dd = String(this.today.getDate()).padStart(2, '0');
      var mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = this.today.getFullYear();

      this.today = mm + '/' + dd + '/' + yyyy;
      console.log(this.today);
    this.firestore.firestore.collection("conseils").where("Date", "==", this.today)
    .get()
    .then(querySnapshot=>{
      querySnapshot.forEach(doc=>{

        console.log(doc.id, " => ", doc.data());
        this.actualites.push(doc.data());
        console.log(this.actualites)
      })
    })
  }
  getProductsData() {
    return this.afStore.collection("conseils").snapshotChanges();
   }

   getProductData(id: string) {
    return this.afStore.collection("conseils").ref.doc(id).get();
  }

  ngOnInit() {
  }

    // try{
    //   await this.fbstore.collection("products").add(productobj).then(data => {
    //     console.log(data);
    //     this.ngroute.navigate(['home']);
    //   })
    // }




}
