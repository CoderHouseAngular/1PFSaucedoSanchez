import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() sender = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  changePage(title:string){
    this.sender.emit(title);
  }
}
