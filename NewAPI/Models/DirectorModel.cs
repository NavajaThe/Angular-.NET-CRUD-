using System.ComponentModel.DataAnnotations;

public class Director
{   
    [Key]
    public int pkDirector { get; set; }
    public string? name { get; set; }
    public int age { get; set; }
    public bool active { get; set; }

    public List<Movie>? Movies { get; set; } 
}
