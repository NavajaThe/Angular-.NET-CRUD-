using System.ComponentModel.DataAnnotations;

public class Movie
{   
    [Key]
    public int PKMovies { get; set; }
    public string? Name { get; set; }
    public string? Gender { get; set; }
    public string? Duration { get; set; }

    public int FKDirector { get; set; }
    public Director? Director { get; set; } 
}
