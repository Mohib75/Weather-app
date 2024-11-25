import Image from "next/image"


const Spinner = () => {
  return (
     <>
      <Image src="/spinner.gif" className='m-auto block' alt='loading..' width="200" height="200" />
    </>
  )
}

export default Spinner