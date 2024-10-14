using Microsoft.EntityFrameworkCore;
using Todo;
using Todo.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddEnvironmentVariables().AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json");
builder.Services.AddDbContext<TodoDbContext>(opts => opts.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

var  myAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(opts => opts.AddPolicy(name: myAllowSpecificOrigins, policy => {policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();}));
builder.Services.AddSingleton<MachineIdService>();
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors(myAllowSpecificOrigins);

using(var scope = app.Services.CreateScope())
{
    var ctx = scope.ServiceProvider.GetRequiredService<TodoDbContext>();
    ctx.Database.EnsureCreated();
}

app.Run();
