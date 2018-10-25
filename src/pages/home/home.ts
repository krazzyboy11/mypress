import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { DetailPage } from '../detail/detail';
import { SearchPage } from '../search/search';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public items:any = [];
  private per_page:number = 10;
  private page:number = 1;
  private showLoadMore:boolean = false;
  private isLoading:boolean = false;
  private category_id:number = 0;

  constructor(public navCtrl: NavController, public navParms: NavParams,public api:ApiProvider) {
   if(this.navParms.get('cat_id')!=null && this.navParms.get('cat_id') != undefined){
      this.category_id = this.navParms.get('cat_id');
    }
    this.getPosts();
  };
  getPosts(){
    if(!this.isLoading){
      this.isLoading = true;
      this.api.get('posts?_embed&per_page='+this.per_page + '&page=' +this.page+ (this.category_id!=0 ? '&categories='+this.category_id: ''))
      .subscribe((data:any) =>{
        this.items = this.items.concat(data);
        this.isLoading = false;
        if(data.length === this.per_page){
          this.page++;
          this.showLoadMore = true;
        }else{
          this.showLoadMore = false;
        }
        
      }, (error) =>{
        this.isLoading = false;
        if(error.error.code === "rest_post_invalid_page_number"){
          this.showLoadMore = false;
        }
      });
    }
    
  }
  openDetail(item){
    this.navCtrl.push(DetailPage, {post:item});
  }
  openSearchPage(){
    this.navCtrl.push(SearchPage)

  }

}
