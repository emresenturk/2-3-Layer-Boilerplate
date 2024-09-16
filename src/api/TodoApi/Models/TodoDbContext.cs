using Microsoft.EntityFrameworkCore;

namespace Todo.Models;

public class TodoDbContext : DbContext
{
    public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
    {
        Database.EnsureCreated();
    }

    public DbSet <TodoItem> Todos {get;set;}
}