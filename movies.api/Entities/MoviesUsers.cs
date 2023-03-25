using Microsoft.AspNetCore.Identity;
using MoviesAPI.Entities;

namespace movies.api.Entities
{
    public class MoviesUsers
    {
        public int MovieId { get; set; }
        public string UserId { get; set; }
        public Movie Movie { get; set; }
        public IdentityUser User { get; set; }
    }
}
