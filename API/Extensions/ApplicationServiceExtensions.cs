using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services,
        IConfiguration config)
    {
        services.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
        });
        services.AddCors(); // Cors == Cross-Origin Resource Sharing. Protects browser from shady origins
        // Add the TokenService to the build.
        // AddScoped makes most sense here, because AddTransient would be created/deleted for each use,
        // and AddSingleton would live in memory, consuming resources.
        services.AddScoped<ITokenService, TokenService>();

        return services;
    }
}
