import { useEffect, useState } from 'react'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  const handleResize = () => {
    setIsMobile(window.innerWidth < 480) // Define 768px como limite para mobile
  }

  useEffect(() => {
    handleResize() // Verifica a largura inicial
    window.addEventListener('resize', handleResize) // Adiciona listener para redimensionamento

    return () => {
      window.removeEventListener('resize', handleResize) // Limpa o listener ao desmontar
    }
  }, [])

  return isMobile
}

export { useIsMobile }
