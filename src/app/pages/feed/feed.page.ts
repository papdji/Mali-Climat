import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { NewPostModalPage } from 'src/app/pages/new-post-modal/new-post-modal.page';
import { PostService, Post } from 'src/app/services/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  private userUid:any;
  private userData:any;
  public currentUser: boolean = false;
  posts: Observable<Post[]>;

  constructor(public modalController: ModalController, private postService: PostService,
    private auth: AngularFireAuth, private db: AngularFirestore) {
      this.auth.authState.subscribe(user=>{
        this.userUid = user.uid;
        console.log(this.userUid);
        this.db.collection("users").doc(this.userUid).valueChanges().subscribe(data=>{

          this.userData = data;
          console.log(data);
          if(this.userData.profile == "Acteur climat"){
            this.currentUser = true;
          }
        })

      });
     }

  ngOnInit() {
    this.posts = this.postService.getPostMessage();
    console.log('Posts: ', this.posts);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NewPostModalPage,
      cssClass: 'new-post-modal',
      swipeToClose: true,
    });
    return await modal.present();
  }

}
