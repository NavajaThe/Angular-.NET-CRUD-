// MovieDTO.cs
public class MovieDTO
{
    public int pkMovies { get; set; } 
    public string? name { get; set; } 
    public string? gender { get; set; } 
    public string? duration { get; set; } 
    public int fkDirector { get; set; } 
}

// DirectorDTO.cs
public class DirectorDTO
{
    public int pkDirector { get; set; } 
    public string? name { get; set; } 
    public int age { get; set; } 
    public bool active { get; set; } 
    public List<MovieDTO>? Movies { get; set; } 
}