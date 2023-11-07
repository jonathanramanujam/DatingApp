using API;
using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
// This will allow connection via our Angular Development Server which runs on localhost:4200
app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod()
    .WithOrigins("https://localhost:4200"));

app.UseAuthentication(); // Do you have a valid token?
app.UseAuthorization(); // What are you allowed to do?

app.MapControllers();

app.Run();
