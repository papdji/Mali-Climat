import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export interface User {
  uid: string;
  email: string;
  name?: string;
  phone?: string;
}

export interface Post {
  createdAt: firebase.default.firestore.FieldValue;
  id: string;
  from: string;
  msg: string;
  type: string;
  ville: string;
  likes?: string[];
  userLikes?: boolean;
  comments?: Comment[];
  countComments?: number;
  countLikes?: number;
  userProfile?: User;
}

export interface Comment {
  createdAt: firebase.default.firestore.FieldValue;
  id: string;
  from: string;
  msg: string;
  fromName: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  currentUser: User = null;
  typeOfPost: string = null;
  villeOfPost: string =null;

  users: User[];

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {
                this.afAuth.onAuthStateChanged(user => {
                  console.log('Changed: ', user);
                  this.currentUser = user;
                });
  }

  addPostMessage(msg, type, ville) {
    return this.afs.collection('posts').add({
      msg: {msg}.msg,
      from: this.currentUser.uid,
      type: {type}.type,
      ville: {ville}.ville,
      createdAt: firebase.default.firestore.FieldValue.serverTimestamp()
    });
  }

  addPostComment(msg, postId) {
    return this.afs.collection('posts').doc(postId).collection('comments').add({
      msg: {msg}.msg,
      from: this.currentUser.uid,
      createdAt: firebase.default.firestore.FieldValue.serverTimestamp()
    });
  }

  getPostMessage() {
    let users = [];
    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        console.log('all users: ', users);
        return this.afs.collection('posts', ref => ref.orderBy('createdAt', 'desc')).valueChanges({ idField: 'id'}) as Observable<Post[]>;
      }),
      map(posts => {
        for (const m of posts) {
          m.from = this.getUserProfile(m.from, users).name;
          m.userProfile = this.getUserProfile(m.from, users);

          // v??rifier si le tableau likes existe
          if ( m.likes !== undefined && m.likes !== null ) {
            m.countLikes = m.likes.length;
            // v??rifier si l'utilisateur uid est dans le tableau des likes
            if (m.likes.includes(this.currentUser.uid)) {
              m.userLikes = true;
            } else {
              m.userLikes = false;
            }
          } else {
            m.countLikes = 0;
          }

          this.getPostComments(m.id).subscribe( comments => {
            m.comments = comments;
            m.countComments = comments.length;
          });
        }
        console.log('all post: ', posts);
        return posts;
      })
    );
  }

  getPostComments(messageId) {
    let users = [];
    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        return this.afs.collection('posts').doc(messageId)
        .collection('comments', ref => ref.orderBy('createdAt', 'desc'))
        .valueChanges({ idField: 'id' }) as Observable<Comment[]>;
      }),
      map(comments => {
        for (const c of comments) {
          c.fromName = this.getUserProfile(c.from, users).name;
        }
        return comments;
      })
    );
  }

  getUsers() {
    return this.afs.collection('users').valueChanges({ idField: 'uid' }) as Observable<User[]>;
  }

  getUserProfile(msgFromId, users: User[]): User {
    for (const usr of users) {
      if (usr.uid === msgFromId) {
        return usr;
      }
    }
    return null;
  }

  updatePostLike(post: Post) {
    let tempLikesArray = [];

    // V??rifier si le tableau existe
    if ( post.likes !== undefined && post.likes !== null ) {
      tempLikesArray = post.likes;

      // V??rifier si uid existe d??j?? dans le tableau supprimer du tableau.
      if (tempLikesArray.includes(this.currentUser.uid)){
        const index = tempLikesArray.indexOf(this.currentUser.uid);
        tempLikesArray.splice(index, 1);
      } else {
        tempLikesArray.push(this.currentUser.uid);
      }
    } else {
      console.log('Add user: ', this.currentUser.uid);
      tempLikesArray.push(this.currentUser.uid);
    }

    return this.afs.collection('posts').doc(post.id).update({
      likes: tempLikesArray,
    });

  }

}
