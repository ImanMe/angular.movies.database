import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { actorDTO } from '../actors.model';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-index-actors',
  templateUrl: './index-actors.component.html',
  styleUrls: ['./index-actors.component.css']
})
export class IndexActorsComponent implements OnInit {

  actors: actorDTO[] = [];
  constructor(private actorsService: ActorsService) { }

  ngOnInit(): void {
    this.getAllActors();
  }

  getAllActors = () => {
    this.actorsService.getAll(1,10).subscribe(result => {
      this.actors = result;
    });
  }

  delete = (id:number) => {
    this.actorsService.delete(id) .subscribe(() => {
      this.getAllActors();
    });
  }

  columnsToDisplay = ['name', 'dateOfBirth', 'picture',  'actions'];
}
