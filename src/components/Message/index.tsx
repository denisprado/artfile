import React from 'react';

export const Message: React.FC<{
	message?: React.ReactNode;
	error?: React.ReactNode;
	success?: React.ReactNode;
	warning?: React.ReactNode;
	className?: string;
}> = ({ message, error, success, warning, className }) => {
	const messageToRender = message || error || success || warning;

	if (messageToRender) {
		return (
			<div
				className={[
					'p-[var(--base)/1.5] leading-[1.25] w-full',
					className,
					error && 'bg-[var(--theme-error-500)] text-[var(--theme-error-900)]',
					success && 'bg-[var(--theme-success-500)] text-[var(--theme-success-900)]',
					warning && 'bg-[var(--theme-warning-500)] text-[var(--theme-warning-900)]',
					!error && !success && !warning && 'bg-[var(--theme-elevation-100)] text-[var(--theme-elevation-1000)]',
				].join(' ')}
			>
				{messageToRender}
			</div>
		);
	}
	return null;
};