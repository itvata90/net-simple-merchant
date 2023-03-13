using MerchantAccount.Application;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Infrastructure;
using MerchantAccount.Persistence;
using MerchantAccount.Web.Middleware;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.EntityFrameworkCore;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_MyAllowSubdomainPolicy";

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<GlobalErrorHandlingMiddleware>();
builder.Services.AddCors(options =>
{
	options.AddPolicy(name: MyAllowSpecificOrigins,
					  policy =>
					  {
						  policy.WithOrigins("http://127.0.0.1:5173")
						  .WithExposedHeaders("X-Total-Count")
						  .AllowAnyHeader()
						  .AllowAnyMethod();
					  });
});

builder.WebHost.UseKestrel(options =>
{
	options.AddServerHeader = false;
	options.Limits.MaxConcurrentConnections = 100;
	options.Limits.MaxConcurrentUpgradedConnections = 100;
	options.Limits.MaxRequestBodySize = 10485760;  // 10 MB
	options.Limits.MinRequestBodyDataRate = new MinDataRate(bytesPerSecond: 1024, gracePeriod: TimeSpan.FromSeconds(3));
	options.Limits.MinResponseDataRate = new MinDataRate(bytesPerSecond: 1024, gracePeriod: TimeSpan.FromSeconds(3));
	options.Limits.KeepAliveTimeout = TimeSpan.FromSeconds(120);
	options.Limits.RequestHeadersTimeout = TimeSpan.FromSeconds(60);
});

builder.Services.AddApplication();
builder.Services.AddInfrastructure();
builder.Services.AddPersistence(builder.Configuration);




WebApplication app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	_ = app.UseSwagger();
	_ = app.UseSwaggerUI();
}


using (IServiceScope scope = app.Services.CreateScope())
{
	try
	{
		IApplicationDbContext? context = scope.ServiceProvider.GetService<IApplicationDbContext>();

		ApplicationDbContext concreteContext = (ApplicationDbContext)context!;
		concreteContext.Database.Migrate();
		ApplicationDbInitializer.Initialize(concreteContext);
	}
	catch (Exception ex)
	{
		ILogger<Program> logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
		logger.LogError(ex, "An error occurred while migrating or initializing the database.");
	}
}

// app.UseHttpsRedirection();

app.UseAuthorization();
app.UseMiddleware<GlobalErrorHandlingMiddleware>();
app.UseCors(MyAllowSpecificOrigins);
app.MapControllers();


app.Run();