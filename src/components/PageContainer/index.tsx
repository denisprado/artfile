import React from 'react';
import { cn } from '@/utilities/cn';

const PageContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
	return (
		<div
			className={cn(
				'mb-24 mt-12',
				className // Adicione a propriedade className aqui
			)}
		>
			{children}
		</div>
	);
};

export default PageContainer;