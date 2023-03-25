import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { coordinatesMapWithMessage } from 'src/app/utilities/map/coordinate';
import { RatingService } from 'src/app/utilities/rating.service';
import { WatchListService } from 'src/app/utilities/watch-list.service';
import Swal from 'sweetalert2';
import { movieDTO } from '../movies.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private ratingsService: RatingService,
    private watchListService: WatchListService
  ) {}

  movie: movieDTO;
  releaseDate: Date;
  trailerURL: SafeResourceUrl;
  coordinates: coordinatesMapWithMessage[] = [];
  isAddedToWatchList:boolean = false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.isMovieAddedToWatchList(params.id);
      this.moviesService.getById(params.id).subscribe((movie) => {
        this.movie = movie;
        this.releaseDate = new Date(movie.releaseDate);
        this.trailerURL = this.generateYoutubeURLForEmbeddedVideo(movie.trailer);
        this.coordinates = movie.movieTheaters.map(movieTheater => {
          return {latitude: movieTheater.latitude, longitude: movieTheater.longitude, 
            message: movieTheater.name}
        })
      });
    });
  }

  isMovieAddedToWatchList = (id:number) => {
    this.watchListService.getById(id).subscribe(result => {
      if(result){
        this.isAddedToWatchList = true;
      }
    });
  }
  generateYoutubeURLForEmbeddedVideo(url: any): SafeResourceUrl{
    if (!url){
      return '';
    } 
    // https://www.youtube.com/watch?v=LKFuXETZUsI
    let videoId = url.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1){
      videoId = videoId.substring(0, ampersandPosition);
    }

     return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  onRating(rate: number){
    this.ratingsService.rate(this.movie.id, rate).subscribe(() => {
      Swal.fire("Success", "Your vote has been received", "success");
    });
  }

  addToWatchList = () => {
    this.watchListService.add(this.movie.id).subscribe(() => {
      Swal.fire("Success", "Movie was added to your watchlist", "success");
      this.isAddedToWatchList = true;
    });
  }
}
