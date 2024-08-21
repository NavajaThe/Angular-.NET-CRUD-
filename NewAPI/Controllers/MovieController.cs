using Microsoft.AspNetCore.Mvc; 
using Microsoft.EntityFrameworkCore; 

using Data;


[ApiController]
[Route("movies")]

public class MoviesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public MoviesController(ApplicationDbContext context)
    {
        _context = context;
    }

    //Read All
    // GET: /movies
    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetMovies()
    {   
        var movies = await _context.Movies.Include(m => m.Director)
                                        .Select(m => new 
                                        {
                                            m.PKMovies,
                                            m.Name,
                                            m.Gender,
                                            m.Duration,
                                            Director = m.Director.Name // Select only the Director's Name
                                        })
                                        .ToListAsync(); 

        return Ok(movies);
    }

    // GET: /movies/5
    [HttpGet("{id}")]
    public async Task<ActionResult<object>> GetMovie(int id)
    {
        var movie = await _context.Movies.Include(m => m.Director)
                                        .Select(m => new 
                                        {
                                            m.PKMovies,
                                            m.Name,
                                            m.Gender,
                                            m.Duration,
                                            Director = m.Director.Name
                                        })
                                        .FirstOrDefaultAsync(m => m.PKMovies == id);

        if (movie == null)
        {
            return NotFound();
        }

        return Ok(movie);
    }

    //Upload
    // POST: /movies
    [HttpPost]
    public async Task<ActionResult<Movie>> PostMovie(Movie movie)
    {
        
        if (!await _context.Director.AnyAsync(d => d.PKDirector == movie.FKDirector))
        {
            return BadRequest("Invalid Director ID. The specified director does not exist.");
        }

        _context.Movies.Add(movie);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException ex)
        {       
            Console.WriteLine(ex);
            return BadRequest("Something went wrong");
        }

        //return CreatedAtAction("GetMovie", new { id = movie.PKMovies }, movie);
        return CreatedAtAction("GetMovie", new { id = movie.PKMovies }, movie); 
    }

    //Delete
    // DELETE: /movies/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMovie(int id)
    {
        var movie = await _context.Movies.FindAsync(id);
        if (movie == null)
        {
            return NotFound();
        }

        _context.Movies.Remove(movie);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool MovieExists(int id)
    {
        return _context.Movies.Any(e => e.PKMovies == id);
    }
}