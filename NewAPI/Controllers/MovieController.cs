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
    public async Task<ActionResult<IEnumerable<Movie>>> GetMovies()
    {   
        Console.WriteLine("lol");
        return await _context.Movies.Include(m => m.Director).ToListAsync(); 
        //return Ok("si");
    }

    //Read
    // GET: /movies/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Movie>> GetMovie(int id)
    {
        var movie = await _context.Movies.FindAsync(id);

        if (movie == null)
        {
            return NotFound();
        }

        return movie;
    }

    // PUT: /movies/5
    //Update
    [HttpPut("{id}")]
    public async Task<IActionResult> PutMovie(int id, Movie movie)
    {
        if (id != movie.PKMovies) // Use PKMovies for comparison
        {
            return BadRequest();
        }

        var existingMovie = await _context.Movies.FindAsync(id);

        if (existingMovie == null)
        {
            return NotFound();
        }

        // Update properties of the existing movie
        existingMovie.Name = movie.Name;
        existingMovie.Gender = movie.Gender;
        existingMovie.Duration = movie.Duration;
        existingMovie.FKDirector = movie.FKDirector;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!MovieExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return   
    Ok("Movie updated successfully!");
    }

    //Upload
    // POST: /movies
    [HttpPost]
    public async Task<ActionResult<Movie>> PostMovie(Movie movie)
    {
        // Check if the provided FKDirector exists in the Director table
        if (!await _context.Director.AnyAsync(d => d.PKDirector == movie.FKDirector))
        {
            return BadRequest("Invalid Director ID. The specified director does not exist.");
        }

        _context.Movies.Add(movie); 

        try
        {
            await _context.SaveChangesAsync(); // This will insert the new movie and assign a PKMovies value
        }
        catch (DbUpdateException ex) 
        {
            //_logger.LogError(ex, "An error occurred while creating the movie.");
            return StatusCode(500, "An error occurred while processing your request."); 
        }

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