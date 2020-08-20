import { Component } from '@angular/core';
import { environment } from './../environments/environment'
import { HttpService } from './../services/http.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Call Center';

  public conversationList: any = [];
  public conversationText:any;
  
  constructor(public http: HttpService) {
     this.getConversationsList();
  } 

  getMessages(list:any) {
    
    let result = "";

    list.forEach((element: string) => {
       result += element + '&#013;&#010;&#013;&#010;';
    });

    return result;
  }

  getRating(points:any, star: any) {
    let result = [];

        if(points > 90) {
           result.push(1);
           result.push(2);
           result.push(3);
           result.push(4);
           result.push(5);
        }
        else if(points > 75 && points < 90) {
           result.push(1);
           result.push(2);
           result.push(3);
           result.push(4);
        }
        else if(points > 50 && points < 75) {
           result.push(1);
           result.push(2);
           result.push(3);
        }
        else if(points > 25 && points < 50) {
          result.push(1);
          result.push(2);
        }
        else if(points > 0 && points < 25) {
          result.push(1);
        }

    return result;

  }

  async getConversationsList() {
    const request = await this.http.GET<any>(environment.localApi + '/rates');
    request.subscribe(
      (result) => {
          this.conversationList = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
