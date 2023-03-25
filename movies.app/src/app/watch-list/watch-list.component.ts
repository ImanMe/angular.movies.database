import { WatchListService } from 'src/app/utilities/watch-list.service';
import { Component, OnInit } from '@angular/core';
import { movieDTO } from '../movies/movies.model';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css']
})
export class WatchListComponent implements OnInit {
  columnsToDisplay = ['name', 'poster',  'actions'];
  myWatchList: movieDTO[] = [];
  constructor(private watchListService: WatchListService) { }

  ngOnInit(): void {
    this.getWatchList();
  }

  getWatchList = () => {
    this.watchListService.getAll().subscribe(result => {
      this.myWatchList = result;
    });
  }

  delete = (id:number) => {
    this.watchListService.delete(id) .subscribe(() => {
      this.getWatchList();
    });
  }
}
