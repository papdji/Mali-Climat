import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  postImage: string = null;

  viewComments = false;

  newMsg = '';

  @Input() post: Post;

  constructor( private postService: PostService) { }

  ngOnInit() {
    this.checkPostImage();
    console.log('Post view: ', this.post);
  }

  checkPostImage() {
    switch ( this.post.type ) {
      case 'conseil':
        this.postImage = './assets/undraw_Problem_solving_re_4gq3.svg';
        break;
      case 'question':
        this.postImage = './assets/undraw_Questions_re_1fy7.svg';
        break;
      case 'climat':
        this.postImage = 'https://firebasestorage.googleapis.com/v0/b/ionfire-d0376.appspot.com/o/images%2Fundraw_weather_d9t2%20(1).svg?alt=media&token=a62181a8-ba81-4aba-b825-1860a193592d';
        break;
      default:
        this.postImage = './assets/undraw_QA_engineers_dg5p.svg';
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
