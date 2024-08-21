using Microsoft.AspNetCore.Mvc; // Para ControllerBase, ActionResult, etc.
using Microsoft.EntityFrameworkCore; // Para DbContext, DbSet, etc.


namespace Data{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options) { }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<Director> Director { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movie>()
                .HasOne(m => m.director)
                .WithMany(d => d.movies)
                .HasForeignKey(m => m.fkDirector);
        }
    }
}
