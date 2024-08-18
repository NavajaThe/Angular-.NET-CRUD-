using System.ComponentModel.DataAnnotations;

public class Director
{   
    [Key]
    public int PKDirector { get; set; }
    public string? Name { get; set; }
    public int Age { get; set; }
    public bool Active { get; set; }

    public List<Movie>? Movies { get; set; } 
}
