import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'
import CreateAccountLink from '../CreateAccountLink'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
	return (
		<div className={baseClass}>
			<Banner className={`${baseClass}__banner`} type="success">
				<h4>Bem vinda, bem vindo a sua conta no Artfile!</h4>
			</Banner>
			<CreateAccountLink />
		</div>
	)
}

export default BeforeDashboard
