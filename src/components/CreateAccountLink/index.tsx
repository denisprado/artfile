import { CMSLink } from "../Link"

const CreateAccountLink = () => {
	return <CMSLink label={"Não tenho conta. Cadastrar."} url={"/create-account"} appearance={'link'} />
}

export default CreateAccountLink