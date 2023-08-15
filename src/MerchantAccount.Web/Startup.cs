using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using MerchantAccount.Application;
using MerchantAccount.Application.Interfaces;
using MerchantAccount.Infrastructure;
using MerchantAccount.Persistence;

namespace MerchantAccount.Web
{
	public class Startup
	{
		private readonly ILogger<Startup> _logger;

		public Startup(IConfiguration configuration, ILogger<Startup> logger)
		{
			Configuration = configuration;
			_logger = logger;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			// Enable CORS (Cross Origin Resource Sharing) for any origin
			services.AddCors(options =>
			{
				options.AddPolicy(
					"CorsPolicy",
					builder => builder
						.AllowAnyHeader()
						.AllowAnyMethod()
						.SetIsOriginAllowed((host) => true)
						.AllowCredentials()
						.WithExposedHeaders("X-Total-Count"));
			});

			services.AddApplication();
			services.AddInfrastructure();
			services.AddPersistence(Configuration);
			services.AddDistributedMemoryCache();
			services.AddSwaggerDocument();

			services.AddControllersWithViews();

			// In production, the Angular files will be served from this directory
			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "ClientApp/dist";
			});

			// Todo: AddAuthentication...
			// services.AddAuthentication(options =>
			// {
			// 	options.DefaultScheme = "cookies";
			// 	options.DefaultChallengeScheme = "oauth";
			// })
			// .AddCookie("cookies", o =>
			// {
			// 	o.Cookie.Name = "__Host-merchantaccount";
			// })
			// .AddOAuth("oauth", o =>
			// {
			// });
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");

				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}

			// app.UseAuthentication();
			// app.UseHttpsRedirection();
			app.UseStaticFiles();
			if (!env.IsDevelopment())
			{
				app.UseSpaStaticFiles();
			}

			app.UseCors("CorsPolicy");
			app.UseRouting();
			// app.UseAuthorization();
			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});

			app.UseOpenApi();
			app.UseSwaggerUi3();

			app.UseSpa(spa =>
			{
				// To learn more about options for serving an Angular SPA from ASP.NET Core,
				// see https://go.microsoft.com/fwlink/?linkid=864501
				spa.Options.SourcePath = "ClientApp";

				if (env.IsDevelopment())
				{
					spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
				}
			});
		}
	}
}
