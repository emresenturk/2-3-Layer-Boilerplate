using System.Diagnostics.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Todo;
using Todo.Models;

namespace TodoApi.Controllers;

[ApiController]
[Route("todos")]
public class TodoController : ControllerBase
{
    private readonly TodoDbContext ctx;
    private readonly MachineIdService machineIdService;

    public TodoController(TodoDbContext ctx, MachineIdService machineIdService)
    {
        this.ctx = ctx;
        this.machineIdService = machineIdService;
    }

    [HttpGet("machine-id")]
    public async Task<string> GetMachineId()
    {
        return machineIdService.MachineId.ToString();
    }

    [HttpGet("")]
    public async Task<IEnumerable<TodoItem>> GetAllTodos()
    {
        var todos = await ctx.Todos.AsNoTracking().ToListAsync();
        return todos;
    }

    [HttpPost("")]
    public async Task<TodoItem> CreateTodo(TodoItem item)
    {
        await ctx.Todos.AddAsync(item);
        await ctx.SaveChangesAsync();
        return item;
    }

    [HttpPut("")]
    public async Task<TodoItem> UpdateTodo(TodoItem item)
    {
        ctx.Update(item);
        await ctx.SaveChangesAsync();
        return item;
    }

    [HttpDelete("{id:int}")]
    public async Task<TodoItem> DeleteTodo([FromRoute] int id)
    {
        var todo = await ctx.Todos.FirstOrDefaultAsync(x => x.Id == id);
        if (todo != null)
        {
            await ctx.Todos.Where(t => t.Id == id).ExecuteDeleteAsync();
            await ctx.SaveChangesAsync();
            return todo;
        }

        throw new Exception("todo not found");
    }
}