using System.Reflection;
using MerchantAccount.Application.Common.Behaviours;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace MerchantAccount.Application;

public static class DependencyInjection
{
	public static IServiceCollection AddApplication(
		this IServiceCollection services)
	{
		// Add MediatR
		_ = services.AddMediatR(Assembly.GetExecutingAssembly());
		_ = services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestPerformanceBehavior<,>));
		_ = services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestValidationBehavior<,>));

		_ = services.AddAutoMapper(Assembly.GetExecutingAssembly());

		_ = services.AddAllRequestValidators();

		return services;
	}

	private static IServiceCollection AddAllRequestValidators(
		this IServiceCollection services)
	{
		Type validatorType = typeof(IValidator<>);

		List<Type> validatorTypes = Assembly.GetExecutingAssembly()
			.GetExportedTypes()
			.Where(t => t.GetInterfaces().Any(i => i.IsGenericType && i.GetGenericTypeDefinition() == validatorType))
			.ToList();

		foreach (Type validator in validatorTypes)
		{
			Type requestType = validator.GetInterfaces()
				.Where(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IValidator<>))
				.Select(i => i.GetGenericArguments()[0])
				.First();

			Type validatorInterface = validatorType.MakeGenericType(requestType);

			_ = services.AddTransient(validatorInterface, validator);
		}

		return services;
	}
}