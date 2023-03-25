import { actorCreationDTO } from './../actors.model';
import { ActorsService } from './../actors.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.css']
})
export class EditActorComponent implements OnInit {

  id:string;
  model: actorCreationDTO;
  constructor(private actorsService: ActorsService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id= params.get('id');
      this.actorsService.getById(+this.id).subscribe(result => {
        this.model = result;
      });
    });
  }

  saveChanges(actorCreationDTO: actorCreationDTO){ 
    this.actorsService.edit(+this.id, actorCreationDTO).subscribe(() => {
      this.router.navigate(['/actors']);
    });
  }
}