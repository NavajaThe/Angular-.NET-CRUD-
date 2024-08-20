using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql;
using MySql.Data.MySqlClient;
using Data;

[ApiController]
[Route("director")]
public class DirectorsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public DirectorsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: /director
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Director>>> GetDirectors()
    {
        return await _context.Director.ToListAsync();
    }

    // GET: /director/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Director>> GetDirector(int id)
    {
        var director = await _context.Director.FindAsync(id);

        if (director == null)
        {
            return NotFound();
        }

        return director;
    }

    // PUT: /director/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutDirector(int id, Director director)
    {
        if (id != director.PKDirector)
        {
            return BadRequest();
        }

        _context.Entry(director).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!DirectorExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // POST: /director
    [HttpPost]
    public async Task<ActionResult<Director>> PostDirector(Director director)
    {
        _context.Director.Add(director);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetDirector", new { id = director.PKDirector }, director);
    }

    // DELETE: /director/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDirector(int id)
    {
        var director = await _context.Director.FindAsync(id);
        if (director == null)
        {
            return NotFound();   

        }

        // Check for associated movies
        if (await _context.Movies.AnyAsync(m => m.FKDirector == id))
        {
            return BadRequest("Cannot delete director. There are movies associated with this director.");
        }

        _context.Director.Remove(director);
        await _context.SaveChangesAsync();

        return NoContent();
    }

        private bool DirectorExists(int id)
        {
            return _context.Director.Any(e => e.PKDirector == id);
        }
    }