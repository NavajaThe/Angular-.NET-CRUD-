public class Movie
{
    public int Id { get; set; } // PKMovies
    public string? Name { get; set; }
    public string? Gender { get; set; }
    public TimeSpan Duration { get; set; }

    public int DirectorId { get; set; } // FKDirector
    public Director? Director { get; set; } 
}
