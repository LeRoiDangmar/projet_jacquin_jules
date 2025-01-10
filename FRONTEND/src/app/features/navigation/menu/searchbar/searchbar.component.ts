import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  standalone: false,
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  constructor(private router: Router) {}

  inputValue: string = "";
  croix: boolean = false;
  link: string = "search"

  onInputChange(): void {
    this.checkInputValue(this.inputValue)
    this.router.navigate([this.link, this.inputValue]);
  }

  checkInputValue(inputValue: string){
    if(inputValue != ""){
      this.croix = true;
    }else {
      this.croix = false;
    }
  }

  emptySearch(){
    this.inputValue = "";
    this.onInputChange();
  }


}
