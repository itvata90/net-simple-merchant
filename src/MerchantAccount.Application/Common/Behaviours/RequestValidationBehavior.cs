using FluentValidation;
using MediatR;
using ValidationException = MerchantAccount.Application.Common.Exceptions.ValidationException;

namespace MerchantAccount.Application.Common.Behaviours;

public class RequestValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
where TRequest : IRequest<TResponse>
{
	private readonly IEnumerable<IValidator<TRequest>> _validators;

	public RequestValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
	{
		_validators = validators;
	}

	public Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
	{
		ValidationContext<TRequest> context = new(request);

		List<FluentValidation.Results.ValidationFailure> failures = _validators
			.Select(v => v.Validate(context))
			.SelectMany(result => result.Errors)
			.Where(f => f != null)
			.ToList();

		return failures.Count != 0 ? throw new ValidationException(failures) : next();
	}
}