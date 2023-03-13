using MediatR.Pipeline;
using Microsoft.Extensions.Logging;

namespace MerchantAccount.Application.Common.Behaviours;

public class RequestLogger<TRequest> : IRequestPreProcessor<TRequest>
	where TRequest : notnull
{
	private readonly ILogger _logger;

	public RequestLogger(ILogger<TRequest> logger)
	{
		_logger = logger;
	}

	public Task Process(TRequest request, CancellationToken cancellationToken)
	{
		string name = typeof(TRequest).Name;

		_logger.LogInformation("Request: {Name} {@Request}", name, request);

		return Task.CompletedTask;
	}
}