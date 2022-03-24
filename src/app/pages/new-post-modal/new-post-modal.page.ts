import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostService } from 'src/app/services/post.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-new-post-modal',
  templateUrl: './new-post-modal.page.html',
  styleUrls: ['./new-post-modal.page.scss'],
})
export class NewPostModalPage implements OnInit {
  typeOfPost = '';
  newPostMsg = '';
  villeOfPost = '';

  constructor(
    public modalController: ModalController,
    private postService: PostService,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('local storage : ', user);
    console.log(user.uid);

    this.afs.collection('users').doc(user.uid).valueChanges().subscribe(data=>{
      console.log(data);

    })


  }

  dismissModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  typePostChanged($event) {
    this.typeOfPost = $event.detail.value;
    console.log('Type of Post: ', $event.detail.value);
  }
  villePostchanged($event) {
    this.villeOfPost = $event.detail.value;
    console.log('Ville Of Post: ', $event.detail.value);
  }

  addNewPost(){
    this.postService.addPostMessage(this.newPostMsg, this.typeOfPost, this.villeOfPost).then(() => {
      this.newPostMsg = '';
      this.dismissModal();
    });
  }
}
