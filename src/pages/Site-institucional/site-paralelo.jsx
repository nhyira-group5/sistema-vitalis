import { Link } from 'react-router-dom';
import { Container } from './container';
import blackNormalSize from '@assets/logos/logoGreenNormal.svg';


export const SiteInst = () => {
  return (
    <>
      <header className='font-inter shadow-md'>
        <Container>
          <img src={blackNormalSize} alt="" />
          <Link to="/login" className='bg-primary-green300 px-5 py-2.5 uppercase font-medium rounded-lg block text-white '>entrar</Link>
        </Container>
      </header>
      <Container>
        <main className='mt-[76px]'>
          <h1 className='text-6xl text-primary-green300 font-bold leading-none max-w-md'>Bem estar de forma certa<span className='font-inter text-purple-500 text-6xl leading-none'>.</span></h1>
          <p className='text-base max-w-[356px] text-[#525252]'>Treinos, alimentação e suporte especializado para você conquistar o que deseja.</p>
        </main>
      </Container>
    </>
  );
};
