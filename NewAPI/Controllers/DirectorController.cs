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
    public async Task<ActionResult<IEnumerable<DirectorDTO>>> GetDirectors()
    {
        var directors = await _context.Director.Include(d => d.movies).ToListAsync();

        // Map to DTOs to avoid circular references
        var directorDTOs = directors.Select(d => new DirectorDTO
        {
            pkDirector = d.pkDirector,
            name = d.name,
            age = d.age,
            active = d.active,
            movies = d.movies.Select(m => new MovieDTO
            {
                pkMovies = m.pkMovies,
                name = m.name,
                gender = m.gender,
                duration = m.duration,
                fkDirector = m.fkDirector
            }).ToList()
        });

        return Ok(directorDTOs);
    }

    // GET: /director/5
    [HttpGet("{id}")]
    public async Task<ActionResult<DirectorDTO>> GetDirector(int id)
    {
        var director = await _context.Director.Include(d => d.movies)
                                            .FirstOrDefaultAsync(d => d.pkDirector == id);

        if (director == null)
        {
            return NotFound();
        }

        // Map to DTO to avoid circular references
        var directorDTO = new DirectorDTO
        {
            pkDirector = director.pkDirector,
            name = director.name,
            age = director.age,
            active = director.active,
            movies = director.movies.Select(m => new MovieDTO
            {
                pkMovies = m.pkMovies,
                name = m.name,
                gender = m.gender,
                duration = m.duration,
                fkDirector = m.fkDirector
            }).ToList()
        };

        return Ok(directorDTO);
    }

    // PUT: /director/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutDirector(int id, Director director)
    {
        if (id != director.pkDirector)
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

        return Ok("Success");
    }

    // POST: /director
    [HttpPost]
    public async Task<ActionResult<Director>> PostDirector(Director director)
    {
        _context.Director.Add(director);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetDirector", new { id = director.pkDirector }, director);
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
        if (await _context.Movies.AnyAsync(m => m.fkDirector == id))
        {
            return BadRequest("Cannot delete director. There are movies associated with this director.");
        }

        _context.Director.Remove(director);
        await _context.SaveChangesAsync();

        return NoContent();
    }

        private bool DirectorExists(int id)
        {
            return _context.Director.Any(e => e.pkDirector == id);
        }
    }