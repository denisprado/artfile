import { Product, Media } from "@/payload-types";
import { DownloadIcon, LockIcon } from "lucide-react";
import Image from 'next/image'
const CollectionProductFiles: React.FC<{ product: Product; isPurchased: boolean }> = ({ product, isPurchased }) => {
	if (!product.files || product.files.length === 0) {
		return <p>Esse produto não tem arquivos.</p>
	}

	const fileBaseUrl = process.env.NEXT_PUBLIC_S3_BUCKET_URL || 'https://plato-artfile.s3.us-east-2.amazonaws.com/';


	return (
		<>
			<h6>Arquivos neste produto</h6>
			<div className='grid grid-cols-12 gap-4'>
				{product.files.map((file) => (

					<a
						key={file.id} className={'col-span-3'}
						target='_blank'
						rel='noopener noreferrer'
						href={isPurchased ? `${fileBaseUrl}${(file.file as Media)?.filename}` : '/#'}
					>
						<span className='flex flex-col gap-2'>
							<Image
								src={`/${(file.file as Media)?.sizes?.thumbnail?.filename || ''}`}
								alt={(file.file as Media).filename || 'Imagem do arquivo'}
								width={(file.file as Media)?.sizes?.thumbnail?.width || 100}
								height={(file.file as Media)?.sizes?.thumbnail?.height || 100}
							/>
							{isPurchased ? <span className='flex gap-2 items-center'><DownloadIcon color='green' /><span className='hover:underline'>Baixar</span></span> : <span className='flex gap-2 items-center'><LockIcon color='red' /><span className='hover:underline'>Comprar</span></span>}
							<span className='font-medium text-pretty mb-8'>{file.title} </span>
						</span>
					</a>

				))}
			</div>
		</>
	)
}

export default CollectionProductFiles