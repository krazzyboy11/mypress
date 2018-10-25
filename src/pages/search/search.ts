import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  searchQuery:String = '';
  public items:any = [];
  private per_page:number = 5;
  private page:number = 1;
  private showLoadMore:boolean = false;
  private isLoading:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public api:ApiProvider) {
  }

  ionViewDidLoad() {
  }
  onSearch(){
    console.log(this.searchQuery);
    this.items = [];
    this.getPosts();
  }
  getPosts(){
    console.log(this.searchQuery)
    if(!this.isLoading && this.searchQuery.length > 0){
      this.isLoading = true;
      this.api.get('posts?_embed&per_page='+this.per_page +'&page=' 
      +this.page+'&search='+this.searchQuery)
      .subscribe((data:any) =>{
        console.log(data);
        this.isLoading = false;
        this.items = this.items.concat(data);
        if(data.length === this.per_page){
          this.page++;
          this.showLoadMore = true;
        }else{
          console.log(data);

          this.showLoadMore = false;
        }
        
      }, (error) =>{
        this.isLoading = false;
        console.log(error.error.code);
        if(error.error.code === "rest_post_invalid_page_number"){
          this.showLoadMore = false;
        }
      });
    }
  }
  clearSearch(){
    this.searchQuery = '';
    this.items =[];
    this.page = 1;
    this.showLoadMore = false;
  }
  openDetail(item){
    this.navCtrl.push(DetailPage, {post:item});
  }

}
