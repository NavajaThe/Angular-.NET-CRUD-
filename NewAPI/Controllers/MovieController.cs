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
    // GET: /Movies
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Movie>>> GetMovies()
    {   
        Console.WriteLine("lol");
        return await _context.Movies.Include(m => m.Director).ToListAsync(); 
        //return Ok("si");
    }

    //Read
    // GET: /Movies/5
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

    // PUT: /Movies/5
    //Update
    [HttpPut("{id}")]
    public async Task<IActionResult> PutMovie(int id, Movie movie)
    {
        if (id != movie.PKMovies)
        {
            return BadRequest();
        }

        _context.Entry(movie).State = EntityState.Modified;

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

        //return NoContent();
        return Ok("Movie updated successfully!");
    }

    //Upload
    // POST: /Movies
    [HttpPost]
    public async Task<ActionResult<Movie>> PostMovie(Movie movie)
    {
        _context.Movies.Add(movie);

        if (!await _context.Director.AnyAsync(d => d.PKDirector == movie.FKDirector))
        {
            return BadRequest("Invalid Director ID. The specified director does not exist.");
        }

        _context.Entry(movie).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            return BadRequest("Error");
        }

        return CreatedAtAction("GetMovie", new { id = movie.PKMovies }, movie);
    }

    //Delete
    // DELETE: api/Movies/5
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