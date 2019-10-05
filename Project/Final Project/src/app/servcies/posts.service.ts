import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { IPost } from "../interfaces/post";

export interface Post {
  id: string;
  title: string;
  description: string;
  author: string;
}

@Injectable({
  providedIn: "root"
})
export class FireBasePostService {
  ref: AngularFirestoreCollection;

  constructor(db: AngularFirestore) {
    this.ref = db.collection("Posts");
  }
  getPosts(): Observable<any> {
    return this.ref.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data();
          const key = a.payload.doc.id;
          return { key, ...data };
        })
      )
    );
  }

  getPost(id: string): Observable<any> {
    return new Observable(observer => {
      this.ref
        .doc(id)
        .get()
        .toPromise()
        .then(doc => {
          let data = doc.data();
          observer.next({
            key: doc.id,
            title: data.title,
            description: data.description,
            author: data.author,
            link: data.link
          });
        });
    });
  }

  createPost(data): Observable<any> {
    return new Observable(observer => {
      this.ref.add(data).then(doc => {
        observer.next({
          key: doc.id
        });
      });
    });
  }

  updatePost(id: string, data): Observable<any> {
    return new Observable(observer => {
      this.ref
        .doc(id)
        .set(data)
        .then(() => {
          observer.next();
        });
    });
  }

  deletePost(id: string): Observable<{}> {
    console.log(id);
    return new Observable(observer => {
      this.ref
        .doc(id)
        .delete()
        .then(() => {
          observer.next();
        });
    });
  }
}
