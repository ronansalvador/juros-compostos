'use client'
import { useState } from 'react'
import Input from '../components/input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { currencyString, percentString } from "../components/masks";


function Rentabilidade() {
  const [inicial, setInicial] = useState('');
  const [mensal, setMensal] = useState('');
  const [tempo, setTempo] = useState('');
  const [rentabilidade, setRentabilidade] = useState('');
  const [periodo, setPeriodo] = useState('mes');
  const [investimento, setInvestimento] = useState(0);
  const [valorAcumulado, setValorAcumulado] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const showToastSuccess = (mensagem: string) => {
    toast.success(mensagem, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showToastError = (mensagem: string) => {
    toast.error(mensagem, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const convertNumber = (string: string) => {
    let convert = string.replace(/\D/g, '');
    convert = convert.replace(/(\d)(\d{2})$/, "$1.$2");

    return Number(convert)
  }
  const rentabilidadeMensal = () => {
    const inicialNum = convertNumber(inicial)
    const mensalNum = convertNumber(mensal)
    const rentabilidadeNum = convertNumber(rentabilidade)
    console.log(rentabilidadeNum)
    console.log('tempo', tempo)
    
    const acumulado =
      inicialNum * Math.pow(1 + rentabilidadeNum / 100, Number(tempo)) +
      mensalNum *
        ((Math.pow(1 + rentabilidadeNum / 100, Number(tempo)) - 1) /
          (rentabilidadeNum / 100));

    const investido = inicialNum + mensalNum * Number(tempo);
    setInvestimento(investido);

    setValorAcumulado(acumulado);
    showToastSuccess('Calculando com juros mensais');
    setShowResult(true);
  };

  const rentabilidadeAnual = () => {
    const inicialNum = convertNumber(inicial)
    const mensalNum = convertNumber(mensal)
    const rentabilidadeNum = convertNumber(rentabilidade)
    console.log(rentabilidadeNum)
    const taxaAnual = rentabilidadeNum / 100;
    console.log(taxaAnual)
    let taxaMensal = Number(((Math.pow(1 + taxaAnual, 1 / 12) - 1) * 100).toFixed(2));
    console.log(taxaMensal)

    const acumulado =
      inicialNum * Math.pow(1 + taxaMensal / 100, Number(tempo)) +
      mensalNum *
        ((Math.pow(1 + taxaMensal / 100, Number(tempo)) - 1) / (taxaMensal / 100));

    const investido = inicialNum + mensalNum * Number(tempo);
    setInvestimento(investido);
    setValorAcumulado(acumulado);
    showToastSuccess('Calculando com juros anuais');
    setShowResult(true);
  };

  const calcularRentabilidade = () => {
    if (inicial === '' && mensal === '') {
      return showToastError(
        'Valor inicial ou valor mensal não podem ser vazios',
      );
    }
    if (!tempo) {
      return showToastError('Tempo não pode ser vazio');
    }

    if (!rentabilidade) {
      return showToastError('Rentabilidade não pode ser vazio');
    }

    if (periodo === 'mes') rentabilidadeMensal();
    if (periodo === 'ano') rentabilidadeAnual();

  };

  const converterParaReal = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <main className="flex w-2/3 h-full flex-col gap-6 items-center justify-evenly p-24 max-sm:w-screen max-sm:gap-3 max-sm:p-1 max-sm:pt-24">

        <ToastContainer />
        <h2 className='text-white text-xl max-sm:text-lg'>Simulador de Juros Compostos</h2>
        {!showResult? (
        <>
        <div className='flex w-10/12 gap-3 flex-col items-center justify-center'>
          <p className='text-white'>Quanto você tem hoje para investir?</p>
          <Input placeholder='1.000,00' prefix='R$' name='inicial' value={currencyString(inicial)} onChange={(e) => setInicial(e.target.value)}/>
          </div>
          <div className='flex w-10/12 gap-3 flex-col items-center justify-center'>
          <p className='text-white'>Aplicação mensal</p>
          <Input placeholder='1.000,00' prefix='R$' name='mensal' value={currencyString(mensal)} onChange={(e) => setMensal(e.target.value)}/>
          </div>
         
          <div className='flex w-10/12 gap-3 flex-col items-center justify-center'>
          <p className='text-white'> Por quanto tempo?</p>
          <Input placeholder='Digite valor em meses' type='number' prefix='Meses' name='tempo' value={tempo} onChange={(e) => setTempo(e.target.value)}/>
          </div>

          <div className='flex w-10/12 gap-3 flex-col items-center justify-center'>
          <p className='text-white'>Rentabilidade</p>
          <div className='flex w-full gap-36 justify-between max-sm:gap-2'>
            <Input placeholder='0,00' prefix='%' name='rentabilidade' value={percentString(rentabilidade)} onChange={(e) => setRentabilidade(e.target.value)}/>

          <select
            name='periodo'
            id='rentabilidade-periodo'
            value={periodo}
            required
            onChange={(e) => setPeriodo(e.target.value)}
            className='rounded-lg p-3 w-3/4'
            >
              <option value='mes'>ao mes</option>
              <option value='ano'>ao ano</option>
            </select>
            </div>
            </div>
            
            <button className='text-white bg-purple-700 h-16 p-2 rounded-2xl flex justify-center items-center w-2/5 text-center hover:scale-110 font-medium mt-3' onClick={() => calcularRentabilidade()}>Calcular</button>
          </>
          ) : (
          <div className='flex flex-col w-full gap-10 mt-10 items-center justify-evenly'>
            <h3 className='text-white text-lg max-sm:text-sm'>{`O valor total investido é de R$: ${converterParaReal(
                  investimento,
                )}`}
            </h3>
            <h3 className='text-white text-lg max-sm:text-sm'>{`Juros ganhos no período R$: ${converterParaReal(
                  valorAcumulado - investimento,
                )}`}
            </h3>
            <h3 className='text-white text-lg max-sm:text-sm'>{`O valor total acumlado é de R$: ${converterParaReal(
                  valorAcumulado,
                )}`}
            </h3>
  
            <button
              type='button'
              className='text-white bg-purple-700 h-16 p-2 rounded-2xl flex justify-center items-center w-2/5 text-center hover:scale-110 font-medium mt-3'
              onClick={() => {
              setShowResult(false);
              }}
            >
              Novo Cálculo
            </button>
          </div>
            )}
    </main>
  )
}

export default Rentabilidade