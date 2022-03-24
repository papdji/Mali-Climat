import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Post, PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  slideOpts = {
    speed: 500
  };

  postImage: string;
  newVille = '';
  viewComments = false;
  newMsg = '';

  @Input() post: Post;
  myToast: any;

  constructor( private postService: PostService, public toast: ToastController) { }

  ngOnInit() {
    this.checkPostImage();
    console.log('Post view: ', this.post);
  }
  showToast() {
    this.myToast = this.toast.create({
      message: 'Vous étes connecter avec succès',
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }
  HideToast() {
    this.myToast = this.toast.dismiss();
  }
  checkPostImage() {
    switch ( this.post.type, this.post.ville ) {
      case 'conseil':
        this.postImage = 'https://firebasestorage.googleapis.com/v0/b/ionfire-d0376.appspot.com/o/images%2Fundraw_Data_trends_re_2cdy.svg?alt=media&token=556fdf28-d045-4dff-a43d-564b1f2eab07';
        break;
      case 'question':
        this.postImage = './assets/undraw_Questions_re_1fy7.svg';
        break;
      case 'climat':
        this.postImage = 'https://firebasestorage.googleapis.com/v0/b/ionfire-d0376.appspot.com/o/images%2Fundraw_weather_d9t2%20(1).svg?alt=media&token=a62181a8-ba81-4aba-b825-1860a193592d';
        break;
      default:
        this.postImage = 'https://firebasestorage.googleapis.com/v0/b/ionfire-d0376.appspot.com/o/images%2Fundraw_weather_d9t2%20(1).svg?alt=media&token=a62181a8-ba81-4aba-b825-1860a193592d';
        break;
    }
  }

  toggleViewComments() {
    this.viewComments = !this.viewComments;
  }

  addPostComment() {
    this.postService.addPostComment(this.newMsg, this.post.id).then(() => {
      this.newMsg = '';
    });
  }

  togglePostLiked() {
    this.postService.updatePostLike(this.post);
  }

}
