using API;
using API.Data;
using API.Services;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors(); // Cors == Cross-Origin Resource Sharing. Protects browser from shady origins
// Add the TokenService to the build.
// AddScoped makes most sense here, because AddTransient would be created/deleted for each use,
// and AddSingleton would live in memory, consuming resources.
builder.Services.AddScoped<ITokenService, TokenService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
// This will allow connection via our Angular Development Server which runs on localhost:4200
app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));

app.MapControllers();

app.Run();
