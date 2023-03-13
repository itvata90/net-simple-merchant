using System.Text.Json;
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MerchantAccount.Application.Common.Exceptions;
namespace MerchantAccount.Web.Middleware;


public class GlobalErrorHandlingMiddleware : IMiddleware
{
	private readonly ILogger<GlobalErrorHandlingMiddleware> _logger;
	public GlobalErrorHandlingMiddleware(ILogger<GlobalErrorHandlingMiddleware> logger) => _logger = logger;
	public async Task InvokeAsync(HttpContext context, RequestDelegate next)
	{
		try
		{
			await next(context);
		}
		catch (NotFoundException notFoundException)
		{
			_logger.LogError(notFoundException, notFoundException.Message);

			ProblemDetails problemDetails = new ProblemDetails()
			{
				Status = (int)HttpStatusCode.NotFound,
				Title = "Not found",
				Type = "Not found",
				Detail = notFoundException.Message,
			};

			string response = JsonSerializer.Serialize(problemDetails);
			context.Response.StatusCode = (int)HttpStatusCode.NotFound;
			context.Response.ContentType = "application/json";
			await context.Response.WriteAsync(response);
		}
		catch (Exception exception)
		{
			_logger.LogError(exception, exception.Message);

			ProblemDetails problemDetails = new ProblemDetails()
			{
				Status = (int)HttpStatusCode.InternalServerError,
				Title = "Internal Server Error",
				Type = "Internal Server Error",
				Detail = exception.Message,
			};

			string response = JsonSerializer.Serialize(problemDetails);
			context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
			context.Response.ContentType = "application/json";
			await context.Response.WriteAsync(response);
		}
	}
}