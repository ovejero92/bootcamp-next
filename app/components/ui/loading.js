import Image from 'next/image'

const Loading = () => {
  return (
    <div className='flex justify-center items-centers'>
     <Image 
     src={`/Logo-next.png`}
     alt="Logo de mi app"
     width = {350}
     height = {250}
     className="animate-pulse"
     />
    </div>
  )
}
export default Loading