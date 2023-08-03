'use client'
import { useState } from "react";


export default function Home() {
  
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  function converterTaxaMensalParaAnual(taxaMes: string) {
    setMonth(taxaMes);
    const taxaMensal = Number(taxaMes) / 100;
    let taxaAnual = ((Math.pow(1 + taxaMensal, 12) - 1) * 100).toFixed(2);
    setYear(taxaAnual);
  }

  function converterTaxaAnualParaMensal(taxaAno: string) {
    setYear(taxaAno);
    const taxaAnual = Number(taxaAno) / 100;
    let taxaMensal = ((Math.pow(1 + taxaAnual, 1 / 12) - 1) * 100).toFixed(2);
    setMonth(taxaMensal);
  }



  return (
    <main className="flex w-2/3 h-full flex-col gap-6 items-center justify-evenly p-24 max-sm:w-screen max-sm:gap-3 max-sm:p-1 max-sm:pt-24">
    <div className='flex flex-wrap w-10/12 items-center gap-5 flex-col'>
          <h2 className="mt-5 text-2xl text-white">Converter juros</h2>
          <h3 className="mt-5 text-xl text-white text-center">Preencha a opção desejada para realizar a conversão</h3>
          <label htmlFor='juros-mes' className="text-white">Juros ao Mês:</label>
          <input
            type='number'
            name='juros-mes'
            id='juros-mes'
            value={month}
            className='rounded-lg p-2 text-lg'
            placeholder="0,00"
            onChange={(e) => converterTaxaMensalParaAnual(e.target.value)}
          />
        </div>
        <div className='flex flex-wrap w-10/12 items-center gap-5 flex-col'>
          <label htmlFor='juros-ano' className="text-white">Juros ao Ano:</label>
          <input
            type='number'
            name='juros-ano'
            id='juros-ano'
            value={year}
            className='rounded-lg p-2 text-lg'
            placeholder="0,00"
            onChange={(e) => converterTaxaAnualParaMensal(e.target.value)}
          />
        </div>

    </main>
  )
}
