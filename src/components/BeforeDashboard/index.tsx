import React from 'react'

import OnboardingSteps from '@/components/OnboardingSteps'
import { getMeUserServer } from '@/utilities/getMeUserServer'

const BeforeDashboard: React.FC = async () => {
	const { user } = await getMeUserServer()
	return (
		<OnboardingSteps />
	)
}

export default BeforeDashboard
