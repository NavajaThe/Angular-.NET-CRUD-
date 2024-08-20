using System.ComponentModel.DataAnnotations;

public class Movie
{   
    [Key]
    public int pkMovies { get; set; }
    public string? name { get; set; }
    public string? gender { get; set; }
    public string? duration { get; set; }

    public int fkDirector { get; set; }
    public Director? director { get; set; } 
}
