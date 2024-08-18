public class Director
{
    public int Id { get; set; } // PKDirector
    public string? Name { get; set; }
    public int Age { get; set; }
    public bool Active { get; set; }

    public List<Movie>? Movies { get; set; } 
}