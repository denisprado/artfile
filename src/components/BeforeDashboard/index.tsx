import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import CreateAccountLink from '../CreateAccountLink'
import './index.scss'
import { getMeUserServer } from '@/utilities/getMeUserServer'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = async () => {
	const { user } = await getMeUserServer()
	return (
		<div className={baseClass}>
			<Banner className={`${baseClass}__banner`} type="success">
				<h4>Bem vinda, bem vindo a sua conta no Artfile!</h4>
			</Banner>
			<CreateAccountLink user={user} />
		</div>
	)
}

export default BeforeDashboard
