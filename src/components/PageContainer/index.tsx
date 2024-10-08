import React from 'react';

const PageContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <div className='mb-24 mt-12'>{children}</div>;
};

export default PageContainer;
