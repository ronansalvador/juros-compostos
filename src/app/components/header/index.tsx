import Link from 'next/link';

function Header() {
  return (
    <header className='flex justify-around absolute top-0 left-0 w-full mt-5'>
      <Link href='/rentabilidade' className='text-white bg-purple-700 h-16 p-2 rounded-2xl flex justify-center items-center w-2/5 text-center hover:scale-110 font-medium'>Calculadora de Juros Compostos</Link>

      <Link href='/' className='text-white bg-purple-700 h-16 p-2 rounded-2xl flex justify-center items-center w-2/5 text-center hover:scale-110 font-medium'>Converter juros</Link>
    </header>
  );
}

export default Header;