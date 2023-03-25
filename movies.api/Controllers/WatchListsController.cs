using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using movies.api.DTOs;
using movies.api.Entities;
using MoviesAPI;
using MoviesAPI.DTOs;

namespace movies.api.Controllers
{
    [ApiController]
    [Route("api/watchLists")]
    public class WatchListsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<IdentityUser> _userManager;

        public WatchListsController(UserManager<IdentityUser> userManager, ApplicationDbContext context, IMapper mapper)
        {
            _userManager = userManager;
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Post([FromBody] WatchListCreationDTO watchListCreationDTO)
        {
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email")?.Value;

            if (string.IsNullOrWhiteSpace(email))
                return BadRequest();

            var user = await _userManager.FindByEmailAsync(email);
            var userId = user.Id;
            var userMovie = _mapper.Map<MoviesUsers>(watchListCreationDTO);
            userMovie.UserId = userId;
            await _context.AddAsync(userMovie);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Get()
        {
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email")?.Value;

            if (string.IsNullOrWhiteSpace(email))
                return BadRequest();

            var user = await _userManager.FindByEmailAsync(email);
            var userId = user.Id;
            var watchListMovieIds = _context.MoviesUsers.Where(x => x.UserId == userId)
                .Select(x => x.MovieId).ToList();

            var movies = await _context.Movies.Where(x => watchListMovieIds.Contains(x.Id)).ToListAsync();

            var userMovie = _mapper.Map<IList<MovieDTO>>(movies);
            return Ok(userMovie);
        }

        [HttpGet("{id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Get(int id)
        {
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email")?.Value;

            if (string.IsNullOrWhiteSpace(email))
                return BadRequest();

            var user = await _userManager.FindByEmailAsync(email);
            var userId = user.Id;
            var movieInWatchList = await _context.MoviesUsers.Include(x => x.Movie)
                .FirstOrDefaultAsync(x => x.UserId == userId && x.MovieId == id);

            if (movieInWatchList == null) return NotFound();

            var movie = movieInWatchList.Movie;

            var movieDto = _mapper.Map<MovieDTO>(movie);

            return Ok(movieDto);
        }

        [HttpDelete("{id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Delete(int id)
        {
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email")?.Value;

            if (string.IsNullOrWhiteSpace(email))
                return BadRequest();

            var user = await _userManager.FindByEmailAsync(email);
            var userId = user.Id;

            var movieInWatchlist =
                await _context.MoviesUsers.FirstOrDefaultAsync(x => x.MovieId == id && x.UserId == userId);

            if (movieInWatchlist == null)
                return NotFound();

            _context.Remove(movieInWatchlist);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}