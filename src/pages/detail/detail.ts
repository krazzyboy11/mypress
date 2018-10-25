import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  public post:any = [];
  public relatedItems:any = [];

  private showLoadMore:boolean = false;
  private isLoading:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public api:ApiProvider) {
    this.post = navParams.get('post');
    console.log(navParams.get('post'));
  }
  ionViewDidLoad() {
    this.getRelated();
  }
  getRelated(){
    if(!this.isLoading){
      this.isLoading = true;
      this.api.get('posts?_embed&categories='+this.post.categories[0])
      .subscribe((data:any) =>{
        this.relatedItems = data;
        this.isLoading = false;
  
      }, (error) =>{
        this.isLoading = false;
      });
    }
  }
  openDetail(item){
    this.navCtrl.push(DetailPage, {post:item});
  }

}
