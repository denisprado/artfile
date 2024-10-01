'use client'

import { ImageLoaderProps } from 'next/image'

// const imageLoader = ({ src, width = 1000, quality = 0 }: ImageLoaderProps) => {
//   return src;
// };

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const params = [`w=${width}`]
  if (quality) {
    params.push(`q=${quality}`)
  }
  const paramsString = params.join('&')
  // return `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${src}?${paramsString}`;
  return `https://plato-artfile.s3.us-east-2.amazonaws.com${src}?${paramsString}`
}

export default imageLoader
